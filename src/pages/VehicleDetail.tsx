import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Phone, Mail, MapPin, Calendar, ClipboardList, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";

// Mock data
const vehicleData = {
  id: "1",
  registration: "MH-12-AB-1234",
  make: "Honda",
  model: "City",
  year: 2022,
  color: "White",
  vin: "MRHGE2740MP002156",
  customer: {
    name: "Raj Kumar",
    phone: "9876543210",
    email: "raj.kumar@email.com",
    address: "123 Main Street, Mumbai, Maharashtra",
  },
  lastService: "2026-01-15",
  nextService: "2026-04-15",
  totalVisits: 8,
  totalSpent: 45600,
};

const serviceHistory = [
  { id: "JC-20260115-001", date: "2026-01-15", services: ["Oil Change", "Brake Pad Replace"], amount: 3800, status: "completed" as const },
  { id: "JC-20251210-008", date: "2025-12-10", services: ["General Service", "AC Repair"], amount: 8500, status: "completed" as const },
  { id: "JC-20250915-015", date: "2025-09-15", services: ["Tire Rotation", "Wheel Alignment"], amount: 2500, status: "completed" as const },
  { id: "JC-20250620-003", date: "2025-06-20", services: ["Engine Tune-up"], amount: 12000, status: "completed" as const },
];

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/vehicles")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{vehicleData.registration}</h1>
            <p className="text-muted-foreground">
              {vehicleData.make} {vehicleData.model} • {vehicleData.year}
            </p>
          </div>
          <Button
            onClick={() => navigate("/job-cards/new?vehicle=" + id)}
            className="gradient-primary text-white hover:opacity-90"
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            New Job Card
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Vehicle Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration</span>
                  <span className="font-semibold">{vehicleData.registration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Make</span>
                  <span className="font-medium">{vehicleData.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">{vehicleData.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{vehicleData.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color</span>
                  <span className="font-medium">{vehicleData.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VIN</span>
                  <span className="font-medium text-sm">{vehicleData.vin}</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-semibold">Owner Information</h4>
                <div className="space-y-2">
                  <p className="font-medium text-lg">{vehicleData.customer.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {vehicleData.customer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {vehicleData.customer.email}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    {vehicleData.customer.address}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service History */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Service History
              </CardTitle>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Visits: </span>
                  <span className="font-semibold">{vehicleData.totalVisits}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Spent: </span>
                  <span className="font-semibold">₹{vehicleData.totalSpent.toLocaleString()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceHistory.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => navigate(`/job-cards/${service.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{service.id}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(service.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{service.amount.toLocaleString()}</p>
                        <StatusBadge status={service.status} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {service.services.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Service Reminder */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl gradient-primary">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Next Service Due</p>
                  <p className="text-muted-foreground">
                    Scheduled for {new Date(vehicleData.nextService).toLocaleDateString("en-IN", { 
                      weekday: "long", 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </p>
                </div>
              </div>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
