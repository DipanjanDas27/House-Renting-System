import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { MapPin, IndianRupee, ArrowLeft, Home, FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import { getProperty } from "@/services/tenantPropertyThunks.js"
import { Button } from "@/components/ui/button"

const PropertyDetails = () => {
  const { propertyId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { property } = useSelector((state) => state.property)

  useEffect(() => {
    dispatch(getProperty(propertyId))
  }, [dispatch, propertyId])

  const handleCreateRental = useCallback(() => {
    navigate(`/rentals/create/${propertyId}`)
  }, [navigate, propertyId])

  if (!property) return (
    <div className="min-h-screen bg-cream-bg font-montserrat">
      <Skeleton className="w-full h-105 bg-beige-card" />
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
        <Skeleton className="h-9 w-2/3 rounded-btn bg-beige-card" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32 rounded-btn bg-beige-card" />
          <Skeleton className="h-4 w-28 rounded-btn bg-beige-card" />
        </div>
        <Skeleton className="h-32 w-full rounded-card bg-beige-card" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 rounded-card bg-beige-card" />
          <Skeleton className="h-20 rounded-card bg-beige-card" />
        </div>
        <Skeleton className="h-14 w-full rounded-btn bg-beige-card" />
      </div>
    </div>
  )
  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">

      <motion.div
        className="relative w-full h-105 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={property.image_url}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-brown-dark/60 via-transparent to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-brown-dark text-sm font-bold px-4 py-2 rounded-btn hover:bg-white transition-colors duration-150 shadow-card"
        >
          <ArrowLeft size={15} />
          Back
        </button>
      </motion.div>

      <div className="max-w-3xl mx-auto px-6 py-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
        >
          <h1 className="text-3xl font-extrabold text-brown-dark leading-tight mb-4">
            {property.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-sm font-bold text-brown-mid">
              <MapPin size={16} className="text-brown-muted" />
              {property.city}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-brown-mid">
              <IndianRupee size={16} className="text-brown-muted" />
              ₹{Number(property.rent_amount).toLocaleString("en-IN")}
              <span className="text-xs font-semibold text-brown-muted">/mo</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-card shadow-card p-6 mb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-brown-muted" />
            <p className="text-sm font-bold text-brown-dark">Description</p>
          </div>
          <p className="text-sm font-semibold text-brown-mid leading-relaxed">
            {property.description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
        >
          <div className="bg-white rounded-card shadow-card p-5 flex items-center gap-3">
            <div className="size-10 rounded-btn bg-beige-card flex items-center justify-center">
              <MapPin size={18} className="text-brown-dark" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brown-muted leading-none mb-1">City</p>
              <p className="text-sm font-bold text-brown-dark">{property.city}</p>
            </div>
          </div>
          <div className="bg-white rounded-card shadow-card p-5 flex items-center gap-3">
            <div className="size-10 rounded-btn bg-beige-card flex items-center justify-center">
              <IndianRupee size={18} className="text-brown-dark" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brown-muted leading-none mb-1">Monthly Rent</p>
              <p className="text-sm font-bold text-brown-dark">₹{Number(property.rent_amount).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.45 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleCreateRental}
              className="w-full h-14 bg-brown-dark hover:bg-[#1a0f09] text-white font-bold text-base rounded-btn transition-colors duration-150 flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Rent This Property
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

export default PropertyDetails