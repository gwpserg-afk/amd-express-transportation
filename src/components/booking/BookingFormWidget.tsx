import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
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
import { Calendar, Upload, X, CheckCircle, Phone, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { geocode, getRoute, type RouteResult } from "@/lib/mapbox";
import RouteReview from "./RouteReview";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdekgbna";

type BookingType = "standard" | "workcomp";

interface BookingFormWidgetProps {
  variant?: "compact" | "full";
  className?: string;
}

const BookingFormWidget = ({ variant = "full", className }: BookingFormWidgetProps) => {
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState<BookingType>("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"form" | "review">("form");
  const [route, setRoute] = useState<RouteResult | null>(null);

  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    appointmentTime: "",
    roundTrip: "",
    returnTime: "",
    mobility: "",
    passengers: "",
    equipment: "",
    notes: "",
    patientName: "",
    patientPhone: "",
    email: "",
    adjusterEmail: "",
    caseManagerEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, JPG, PNG, or DOC file.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, JPG, PNG, or DOC file.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
    }
  };

  // Step 1: validate → geocode both addresses → calculate route → show review.
  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (bookingType === "workcomp" && !uploadedFile) {
      toast({
        title: "Demographic sheet required",
        description: "Please upload your demographic sheet for Auto Claim / Work Comp requests.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const [from, to] = await Promise.all([
        geocode(formData.pickupLocation),
        geocode(formData.dropoffLocation),
      ]);
      if (!from || !to) {
        toast({
          title: "Address not found",
          description: "Please check the pickup and drop-off addresses and try again.",
          variant: "destructive",
        });
        return;
      }
      const r = await getRoute(from, to);
      if (!r) {
        toast({
          title: "Couldn't calculate a route",
          description: "We couldn't find a driving route between those addresses.",
          variant: "destructive",
        });
        return;
      }
      setRoute(r);
      setStep("review");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or call us at (469) 934-2087.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: submit the confirmed booking to Formspree.
  const confirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("Booking Type", bookingType === "workcomp" ? "Auto Claim / Work Comp" : "Standard Transportation");
      const labels: Record<string, string> = {
        pickupLocation: "Pickup Location", dropoffLocation: "Drop-off Location",
        pickupDate: "Pickup Date", pickupTime: "Pickup Time", appointmentTime: "Appointment Time",
        roundTrip: "Round Trip", returnTime: "Return Time", mobility: "Mobility",
        passengers: "Passengers", equipment: "Equipment", notes: "Notes",
        patientName: "Patient Name", patientPhone: "Patient Phone", email: "Email",
        adjusterEmail: "Adjuster Email", caseManagerEmail: "Case Manager Email",
      };
      Object.entries(formData).forEach(([k, v]) => {
        if (v) fd.append(labels[k] ?? k, v as string);
      });
      if (route) {
        fd.append("Route Distance", `${route.miles.toFixed(1)} miles`);
        fd.append("Est. Drive Time", `${Math.round(route.minutes)} min`);
      }
      if (uploadedFile) fd.append("Demographic Sheet", uploadedFile);
      fd.append("_subject", "New Ride Request — AMD Express Transportation");
      fd.append("email", formData.email || formData.patientPhone);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("send_failed");
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast({
        title: "Request Submitted!",
        description: "We'll contact you shortly to confirm your ride.",
      });
    } catch {
      toast({
        title: "Couldn't send just now",
        description: "Please call us at (469) 934-2087 and we'll book your ride.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      pickupTime: "",
      appointmentTime: "",
      roundTrip: "",
      returnTime: "",
      mobility: "",
      passengers: "",
      equipment: "",
      notes: "",
      patientName: "",
      patientPhone: "",
      email: "",
      adjusterEmail: "",
      caseManagerEmail: "",
    });
    setUploadedFile(null);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg text-center", className)}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          Request Received!
        </h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your booking request. We'll contact you within minutes to confirm your ride details.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" asChild>
            <a href="tel:+14699342087">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </Button>
          <Button variant="outline" onClick={resetForm}>
            Book Another Ride
          </Button>
        </div>
      </motion.div>
    );
  }

  if (step === "review" && route) {
    const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
    const assistance =
      [cap(formData.mobility), formData.equipment && formData.equipment !== "none" ? cap(formData.equipment) : ""]
        .filter(Boolean)
        .join(" · ") || "None";
    return (
      <div className={className}>
        <RouteReview
          route={route}
          details={{
            passenger: formData.patientName,
            phone: formData.patientPhone,
            pickupAddress: route.from.label,
            dropoffAddress: route.to.label,
            date: formData.pickupDate,
            pickupTime: formData.pickupTime,
            appointmentTime: formData.appointmentTime,
            tripType: formData.roundTrip === "yes" ? "Round Trip" : "One Way",
            assistance,
          }}
          onEdit={() => setStep("form")}
          onConfirm={confirmBooking}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div className={cn("bg-card rounded-2xl p-5 md:p-6 border border-border shadow-lg", className)}>
      <div className="text-center mb-5">
        <h3 className="font-heading text-lg font-bold text-foreground mb-1">
          Pick the option that fits your situation
        </h3>
      </div>

      {/* Booking Type Toggle */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => setBookingType("standard")}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            bookingType === "standard"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <span className="font-semibold text-foreground block text-sm md:text-base">Standard Transportation</span>
          <span className="text-xs text-muted-foreground">Wheelchair & Ambulatory</span>
        </button>
        <button
          type="button"
          onClick={() => setBookingType("workcomp")}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            bookingType === "workcomp"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <span className="font-semibold text-foreground block text-sm md:text-base">Auto Claim / Work Comp</span>
          <span className="text-xs text-muted-foreground">Demographic sheet required</span>
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center mb-5">Tap a button to switch forms.</p>

      <form onSubmit={handleReview} className="space-y-4">
        {/* Work Comp Notice */}
        <AnimatePresence>
          {bookingType === "workcomp" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-primary/10 border border-primary/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">
                    Auto Claim / Work Comp
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please submit a Demographic Sheet. You can email it to{" "}
                    <a href="mailto:info@amdexpresstransportation.com" className="text-primary hover:underline">
                      info@amdexpresstransportation.com
                    </a>{" "}
                    or upload below.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Upload for Work Comp */}
        <AnimatePresence>
          {bookingType === "workcomp" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Label className="text-sm font-medium">Demographic Sheet *</Label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="mt-1.5 border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{uploadedFile.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      PDF, JPG, PNG, DOC (max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trip Details */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="pickupLocation" className="text-xs">Pickup Location *</Label>
            <Input
              id="pickupLocation"
              name="pickupLocation"
              placeholder="Address or facility"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dropoffLocation" className="text-xs">Drop-off Location *</Label>
            <Input
              id="dropoffLocation"
              name="dropoffLocation"
              placeholder="Address or facility"
              value={formData.dropoffLocation}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="pickupDate" className="text-xs">Pickup Date *</Label>
            <Input
              id="pickupDate"
              name="pickupDate"
              type="date"
              value={formData.pickupDate}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pickupTime" className="text-xs">Pickup Time *</Label>
            <Input
              id="pickupTime"
              name="pickupTime"
              type="time"
              value={formData.pickupTime}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="appointmentTime" className="text-xs">Appointment Time</Label>
            <Input
              id="appointmentTime"
              name="appointmentTime"
              type="time"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="h-10"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Round Trip?</Label>
            <Select
              value={formData.roundTrip}
              onValueChange={(value) => handleSelectChange("roundTrip", value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.roundTrip === "yes" && (
            <div className="space-y-1.5">
              <Label htmlFor="returnTime" className="text-xs">Return Pickup Time</Label>
              <Input
                id="returnTime"
                name="returnTime"
                type="time"
                value={formData.returnTime}
                onChange={handleChange}
                className="h-10"
              />
            </div>
          )}
        </div>

        {/* Mobility & Options */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Mobility *</Label>
            <Select
              value={formData.mobility}
              onValueChange={(value) => handleSelectChange("mobility", value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ambulatory">Ambulatory</SelectItem>
                <SelectItem value="wheelchair">Wheelchair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Passengers</Label>
            <Select
              value={formData.passengers}
              onValueChange={(value) => handleSelectChange("passengers", value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Equipment</Label>
            <Select
              value={formData.equipment}
              onValueChange={(value) => handleSelectChange("equipment", value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="wheelchair">Wheelchair</SelectItem>
                <SelectItem value="walker">Walker</SelectItem>
                <SelectItem value="oxygen">Oxygen</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <Label htmlFor="notes" className="text-xs">Notes for Driver</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder={bookingType === "workcomp" 
              ? "Claim #, adjuster/case manager, facility notes, etc." 
              : "Building entry, room name, pickup window, etc."
            }
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            className="resize-none text-sm"
          />
        </div>

        {/* Work Comp Extra Fields */}
        <AnimatePresence>
          {bookingType === "workcomp" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid sm:grid-cols-2 gap-3"
            >
              <div className="space-y-1.5">
                <Label htmlFor="adjusterEmail" className="text-xs">Adjuster's Email *</Label>
                <Input
                  id="adjusterEmail"
                  name="adjusterEmail"
                  type="email"
                  placeholder="adjuster@company.com"
                  value={formData.adjusterEmail}
                  onChange={handleChange}
                  required={bookingType === "workcomp"}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="caseManagerEmail" className="text-xs">Case Manager's Email</Label>
                <Input
                  id="caseManagerEmail"
                  name="caseManagerEmail"
                  type="email"
                  placeholder="manager@company.com"
                  value={formData.caseManagerEmail}
                  onChange={handleChange}
                  className="h-10"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Patient Contact */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="patientName" className="text-xs">Patient Name *</Label>
            <Input
              id="patientName"
              name="patientName"
              placeholder="Full name"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="patientPhone" className="text-xs">Patient Phone *</Label>
            <Input
              id="patientPhone"
              name="patientPhone"
              type="tel"
              placeholder="(469) 934-2087"
              value={formData.patientPhone}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
              Calculating route…
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              Review Booking
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default BookingFormWidget;
