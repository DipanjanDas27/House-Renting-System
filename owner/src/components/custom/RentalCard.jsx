import { memo } from "react"
import { motion } from "motion/react"
import { Home, IndianRupee, User, ArrowRight, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./DashboardWidgets.jsx"

const RentalCard = ({ rental, onView }) => (
  <motion.div
    className="bg-white rounded-card border border-beige-card shadow-card font-montserrat overflow-hidden"
    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(43,27,18,0.14)" }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-beige-card/60">
      <div className="size-10 rounded-btn bg-beige-card flex items-center justify-center shrink-0">
        <Home size={18} className="text-brown-dark" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-brown-muted leading-none mb-1">Rental</p>
        <p className="text-sm font-bold text-brown-dark truncate">
          #{(rental.id ?? "").slice(0, 8)}
        </p>
      </div>
      <StatusBadge status={rental.status} />
    </div>

    <div className="px-5 py-4 space-y-2.5">
      <div className="flex items-center gap-2">
        <User size={13} className="text-brown-muted shrink-0" />
        <p className="text-sm font-bold text-brown-dark truncate">{rental.tenant_name ?? "Tenant"}</p>
      </div>
      <div className="flex items-center gap-2">
        <IndianRupee size={13} className="text-brown-muted shrink-0" />
        <p className="text-sm font-bold text-brown-dark">
          ₹{Number(rental.monthly_rent).toLocaleString("en-IN")}
          <span className="text-xs font-semibold text-brown-muted ml-1">/mo</span>
        </p>
      </div>
      {rental.property_title && (
        <div className="flex items-center gap-2">
          <Home size={13} className="text-brown-muted shrink-0" />
          <p className="text-xs font-semibold text-brown-muted truncate">{rental.property_title}</p>
        </div>
      )}
    </div>

    <div className="px-5 pb-5">
      <Button
        variant="outline"
        onClick={() => onView(rental.id)}
        className="w-full h-9 rounded-btn border-beige-card text-brown-dark font-semibold text-sm hover:bg-beige-input hover:border-brown-muted transition-colors duration-150 flex items-center justify-center gap-1.5"
      >
        View Details
        <ArrowRight size={14} />
      </Button>
    </div>
  </motion.div>
)

export default memo(RentalCard)