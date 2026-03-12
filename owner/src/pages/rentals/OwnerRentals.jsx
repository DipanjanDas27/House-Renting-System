import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { ownerGetRentals } from "@/services/ownerRentalThunks.js"

import RentalCard from "@/components/custom/RentalCard"

const OwnerRentals = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { rentals, loading, error } = useSelector((state) => state.rental)

  useEffect(() => {
    dispatch(ownerGetRentals())
  }, [dispatch])

  const handleView = useCallback(
    (id) => navigate(`/owner/rentals/${id}`),
    [navigate]
  )

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">

      <h1 className="text-2xl font-semibold">
        Rentals
      </h1>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <div className="grid gap-4">

        {rentals?.map((rental) => (
          <RentalCard
            key={rental.id}
            rental={rental}
            onView={handleView}
          />
        ))}

      </div>

    </div>
  )
}

export default OwnerRentals