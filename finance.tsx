"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Wallet, ArrowDownUp, Landmark } from "lucide-react"

export default function FinanceManager() {
  const [activeTab, setActiveTab] = useState("sip")

  const [sipResult, setSipResult] = useState<number | null>(null)
  const [swpResult, setSwpResult] = useState<number | null>(null)
  const [loanResult, setLoanResult] = useState<number | null>(null)
  const [fdResult, setFdResult] = useState<number | null>(null)

  const calculateSIP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const principal = Number(formData.get("principal"))
    const rate = Number(formData.get("rate"))
    const time = Number(formData.get("time"))
    const monthlyRate = rate / 12 / 100
    const months = time * 12
    const result =
      principal * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
    setSipResult(Math.round(result))
  }

  const calculateSWP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const principal = Number(formData.get("principal"))
    const rate = Number(formData.get("rate"))
    const time = Number(formData.get("time"))
    const withdrawal = Number(formData.get("withdrawal"))
    const monthlyRate = rate / 12 / 100
    const months = time * 12
    let balance = principal
    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) - withdrawal
    }
    setSwpResult(Math.round(balance))
  }

  const calculateLoan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const principal = Number(formData.get("principal"))
    const rate = Number(formData.get("rate"))
    const time = Number(formData.get("time"))
    const monthlyRate = rate / 12 / 100
    const months = time * 12
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    setLoanResult(Math.round(emi))
  }

  const calculateFD = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const principal = Number(formData.get("principal"))
    const rate = Number(formData.get("rate"))
    const time = Number(formData.get("time"))
    const result = principal * Math.pow(1 + rate / 100, time)
    setFdResult(Math.round(result))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Finance Manager
        </h1>
        <div className="grid md:grid-cols-[200px_1fr] gap-8">
          <aside>
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "sip" ? "bg-gray-800 text-blue-400" : ""
                }`}
                onClick={() => setActiveTab("sip")}
              >
                <Calculator className="mr-2 h-4 w-4" /> SIP Calculator
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "swp" ? "bg-gray-800 text-blue-400" : ""
                }`}
                onClick={() => setActiveTab("swp")}
              >
                <ArrowDownUp className="mr-2 h-4 w-4" /> SWP Calculator
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "loan" ? "bg-gray-800 text-blue-400" : ""
                }`}
                onClick={() => setActiveTab("loan")}
              >
                <Wallet className="mr-2 h-4 w-4" /> Loan Calculator
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "fd" ? "bg-gray-800 text-blue-400" : ""
                }`}
                onClick={() => setActiveTab("fd")}
              >
                <Landmark className="mr-2 h-4 w-4" /> FD Calculator
              </Button>
            </nav>
          </aside>
          <main>
            <Tabs value={activeTab} className="space-y-4">
              <TabsContent value="sip">
                <Card className="border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  <CardHeader>
                    <CardTitle>SIP Calculator</CardTitle>
                    <CardDescription>Calculate your Systematic Investment Plan returns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateSIP} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sip-principal">Monthly Investment (₹)</Label>
                          <Input
                            id="sip-principal"
                            name="principal"
                            type="number"
                            placeholder="5000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sip-rate">Expected Return Rate (%)</Label>
                          <Input id="sip-rate" name="rate" type="number" placeholder="12" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sip-time">Time Period (Years)</Label>
                          <Input id="sip-time" name="time" type="number" placeholder="10" required />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Calculate
                      </Button>
                    </form>
                    {sipResult !== null && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <p className="text-lg font-semibold">Total Value: ₹{sipResult.toLocaleString()}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="swp">
                <Card className="border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  <CardHeader>
                    <CardTitle>SWP Calculator</CardTitle>
                    <CardDescription>Calculate your Systematic Withdrawal Plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateSWP} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="swp-principal">Initial Investment (₹)</Label>
                          <Input
                            id="swp-principal"
                            name="principal"
                            type="number"
                            placeholder="1000000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="swp-rate">Expected Return Rate (%)</Label>
                          <Input id="swp-rate" name="rate" type="number" placeholder="8" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="swp-time">Time Period (Years)</Label>
                          <Input id="swp-time" name="time" type="number" placeholder="20" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="swp-withdrawal">Monthly Withdrawal (₹)</Label>
                          <Input
                            id="swp-withdrawal"
                            name="withdrawal"
                            type="number"
                            placeholder="5000"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Calculate
                      </Button>
                    </form>
                    {swpResult !== null && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <p className="text-lg font-semibold">
                          Remaining Balance: ₹{swpResult.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="loan">
                <Card className="border-2 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                  <CardHeader>
                    <CardTitle>Loan Calculator</CardTitle>
                    <CardDescription>Calculate your loan EMI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateLoan} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="loan-principal">Loan Amount (₹)</Label>
                          <Input
                            id="loan-principal"
                            name="principal"
                            type="number"
                            placeholder="1000000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loan-rate">Interest Rate (%)</Label>
                          <Input id="loan-rate" name="rate" type="number" placeholder="8.5" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loan-time">Loan Tenure (Years)</Label>
                          <Input id="loan-time" name="time" type="number" placeholder="20" required />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Calculate
                      </Button>
                    </form>
                    {loanResult !== null && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <p className="text-lg font-semibold">Monthly EMI: ₹{loanResult.toLocaleString()}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="fd">
                <Card className="border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                  <CardHeader>
                    <CardTitle>FD Calculator</CardTitle>
                    <CardDescription>Calculate your Fixed Deposit returns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateFD} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fd-principal">Principal Amount (₹)</Label>
                          <Input
                            id="fd-principal"
                            name="principal"
                            type="number"
                            placeholder="100000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fd-rate">Interest Rate (%)</Label>
                          <Input id="fd-rate" name="rate" type="number" placeholder="6.5" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fd-time">Time Period (Years)</Label>
                          <Input id="fd-time" name="time" type="number" placeholder="5" required />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Calculate
                      </Button>
                    </form>
                    {fdResult !== null && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <p className="text-lg font-semibold">Maturity Amount: ₹{fdResult.toLocaleString()}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
