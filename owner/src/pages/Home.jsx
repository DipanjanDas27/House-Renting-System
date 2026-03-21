import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "motion/react"
import {
  Building2, Home as HomeIcon, CreditCard,
  Users, TrendingUp, ArrowRight, Plus
} from "lucide-react"

import { ownerGetProperties } from "@/services/ownerPropertyThunks.js"
import { ownerGetRentals }    from "@/services/ownerRentalThunks.js"
import { ownerGetPayments }   from "@/services/ownerPaymentThunks.js"
import { StatCard, RecentRow, StatusBadge } from "@/components/custom/DashboardWidgets.jsx"
import { Button } from "@/components/ui/button"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user }       = useSelector((state) => state.auth)
  const { properties } = useSelector((state) => state.property)
  const { rentals }    = useSelector((state) => state.rental)
  const { payments }   = useSelector((state) => state.payment)

  useEffect(() => {
    dispatch(ownerGetProperties())
    dispatch(ownerGetRentals())
    dispatch(ownerGetPayments())
  }, [dispatch])

  const totalProperties = properties?.length ?? 0
  const availableProps  = properties?.filter(p => p.is_available)?.length ?? 0
  const activeRentals   = rentals?.filter(r => r.status === "active")?.length ?? 0
  const pendingRentals  = rentals?.filter(r => r.status === "pending")?.length ?? 0
  const totalRevenue    = payments
    ?.filter(p => p.payment_status === "success")
    ?.reduce((sum, p) => sum + Number(p.amount), 0) ?? 0

  const recentRentals  = [...(rentals  ?? [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)
  const recentPayments = [...(payments ?? [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

  const hour     = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="text-sm font-bold text-brown-muted mb-1">{greeting} 👋</p>
            <h1 className="text-3xl font-extrabold text-brown-dark leading-tight">
              {user?.full_name?.split(" ")[0]}'s Dashboard
            </h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">
              Here's what's happening with your properties today
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="hidden md:block">
            <Button
              onClick={() => navigate("/owner/properties/create")}
              className="h-10 px-5 rounded-btn bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-sm flex items-center gap-2"
            >
              <Plus size={16} />
              Add Property
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Stat Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div onClick={() => navigate("/owner/properties")} className="cursor-pointer">
            <StatCard icon={<Building2 size={22} className="text-brown-dark" />}  label="Properties"    value={totalProperties} sub={`${availableProps} available`}                               color="bg-beige-card" delay={0.1}  />
          </div>
          <div onClick={() => navigate("/owner/rentals")} className="cursor-pointer">
            <StatCard icon={<HomeIcon   size={22} className="text-amber-700"  />} label="Active Rentals" value={activeRentals}   sub={pendingRentals > 0 ? `${pendingRentals} pending` : "All settled"} color="bg-amber-50"  delay={0.18} />
          </div>
          <div onClick={() => navigate("/payments")} className="cursor-pointer">
            <StatCard icon={<TrendingUp size={22} className="text-green-700"  />} label="Total Revenue"  value={`₹${totalRevenue.toLocaleString("en-IN")}`} sub="All time"               color="bg-green-50"  delay={0.26} />
          </div>
          <div onClick={() => navigate("/owner/rentals")} className="cursor-pointer">
            <StatCard icon={<Users      size={22} className="text-blue-700"   />} label="Total Tenants"  value={activeRentals}   sub="Active agreements"                                    color="bg-blue-50"   delay={0.34} />
          </div>
        </div>

        {/* ── Recent Activity ─────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Recent Rentals */}
          <motion.div
            className="bg-white rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
          >
            <div className="bg-beige-card px-6 py-4 flex items-center justify-between border-b border-beige-card/60">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-btn bg-white flex items-center justify-center shadow-card">
                  <HomeIcon size={15} className="text-brown-dark" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-brown-dark leading-none">Recent Rentals</p>
                  <p className="text-xs font-semibold text-brown-muted mt-0.5">{recentRentals.length} latest agreements</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/owner/rentals")}
                className="text-xs font-bold text-brown-muted hover:text-brown-dark flex items-center gap-1 transition-colors px-3 py-1.5 rounded-btn hover:bg-beige-input"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="px-6 py-2">
              {recentRentals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <div className="size-10 rounded-card bg-beige-card flex items-center justify-center">
                    <HomeIcon size={18} className="text-brown-muted" />
                  </div>
                  <p className="text-sm font-semibold text-brown-muted">No rentals yet</p>
                </div>
              ) : (
                recentRentals.map(rental => (
                  <RecentRow
                    key={rental.id}
                    left={rental.property_title ?? `#${rental.id.slice(0, 8)}`}
                    sub={rental.tenant_name}
                    right={`₹${Number(rental.monthly_rent).toLocaleString("en-IN")}/mo`}
                    badge={<StatusBadge status={rental.status} />}
                    onClick={() => navigate(`/owner/rentals/${rental.id}`)}
                  />
                ))
              )}
            </div>
          </motion.div>

          {/* Recent Payments */}
          <motion.div
            className="bg-white rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-beige-card px-6 py-4 flex items-center justify-between border-b border-beige-card/60">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-btn bg-white flex items-center justify-center shadow-card">
                  <CreditCard size={15} className="text-brown-dark" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-brown-dark leading-none">Recent Payments</p>
                  <p className="text-xs font-semibold text-brown-muted mt-0.5">₹{totalRevenue.toLocaleString("en-IN")} total received</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/payments")}
                className="text-xs font-bold text-brown-muted hover:text-brown-dark flex items-center gap-1 transition-colors px-3 py-1.5 rounded-btn hover:bg-beige-input"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="px-6 py-2">
              {recentPayments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <div className="size-10 rounded-card bg-beige-card flex items-center justify-center">
                    <CreditCard size={18} className="text-brown-muted" />
                  </div>
                  <p className="text-sm font-semibold text-brown-muted">No payments yet</p>
                </div>
              ) : (
                recentPayments.map(payment => (
                  <RecentRow
                    key={payment.id}
                    left={payment.payment_type === "monthly" ? "Monthly Rent" : "Security Deposit"}
                    sub={payment.month_year ?? ""}
                    right={`₹${Number(payment.amount).toLocaleString("en-IN")}`}
                    badge={<StatusBadge status={payment.payment_status} />}
                    onClick={() => navigate(`/payments/${payment.id}`)}
                  />
                ))
              )}
            </div>
          </motion.div>

        </div>

        {/* ── Properties snapshot ────────────────────────── */}
        {properties && properties.length > 0 && (
          <motion.div
            className="bg-white rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.5 }}
          >
            <div className="bg-beige-card px-6 py-4 flex items-center justify-between border-b border-beige-card/60">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-btn bg-white flex items-center justify-center shadow-card">
                  <Building2 size={15} className="text-brown-dark" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-brown-dark leading-none">Your Properties</p>
                  <p className="text-xs font-semibold text-brown-muted mt-0.5">{availableProps} of {totalProperties} available</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/owner/properties")}
                className="text-xs font-bold text-brown-muted hover:text-brown-dark flex items-center gap-1 transition-colors px-3 py-1.5 rounded-btn hover:bg-beige-input"
              >
                Manage <ArrowRight size={12} />
              </button>
            </div>
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.slice(0, 3).map((property, i) => (
                <motion.div
                  key={property.id}
                  className="flex items-center gap-3 p-3 rounded-card border border-beige-card hover:bg-beige-input cursor-pointer transition-colors"
                  onClick={() => navigate(`/owner/properties/${property.id}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.06 }}
                >
                  {property.image_url ? (
                    <img src={property.image_url} alt={property.title} className="size-12 rounded-btn object-cover shrink-0" />
                  ) : (
                    <div className="size-12 rounded-btn bg-beige-card flex items-center justify-center shrink-0">
                      <Building2 size={18} className="text-brown-muted" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-brown-dark truncate">{property.title}</p>
                    <p className="text-xs font-semibold text-brown-muted truncate">{property.city}</p>
                    <p className="text-xs font-bold text-brown-dark mt-0.5">₹{Number(property.rent_amount).toLocaleString("en-IN")}/mo</p>
                  </div>
                  <StatusBadge status={property.is_available ? "available" : "not_available"} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default Home