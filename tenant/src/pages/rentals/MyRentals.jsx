import { useEffect, useMemo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getTenantRentals } from "@/services/tenantRentalThunks.js"
import RentalCard from "@/components/custom/RentalCard"

const MyRentals = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { rentals } = useSelector(
    (state) => state.rental
  )

  useEffect(() => {
    dispatch(getTenantRentals())
  }, [dispatch])

  const rentalList = useMemo(
    () => rentals || [],
    [rentals]
  )

  const handleView = useCallback(
    (id) => navigate(`/rentals/${id}`),
    [navigate]
  )

  return (

    <div className="grid md:grid-cols-2 gap-4">

      {rentalList.map((rental) => (

        <RentalCard
          key={rental.id}
          rental={rental}
          onView={handleView}
        />

      ))}

    </div>

  )
}

export default MyRentals