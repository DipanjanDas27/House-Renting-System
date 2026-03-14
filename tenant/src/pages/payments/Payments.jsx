import { useEffect, useMemo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { CreditCard, ReceiptText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import { getTenantPayments } from "@/services/tenantPaymentThunks.js"
import PaymentCard from "@/components/custom/PaymentCard"

const Payments = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { payments } = useSelector((state) => state.payment)

  useEffect(() => {
    dispatch(getTenantPayments())
  }, [dispatch])

  const paymentList = useMemo(() => payments || [], [payments])

  const handleView = useCallback((id) => navigate(`/payments/${id}`), [navigate])

  if (!payments) return (
    <div className="min-h-screen bg-cream-bg px-4 pt-10 font-montserrat">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="size-11 rounded-btn bg-beige-card" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 rounded-btn bg-beige-card" />
            <Skeleton className="h-3 w-48 rounded-btn bg-beige-card" />
          </div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-beige-card/60">
              <Skeleton className="size-10 rounded-btn bg-beige-card shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-24 rounded-btn bg-beige-card" />
                <Skeleton className="h-4 w-48 rounded-btn bg-beige-card" />
              </div>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-7 w-28 rounded-btn bg-beige-card" />
                <Skeleton className="h-5 w-20 rounded-full bg-beige-card" />
              </div>
              <Skeleton className="h-10 w-20 rounded-btn bg-beige-card" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
      <div className="max-w-2xl mx-auto">

        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="size-11 rounded-btn bg-beige-card flex items-center justify-center">
            <CreditCard size={20} className="text-brown-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-brown-dark leading-none">Payments</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">Your transaction history</p>
          </div>
        </motion.div>

        {paymentList.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="size-16 rounded-card bg-beige-card flex items-center justify-center mb-4">
              <ReceiptText size={28} className="text-brown-muted" />
            </div>
            <p className="text-base font-bold text-brown-dark mb-1">No payments yet</p>
            <p className="text-sm font-semibold text-brown-muted">Your payment history will appear here</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {paymentList.map((payment, i) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
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