import { Car, ClipboardList, CheckCircle, Clock, IndianRupee, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";

// Mock data
const recentJobCards = [
  { id: "JC-20260128-001", vehicle: "MH-12-AB-1234", model: "Honda City", status: "in_progress" as const, customer: "Raj Kumar" },
  { id: "JC-20260128-002", vehicle: "MH-14-CD-5678", model: "Maruti Swift", status: "pending" as const, customer: "Priya Sharma" },
  { id: "JC-20260127-015", vehicle: "MH-01-EF-9012", model: "Hyundai i20", status: "completed" as const, customer: "Amit Patel" },
  { id: "JC-20260127-014", vehicle: "MH-03-GH-3456", model: "Toyota Innova", status: "completed" as const, customer: "Suresh Reddy" },
];

const revenueData = [
  { day: "Mon", amount: 12500 },
  { day: "Tue", amount: 18200 },
  { day: "Wed", amount: 15800 },
  { day: "Thu", amount: 22100 },
  { day: "Fri", amount: 19500 },
  { day: "Sat", amount: 28900 },
  { day: "Sun", amount: 8500 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const todayRevenue = 28900;
  const weekRevenue = revenueData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's what's happening today."
        >
          <Button
            onClick={() => navigate("/job-cards/new")}
            className="gradient-primary text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Job Card
          </Button>
        </PageHeader>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Vehicles Today"
            value={12}
            icon={Car}
            description="Active in workshop"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending Jobs"
            value={5}
            icon={Clock}
            description="Awaiting service"
          />
          <StatCard
            title="Completed Today"
            value={7}
            icon={CheckCircle}
            description="Jobs finished"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Today's Revenue"
            value={`₹${todayRevenue.toLocaleString()}`}
            icon={IndianRupee}
            description="From completed jobs"
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Job Cards */}
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Job Cards</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate("/job-cards")}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobCards.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => navigate(`/job-cards/${job.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <ClipboardList className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{job.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {job.vehicle} • {job.model}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={job.status} />
                      <p className="text-xs text-muted-foreground mt-1">{job.customer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Revenue */}
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Weekly Revenue</CardTitle>
              <div className="flex items-center gap-2 text-status-completed">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+18% this week</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                ₹{weekRevenue.toLocaleString()}
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {revenueData.map((data, index) => {
                  const maxAmount = Math.max(...revenueData.map((d) => d.amount));
                  const height = (data.amount / maxAmount) * 100;
                  const isToday = index === revenueData.length - 2; // Saturday as "today"

                  return (
                    <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          isToday ? "gradient-primary" : "bg-primary/20"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{data.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                onClick={() => navigate("/vehicles/new")}
              >
                <Car className="h-8 w-8 text-primary" />
                <span>Register Vehicle</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                onClick={() => navigate("/job-cards/new")}
              >
                <ClipboardList className="h-8 w-8 text-primary" />
                <span>Create Job Card</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                onClick={() => navigate("/invoices")}
              >
                <IndianRupee className="h-8 w-8 text-primary" />
                <span>View Invoices</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                onClick={() => navigate("/customers")}
              >
                <TrendingUp className="h-8 w-8 text-primary" />
                <span>Customer Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
