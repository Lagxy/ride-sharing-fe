import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Route, Search } from "lucide-react";
import { toast } from "sonner";

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
  tarif: string;
  jarak: string;
  status: string;
  catatan: string;
}

const InfoLookup = () => {
  const [driverAddress, setDriverAddress] = useState("");
  const [rideIndex, setRideIndex] = useState("");
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const [rideInfo, setRideInfo] = useState<RideInfo | null>(null);

  const handleGetDriver = () => {
    if (!driverAddress) {
      toast.error("Masukkan alamat driver");
      return;
    }
    // Simulate getDriver response
    console.log(`getDriver(${driverAddress})`);
    setDriverInfo({
      nama: "John Doe",
      platNomor: "B 1234 ABC",
      kendaraan: "Honda Vario 125",
      address: driverAddress,
    });
    toast.success("Info driver ditemukan!");
  };

  const handleGetRide = () => {
    if (!rideIndex) {
      toast.error("Masukkan ride index");
      return;
    }
    // Simulate getDetailPerjalanan response
    console.log(`getDetailPerjalanan(${rideIndex})`);
    setRideInfo({
      index: rideIndex,
      lokasiAwal: "Jl. Sudirman No. 1",
      lokasiTujuan: "Jl. Thamrin No. 10",
      tarif: "0.001",
      jarak: "5",
      status: "Requested",
      catatan: "Tunggu di lobby",
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
              <CardDescription>Lihat informasi driver berdasarkan alamat</CardDescription>
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
                  <p className="font-medium font-mono">{driverInfo.platNomor}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Kendaraan</p>
                  <p className="font-medium">{driverInfo.kendaraan}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-mono text-xs truncate">{driverInfo.address}</p>
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
              <CardDescription>Lihat detail perjalanan berdasarkan index</CardDescription>
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
                  {rideInfo.status}
                </span>
                <span className="text-xs text-muted-foreground">Ride #{rideInfo.index}</span>
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
                  <p className="font-medium font-mono">{rideInfo.tarif} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jarak</p>
                  <p className="font-medium">{rideInfo.jarak} KM</p>
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
