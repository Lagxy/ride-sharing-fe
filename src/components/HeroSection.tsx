import { Car, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Decentralized</span>
          <br />
          Ride Sharing
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Platform ride-sharing terdesentralisasi yang transparan dan aman.
          Semua transaksi tercatat di blockchain.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
            <Car className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">No Middleman</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
            <Shield className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Transparent</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Fast & Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
