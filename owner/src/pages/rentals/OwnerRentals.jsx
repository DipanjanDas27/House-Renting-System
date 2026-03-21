import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Home } from "lucide-react"

import { ownerGetRentals } from "@/services/ownerRentalThunks.js"
import RentalCard from "@/components/custom/RentalCard.jsx"
import { RentalsSkeleton } from "@/components/custom/skeletons/index.jsx"

const OwnerRentals = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { rentals, loading, error } = useSelector((state) => state.rental)

  useEffect(() => {
    dispatch(ownerGetRentals())
  }, [dispatch])

  const handleView = useCallback((id) => navigate(`/owner/rentals/${id}`), [navigate])

  if (loading) return <RentalsSkeleton />

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">

      {/* ── Page header ───────────────────────────────────── */}
      <div className="bg-beige-card/50 border-b border-beige-card px-6 py-8">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="size-11 rounded-btn bg-white flex items-center justify-center shadow-card">
            <Home size={20} className="text-brown-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-brown-dark leading-none">Rentals</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">
              {rentals?.length ?? 0} rental agreement{rentals?.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {error && (
          <motion.p
            className="text-xs font-semibold text-red-500 text-center bg-red-50 border border-red-200 rounded-btn py-2.5 px-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {!rentals || rentals.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="size-16 rounded-card bg-beige-card flex items-center justify-center mb-4">
              <Home size={28} className="text-brown-muted" />
            </div>
            <p className="text-base font-bold text-brown-dark mb-1">No rentals yet</p>
            <p className="text-sm font-semibold text-brown-muted">Rental agreements will appear here</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentals.map((rental, i) => (
              <motion.div
                key={rental.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <RentalCard rental={rental} onView={handleView} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OwnerRentals