import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, MapPin, Settings, Search, Car, Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import DriverRegistration from "@/components/DriverRegistration";
import RequestRide from "@/components/RequestRide";
import RideManagement from "@/components/RideManagement";
import InfoLookup from "@/components/InfoLookup";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("request");
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = () => {
    // Simulate wallet connection
    const mockAddress = "0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6);
    const fullAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setWalletAddress(fullAddress);
    setIsConnected(true);
    toast.success("Wallet terhubung!", {
      description: `Connected to ${fullAddress.slice(0, 6)}...${fullAddress.slice(-4)}`,
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    toast.info("Wallet terputus");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">RideChain</h1>
                <p className="text-xs text-muted-foreground">Web3 Ride Sharing</p>
              </div>
            </div>
            
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-mono text-muted-foreground">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleDisconnect}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="hero" onClick={handleConnect} className="gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1.5 bg-card border border-border rounded-xl">
            <TabsTrigger 
              value="request" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Request</span>
            </TabsTrigger>
            <TabsTrigger 
              value="driver" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Driver</span>
            </TabsTrigger>
            <TabsTrigger 
              value="manage" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Kelola</span>
            </TabsTrigger>
            <TabsTrigger 
              value="info" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Info</span>
            </TabsTrigger>
          </TabsList>

          <div className="max-w-2xl mx-auto">
            <TabsContent value="request" className="mt-0">
              <RequestRide />
            </TabsContent>

            <TabsContent value="driver" className="mt-0">
              <DriverRegistration />
            </TabsContent>

            <TabsContent value="manage" className="mt-0">
              <RideManagement />
            </TabsContent>

            <TabsContent value="info" className="mt-0">
              <InfoLookup />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Smart Contract · Transparent · Decentralized
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
