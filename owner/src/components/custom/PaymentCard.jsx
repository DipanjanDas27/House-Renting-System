import { memo } from "react"
import { motion } from "motion/react"
import { CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./DashboardWidgets.jsx"

const PaymentCard = ({ payment, onView }) => (
  <motion.div
    className="bg-white rounded-card border border-beige-card shadow-card font-montserrat overflow-hidden"
    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(43,27,18,0.14)" }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-beige-card/60">
      <div className="size-10 rounded-btn bg-beige-card flex items-center justify-center shrink-0">
        <CreditCard size={18} className="text-brown-dark" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-brown-muted leading-none mb-1">Transaction ID</p>
        <p className="text-sm font-bold text-brown-dark truncate">
          {payment.transaction_id || "Not generated"}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <StatusBadge status={payment.payment_status} />
        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-beige-card text-brown-muted border border-beige-card/60">
          {payment.payment_type === "monthly" ? "Monthly" : "Security"}
        </span>
      </div>
    </div>

    <div className="px-5 py-4 flex items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-brown-muted leading-none">Amount</p>
        <p className="text-xl font-extrabold text-brown-dark leading-none">
          ₹{Number(payment.amount).toLocaleString("en-IN")}
        </p>
        {payment.payment_type === "monthly" && payment.month_year && (
          <p className="text-xs font-semibold text-brown-muted">{payment.month_year}</p>
        )}
      </div>
      <Button
        variant="outline"
        onClick={() => onView(payment.id)}
        className="shrink-0 h-9 px-4 rounded-btn border-beige-card text-brown-dark font-semibold text-sm hover:bg-beige-input hover:border-brown-muted transition-colors duration-150 flex items-center gap-1.5"
      >
        View
        <ArrowRight size={14} />
      </Button>
    </div>
  </motion.div>
)

export default memo(PaymentCard)