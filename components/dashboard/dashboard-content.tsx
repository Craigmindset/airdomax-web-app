"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityGraph } from "./activity-graph"
import { ActivityTable } from "./activity-table"

// Dummy data for demonstration
const activityData = [
  { date: "2023-06-01", activities: 5 },
  { date: "2023-06-02", activities: 8 },
  { date: "2023-06-03", activities: 12 },
  { date: "2023-06-04", activities: 7 },
  { date: "2023-06-05", activities: 15 },
  { date: "2023-06-06", activities: 10 },
  { date: "2023-06-07", activities: 13 },
]

const allActivities = [
  { id: 1, user: "John Doe", action: "Product Upload", date: "2023-06-07" },
  { id: 2, user: "Jane Smith", action: "Service Request", date: "2023-06-06" },
  { id: 3, user: "Bob Johnson", action: "Message Sent", date: "2023-06-05" },
  { id: 4, user: "Alice Brown", action: "Profile Update", date: "2023-06-04" },
  { id: 5, user: "Charlie Wilson", action: "Payment Made", date: "2023-06-03" },
]

export default function DashboardContent() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">All Activities</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <Card className="bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">1,234</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">567</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg">Total Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">89</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">42</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-lg">Completed Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">128</p>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Activity Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityGraph data={activityData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All User Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityTable activities={allActivities} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

