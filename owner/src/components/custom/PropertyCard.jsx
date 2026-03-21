import { memo } from "react"
import { motion } from "motion/react"
import { MapPin, IndianRupee, BedDouble, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./DashboardWidgets.jsx"

const PropertyCard = ({ property, onView }) => (
  <motion.div
    className="bg-white rounded-card border border-beige-card shadow-card font-montserrat overflow-hidden"
    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(43,27,18,0.14)" }}
    transition={{ duration: 0.2 }}
  >
    {property.image_url && (
      <div className="relative h-44 overflow-hidden">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brown-dark/40 to-transparent" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={property.is_available ? "available" : "not_available"} />
        </div>
      </div>
    )}

    <div className="px-5 pt-4 pb-5 space-y-3">
      <div>
        <p className="text-base font-extrabold text-brown-dark leading-tight truncate">{property.title}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={13} className="text-brown-muted shrink-0" />
          <p className="text-xs font-semibold text-brown-muted truncate">{property.city}, {property.state}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <IndianRupee size={14} className="text-brown-muted" />
          <span className="text-lg font-extrabold text-brown-dark">
            {Number(property.rent_amount).toLocaleString("en-IN")}
          </span>
          <span className="text-xs font-semibold text-brown-muted">/mo</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-brown-muted">
          <BedDouble size={14} />
          {property.bhk} BHK
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => onView(property.id)}
        className="w-full h-9 rounded-btn border-beige-card text-brown-dark font-semibold text-sm hover:bg-beige-input hover:border-brown-muted transition-colors duration-150 flex items-center justify-center gap-1.5"
      >
        View Details
        <ArrowRight size={14} />
      </Button>
    </div>
  </motion.div>
)

export default memo(PropertyCard)