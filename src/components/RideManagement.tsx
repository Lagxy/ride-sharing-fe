import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle, Play, Wallet, Flag, Search } from "lucide-react";
import { toast } from "sonner";

import { formatEther } from "viem";
import { chainsToContract, rideSharingAbi } from "@/constants";
import { useChainId, useConfig, useConnection, useReadContract } from "wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { sepolia } from "wagmi/chains";

const RideManagement = () => {
  const [rideIndex, setRideIndex] = useState("");
  const [fundRideIndex, setfundRideIndex] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("0");

  const account = useConnection();
  const chainId = useChainId();
  const config = useConfig();
  const rideSharing = chainsToContract[chainId]["rideSharing"];

  async function fetchEstimatedCost(rideIndex: string): Promise<string> {
    if (rideIndex === "") return "0";

    try {
      const response = await readContract(config, {
        address: rideSharing as `0x${string}`,
        abi: rideSharingAbi,
        functionName: "getDetailPerjalanan",
        args: [rideIndex as unknown as bigint],
        authorizationList: undefined,
      });

      return formatEther(response.jarakKm * response.tarifPerKm);
    } catch {
      return "0";
    }
  }

  async function handleOnIndexChange(index: string) {
    setfundRideIndex(index);
    setEstimatedCost(await fetchEstimatedCost(index));
  }

  const handleAction = async (action: string) => {
    if (!rideIndex) {
      toast.error("Masukkan Ride Index terlebih dahulu");
      return;
    }

    if (account.isDisconnected) {
      toast.error("Wallet belum terhubung", {
        description: "Silakan hubungkan wallet Anda terlebih dahulu.",
      });
      return;
    }

    let actionName = "";

    switch (action) {
      case "accept":
        actionName = "acceptRide";
        break;
      case "start":
        actionName = "startRide";
        break;
      case "cancel":
        actionName = "cancelRide";
        break;
      case "complete":
        actionName = "completeRide";
        break;
      case "confirm":
        actionName = "confirmArrival";
        break;
      default:
        toast.error("Aksi tidak valid");
        return;
    }

    const response = await writeContract(config, {
      abi: rideSharingAbi,
      address: rideSharing as `0x${string}`,
      functionName: actionName as any,
      args: [rideIndex as unknown as bigint],
      chain: sepolia,
      account: account.address,
    });

    const toastId = toast.loading(`Memproses ${actionName}...`);
    const receipt = await waitForTransactionReceipt(config, { hash: response });
    toast.dismiss(toastId);

    if (receipt.status) {
      const actionMessages: Record<string, string> = {
        accept: `acceptRide(${rideIndex}) - Ride diterima!`,
        start: `startRide(${rideIndex}) - Perjalanan dimulai!`,
        cancel: `cancelRide(${rideIndex}) - Ride dibatalkan.`,
        complete: `completeRide(${rideIndex}) - Perjalanan selesai!`,
        confirm: `confirmArrival(${rideIndex}) - Kedatangan dikonfirmasi, dana ditransfer!`,
      };

      toast.success(actionMessages[action]);
    } else {
      toast.error(`Gagal melakukan ${actionName}. Silakan coba lagi.`);
    }
  };

  const handleFund = async () => {
    if (!rideIndex || !fundRideIndex) {
      toast.error("Masukkan Ride Index dan jumlah ETH");
      return;
    }

    if (account.isDisconnected) {
      toast.error("Wallet belum terhubung", {
        description: "Silakan hubungkan wallet Anda terlebih dahulu.",
      });
      return;
    }

    const response = await writeContract(config, {
      abi: rideSharingAbi,
      address: rideSharing as `0x${string}`,
      functionName: "fundRide",
      args: [rideIndex as unknown as bigint],
      chain: sepolia,
      account: account.address,
    });

    const toastId = toast.loading(`Memproses fundRide...`);
    const receipt = await waitForTransactionReceipt(config, { hash: response });
    toast.dismiss(toastId);

    if (receipt.status) {
      toast.success(`Dana ${fundRideIndex} ETH berhasil dikirim ke kontrak!`);
    } else {
      toast.error(`Gagal melakukan fundRide. Silakan coba lagi.`);
    }

    setfundRideIndex("");
  };

  const actions = [
    {
      key: "accept",
      label: "Accept Ride",
      icon: CheckCircle,
      description: "Driver menerima ride",
      color: "text-primary",
    },
    {
      key: "start",
      label: "Start Ride",
      icon: Play,
      description: "Mulai perjalanan",
      color: "text-accent",
    },
    {
      key: "complete",
      label: "Complete Ride",
      icon: Flag,
      description: "Tandai selesai (driver)",
      color: "text-primary",
    },
    {
      key: "confirm",
      label: "Confirm Arrival",
      icon: CheckCircle,
      description: "Konfirmasi sampai (penumpang)",
      color: "text-accent",
    },
    {
      key: "cancel",
      label: "Cancel Ride",
      icon: XCircle,
      description: "Batalkan ride",
      color: "text-destructive",
    },
  ];

  return (
    <Card className="gradient-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Kelola Perjalanan</CardTitle>
            <CardDescription>
              Accept, Start, Complete, Cancel, atau Fund ride
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rideIndex">Ride Index</Label>
          <Input
            id="rideIndex"
            type="number"
            placeholder="Masukkan ride index"
            value={rideIndex}
            onChange={(e) => setRideIndex(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action) => (
            <Button
              key={action.key}
              variant="glass"
              className="flex-col h-auto py-4 gap-2"
              onClick={() => handleAction(action.key)}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <Wallet className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-medium">Fund Ride</h4>
              <p className="text-sm text-muted-foreground">
                Kirim dana ke smart contract
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Ride Id"
              value={fundRideIndex}
              onChange={(e) => handleOnIndexChange(e.target.value)}
              className="flex-1"
            />
            <Button variant="hero" onClick={handleFund}>
              <Wallet className="w-4 h-4" />
              Fund
            </Button>
          </div>

          <div className="p-4 mt-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Estimasi Total
              </span>
              <span className="text-lg font-bold gradient-text font-mono">
                {estimatedCost} ETH
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideManagement;
