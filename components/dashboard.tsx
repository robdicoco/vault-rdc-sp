"use client";

import React from "react"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Wallet,
  ChevronDown,
  TrendingUp,
  Lock,
  Clock,
  Check,
  AlertTriangle,
  Settings,
  Pause,
  Gift,
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore, type Asset } from "@/lib/store";
import { cn } from "@/lib/utils";

// Header Component
function Header() {
  const { network, setNetwork, isConnected, walletAddress, connectWallet, disconnectWallet } = useStore();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">Rob Vault</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Network Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border text-foreground">
                <span
                  className={cn("w-2 h-2 rounded-full", network === "mainnet" ? "bg-[#22c55e]" : "bg-[#f59e0b]")}
                />
                {network === "mainnet" ? "Mainnet" : "Testnet"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem
                onClick={() => setNetwork("testnet")}
                className="text-foreground hover:bg-secondary cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] mr-2" />
                Testnet
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setNetwork("mainnet")}
                className="text-foreground hover:bg-secondary cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e] mr-2" />
                Mainnet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Connect Wallet Button */}
          {isConnected && walletAddress ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 border-[#6366f1]/50 text-foreground"
                >
                  <Wallet className="w-4 h-4" />
                  {truncateAddress(walletAddress)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem
                  onClick={disconnectWallet}
                  className="text-destructive hover:bg-secondary cursor-pointer"
                >
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={connectWallet}
              className="gap-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c4fed] text-primary-foreground"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

// Stats Card Component
function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-mono font-semibold text-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconColor)}>
            <Icon className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Asset Selector Component
function AssetSelector({
  value,
  onChange,
  className,
}: {
  value: Asset;
  onChange: (asset: Asset) => void;
  className?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("gap-2 bg-secondary border-border text-foreground", className)}>
          <span className={cn("w-3 h-3 rounded-full", value === "XLM" ? "bg-[#6366f1]" : "bg-[#22c55e]")} />
          {value}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border">
        <DropdownMenuItem onClick={() => onChange("XLM")} className="text-foreground hover:bg-secondary cursor-pointer">
          <span className="w-3 h-3 rounded-full bg-[#6366f1] mr-2" />
          XLM
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("USDC")}
          className="text-foreground hover:bg-secondary cursor-pointer"
        >
          <span className="w-3 h-3 rounded-full bg-[#22c55e] mr-2" />
          USDC
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Deposit Tab Component
function DepositTab() {
  const { selectedAsset, setSelectedAsset, balances } = useStore();
  const [amount, setAmount] = useState("");

  const shareRatio = 0.95; // Mock: 1 XLM = 0.95 vXLM shares
  const estimatedShares = amount ? (Number.parseFloat(amount) * shareRatio).toFixed(4) : "0";
  const walletBalance = selectedAsset === "XLM" ? balances.XLM : balances.USDC;

  return (
    <div className="space-y-6">
      {/* Amount Input */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Amount to Deposit</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary border-border text-foreground pr-16 font-mono text-lg h-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary hover:text-[#818cf8]"
              onClick={() => setAmount(walletBalance.toString())}
            >
              MAX
            </Button>
          </div>
          <AssetSelector value={selectedAsset} onChange={setSelectedAsset} />
        </div>
        <p className="text-xs text-muted-foreground">
          Wallet Balance: <span className="font-mono text-foreground">{walletBalance.toLocaleString()}</span>{" "}
          {selectedAsset}
        </p>
      </div>

      {/* Summary */}
      <Card className="bg-secondary/50 border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            Deposit Summary
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">You are depositing</span>
              <span className="font-mono text-foreground">
                {amount || "0"} {selectedAsset}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">You will receive</span>
              <span className="font-mono text-foreground">
                {estimatedShares} v{selectedAsset}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Performance Fee</span>
              <span className="font-mono text-foreground">1%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button
        className={cn(
          "w-full h-12 text-base font-medium text-primary-foreground",
          selectedAsset === "XLM"
            ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c4fed]"
            : "bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#1eb854] hover:to-[#15803d]"
        )}
        disabled={!amount || Number.parseFloat(amount) <= 0}
      >
        <ArrowDownToLine className="w-5 h-5 mr-2" />
        Deposit to Vault
      </Button>
    </div>
  );
}

// Withdraw Tab Component
function WithdrawTab() {
  const { selectedAsset, setSelectedAsset, balances, pendingWithdrawals, requestWithdrawal, claimWithdrawal } =
    useStore();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [subTab, setSubTab] = useState<"request" | "claim">("request");

  const shareBalance = selectedAsset === "XLM" ? balances.vXLM : balances.vUSDC;
  const filteredWithdrawals = pendingWithdrawals.filter((w) => w.asset === selectedAsset);

  const getTimeRemaining = (unlocksAt: Date) => {
    const now = new Date();
    const diff = unlocksAt.getTime() - now.getTime();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  const handleRequestWithdrawal = () => {
    if (withdrawAmount && Number.parseFloat(withdrawAmount) > 0) {
      requestWithdrawal(Number.parseFloat(withdrawAmount), selectedAsset);
      setWithdrawAmount("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-2 p-1 bg-secondary rounded-lg">
        <Button
          variant={subTab === "request" ? "default" : "ghost"}
          size="sm"
          className={cn(
            "flex-1",
            subTab === "request"
              ? "bg-card text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-transparent"
          )}
          onClick={() => setSubTab("request")}
        >
          <Clock className="w-4 h-4 mr-2" />
          Request
        </Button>
        <Button
          variant={subTab === "claim" ? "default" : "ghost"}
          size="sm"
          className={cn(
            "flex-1",
            subTab === "claim"
              ? "bg-card text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-transparent"
          )}
          onClick={() => setSubTab("claim")}
        >
          <Check className="w-4 h-4 mr-2" />
          Claim
          {filteredWithdrawals.filter((w) => w.status === "ready").length > 0 && (
            <span className="ml-2 w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {subTab === "request" ? (
          <motion.div
            key="request"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Warning Banner */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30">
              <Lock className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-[#f59e0b]">7-Day Lock Period</p>
                <p className="text-muted-foreground">
                  Withdrawal requests require a 7-day waiting period before funds can be claimed.
                </p>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Amount to Unlock</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="bg-secondary border-border text-foreground pr-16 font-mono text-lg h-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary hover:text-[#818cf8]"
                    onClick={() => setWithdrawAmount(shareBalance.toString())}
                  >
                    MAX
                  </Button>
                </div>
                <AssetSelector value={selectedAsset} onChange={setSelectedAsset} />
              </div>
              <p className="text-xs text-muted-foreground">
                Vault Shares: <span className="font-mono text-foreground">{shareBalance.toLocaleString()}</span> v
                {selectedAsset}
              </p>
            </div>

            <Button
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-[#f59e0b] to-[#ea580c] hover:from-[#e89009] hover:to-[#d44d0a] text-primary-foreground"
              disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0}
              onClick={handleRequestWithdrawal}
            >
              <ArrowUpFromLine className="w-5 h-5 mr-2" />
              Request Withdrawal
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="claim"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {filteredWithdrawals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pending withdrawals for {selectedAsset}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredWithdrawals.map((withdrawal) => {
                  const timeRemaining = getTimeRemaining(withdrawal.unlocksAt);
                  const isReady = withdrawal.status === "ready" || !timeRemaining;

                  return (
                    <Card
                      key={withdrawal.id}
                      className={cn(
                        "bg-secondary/50 border",
                        isReady ? "border-[#22c55e]/50" : "border-[#f59e0b]/30"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full",
                                withdrawal.asset === "XLM" ? "bg-[#6366f1]" : "bg-[#22c55e]"
                              )}
                            />
                            <span className="font-mono font-medium text-foreground">
                              {withdrawal.amount.toLocaleString()} {withdrawal.asset}
                            </span>
                          </div>
                          {isReady ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-[#22c55e]/20 text-[#22c55e] font-medium">
                              Ready to Claim
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-[#f59e0b]/20 text-[#f59e0b] font-medium flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Unlocks in {timeRemaining}
                            </span>
                          )}
                        </div>

                        {!isReady && (
                          <Progress
                            value={
                              ((Date.now() - withdrawal.requestedAt.getTime()) /
                                (withdrawal.unlocksAt.getTime() - withdrawal.requestedAt.getTime())) *
                              100
                            }
                            className="h-1.5 bg-secondary"
                          />
                        )}

                        {isReady && (
                          <Button
                            className="w-full mt-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#1eb854] hover:to-[#15803d] text-primary-foreground"
                            onClick={() => claimWithdrawal(withdrawal.id)}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Claim Funds
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Admin Panel Component
function AdminPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-destructive">Admin Actions</p>
          <p className="text-muted-foreground">These actions are restricted to contract administrators only.</p>
        </div>
      </div>

      <div className="grid gap-3">
        <Button variant="outline" className="justify-start gap-3 h-12 bg-secondary border-border text-foreground">
          <Pause className="w-5 h-5 text-[#f59e0b]" />
          Pause Contract
        </Button>
        <Button variant="outline" className="justify-start gap-3 h-12 bg-secondary border-border text-foreground">
          <Gift className="w-5 h-5 text-[#22c55e]" />
          Collect Rewards
        </Button>
        <Button variant="outline" className="justify-start gap-3 h-12 bg-secondary border-border text-foreground">
          <RefreshCw className="w-5 h-5 text-[#6366f1]" />
          Rebalance Pool
        </Button>
      </div>
    </div>
  );
}

// Portfolio Table Component
function PortfolioTable() {
  const { portfolio } = useStore();

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Your Portfolio</CardTitle>
        <CardDescription className="text-muted-foreground">Track your vault positions and performance</CardDescription>
      </CardHeader>
      <CardContent>
        {portfolio.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Connect your wallet to view portfolio</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Asset</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Initial Deposit</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Current Value</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Net Gain</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((entry) => {
                  const gain = entry.currentValue - entry.initialDeposit;
                  const gainPercent = (gain / entry.initialDeposit) * 100;

                  return (
                    <tr key={entry.asset} className="border-b border-border/50">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "w-3 h-3 rounded-full",
                              entry.asset === "XLM" ? "bg-[#6366f1]" : "bg-[#22c55e]"
                            )}
                          />
                          <span className="font-medium text-foreground">{entry.asset}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right font-mono text-foreground">
                        {entry.initialDeposit.toLocaleString()}
                      </td>
                      <td className="py-4 px-2 text-right font-mono text-foreground">
                        {entry.currentValue.toLocaleString()}
                      </td>
                      <td className="py-4 px-2 text-right">
                        <span className={cn("font-mono", gain >= 0 ? "text-[#22c55e]" : "text-destructive")}>
                          {gain >= 0 ? "+" : ""}
                          {gain.toFixed(2)} ({gainPercent.toFixed(1)}%)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Performance Chart Placeholder
function PerformanceChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Performance Over Time</CardTitle>
        <CardDescription className="text-muted-foreground">Vault growth visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center bg-secondary/30 rounded-lg border border-border border-dashed">
          <div className="text-center text-muted-foreground">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Area Chart Placeholder</p>
            <p className="text-xs mt-1">Integrate with Recharts for live data</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Connect Overlay Component
function ConnectOverlay() {
  const { connectWallet } = useStore();

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
          <Wallet className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">Connect to View</h3>
        <p className="text-muted-foreground mb-6 max-w-xs">
          Connect your Stellar wallet to access the vault dashboard and manage your positions.
        </p>
        <Button
          onClick={connectWallet}
          className="gap-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c4fed] text-primary-foreground"
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const { isConnected, tvl, netApy, balances, selectedAsset, isAdmin, showAdminPanel, toggleAdminPanel } = useStore();

  const currentBalance = selectedAsset === "XLM" ? balances.XLM : balances.USDC;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Value Locked"
            value={`$${tvl.toLocaleString()}`}
            subtitle="Across all assets"
            icon={Shield}
            iconColor="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]"
          />
          <StatsCard
            title="Net APY"
            value={`${netApy}%`}
            subtitle="After 1% performance fee"
            icon={TrendingUp}
            iconColor="bg-gradient-to-br from-[#22c55e] to-[#16a34a]"
          />
          <div className="relative">
            <StatsCard
              title={`Your ${selectedAsset} Balance`}
              value={isConnected ? currentBalance.toLocaleString() : "---"}
              subtitle={isConnected ? `v${selectedAsset} vault shares` : "Connect wallet to view"}
              icon={Wallet}
              iconColor={selectedAsset === "XLM" ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]" : "bg-[#22c55e]"}
            />
            {/* Asset Toggle */}
            <div className="absolute top-4 right-4">
              <AssetSelector value={selectedAsset} onChange={useStore.getState().setSelectedAsset} />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interaction Module */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border relative overflow-hidden">
              {!isConnected && <ConnectOverlay />}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Vault Actions</CardTitle>
                  {isAdmin && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <Settings className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Admin Panel</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            Contract administration actions
                          </DialogDescription>
                        </DialogHeader>
                        <AdminPanel />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="deposit" className="w-full">
                  <TabsList className="w-full bg-secondary mb-4">
                    <TabsTrigger
                      value="deposit"
                      className="flex-1 data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground"
                    >
                      <ArrowDownToLine className="w-4 h-4 mr-2" />
                      Deposit
                    </TabsTrigger>
                    <TabsTrigger
                      value="withdraw"
                      className="flex-1 data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground"
                    >
                      <ArrowUpFromLine className="w-4 h-4 mr-2" />
                      Withdraw
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="deposit">
                    <DepositTab />
                  </TabsContent>
                  <TabsContent value="withdraw">
                    <WithdrawTab />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Section */}
          <div className="lg:col-span-2 space-y-6">
            <PortfolioTable />
            <PerformanceChart />
          </div>
        </div>
      </main>
    </div>
  );
}
