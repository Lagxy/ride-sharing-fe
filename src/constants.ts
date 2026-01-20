interface ContractsConfig {
  [chainId: number]: {
    rideSharing: string;
    // Other contract addresses if needed
  };
}

// Map chain IDs to deployed rideSharing contract addresses
export const chainsToContract: ContractsConfig = {
  11155111: {
    // Ethereum Sepolia Testnet
    rideSharing: "0x6cC49B2a44482486849DE370ae62Edfd794873B5",
  },
};

// ABI for the rideSharing contract
export const rideSharingAbi = [
  {
    inputs: [
      { internalType: "address", name: "penumpangAddress", type: "address" },
    ],
    name: "RideSharing_BukanPenumpang",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "driverAddress", type: "address" },
    ],
    name: "RideSharing_DriverSudahTerdaftar",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "driverAddress", type: "address" },
    ],
    name: "RideSharing_DriverTidakTerdaftar",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "driverAddress", type: "address" },
    ],
    name: "RideSharing_DriverTidakTersedia",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "jumlahDibayarkan", type: "uint256" },
      { internalType: "uint256", name: "jumlahDibutuhkan", type: "uint256" },
    ],
    name: "RideSharing_JumlahPembayaranTidakCukup",
    type: "error",
  },
  { inputs: [], name: "RideSharing_LokasiTidakValid", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "rideIndex", type: "uint256" }],
    name: "RideSharing_PerjalananSudahSelesai",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "rideIndex", type: "uint256" }],
    name: "RideSharing_PerjalananTidakDapatDiterima",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "rideIndex", type: "uint256" }],
    name: "RideSharing_TidakDapatMembatalkanPerjalanan",
    type: "error",
  },
  { inputs: [], name: "RideSharing_TransferGagal", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "driverAddress",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "nama", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "platNomor",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "kendaraan",
        type: "string",
      },
    ],
    name: "DriverTerdaftar",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rideIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jumlahDibayarkan",
        type: "uint256",
      },
    ],
    name: "PerjalananDidanai",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "penumpang",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "lokasiAwal",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "lokasiTujuan",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "jarakKm",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tarifPerKm",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "catatan",
        type: "string",
      },
    ],
    name: "PermintaanPerjalananDibuat",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rideIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum RideSharingLog.StatusPerjalanan",
        name: "statusBaru",
        type: "uint8",
      },
    ],
    name: "StatusPerjalananDiperbaharui",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rideIndex", type: "uint256" }],
    name: "acceptRide",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rideIndex", type: "uint256" }],
    name: "cancelRide",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rideIndex", type: "uint256" }],
    name: "completeRide",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rideIndex", type: "uint256" }],
    name: "confirmArrival",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "drivers",
    outputs: [
      { internalType: "string", name: "nama", type: "string" },
      { internalType: "string", name: "platNomor", type: "string" },
      { internalType: "string", name: "kendaraan", type: "string" },
      { internalType: "bool", name: "terdaftar", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rideIndex", type: "uint256" }],
    name: "fundRide",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rideIndex", type: "uint256" }],
    name: "getDetailPerjalanan",
    outputs: [
      {
        components: [
          { internalType: "string", name: "lokasiAwal", type: "string" },
          { internalType: "string", name: "lokasiTujuan", type: "string" },
          { internalType: "uint256", name: "jarakKm", type: "uint256" },
          { internalType: "uint256", name: "tarifPerKm", type: "uint256" },
          { internalType: "string", name: "catatan", type: "string" },
          { internalType: "uint256", name: "danaDibayarkan", type: "uint256" },
          { internalType: "address", name: "penumpang", type: "address" },
          { internalType: "address", name: "driver", type: "address" },
          {
            internalType: "enum RideSharingLog.StatusPerjalanan",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct RideSharingLog.Perjalanan",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_driverAddress", type: "address" },
    ],
    name: "getDriver",
    outputs: [
      {
        components: [
          { internalType: "string", name: "nama", type: "string" },
          { internalType: "string", name: "platNomor", type: "string" },
          { internalType: "string", name: "kendaraan", type: "string" },
          { internalType: "bool", name: "terdaftar", type: "bool" },
        ],
        internalType: "struct RideSharingLog.Driver",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "perjalanan",
    outputs: [
      { internalType: "string", name: "lokasiAwal", type: "string" },
      { internalType: "string", name: "lokasiTujuan", type: "string" },
      { internalType: "uint256", name: "jarakKm", type: "uint256" },
      { internalType: "uint256", name: "tarifPerKm", type: "uint256" },
      { internalType: "string", name: "catatan", type: "string" },
      { internalType: "uint256", name: "danaDibayarkan", type: "uint256" },
      { internalType: "address", name: "penumpang", type: "address" },
      { internalType: "address", name: "driver", type: "address" },
      {
        internalType: "enum RideSharingLog.StatusPerjalanan",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_nama", type: "string" },
      { internalType: "string", name: "_platNomor", type: "string" },
      { internalType: "string", name: "_kendaraan", type: "string" },
    ],
    name: "registerDriver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_driverAddress", type: "address" },
    ],
    name: "removeDriver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_lokasiAwal", type: "string" },
      { internalType: "string", name: "_lokasiTujuan", type: "string" },
      { internalType: "uint256", name: "_tarifPerKm", type: "uint256" },
      { internalType: "uint256", name: "_jarakKm", type: "uint256" },
      { internalType: "string", name: "_catatan", type: "string" },
    ],
    name: "requestRide",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rideIndex", type: "uint256" }],
    name: "startRide",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
