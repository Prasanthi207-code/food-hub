import { motion } from "framer-motion";
import { Link } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import {
  Leaf,
  ArrowRight,
  Users,
  Truck,
  Building2,
  Recycle,
  Heart,
  Shield,
  BarChart3,
  MapPin,
  Bell,
  ChevronRight,
  Star,
  CheckCircle2,
  Sprout,
  Package,
  HandHelping,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Navigation ──────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-emerald-900">FoodHub</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">How It Works</a>
              <a href="#mission" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">Our Mission</a>
              <a href="#partners" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">Partners</a>
              <a href="#impact" className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors">Impact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth" className="text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors px-3 py-2">
                Sign In
              </Link>
              <Link
                to="/auth?returnTo=/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all duration-200"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 mb-6">
                <Sprout className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Sustainable Food Management</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Turn Surplus Food Into{" "}
                <span className="text-emerald-600">Meaningful Impact</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                FoodHub connects donors, businesses, collection teams, and waste-processing partners 
                to redistribute surplus food, feed communities in need, and build a more sustainable future — all on one platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/auth?returnTo=/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-emerald-600/40 transition-all duration-200"
                >
                  Donate Food
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  to="/auth?returnTo=/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-200 bg-white px-6 py-3 text-base font-semibold text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                >
                  Partner With Us
                  <HandHelping className="h-5 w-5" />
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-6">
                <a href="#how-it-works" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors underline decoration-gray-300 underline-offset-2">
                  Explore How It Works
                </a>
                <Link to="/auth" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors underline decoration-gray-300 underline-offset-2">
                  Sign In to Your Account
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-8 border border-emerald-200/50">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Heart, label: "Donate Surplus", color: "bg-orange-50 text-orange-500", desc: "Share extra food" },
                    { icon: Truck, label: "Collect & Deliver", color: "bg-blue-50 text-blue-500", desc: "Pick up & transport" },
                    { icon: Users, label: "Feed Communities", color: "bg-emerald-50 text-emerald-600", desc: "Reach those in need" },
                    { icon: Recycle, label: "Process Waste", color: "bg-purple-50 text-purple-500", desc: "Biogas & composting" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <p className="mt-3 text-sm font-bold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["bg-emerald-500", "bg-orange-400", "bg-blue-500", "bg-purple-500"].map((c, i) => (
                        <div key={i} className={`h-8 w-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                          {["S", "M", "D", "A"][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">2,847+ Active Members</p>
                      <p className="text-xs text-gray-500">Across 12 cities and growing</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">Simple Process</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">How FoodHub Works</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">From surplus to service — a streamlined workflow that gets food where it matters most.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", icon: Package, title: "List Surplus Food", desc: "Donors and businesses list their surplus food with details — category, quantity, freshness, and pickup location." },
              { step: "2", icon: Users, title: "Match & Assign", desc: "Collection agents receive nearby requests and accept the ones that fit their route and schedule." },
              { step: "3", icon: Truck, title: "Pick Up & Deliver", desc: "Agents track the journey from pickup to delivery, with real-time status updates for every stakeholder." },
              { step: "4", icon: Heart, title: "Feed & Impact", desc: "Food reaches communities in need. Analytics track meals served, waste diverted, and environmental impact." },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeUp} className="relative">
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold mb-4">
                    {item.step}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Mission ─────────────────────────────────────────────── */}
      <section id="mission" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">Our Mission</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Reducing Waste, One Donation at a Time
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Nearly one-third of all food produced globally goes to waste while millions go hungry. 
                FoodHub was built to close that gap — creating a transparent, efficient marketplace where 
                surplus food moves from businesses and individuals to the people and organizations that can use it best.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                For food that genuinely cannot be consumed, we connect partners with verified waste-processing 
                and biogas facilities, ensuring nothing goes to landfill if it can be turned into energy or compost instead.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Safety First", desc: "Every donation is verified through our food-safety framework" },
                  { icon: BarChart3, label: "Full Transparency", desc: "Real-time tracking and analytics at every stage" },
                  { icon: MapPin, label: "Local Impact", desc: "Connecting neighbors to reduce waste in their own communities" },
                  { icon: Leaf, label: "Zero Waste Goal", desc: "Routing inedible food to composting and biogas partners" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "12K+", label: "Meals Delivered" },
                    { value: "45T", label: "Food Rescued" },
                    { value: "340+", label: "Business Partners" },
                    { value: "28", label: "Cities Covered" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-extrabold">{stat.value}</p>
                      <p className="text-sm text-emerald-100 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-emerald-400/30 text-center">
                  <p className="text-sm text-emerald-100 italic">"Save Food. Serve People. Sustain the Future."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Who We Connect ──────────────────────────────────────── */}
      <section id="partners" className="py-20 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">Our Network</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">Who We Connect</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              A complete ecosystem built around one goal: making sure surplus food reaches those who need it, 
              and what can't be eaten is turned into energy or compost.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Food Donors", desc: "Individuals and households with surplus home-cooked food or groceries they'd like to share.", color: "bg-orange-50 text-orange-500 border-orange-200" },
              { icon: Building2, title: "Businesses", desc: "Restaurants, hotels, caterers, and bakeries managing end-of-day surplus and operational waste.", color: "bg-amber-50 text-amber-600 border-amber-200" },
              { icon: Truck, title: "Collection Agents", desc: "Trained employees who accept, pick up, and deliver donated food to shelters and community kitchens.", color: "bg-blue-50 text-blue-500 border-blue-200" },
              { icon: Recycle, title: "Waste-Processing Partners", desc: "Biogas plants, composting facilities, and recyclers handling food unsuitable for human consumption.", color: "bg-purple-50 text-purple-500 border-purple-200" },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} border`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Impact Statistics ────────────────────────────────────── */}
      <section id="impact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">Platform Impact</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">The Numbers Speak</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Every donation creates a ripple effect — meals served, waste diverted, communities strengthened.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "12,480", label: "Meals Delivered", icon: Heart },
              { value: "45.2 T", label: "Food Rescued", icon: Package },
              { value: "340+", label: "Active Businesses", icon: Building2 },
              { value: "89%", label: "Donation Success Rate", icon: CheckCircle2 },
            ].map((item) => (
              <motion.div key={item.label} variants={fadeUp} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-3xl font-extrabold text-gray-900">{item.value}</p>
                <p className="mt-1 text-sm text-gray-500">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Business Partnership ─────────────────────────────────── */}
      <section className="py-20 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">For Businesses</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Turn Surplus Into Social Impact
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Hotels, restaurants, and food businesses can subscribe to FoodHub to donate surplus food 
                efficiently, track their environmental impact, and build a verified reputation for sustainability. 
                Our premium plans unlock advanced analytics, priority matching, and downloadable compliance reports.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Track total food donated, meals served, and waste diverted",
                  "Receive a platform-calculated impact score based on verified activity",
                  "Download monthly donation reports for compliance and PR",
                  "Get priority matching with collection agents for faster pickups",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth?returnTo=/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all"
              >
                Start as a Business Partner
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Star className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-gray-900">Subscription Plans</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Free", price: "$0/mo", features: ["Up to 5 donations/month", "Basic analytics", "Email notifications"] },
                  { name: "Starter", price: "$29/mo", features: ["Unlimited donations", "Advanced analytics", "Priority matching", "Monthly reports"] },
                  { name: "Professional", price: "$79/mo", features: ["All Starter features", "Dedicated account manager", "Custom branding", "API access"] },
                ].map((plan) => (
                  <div key={plan.name} className="rounded-xl border border-gray-200 p-4 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900">{plan.name}</p>
                      <p className="text-sm font-bold text-emerald-600">{plan.price}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {plan.features.map((f) => (
                        <span key={f} className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Sustainability / Biogas ──────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-2 lg:order-1 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-700 p-8 text-white">
              <Recycle className="h-10 w-10 text-purple-200 mb-4" />
              <h3 className="text-2xl font-extrabold">Waste-to-Energy Pipeline</h3>
              <p className="mt-3 text-purple-100 leading-relaxed">
                Food unsuitable for human consumption is routed through our verified partner network — 
                biogas plants, composting facilities, and animal-feed processors — ensuring nothing ends up 
                in landfill if it can be turned into energy, soil, or feed instead.
              </p>
              <div className="mt-6 space-y-3">
                {["Biogas energy production", "Industrial composting", "Animal feed processing", "Verified supply agreements"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-100">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Sustainability</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
                Beyond the Table
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Not every surplus item can be donated as food — and that's where our waste-processing 
                partnerships come in. FoodHub classifies inedible food waste and connects it to verified 
                biogas and composting partners, creating closed-loop sustainability.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Partners create supply agreements specifying their capacity and accepted categories. 
                The platform matches incoming waste with available capacity, schedules pickups, and 
                tracks the full journey from collection to processing.
              </p>
              <Link
                to="/auth?returnTo=/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-xl border-2 border-purple-200 bg-white px-6 py-3 text-base font-semibold text-purple-700 hover:bg-purple-50 transition-all"
              >
                Become a Processing Partner
                <Recycle className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Call to Action ───────────────────────────────────────── */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="mt-4 text-emerald-100 text-lg max-w-2xl mx-auto">
              Join thousands of donors, businesses, and partners who are already using FoodHub 
              to reduce waste, feed communities, and build a more sustainable food system.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/auth?returnTo=/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-all"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-400 px-8 py-3.5 text-base font-semibold text-white hover:bg-emerald-700 transition-all"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">FoodHub</span>
              </div>
              <p className="text-sm leading-relaxed">
                Connecting donors, businesses, and partners to reduce food waste and serve communities in need.
              </p>
              <p className="mt-3 text-xs text-gray-500 italic">Save Food. Serve People. Sustain the Future.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
                <li><a href="#mission" className="hover:text-emerald-400 transition-colors">Our Mission</a></li>
                <li><a href="#impact" className="hover:text-emerald-400 transition-colors">Impact</a></li>
                <li><Link to="/auth" className="hover:text-emerald-400 transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Partners</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#partners" className="hover:text-emerald-400 transition-colors">For Businesses</a></li>
                <li><a href="#partners" className="hover:text-emerald-400 transition-colors">For Donors</a></li>
                <li><a href="#partners" className="hover:text-emerald-400 transition-colors">For Agents</a></li>
                <li><a href="#partners" className="hover:text-emerald-400 transition-colors">Biogas Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} FoodHub. All rights reserved. Built for a more sustainable future.
          </div>
        </div>
      </footer>
    </div>
  );
}
