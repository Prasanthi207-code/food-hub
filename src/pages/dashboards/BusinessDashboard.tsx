import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard, StatusBadge, EmptyState } from "@/components/dashboard/SharedComponents";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Building2, UtensilsCrossed, CheckCircle2, TrendingUp, Users, ArrowRight, Star } from "lucide-react";

export default function BusinessDashboard() {
  const { user } = useAuth();
  const business = useQuery(api.mutations.businesses.getByUserId, user?._id ? { userId: user._id } : "skip");
  const stats = useQuery(api.mutations.businesses.getStats, business?._id ? { businessId: business._id } : "skip");
  const donations = useQuery(api.mutations.donations.listByDonor, user?._id ? { donorId: user._id } : "skip");

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-amber-500" />
          {business?.businessName || "Business Dashboard"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage your business donations and track your sustainability impact.</p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donations" value={stats?.totalDonations ?? 0} icon={UtensilsCrossed} color="emerald" />
        <StatCard title="Completed" value={stats?.completedDonations ?? 0} icon={CheckCircle2} color="emerald" />
        <StatCard title="People Served" value={stats?.totalPeopleServed ?? 0} icon={Users} color="orange" />
        <StatCard title="Impact Score" value={stats?.impactScore ?? 0} icon={Star} color="amber" />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-2">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-bold text-gray-900">Recent Donations</CardTitle>
              <Link to="/dashboard/donations" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">View All <ArrowRight className="h-3.5 w-3.5" /></Link>
            </CardHeader>
            <CardContent>
              {!donations || donations.length === 0 ? (
                <EmptyState icon={UtensilsCrossed} title="No donations yet" description="Start donating surplus food from your business." />
              ) : (
                <div className="space-y-3">
                  {donations.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5).map((d) => (
                    <div key={d._id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600"><UtensilsCrossed className="h-4.5 w-4.5" /></div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{d.foodName}</p>
                          <p className="text-xs text-gray-500">{d.quantity} · {d.quantityKg} kg</p>
                        </div>
                      </div>
                      <StatusBadge status={d.status} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-4">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-gray-500">Subscription</p>
              <p className="text-lg font-bold text-gray-900 capitalize mt-1">{stats?.subscriptionPlan ?? "Free"} Plan</p>
              <Link to="/dashboard/subscription" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mt-2 inline-block">Upgrade Plan →</Link>
            </CardContent>
          </Card>
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-gray-500">Success Rate</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">{stats?.successRate ?? 0}%</p>
              <p className="text-xs text-gray-500 mt-1">of donations successfully delivered</p>
            </CardContent>
          </Card>
          <Link to="/dashboard/analytics">
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">View Analytics</p>
                  <p className="text-xs text-gray-500">Impact reports & trends</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
