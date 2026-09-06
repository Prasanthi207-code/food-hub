import { Card, CardContent } from "@/components/ui/card";
import { StatCard, EmptyState } from "@/components/dashboard/SharedComponents";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Leaf, Package, CheckCircle2, CalendarClock, FileText } from "lucide-react";
import { Link } from "react-router";

export default function BiogasDashboard() {
  const { user } = useAuth();
  const partner = useQuery(api.mutations.biogas.getByUserId, user?._id ? { userId: user._id } : "skip");
  const supplies = partner ? useQuery(api.mutations.biogas.listSupplies, { biogasPartnerId: partner._id }) : undefined;
  const agreements = partner ? useQuery(api.mutations.biogas.listAgreements, { biogasPartnerId: partner._id }) : undefined;
  const partnerStats = partner ? useQuery(api.mutations.biogas.getPartnerStats, { biogasPartnerId: partner._id }) : undefined;

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <Leaf className="h-6 w-6 text-purple-500" />
          {partner?.partnerName || "Biogas Partner Dashboard"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage food-waste supply agreements and track processing on FoodHub.</p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Supplies" value={partnerStats?.total ?? 0} icon={Package} color="purple" />
        <StatCard title="Processed" value={partnerStats?.processed ?? 0} icon={CheckCircle2} color="emerald" />
        <StatCard title="Scheduled" value={partnerStats?.scheduled ?? 0} icon={CalendarClock} color="blue" />
        <StatCard title="Total Collected" value={`${partnerStats?.totalKg ?? 0} kg`} icon={Leaf} color="green" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2"><h3 className="text-base font-bold text-gray-900">Active Supply Agreements</h3></CardHeader>
            <CardContent>
              {!agreements || agreements.length === 0 ? (
                <EmptyState icon={FileText} title="No agreements" description="Create a supply agreement to start receiving food waste." />
              ) : (
                <div className="space-y-3">
                  {agreements.filter((a) => a.status === "active").map((a) => (
                    <div key={a._id} className="rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                      <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{a.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{a.capacityKgPerWeek} kg/week</span>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full capitalize">{a.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2"><h3 className="text-base font-bold text-gray-900">Recent Supplies</h3></CardHeader>
            <CardContent>
              {!supplies || supplies.length === 0 ? (
                <EmptyState icon={Package} title="No supplies yet" description="Supply requests from the platform will appear here." />
              ) : (
                <div className="space-y-3">
                  {supplies.slice(0, 5).map((s) => (
                    <div key={s._id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{s.category} waste</p>
                        <p className="text-xs text-gray-500">{s.quantityKg} kg · {new Date(s.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize bg-purple-50 text-purple-700 border-purple-200">{s.supplyStatus.replace(/_/g, " ")}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <Card className="border-gray-200 shadow-sm bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-100">Total Waste Processed</p>
              <p className="text-3xl font-extrabold mt-1">{partner?.totalCollectedKg ?? 0} kg</p>
              <p className="text-sm text-purple-100 mt-0.5">Converting food waste into sustainable energy</p>
            </div>
            <Leaf className="h-12 w-12 text-purple-200" />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
