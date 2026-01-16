import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Play, Wallet, Flag, Search } from "lucide-react";
import { toast } from "sonner";

const RideManagement = () => {
  const [rideIndex, setRideIndex] = useState("");
  const [fundAmount, setFundAmount] = useState("");

  const handleAction = (action: string) => {
    if (!rideIndex) {
      toast.error("Masukkan Ride Index terlebih dahulu");
      return;
    }

    const actionMessages: Record<string, string> = {
      accept: `acceptRide(${rideIndex}) - Ride diterima!`,
      start: `startRide(${rideIndex}) - Perjalanan dimulai!`,
      cancel: `cancelRide(${rideIndex}) - Ride dibatalkan.`,
      complete: `completeRide(${rideIndex}) - Perjalanan selesai!`,
      confirm: `confirmArrival(${rideIndex}) - Kedatangan dikonfirmasi, dana ditransfer!`,
    };

    console.log(actionMessages[action]);
    toast.success(actionMessages[action]);
  };

  const handleFund = () => {
    if (!rideIndex || !fundAmount) {
      toast.error("Masukkan Ride Index dan jumlah ETH");
      return;
    }
    console.log(`fundRide(${rideIndex}, ${fundAmount})`);
    toast.success(`Dana ${fundAmount} ETH berhasil dikirim ke kontrak!`);
    setFundAmount("");
  };

  const actions = [
    { key: "accept", label: "Accept Ride", icon: CheckCircle, description: "Driver menerima ride", color: "text-primary" },
    { key: "start", label: "Start Ride", icon: Play, description: "Mulai perjalanan", color: "text-accent" },
    { key: "complete", label: "Complete Ride", icon: Flag, description: "Tandai selesai (driver)", color: "text-primary" },
    { key: "confirm", label: "Confirm Arrival", icon: CheckCircle, description: "Konfirmasi sampai (penumpang)", color: "text-accent" },
    { key: "cancel", label: "Cancel Ride", icon: XCircle, description: "Batalkan ride", color: "text-destructive" },
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
            <CardDescription>Accept, Start, Complete, Cancel, atau Fund ride</CardDescription>
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
              onClick={() => handleAction(action.key)}
            >
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
              <p className="text-sm text-muted-foreground">Kirim dana ke smart contract</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Input
              type="number"
              step="0.0001"
              placeholder="Jumlah ETH"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              className="flex-1"
            />
            <Button variant="hero" onClick={handleFund}>
              <Wallet className="w-4 h-4" />
              Fund
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideManagement;
