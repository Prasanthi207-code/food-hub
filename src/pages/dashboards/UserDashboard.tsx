import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { StatCard, StatusBadge, EmptyState, foodImages } from "@/components/dashboard/SharedComponents";
import { Heart, UtensilsCrossed, Clock, CheckCircle2, TrendingUp, Plus, MapPin, Package } from "lucide-react";
import { Link } from "react-router";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

export default function UserDashboard() {
  const { user } = useAuth();
  const donations = useQuery(api.mutations.donations.listByDonor, user?._id ? { donorId: user._id } : "skip");
  const stats = useQuery(api.mutations.donations.getStats);

  const myDonations = donations || [];
  const completed = myDonations.filter((d) => d.status === "completed").length;
  const pending = myDonations.filter((d) => d.status === "pending").length;
  const totalKg = myDonations.reduce((a, d) => a + d.quantityKg, 0);
  const totalServed = myDonations.reduce((a, d) => a + d.servesPeople, 0);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
      {/* Hero banner */}
      <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden h-48 sm:h-56">
        <img src={foodImages.community} alt="Community receiving food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00615F]/90 to-[#00615F]/60" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name?.split(" ")[0] || "Donor"} 👋
            </h1>
            <p className="text-emerald-100 mt-1">Every donation makes a difference. Keep up the great work!</p>
            <Link to="/dashboard/create-donation" className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#00615F] hover:bg-emerald-50 transition-colors">
              <Plus className="h-4 w-4" /> New Donation
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Donations" value={myDonations.length} icon={Heart} color="emerald" trend={{ value: "+3 this week", positive: true }} />
        <StatCard title="Completed" value={completed} icon={CheckCircle2} color="emerald" />
        <StatCard title="Pending" value={pending} icon={Clock} color="amber" />
        <StatCard title="People Served" value={totalServed} icon={UtensilsCrossed} color="emerald" />
      </motion.div>

      {/* Food impact card */}
      <motion.div variants={fadeUp} className="rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-48 md:h-auto">
            <img src={foodImages.salad} alt="Food saved from waste" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00615F]/80 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-2xl font-extrabold text-[#00615F]">{totalKg.toFixed(1)} kg</p>
              <p className="text-xs text-gray-500">Total food rescued</p>
            </div>
          </div>
          <div className="bg-[#00615F] p-6 flex flex-col justify-center">
            <h3 className="text-xl font-extrabold text-white">Your Impact So Far</h3>
            <p className="text-emerald-100 mt-2 text-sm leading-relaxed">
              Through your {myDonations.length} donations, you've helped serve {totalServed} people and rescue {totalKg.toFixed(1)} kg of food from going to waste.
            </p>
            <div className="mt-4 flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white">{completed}</p>
                <p className="text-xs text-emerald-200">Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white">{pending}</p>
                <p className="text-xs text-emerald-200">Awaiting Pickup</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent donations */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-900">Recent Donations</h2>
          <Link to="/dashboard/donations" className="text-sm font-bold text-[#00615F] hover:underline">View All →</Link>
        </div>
        {myDonations.length === 0 ? (
          <EmptyState icon={Heart} title="No donations yet" description="Create your first food donation to start making an impact." />
        ) : (
          <div className="space-y-3">
            {myDonations.slice(0, 5).map((d, i) => (
              <motion.div
                key={d._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl bg-white border border-gray-100 p-4 hover:shadow-md hover:shadow-[#00615F]/5 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0">
                  <img src={foodImages[d.foodCategory === "bakery" ? "bread" : d.foodCategory === "produce" ? "vegetables" : "cooking"]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{d.foodName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{d.quantityKg} kg · {d.servesPeople} people · {new Date(d.createdAt).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={d.status} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
