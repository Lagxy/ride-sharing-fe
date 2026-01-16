import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    nama: "",
    platNomor: "",
    kendaraan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate calling registerDriver smart contract function
    console.log("registerDriver called with:", formData);
    toast.success("Registrasi driver berhasil!", {
      description: `Driver ${formData.nama} dengan plat ${formData.platNomor} terdaftar.`,
    });
    setFormData({ nama: "", platNomor: "", kendaraan: "" });
  };

  return (
    <Card className="gradient-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserPlus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Register Driver</CardTitle>
            <CardDescription>Daftarkan diri Anda sebagai driver</CardDescription>
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
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platNomor">Plat Nomor</Label>
            <Input
              id="platNomor"
              placeholder="Contoh: B 1234 ABC"
              value={formData.platNomor}
              onChange={(e) => setFormData({ ...formData, platNomor: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kendaraan">Jenis Kendaraan</Label>
            <Input
              id="kendaraan"
              placeholder="Contoh: Honda Vario 125"
              value={formData.kendaraan}
              onChange={(e) => setFormData({ ...formData, kendaraan: e.target.value })}
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
  );
};

export default DriverRegistration;
