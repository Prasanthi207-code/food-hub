import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useNavigate } from "react-router";
import { Heart, AlertTriangle, CheckCircle2, Loader2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function CreateDonation() {
  const { user } = useAuth();
  const createDonation = useMutation(api.mutations.donations.create);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [safetyDeclared, setSafetyDeclared] = useState(false);
  const [form, setForm] = useState({
    foodName: "",
    foodCategory: "cooked" as string,
    quantity: "",
    quantityKg: "",
    servesPeople: "",
    condition: "fresh" as string,
    preparationDate: "",
    expiryDate: "",
    pickupAddress: "",
    contactPhone: "",
    instructions: "",
  });

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyDeclared) {
      toast.error("Please accept the Food Safety Declaration before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      await createDonation({
        foodName: form.foodName,
        foodCategory: form.foodCategory as "cooked" | "raw" | "packaged" | "bakery" | "dairy" | "produce" | "other",
        quantity: form.quantity,
        quantityKg: parseFloat(form.quantityKg) || 0,
        servesPeople: parseInt(form.servesPeople) || 0,
        condition: form.condition as "fresh" | "good" | "edible" | "not_for_human",
        preparationDate: form.preparationDate,
        expiryDate: form.expiryDate,
        pickupAddress: form.pickupAddress,
        contactPhone: form.contactPhone,
        instructions: form.instructions,
        safetyDeclaration: safetyDeclared,
        donorType: "user",
      });
      toast.success("Donation created successfully! A collection agent will be notified.");
      navigate("/dashboard/donations");
    } catch (error) {
      toast.error("Failed to create donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <Heart className="h-6 w-6 text-orange-500" />
          Donate Surplus Food
        </h1>
        <p className="text-sm text-gray-500 mt-1">Share your surplus food with communities in need through FoodHub.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Food Details */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-gray-900">Food Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Name / Description *</label>
                <Input placeholder="e.g., Homemade Pasta & Sauce" value={form.foodName} onChange={(e) => updateField("foodName", e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Category *</label>
                <select value={form.foodCategory} onChange={(e) => updateField("foodCategory", e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20">
                  <option value="cooked">Cooked Meal</option>
                  <option value="raw">Raw Ingredients</option>
                  <option value="packaged">Packaged / Canned</option>
                  <option value="bakery">Bakery Items</option>
                  <option value="dairy">Dairy Products</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity *</label>
                <Input placeholder="e.g., 3 containers" value={form.quantity} onChange={(e) => updateField("quantity", e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight (kg) *</label>
                <Input type="number" step="0.1" placeholder="e.g., 4.5" value={form.quantityKg} onChange={(e) => updateField("quantityKg", e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Serves (people) *</label>
                <Input type="number" placeholder="e.g., 8" value={form.servesPeople} onChange={(e) => updateField("servesPeople", e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Condition *</label>
              <select value={form.condition} onChange={(e) => updateField("condition", e.target.value)} className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20">
                <option value="fresh">Fresh — Just prepared or recently purchased</option>
                <option value="good">Good — Still well within its usable window</option>
                <option value="edible">Edible — Approaching expiry but safe to eat</option>
                <option value="not_for_human">Not Suitable for Human Consumption</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Dates */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-gray-900">Dates & Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Preparation Date *</label>
                <Input type="datetime-local" value={form.preparationDate} onChange={(e) => updateField("preparationDate", e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Best-Before / Expiry *</label>
                <Input type="datetime-local" value={form.expiryDate} onChange={(e) => updateField("expiryDate", e.target.value)} required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Details */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-gray-900">Pickup Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Address *</label>
              <Input placeholder="Full address for collection" value={form.pickupAddress} onChange={(e) => updateField("pickupAddress", e.target.value)} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Phone *</label>
                <Input placeholder="+1-555-000-0000" value={form.contactPhone} onChange={(e) => updateField("contactPhone", e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Instructions</label>
              <textarea
                rows={3}
                placeholder="Any special instructions for the collection agent..."
                value={form.instructions}
                onChange={(e) => updateField("instructions", e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Food Safety Declaration */}
        <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-amber-800 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Food Safety Declaration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-amber-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    I confirm that the food being donated has been stored and handled safely. I understand that:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li>The food has been kept at appropriate temperatures</li>
                    <li>No items are past their safe consumption window</li>
                    <li>I have not used expired or contaminated ingredients</li>
                    <li>FoodHub will verify donations according to platform safety standards</li>
                    <li>Food marked "Not Suitable for Human Consumption" will be routed to waste-processing partners</li>
                  </ul>
                  <label className="flex items-center gap-3 mt-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={safetyDeclared}
                      onChange={(e) => setSafetyDeclared(e.target.checked)}
                      className="h-4 w-4 rounded border-amber-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-semibold text-gray-900">I accept the Food Safety Declaration *</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard")} className="border-gray-200">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !safetyDeclared} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Heart className="h-4 w-4 mr-2" />}
            Submit Donation
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
