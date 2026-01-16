import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

const RequestRide = () => {
  const [formData, setFormData] = useState({
    lokasiAwal: "",
    lokasiTujuan: "",
    tarifPerKm: "",
    jarakKm: "",
    catatan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate calling requestRide smart contract function
    console.log("requestRide called with:", formData);
    toast.success("Request ride berhasil!", {
      description: `Perjalanan dari ${formData.lokasiAwal} ke ${formData.lokasiTujuan} telah dibuat.`,
    });
    setFormData({ lokasiAwal: "", lokasiTujuan: "", tarifPerKm: "", jarakKm: "", catatan: "" });
  };

  const estimatedCost = formData.tarifPerKm && formData.jarakKm 
    ? (parseFloat(formData.tarifPerKm) * parseFloat(formData.jarakKm)).toFixed(4)
    : "0";

  return (
    <Card className="gradient-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle>Request Ride</CardTitle>
            <CardDescription>Pesan perjalanan Anda</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lokasiAwal">Lokasi Awal</Label>
              <Input
                id="lokasiAwal"
                placeholder="Alamat jemput"
                value={formData.lokasiAwal}
                onChange={(e) => setFormData({ ...formData, lokasiAwal: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasiTujuan">Lokasi Tujuan</Label>
              <Input
                id="lokasiTujuan"
                placeholder="Alamat tujuan"
                value={formData.lokasiTujuan}
                onChange={(e) => setFormData({ ...formData, lokasiTujuan: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tarifPerKm">Tarif per KM (ETH)</Label>
              <Input
                id="tarifPerKm"
                type="number"
                step="0.0001"
                placeholder="0.001"
                value={formData.tarifPerKm}
                onChange={(e) => setFormData({ ...formData, tarifPerKm: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jarakKm">Jarak (KM)</Label>
              <Input
                id="jarakKm"
                type="number"
                placeholder="10"
                value={formData.jarakKm}
                onChange={(e) => setFormData({ ...formData, jarakKm: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan (Opsional)</Label>
            <Textarea
              id="catatan"
              placeholder="Catatan tambahan untuk driver..."
              value={formData.catatan}
              onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
              className="bg-input border-border focus:border-primary"
            />
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estimasi Total</span>
              <span className="text-lg font-bold gradient-text font-mono">{estimatedCost} ETH</span>
            </div>
          </div>

          <Button type="submit" variant="hero" className="w-full">
            <MapPin className="w-4 h-4" />
            Request Ride
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestRide;
