"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import TransactionHistory from "./transaction-history"
import { useWallet } from "@/contexts/WalletContext"

export default function WalletContent() {
  const { balance, setBalance } = useWallet()
  const [amount, setAmount] = useState("")

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount)
    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number.",
        variant: "destructive",
      })
      return
    }
    setBalance(balance + depositAmount)
    setAmount("")
    toast({
      title: "Deposit successful",
      description: `$${depositAmount.toFixed(2)} has been added to your wallet.`,
    })
  }

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number.",
        variant: "destructive",
      })
      return
    }
    if (withdrawAmount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance to withdraw this amount.",
        variant: "destructive",
      })
      return
    }
    setBalance(balance - withdrawAmount)
    setAmount("")
    toast({
      title: "Withdrawal successful",
      description: `$${withdrawAmount.toFixed(2)} has been withdrawn from your wallet.`,
    })
  }

  return (
    <div className="space-y-6 text-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Deposit / Withdraw</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleDeposit} className="flex-1">Deposit</Button>
              <Button onClick={handleWithdraw} className="flex-1" variant="outline">Withdraw</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <TransactionHistory />
    </div>
  )
}

