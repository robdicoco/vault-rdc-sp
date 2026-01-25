import { create } from "zustand";

export type Asset = "XLM" | "USDC";
export type Network = "testnet" | "mainnet";

export interface PendingWithdrawal {
  id: string;
  asset: Asset;
  amount: number;
  requestedAt: Date;
  unlocksAt: Date;
  status: "pending" | "ready";
}

export interface PortfolioEntry {
  asset: Asset;
  initialDeposit: number;
  currentValue: number;
  depositDate: Date;
}

interface VaultState {
  // Wallet
  walletAddress: string | null;
  isConnected: boolean;
  network: Network;

  // Balances
  balances: {
    XLM: number;
    USDC: number;
    vXLM: number; // Vault shares
    vUSDC: number;
  };

  // Vault metrics
  tvl: number;
  netApy: number;
  performanceFee: number;

  // Selected asset for UI
  selectedAsset: Asset;

  // Pending withdrawals (7-day lock)
  pendingWithdrawals: PendingWithdrawal[];

  // Portfolio history
  portfolio: PortfolioEntry[];

  // Admin
  isAdmin: boolean;
  showAdminPanel: boolean;

  // Actions
  setNetwork: (network: Network) => void;
  setSelectedAsset: (asset: Asset) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
  toggleAdminPanel: () => void;
  requestWithdrawal: (amount: number, asset: Asset) => void;
  claimWithdrawal: (id: string) => void;
}

// TODO: Replace with actual @creit-tech/stellar-wallets-kit integration
// import { StellarWalletsKit, WalletNetwork, WalletType } from '@creit-tech/stellar-wallets-kit';

export const useStore = create<VaultState>((set, get) => ({
  // Initial state - wallet not connected
  walletAddress: null,
  isConnected: false,
  network: "testnet",

  // Mock balances
  balances: {
    XLM: 0,
    USDC: 0,
    vXLM: 0,
    vUSDC: 0,
  },

  // Mock vault metrics
  tvl: 2847392.45,
  netApy: 5.2, // After 1% performance fee
  performanceFee: 1.0,

  selectedAsset: "XLM",

  // Mock pending withdrawals
  pendingWithdrawals: [],

  // Mock portfolio
  portfolio: [],

  isAdmin: false,
  showAdminPanel: false,

  setNetwork: (network) => set({ network }),

  setSelectedAsset: (asset) => set({ selectedAsset: asset }),

  connectWallet: () => {
    // TODO: Implement actual wallet connection using @creit-tech/stellar-wallets-kit
    // const kit = new StellarWalletsKit({
    //   network: get().network === 'mainnet' ? WalletNetwork.PUBLIC : WalletNetwork.TESTNET,
    //   selectedWalletId: WalletType.FREIGHTER,
    // });
    // await kit.openModal({ ... });

    // Mock connection for now
    const mockAddress = "GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI";
    set({
      walletAddress: mockAddress,
      isConnected: true,
      balances: {
        XLM: 12500.75,
        USDC: 8420.32,
        vXLM: 11875.71, // Shares received
        vUSDC: 8336.12,
      },
      portfolio: [
        {
          asset: "XLM",
          initialDeposit: 10000,
          currentValue: 12500.75,
          depositDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
        },
        {
          asset: "USDC",
          initialDeposit: 8000,
          currentValue: 8420.32,
          depositDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        },
      ],
      pendingWithdrawals: [
        {
          id: "wd-001",
          asset: "XLM",
          amount: 500,
          requestedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
          unlocksAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          status: "pending",
        },
        {
          id: "wd-002",
          asset: "USDC",
          amount: 1000,
          requestedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
          unlocksAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (ready)
          status: "ready",
        },
      ],
      isAdmin: true, // For demo purposes
    });
  },

  disconnectWallet: () => {
    set({
      walletAddress: null,
      isConnected: false,
      balances: { XLM: 0, USDC: 0, vXLM: 0, vUSDC: 0 },
      portfolio: [],
      pendingWithdrawals: [],
      isAdmin: false,
      showAdminPanel: false,
    });
  },

  toggleAdminPanel: () => set((state) => ({ showAdminPanel: !state.showAdminPanel })),

  requestWithdrawal: (amount, asset) => {
    // TODO: Call Soroban contract for withdrawal request
    // const contract = new Contract(VAULT_CONTRACT_ID);
    // await contract.call('request_withdrawal', amount, asset);

    const now = new Date();
    const unlocksAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days lock

    const newWithdrawal: PendingWithdrawal = {
      id: `wd-${Date.now()}`,
      asset,
      amount,
      requestedAt: now,
      unlocksAt,
      status: "pending",
    };

    set((state) => ({
      pendingWithdrawals: [...state.pendingWithdrawals, newWithdrawal],
    }));
  },

  claimWithdrawal: (id) => {
    // TODO: Call Soroban contract for withdrawal claim
    // const contract = new Contract(VAULT_CONTRACT_ID);
    // await contract.call('claim_withdrawal', id);

    set((state) => ({
      pendingWithdrawals: state.pendingWithdrawals.filter((w) => w.id !== id),
    }));
  },
}));
