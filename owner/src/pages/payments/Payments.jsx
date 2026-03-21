import { useEffect, useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { CreditCard } from "lucide-react"

import { ownerGetPayments } from "@/services/ownerPaymentThunks.js"
import PaymentCard from "@/components/custom/PaymentCard.jsx"
import { PaymentsSkeleton } from "@/components/custom/skeletons/index.jsx"

const TABS = [
  { key: "all",      label: "All Payments"     },
  { key: "monthly",  label: "Monthly Rent"      },
  { key: "security", label: "Security Deposits" },
]

const Payments = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { payments, loading } = useSelector((state) => state.payment)

  const [filter, setFilter] = useState("all")

  useEffect(() => {
    dispatch(ownerGetPayments())
  }, [dispatch])

  const handleView = useCallback((id) => navigate(`/payments/${id}`), [navigate])

  const filteredPayments = useMemo(() => {
    if (!payments) return []
    if (filter === "all")      return payments
    if (filter === "monthly")  return payments.filter(p => p.payment_type === "monthly")
    if (filter === "security") return payments.filter(p => p.payment_type === "security")
    return payments
  }, [payments, filter])

  if (loading) return <PaymentsSkeleton />

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* ── Header ────────────────────────────────────── */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="size-11 rounded-btn bg-white flex items-center justify-center shadow-card">
            <CreditCard size={20} className="text-brown-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-brown-dark leading-none">Payments</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">
              {filteredPayments.length} {filter === "all" ? "total" : filter} payment{filteredPayments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* ── Filter tabs ───────────────────────────────── */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-btn text-sm font-bold transition-colors duration-150 ${
                filter === tab.key
                  ? "bg-brown-dark text-white"
                  : "bg-beige-card text-brown-muted hover:bg-beige-input"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Payment list ──────────────────────────────── */}
        {filteredPayments.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="size-14 rounded-card bg-beige-card flex items-center justify-center mb-4">
              <CreditCard size={24} className="text-brown-muted" />
            </div>
            <p className="text-base font-bold text-brown-dark mb-1">No payments found</p>
            <p className="text-sm font-semibold text-brown-muted">
              {filter === "all" ? "No payment history yet" : `No ${filter} payments yet`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.map((payment, i) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <PaymentCard payment={payment} onView={handleView} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Payments