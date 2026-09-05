import { useAuth } from "@/hooks/use-auth";
import { StatCard, StatusBadge } from "@/components/dashboard/SharedComponents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, UtensilsCrossed, Clock, CheckCircle2, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function UserDashboard() {
  const { user } = useAuth();
  const stats = useQuery(api.mutations.donations.getStats);
  const recentDonations = useQuery(api.mutations.donations.getRecent, { limit: 5 });

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }} className="space-y-6">
      {/* Welcome */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Here's an overview of your donations and impact on FoodHub.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donations" value={stats?.total ?? "—"} icon={UtensilsCrossed} color="emerald" />
        <StatCard title="Completed" value={stats?.completed ?? "—"} icon={CheckCircle2} color="emerald" trend={{ value: "+12%", positive: true }} />
        <StatCard title="In Progress" value={stats?.inProgress ?? "—"} icon={Clock} color="blue" />
        <StatCard title="People Served" value={stats?.totalServed ?? "—"} icon={Users} color="orange" />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Donations */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-bold text-gray-900">Recent Donations</CardTitle>
              <Link to="/dashboard/donations" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              {(!recentDonations || recentDonations.length === 0) ? (
                <p className="text-sm text-gray-500 py-8 text-center">No donations yet. Create your first donation to get started!</p>
              ) : (
                <div className="space-y-3">
                  {recentDonations.map((d) => (
                    <div key={d._id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <UtensilsCrossed className="h-4.5 w-4.5" />
                        </div>
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

        {/* Quick Actions */}
        <motion.div variants={fadeUp}>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/dashboard/create-donation" className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500 group-hover:bg-orange-100">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Donate Food</p>
                  <p className="text-xs text-gray-500">Share surplus food</p>
                </div>
              </Link>
              <Link to="/dashboard/tracking" className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500 group-hover:bg-blue-100">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Track Donations</p>
                  <p className="text-xs text-gray-500">See delivery status</p>
                </div>
              </Link>
              <Link to="/dashboard/notifications" className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-500 group-hover:bg-purple-100">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-500">3 unread alerts</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Impact Summary */}
          <Card className="border-gray-200 shadow-sm mt-4 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-emerald-100">Your Impact</p>
              <p className="text-3xl font-extrabold mt-1">{stats?.totalKg ?? 0} kg</p>
              <p className="text-sm text-emerald-100 mt-0.5">food rescued through FoodHub</p>
              <p className="text-xs text-emerald-200 mt-3">Every donation helps reduce waste and feed communities in need.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
