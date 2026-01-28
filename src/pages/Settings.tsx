import { useState } from "react";
import { Settings as SettingsIcon, Building2, IndianRupee, Wrench, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock data
const serviceTypes = [
  { id: "1", name: "Oil Change", category: "Maintenance", price: 800, active: true },
  { id: "2", name: "Brake Pad Replacement - Front", category: "Brakes", price: 2500, active: true },
  { id: "3", name: "Brake Pad Replacement - Rear", category: "Brakes", price: 2200, active: true },
  { id: "4", name: "AC Gas Refill", category: "AC", price: 2300, active: true },
  { id: "5", name: "General Service", category: "Maintenance", price: 3500, active: true },
  { id: "6", name: "Wheel Alignment", category: "Tires", price: 1200, active: true },
  { id: "7", name: "Engine Tune-up", category: "Engine", price: 5000, active: false },
];

export default function Settings() {
  const { toast } = useToast();
  const [workshopName, setWorkshopName] = useState("AutoCare Workshop");
  const [taxRate, setTaxRate] = useState("18");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <PageHeader
          title="Settings"
          description="Manage your workshop settings and preferences"
        />

        <Tabs defaultValue="workshop" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="workshop" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Building2 className="h-4 w-4 mr-2" />
              Workshop
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Wrench className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <IndianRupee className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Workshop Settings */}
          <TabsContent value="workshop" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workshop Information</CardTitle>
                <CardDescription>
                  This information will appear on invoices and reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="workshopName">Workshop Name</Label>
                    <Input
                      id="workshopName"
                      value={workshopName}
                      onChange={(e) => setWorkshopName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="contact@autocare.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gst">GST Number</Label>
                    <Input id="gst" defaultValue="27AABCU9603R1ZM" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    defaultValue="123 Workshop Lane, Industrial Area, Mumbai, Maharashtra - 400001"
                    className="min-h-20"
                  />
                </div>
                <Button onClick={handleSave} className="gradient-primary text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Settings */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Service Types</CardTitle>
                  <CardDescription>
                    Manage available service types and their default prices
                  </CardDescription>
                </div>
                <Button size="sm" className="gradient-primary text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Service Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Default Price</TableHead>
                        <TableHead className="text-center">Active</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {serviceTypes.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{service.category}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ₹{service.price.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch defaultChecked={service.active} />
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax & Billing</CardTitle>
                <CardDescription>
                  Configure tax rates and billing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">GST Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" defaultValue="INR (₹)" disabled />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 space-y-4">
                  <h4 className="font-semibold">Invoice Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-generate Invoice</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically create invoice when job card is completed
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Include GST Breakdown</p>
                        <p className="text-sm text-muted-foreground">
                          Show CGST and SGST separately on invoices
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Invoice Automatically</p>
                        <p className="text-sm text-muted-foreground">
                          Send invoice to customer email after generation
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave} className="gradient-primary text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
