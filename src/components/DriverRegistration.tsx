import { useState } from "react";
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
import { UserPlus, UserMinus } from "lucide-react";
import { toast } from "sonner";

import { chainsToContract, rideSharingAbi } from "@/constants";
import { useChainId, useConfig, useConnection } from "wagmi";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { sepolia } from "wagmi/chains";

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    nama: "",
    platNomor: "",
    kendaraan: "",
  });

  const [removeAddress, setRemoveAddress] = useState("");

  const account = useConnection();
  const chainId = useChainId();
  const config = useConfig();
  const rideSharing = chainsToContract[chainId]["rideSharing"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (account.isDisconnected) {
      toast.error("Wallet belum terhubung", {
        description: "Silakan hubungkan wallet Anda terlebih dahulu.",
      });
      return;
    }

    const response = await writeContract(config, {
      abi: rideSharingAbi,
      address: rideSharing as `0x${string}`,
      functionName: "registerDriver",
      args: [formData.nama, formData.platNomor, formData.kendaraan],
      chain: sepolia,
      account: account.address,
    });

    const toastId = toast.loading("Memproses registrasi driver...");
    const receipt = await waitForTransactionReceipt(config, { hash: response });
    toast.dismiss(toastId);

    if (receipt.status) {
      toast.success("Registrasi driver berhasil!", {
        description: `Driver ${formData.nama} dengan plat ${formData.platNomor} terdaftar.`,
      });
    } else {
      toast.error("Registrasi driver gagal!", {
        description: "Terjadi kesalahan saat memproses transaksi.",
      });
    }

    setFormData({ nama: "", platNomor: "", kendaraan: "" });
  };

  const handleRemoveDriver = async (e: React.FormEvent) => {
    e.preventDefault();

    if (account.isDisconnected) {
      toast.error("Wallet belum terhubung", {
        description: "Silakan hubungkan wallet Anda terlebih dahulu.",
      });
      return;
    }

    if (!removeAddress.startsWith("0x") || removeAddress.length !== 42) {
      toast.error("Address tidak valid", {
        description: "Masukkan address Ethereum yang valid (0x...)",
      });
      return;
    }

    const response = await writeContract(config, {
      abi: rideSharingAbi,
      address: rideSharing as `0x${string}`,
      functionName: "removeDriver",
      args: [removeAddress as `0x${string}`],
      chain: sepolia,
      account: account.address,
    });

    const toastId = toast.loading("Memproses penghapusan driver...");
    const receipt = await waitForTransactionReceipt(config, { hash: response });
    toast.dismiss(toastId);

    if (receipt.status) {
      toast.success("Driver berhasil dihapus!", {
        description: `Driver dengan address ${removeAddress.slice(
          0,
          6
        )}...${removeAddress.slice(-4)} telah dihapus.`,
      });
    } else {
      toast.error("Penghapusan driver gagal!", {
        description: "Terjadi kesalahan saat memproses transaksi.",
      });
    }

    setRemoveAddress("");
  };

  return (
    <div className="space-y-6">
      <Card className="gradient-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Register Driver</CardTitle>
              <CardDescription>
                Daftarkan diri Anda sebagai driver
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input
                id="nama"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platNomor">Plat Nomor</Label>
              <Input
                id="platNomor"
                placeholder="Contoh: B 1234 ABC"
                value={formData.platNomor}
                onChange={(e) =>
                  setFormData({ ...formData, platNomor: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kendaraan">Jenis Kendaraan</Label>
              <Input
                id="kendaraan"
                placeholder="Contoh: Honda Vario 125"
                value={formData.kendaraan}
                onChange={(e) =>
                  setFormData({ ...formData, kendaraan: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" variant="hero" className="w-full">
              <UserPlus className="w-4 h-4" />
              Daftar Sebagai Driver
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="gradient-border border-destructive/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <UserMinus className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <CardTitle>Remove Driver</CardTitle>
              <CardDescription>
                Hapus driver dari sistem berdasarkan address
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRemoveDriver} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="removeAddress">Address Driver</Label>
              <Input
                id="removeAddress"
                placeholder="0x..."
                value={removeAddress}
                onChange={(e) => setRemoveAddress(e.target.value)}
                required
                className="font-mono"
              />
            </div>
            <Button type="submit" variant="destructive" className="w-full">
              <UserMinus className="w-4 h-4" />
              Hapus Driver
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverRegistration;
