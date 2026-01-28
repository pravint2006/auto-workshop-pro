import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Phone, Calendar, FileText, Send, CheckCircle, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data
const jobCardData = {
  id: "JC-20260128-001",
  vehicle: {
    registration: "MH-12-AB-1234",
    make: "Honda",
    model: "City",
    year: 2022,
    color: "White",
  },
  customer: {
    name: "Raj Kumar",
    phone: "9876543210",
    email: "raj.kumar@email.com",
  },
  status: "in_progress" as const,
  createdAt: "2026-01-28",
  expectedDelivery: "2026-01-29",
  remarks: "Customer reported unusual noise from brakes. Check AC cooling as well.",
  items: [
    { id: "1", description: "Oil Change", quantity: 1, unitPrice: 800, total: 800, status: "completed" as const },
    { id: "2", description: "Brake Pad Replacement - Front", quantity: 1, unitPrice: 2500, total: 2500, status: "in_progress" as const },
    { id: "3", description: "AC Gas Refill", quantity: 1, unitPrice: 2300, total: 2300, status: "pending" as const },
  ],
};

type JobStatus = "pending" | "in_progress" | "completed" | "cancelled";

export default function JobCardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<JobStatus>(jobCardData.status);
  const [isEditing, setIsEditing] = useState(false);

  const subtotal = jobCardData.items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleStatusChange = (newStatus: JobStatus) => {
    setStatus(newStatus);
    // API call would go here
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/job-cards")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{jobCardData.id}</h1>
              <StatusBadge status={status} />
            </div>
            <p className="text-muted-foreground">
              Created on {new Date(jobCardData.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={status} onValueChange={(v) => handleStatusChange(v as JobStatus)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => navigate(`/invoices/new?jobcard=${id}`)}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Vehicle & Customer Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="font-bold text-lg">{jobCardData.vehicle.registration}</p>
                  <p className="text-muted-foreground">
                    {jobCardData.vehicle.make} {jobCardData.vehicle.model}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {jobCardData.vehicle.year} • {jobCardData.vehicle.color}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/vehicles/1")}
                >
                  View Vehicle History →
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold text-lg">{jobCardData.customer.name}</p>
                <p className="text-muted-foreground">{jobCardData.customer.phone}</p>
                <p className="text-muted-foreground text-sm">{jobCardData.customer.email}</p>
                <Separator />
                <Button variant="outline" size="sm" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send WhatsApp Update
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{new Date(jobCardData.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Delivery</span>
                  <Badge variant="outline">{new Date(jobCardData.expectedDelivery).toLocaleDateString()}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Items & Remarks */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Service Items</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobCardData.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.description}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">₹{item.unitPrice.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-semibold">₹{item.total.toLocaleString()}</TableCell>
                          <TableCell>
                            <StatusBadge status={item.status} />
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Totals */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">₹{taxAmount.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold gradient-text">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Remarks & Notes</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    defaultValue={jobCardData.remarks}
                    placeholder="Add notes for mechanics..."
                    className="min-h-24"
                  />
                ) : (
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-muted-foreground">{jobCardData.remarks}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {status === "in_progress" && (
              <Card className="border-status-completed/30 bg-status-completed/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-status-completed">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Ready to Complete?</p>
                        <p className="text-muted-foreground">Mark this job card as completed and generate invoice</p>
                      </div>
                    </div>
                    <Button
                      className="bg-status-completed hover:bg-status-completed/90 text-white"
                      onClick={() => handleStatusChange("completed")}
                    >
                      Complete Job Card
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
