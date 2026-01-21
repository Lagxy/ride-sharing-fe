import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains"; // Import your desired chains

// Retrieve the WalletConnect Project ID from environment variables
const walletConnectProjectId = ""; // your own wallet connect project id

// Basic error handling for missing Project ID
if (!walletConnectProjectId) {
  throw new Error(
    "Error: WALLETCONNECT_PROJECT_ID is not defined. Please set it"
  );
}

// Define the configuration object
const config = getDefaultConfig({
  appName: "RideSharing", // Your dApp's name, shown in wallet prompts
  projectId: walletConnectProjectId, // WalletConnect Cloud Project ID
  chains: [sepolia], // Array of chains your dApp supports
  ssr: false, // Set to false for static sites or if not heavily using SSR with wagmi
});

export default config; // Export for use in Providers
