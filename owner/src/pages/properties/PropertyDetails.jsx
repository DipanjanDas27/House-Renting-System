import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import {
  MapPin, IndianRupee, BedDouble, Sofa,
  ArrowLeft, Pencil, Trash2, CheckCircle2, XCircle,
  Home, CalendarDays, Users, Shield
} from "lucide-react"

import { getProperty, ownerDeleteProperty } from "@/services/ownerPropertyThunks.js"
import { Button } from "@/components/ui/button"
import { PropertyDetailsSkeleton } from "@/components/custom/skeletons/index.jsx"

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-beige-card/60 last:border-0">
    <div className="flex items-center gap-2 text-sm font-semibold text-brown-muted shrink-0">
      {icon}
      {label}
    </div>
    <span className="text-sm font-bold text-brown-dark text-right">{value}</span>
  </div>
)

const PropertyDetails = () => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { propertyId } = useParams()
  const [deleting, setDeleting] = useState(false)

  const { property, loading } = useSelector((state) => state.property)

  useEffect(() => {
    dispatch(getProperty(propertyId))
  }, [dispatch, propertyId])

  const handleDelete = async () => {
    setDeleting(true)
    await dispatch(ownerDeleteProperty(propertyId))
    setDeleting(false)
    navigate("/owner/properties")
  }

  if (loading || !property) return <PropertyDetailsSkeleton />

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">

      {/* ── Hero image ────────────────────────────────────── */}
      {property.image_url && (
        <div className="relative h-90 overflow-hidden">
          <img src={property.image_url} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-brown-dark/60 via-transparent to-transparent" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-btn hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white/80 text-sm font-semibold mb-1 flex items-center gap-1.5">
              <MapPin size={14} />
              {property.city}, {property.state}
            </p>
            <h1 className="text-3xl font-extrabold text-white">{property.title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {!property.image_url && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-brown-muted hover:text-brown-dark transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            Back to Properties
          </button>
        )}

        {/* ── Availability badge + price ─────────────────── */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <IndianRupee size={22} className="text-brown-dark" />
            <span className="text-3xl font-extrabold text-brown-dark">
              {Number(property.rent_amount).toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-semibold text-brown-muted">/mo</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
            property.is_available
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {property.is_available
              ? <><CheckCircle2 size={13} /> Available</>
              : <><XCircle size={13} /> Not Available</>
            }
          </div>
        </motion.div>

        {/* ── Description ───────────────────────────────── */}
        {property.description && (
          <motion.div
            className="bg-white rounded-card shadow-card p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <p className="text-xs font-bold text-brown-muted uppercase tracking-widest mb-3">Description</p>
            <p className="text-sm font-semibold text-brown-dark leading-relaxed">{property.description}</p>
          </motion.div>
        )}

        {/* ── Details ───────────────────────────────────── */}
        <motion.div
          className="bg-white rounded-card shadow-card overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <div className="bg-beige-card px-6 py-4 border-b border-beige-card/60">
            <p className="text-xs font-bold text-brown-muted uppercase tracking-widest">Property Details</p>
          </div>
          <div className="px-6 py-2">
            <DetailRow icon={<BedDouble size={14} />}    label="BHK"              value={`${property.bhk} BHK`} />
            <DetailRow icon={<Sofa size={14} />}         label="Furnishing"        value={property.furnishing ?? "—"} />
            <DetailRow icon={<Home size={14} />}         label="Total Rooms"       value={property.total_rooms} />
            <DetailRow icon={<CheckCircle2 size={14} />} label="Available Rooms"   value={property.available_rooms} />
            <DetailRow icon={<Shield size={14} />}       label="Security Deposit"  value={`₹${Number(property.security_deposit).toLocaleString("en-IN")}`} />
            <DetailRow icon={<CalendarDays size={14} />} label="Notice Period"     value={`${property.notice_period_days} days`} />
            {property.is_shared && (
              <>
                <DetailRow icon={<Users size={14} />}    label="Max Tenants"       value={property.max_tenants} />
                <DetailRow icon={<Users size={14} />}    label="Current Tenants"   value={property.current_tenants} />
              </>
            )}
            <DetailRow icon={<MapPin size={14} />}       label="Address"           value={property.address} />
            <DetailRow icon={<MapPin size={14} />}       label="Pincode"           value={property.pincode} />
          </div>
        </motion.div>

        {/* ── Action buttons ────────────────────────────── */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => navigate(`/owner/properties/${property.id}/edit`)}
              className="w-full h-12 bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-sm rounded-btn flex items-center justify-center gap-2"
            >
              <Pencil size={15} />
              Edit Property
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="h-12 px-5 rounded-btn border-red-200 text-red-600 hover:bg-red-50 font-semibold text-sm flex items-center justify-center gap-2"
            >
              {deleting ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 rounded-full border-2 border-red-300 border-t-red-600 animate-spin" />
                  Deleting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 size={15} />
                  Delete
                </span>
              )}
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

export default PropertyDetails