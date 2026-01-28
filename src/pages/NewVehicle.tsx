import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

export default function NewVehicle() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Vehicle Registered",
      description: "Vehicle has been added successfully.",
    });
    navigate("/vehicles");
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" onClick={() => navigate("/vehicles")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Register Vehicle</h1>
            <p className="text-muted-foreground">Add a new vehicle to the system</p>
          </div>
          <Button type="submit" className="gradient-primary text-white hover:opacity-90">
            Register Vehicle
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registration">Registration Number *</Label>
                <Input id="registration" placeholder="MH-12-AB-1234" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" placeholder="Honda" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input id="model" placeholder="City" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" type="number" placeholder="2022" min="1990" max="2030" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="White" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin">VIN (Optional)</Label>
                <Input id="vin" placeholder="Vehicle Identification Number" />
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input id="customerName" placeholder="Full Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" placeholder="9876543210" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input id="email" type="email" placeholder="customer@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address (Optional)</Label>
                <Input id="address" placeholder="Full address" />
              </div>
              <div className="p-4 rounded-xl bg-muted/50 mt-4">
                <p className="text-sm text-muted-foreground">
                  💡 If this is an existing customer, the system will automatically link this vehicle to their profile.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </AppLayout>
  );
}
