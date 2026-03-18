import { useEffect, useMemo, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "motion/react"
import { Building2, SearchX } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import { getFilteredProperties } from "@/services/tenantPropertyThunks.js"
import PropertySearch from "@/components/custom/PropertySearch"
import PropertyCard from "@/components/custom/PropertyCard"

const DEFAULT_FILTER = { minPrice: 0, maxPrice: 1000000 }

const Properties = () => {
  const dispatch = useDispatch()
  const { properties, loading } = useSelector((state) => state.property)

  const [search,      setSearch]      = useState("")
  const [minPrice,    setMinPrice]    = useState("")
  const [maxPrice,    setMaxPrice]    = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    dispatch(getFilteredProperties(DEFAULT_FILTER))
  }, [dispatch])

  const handleSearch = useCallback(() => {
    if (!search && !minPrice && !maxPrice) return
    setHasSearched(true)
    dispatch(getFilteredProperties({ search, minPrice, maxPrice }))
  }, [dispatch, search, minPrice, maxPrice])

  const handleReset = useCallback(() => {
    setSearch("")
    setMinPrice("")
    setMaxPrice("")
    setHasSearched(false)
    dispatch(getFilteredProperties(DEFAULT_FILTER))
  }, [dispatch])

  const propertyList = useMemo(() => properties || [], [properties])

  if (loading) return (
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
              <Skeleton className="h-10 w-full rounded-btn bg-beige-card" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">

      <div className="bg-beige-card/50 border-b border-beige-card px-page py-8">
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
              {propertyList.length > 0
                ? `${propertyList.length} properties found`
                : hasSearched
                  ? "No results for your search"
                  : "Browse available rentals"}
            </p>
          </div>
        </motion.div>

        <PropertySearch
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSearchChange={setSearch}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onSearch={handleSearch}
          onReset={handleReset}
        />
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
            <p className="text-base font-bold text-brown-dark mb-1">
              {hasSearched ? "No properties found for your search" : "No properties available"}
            </p>
            <p className="text-sm font-semibold text-brown-muted">
              {hasSearched ? "Try a different location or price range" : "Check back later"}
            </p>
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
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Properties