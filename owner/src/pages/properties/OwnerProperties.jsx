import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Building2, Plus } from "lucide-react"

import { ownerGetProperties } from "@/services/ownerPropertyThunks.js"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/custom/PropertyCard.jsx"
import { PropertiesSkeleton } from "@/components/custom/skeletons/index.jsx"

const OwnerProperties = () => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { properties, loading } = useSelector((state) => state.property)

  useEffect(() => {
    dispatch(ownerGetProperties())
  }, [dispatch])

  const handleView = useCallback((id) => navigate(`/owner/properties/${id}`), [navigate])

  if (loading) return <PropertiesSkeleton />

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">

      {/* ── Page header ───────────────────────────────────── */}
      <div className="bg-beige-card/50 border-b border-beige-card px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-btn bg-white flex items-center justify-center shadow-card">
              <Building2 size={20} className="text-brown-dark" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-brown-dark leading-none">My Properties</h1>
              <p className="text-sm font-semibold text-brown-muted mt-1">
                {properties?.length ?? 0} propert{properties?.length === 1 ? "y" : "ies"} listed
              </p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => navigate("/owner/properties/create")}
              className="h-10 px-5 rounded-btn bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-sm flex items-center gap-2"
            >
              <Plus size={16} />
              Add Property
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ── Properties grid ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {!properties || properties.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="size-16 rounded-card bg-beige-card flex items-center justify-center mb-4">
              <Building2 size={28} className="text-brown-muted" />
            </div>
            <p className="text-base font-bold text-brown-dark mb-1">No properties yet</p>
            <p className="text-sm font-semibold text-brown-muted mb-6">Start by adding your first property</p>
            <Button
              onClick={() => navigate("/owner/properties/create")}
              className="h-10 px-6 rounded-btn bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-sm flex items-center gap-2"
            >
              <Plus size={15} />
              Add Your First Property
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <PropertyCard property={property} onView={handleView} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default OwnerProperties