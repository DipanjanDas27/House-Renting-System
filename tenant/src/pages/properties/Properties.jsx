import { useEffect, useMemo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Building2, SearchX } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import { getFilteredProperties } from "@/services/tenantPropertyThunks.js"
import PropertySearch from "@/components/custom/PropertySearch"
import PropertyCard from "@/components/custom/PropertyCard"

const Properties = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { properties, loading } = useSelector((state) => state.property)

  useEffect(() => {
    dispatch(getFilteredProperties({ minPrice: 0, maxPrice: 100000 }))
  }, [dispatch])

  const propertyList = useMemo(() => properties || [], [properties])

  const handleView = useCallback((id) => navigate(`/properties/${id}`), [navigate])

  if (!propertyList.length && loading) return (
    <div className="min-h-screen bg-cream-bg font-montserrat">
      <div className="bg-beige-card/50 border-b border-beige-card px-page py-8">
        <Skeleton className="h-7 w-40 rounded-btn bg-beige-card mb-2" />
        <Skeleton className="h-4 w-52 rounded-btn bg-beige-card mb-6" />
        <Skeleton className="w-full h-25 rounded-card bg-beige-card" />
      </div>
      <div className="px-page py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-card overflow-hidden bg-white shadow-card">
            <Skeleton className="w-full h-55 bg-beige-card" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-3/4 rounded-btn bg-beige-card" />
              <Skeleton className="h-5 w-2/3 rounded-btn bg-beige-card" />
              <Skeleton className="h-6 w-1/3 rounded-btn bg-beige-card" />
              <Skeleton className="h-10 w-full rounded-btn bg-beige-card" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">

      <div className="bg-beige-card/50 border-b border-beige-card px-page py-10">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="size-11 rounded-btn bg-white flex items-center justify-center shadow-card">
            <Building2 size={20} className="text-brown-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-brown-dark leading-none">Properties</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">
              {propertyList.length > 0 ? `${propertyList.length} properties found` : "Browse available rentals"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <PropertySearch />
        </motion.div>
      </div>

      <div className="px-page py-10">
        {propertyList.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="size-16 rounded-card bg-beige-card flex items-center justify-center mb-4">
              <SearchX size={28} className="text-brown-muted" />
            </div>
            <p className="text-base font-bold text-brown-dark mb-1">No properties found</p>
            <p className="text-sm font-semibold text-brown-muted">Try adjusting your search filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {propertyList.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 0.68, 0, 1.1] }}
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

export default Properties