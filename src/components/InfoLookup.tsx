import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Route, Search } from "lucide-react";
import { toast } from "sonner";

import { chainsToContract, rideSharingAbi } from "@/constants";
import { useChainId, useConfig } from "wagmi";
import { readContract } from "@wagmi/core";
// import publicClient from "@/publicClient";

import { formatEther } from "viem";

enum RideStatus {
  "Cancelled",
  "Requested",
  "Accepted",
  "Started",
  "Completed By Driver",
  "Finalized",
}

interface DriverInfo {
  nama: string;
  platNomor: string;
  kendaraan: string;
  address: string;
}

interface RideInfo {
  index: string;
  lokasiAwal: string;
  lokasiTujuan: string;
  tarif: bigint;
  jarak: bigint;
  status: bigint;
  catatan: string;
}

const InfoLookup = () => {
  const [driverAddress, setDriverAddress] = useState("");
  const [rideIndex, setRideIndex] = useState("");
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const [rideInfo, setRideInfo] = useState<RideInfo | null>(null);

  const chainId = useChainId();
  const config = useConfig();
  const rideSharing = chainsToContract[chainId]["rideSharing"];

  async function getDriver(): Promise<DriverInfo> {
    if (!rideSharing) {
      throw new Error("Address is required");
      return 0 as any;
    }

    const response = await readContract(config, {
      abi: rideSharingAbi,
      address: rideSharing as `0x${string}`,
      functionName: "getDriver",
      args: [driverAddress as `0x${string}`],
      authorizationList: undefined,
    });

    return response
      ? {
          nama: response.nama,
          platNomor: response.platNomor,
          kendaraan: response.kendaraan,
          address: driverAddress,
        }
      : undefined;
  }

  async function getDetailPerjalanan(): Promise<RideInfo> {
    if (!rideSharing) {
      throw new Error("Address is required");
      return 0 as any;
    }

    const response = await readContract(config, {
      abi: rideSharingAbi,
      address: rideSharing as `0x${string}`,
      functionName: "getDetailPerjalanan",
      args: [rideIndex as unknown as bigint],
      authorizationList: undefined,
    });

    return response
      ? {
          index: rideIndex,
          lokasiAwal: response.lokasiAwal,
          lokasiTujuan: response.lokasiTujuan,
          tarif: response.tarifPerKm as unknown as bigint,
          jarak: response.jarakKm as unknown as bigint,
          status: response.status as unknown as bigint,
          catatan: response.catatan,
        }
      : undefined;
  }

  const handleGetDriver = async () => {
    if (!driverAddress) {
      toast.error("Masukkan alamat driver");
      return;
    }

    const driver: DriverInfo = await getDriver();

    if (!driver) {
      toast.error("Driver tidak ditemukan");
      return;
    }

    // Simulate getDriver response
    setDriverInfo({
      nama: driver.nama,
      platNomor: driver.platNomor,
      kendaraan: driver.kendaraan,
      address: driverAddress,
    });

    toast.success("Info driver ditemukan!");
  };

  const handleGetRide = async () => {
    if (!rideIndex) {
      toast.error("Masukkan ride index");
      return;
    }
    // Simulate getDetailPerjalanan response

    const info: RideInfo = await getDetailPerjalanan();

    if (!info) {
      toast.error("Detail perjalanan tidak ditemukan");
      return;
    }

    setRideInfo({
      index: rideIndex,
      lokasiAwal: info.lokasiAwal,
      lokasiTujuan: info.lokasiTujuan,
      tarif: info.tarif,
      jarak: info.jarak,
      status: RideStatus[info.status.toString()],
      catatan: info.catatan,
    });

    toast.success("Detail perjalanan ditemukan!");
  };

  return (
    <div className="space-y-6">
      {/* Get Driver Info */}
      <Card className="gradient-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Info Driver</CardTitle>
              <CardDescription>
                Lihat informasi driver berdasarkan alamat
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="0x..."
              value={driverAddress}
              onChange={(e) => setDriverAddress(e.target.value)}
              className="flex-1 font-mono text-sm"
            />
            <Button variant="default" onClick={handleGetDriver}>
              <Search className="w-4 h-4" />
              Cari
            </Button>
          </div>

          {driverInfo && (
            <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Nama</p>
                  <p className="font-medium">{driverInfo.nama}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Plat Nomor</p>
                  <p className="font-medium font-mono">
                    {driverInfo.platNomor}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Kendaraan</p>
                  <p className="font-medium">{driverInfo.kendaraan}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-mono text-xs truncate">
                    {driverInfo.address}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Get Ride Info */}
      <Card className="gradient-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Route className="w-5 h-5 text-accent" />
            </div>
            <div>
              <CardTitle>Detail Perjalanan</CardTitle>
              <CardDescription>
                Lihat detail perjalanan berdasarkan index
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Ride Index"
              value={rideIndex}
              onChange={(e) => setRideIndex(e.target.value)}
              className="flex-1"
            />
            <Button variant="default" onClick={handleGetRide}>
              <Search className="w-4 h-4" />
              Cari
            </Button>
          </div>

          {rideInfo && (
            <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                  {rideInfo.status.toString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  Ride #{rideInfo.index}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Dari</p>
                  <p className="font-medium text-sm">{rideInfo.lokasiAwal}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ke</p>
                  <p className="font-medium text-sm">{rideInfo.lokasiTujuan}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tarif/KM</p>
                  <p className="font-medium font-mono">
                    {formatEther(rideInfo.tarif)} ETH
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jarak</p>
                  <p className="font-medium">{rideInfo.jarak.toString()} KM</p>
                </div>
              </div>
              {rideInfo.catatan && (
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">Catatan</p>
                  <p className="text-sm">{rideInfo.catatan}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoLookup;
