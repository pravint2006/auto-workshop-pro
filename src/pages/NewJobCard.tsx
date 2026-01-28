import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, User, Plus, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Mock service types
const serviceTypes = [
  { id: "1", name: "Oil Change", price: 800 },
  { id: "2", name: "Brake Pad Replacement - Front", price: 2500 },
  { id: "3", name: "Brake Pad Replacement - Rear", price: 2200 },
  { id: "4", name: "AC Gas Refill", price: 2300 },
  { id: "5", name: "General Service", price: 3500 },
  { id: "6", name: "Wheel Alignment", price: 1200 },
  { id: "7", name: "Tire Rotation", price: 500 },
  { id: "8", name: "Engine Tune-up", price: 5000 },
];

interface ServiceItem {
  id: string;
  serviceTypeId: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewJobCard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expectedDelivery, setExpectedDelivery] = useState<Date>();
  const [items, setItems] = useState<ServiceItem[]>([
    { id: "1", serviceTypeId: "", description: "", quantity: 1, unitPrice: 0 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), serviceTypeId: "", description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof ServiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if (field === "serviceTypeId") {
            const service = serviceTypes.find((s) => s.id === value);
            return {
              ...item,
              serviceTypeId: value as string,
              description: service?.name || "",
              unitPrice: service?.price || 0,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const taxAmount = subtotal * 0.18;
  const total = subtotal + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Card Created",
      description: "Job card has been created successfully.",
    });
    navigate("/job-cards");
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" onClick={() => navigate("/job-cards")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">New Job Card</h1>
            <p className="text-muted-foreground">Create a new service job card</p>
          </div>
          <Button type="submit" className="gradient-primary text-white hover:opacity-90">
            Create Job Card
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Vehicle Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Vehicle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registration">Registration Number</Label>
                <Input id="registration" placeholder="MH-12-AB-1234" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" placeholder="Honda" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="City" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" type="number" placeholder="2022" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="White" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Name</Label>
                <Input id="customerName" placeholder="Customer Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="9876543210" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input id="email" type="email" placeholder="customer@email.com" />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Expected Delivery Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expectedDelivery && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {expectedDelivery ? format(expectedDelivery, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={expectedDelivery}
                      onSelect={setExpectedDelivery}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Add notes about the service..."
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Service Items</CardTitle>
            <Button type="button" size="sm" variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="grid gap-4 sm:grid-cols-12 items-end p-4 rounded-xl bg-muted/50">
                  <div className="sm:col-span-4 space-y-2">
                    <Label>Service Type</Label>
                    <Select
                      value={item.serviceTypeId}
                      onValueChange={(v) => updateItem(item.id, "serviceTypeId", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - ₹{service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-3 space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Service description"
                    />
                  </div>
                  <div className="sm:col-span-1 space-y-2">
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="sm:col-span-1 text-right font-semibold pt-6">
                    ₹{(item.unitPrice * item.quantity).toLocaleString()}
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 p-4 rounded-xl bg-muted/50 max-w-sm ml-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium">₹{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t">
                <span className="font-semibold">Estimated Total</span>
                <span className="font-bold gradient-text">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </AppLayout>
  );
}
