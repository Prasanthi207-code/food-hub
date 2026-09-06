import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/SharedComponents";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Package, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function BiogasSupplyRequests() {
  const { user } = useAuth();
  const partner = useQuery(api.mutations.biogas.getByUserId, user?._id ? { userId: user._id } : "skip");
  const supplies = useQuery(api.mutations.biogas.listAvailableSupplies);
  const updateSupplyStatus = useMutation(api.mutations.biogas.updateSupplyStatus);

  const filtered = supplies?.filter((s) => s.supplyStatus === "available") || [];

  const handleAccept = async (supplyId: string) => {
    try {
      await updateSupplyStatus({ supplyId: supplyId as never, status: "accepted" });
      toast.success("Supply request accepted.");
    } catch {
      toast.error("Failed to accept supply request.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2"><Package className="h-6 w-6 text-purple-500" /> Supply Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Available food-waste supply requests from the FoodFlow network.</p>
      </div>
      {filtered.length === 0 ? (
        <Card className="border-gray-200 shadow-sm"><CardContent><EmptyState icon={Package} title="No available supplies" description="New food-waste supply requests will appear here." /></CardContent></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <Card key={s._id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <h3 className="text-base font-bold text-gray-900 capitalize">{s.category} Waste</h3>
                <p className="text-sm text-gray-500 mt-1">{s.quantityKg} kg available</p>
                {s.notes && <p className="text-xs text-gray-400 mt-2">{s.notes}</p>}
                <Button onClick={() => handleAccept(s._id)} className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">Accept Supply</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
