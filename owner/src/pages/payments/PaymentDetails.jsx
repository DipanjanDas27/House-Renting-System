import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import {
  CreditCard, CheckCircle2, Clock, XCircle,
  ArrowLeft, Hash, IndianRupee, CalendarDays, Link
} from "lucide-react"

import { ownerGetPaymentById } from "@/services/ownerPaymentThunks.js"
import { PaymentDetailsSkeleton } from "@/components/custom/skeletons/index.jsx"

const STATUS_CONFIG = {
  success:  { icon: <CheckCircle2 size={14} />, classes: "bg-green-50 text-green-700 border border-green-200"  },
  refunded: { icon: <CheckCircle2 size={14} />, classes: "bg-blue-50 text-blue-700 border border-blue-200"    },
  pending:  { icon: <Clock size={14} />,         classes: "bg-amber-50 text-amber-700 border border-amber-200" },
  failed:   { icon: <XCircle size={14} />,        classes: "bg-red-50 text-red-700 border border-red-200"      },
}

const getStatus = (status) =>
  STATUS_CONFIG[status?.toLowerCase()] ?? {
    icon: <Clock size={14} />,
    classes: "bg-beige-card text-brown-muted border border-beige-card",
  }

const DetailRow = ({ icon, label, value, mono }) => (
  <div className="flex items-start justify-between gap-4 py-3.5 border-b border-beige-card/60 last:border-0">
    <div className="flex items-center gap-2 text-sm font-semibold text-brown-muted shrink-0">
      {icon}
      {label}
    </div>
    <span className={`text-sm font-bold text-brown-dark text-right break-all ${mono ? "font-mono tracking-wide" : ""}`}>
      {value}
    </span>
  </div>
)

const formatDate = (ts) =>
  ts ? new Date(ts).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }) : "—"

const PaymentDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { paymentId } = useParams()

  const { payment, loading } = useSelector((state) => state.payment)

  useEffect(() => {
    dispatch(ownerGetPaymentById(paymentId))
  }, [dispatch, paymentId])

  if (loading || !payment) return <PaymentDetailsSkeleton />

  const { icon, classes } = getStatus(payment.payment_status)

  return (
    <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 0.68, 0, 1.1] }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-brown-muted hover:text-brown-dark transition-colors duration-150 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Payments
        </button>

        <div className="bg-white rounded-card shadow-card-md overflow-hidden">

          {/* ── Header ──────────────────────────────────── */}
          <div className="bg-beige-card px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-btn bg-white flex items-center justify-center">
                <CreditCard size={20} className="text-brown-dark" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brown-muted leading-none mb-1">Payment Details</p>
                <p className="text-base font-extrabold text-brown-dark leading-none">Transaction Receipt</p>
              </div>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize ${classes}`}>
              {icon}
              {payment.payment_status}
            </div>
          </div>

          {/* ── Detail rows ─────────────────────────────── */}
          <div className="px-6 py-2">
            <DetailRow icon={<IndianRupee size={14} />}   label="Amount"        value={`₹${Number(payment.amount).toLocaleString("en-IN")}`} />
            <DetailRow icon={<CheckCircle2 size={14} />}  label="Status"        value={payment.payment_status} />
            <DetailRow icon={<CreditCard size={14} />}    label="Payment Type"  value={payment.payment_type === "monthly" ? "Monthly Rent" : "Security Deposit"} />
            {payment.payment_type === "monthly" && payment.month_year && (
              <DetailRow icon={<CalendarDays size={14} />} label="Month"        value={payment.month_year} />
            )}
            {payment.due_date && (
              <DetailRow icon={<CalendarDays size={14} />} label="Due Date"     value={formatDate(payment.due_date)} />
            )}
            <DetailRow icon={<Hash size={14} />}          label="Transaction ID" value={payment.transaction_id || "Not generated"} mono />
            <DetailRow icon={<Link size={14} />}          label="Agreement ID"   value={payment.agreement_id || "—"} mono />
            <DetailRow icon={<CalendarDays size={14} />}  label="Created At"    value={formatDate(payment.created_at)} />
            <DetailRow icon={<CalendarDays size={14} />}  label="Updated At"    value={formatDate(payment.updated_at)} />
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default PaymentDetails