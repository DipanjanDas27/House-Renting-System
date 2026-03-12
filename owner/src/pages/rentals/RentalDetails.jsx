import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

import {
  ownerGetRentalById,
  ownerTerminateRental,
  ownerDeleteRental
} from "@/services/ownerRentalThunks.js"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const RentalDetails = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { rentalId } = useParams()

  const { rental, loading, error } = useSelector((state) => state.rental)

  useEffect(() => {
    dispatch(ownerGetRentalById(rentalId))
  }, [dispatch, rentalId])

  const handleTerminate = async () => {
    await dispatch(ownerTerminateRental(rentalId))
    navigate("/owner/rentals")
  }

  const handleDelete = async () => {
    await dispatch(ownerDeleteRental(rentalId))
    navigate("/owner/rentals")
  }

  if (loading || !rental) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="max-w-xl mx-auto p-4">

      <Card>

        <CardHeader>
          <CardTitle>
            Rental Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <p>
            Tenant: {rental.tenant_name}
          </p>

          <p>
            Monthly Rent: ₹{rental.monthly_rent}
          </p>

          <p>
            Status: {rental.status}
          </p>

          <p>
            Start Date: {rental.start_date}
          </p>

          <p>
            End Date: {rental.end_date}
          </p>

          <div className="flex gap-3 pt-4">

            <Button
              variant="destructive"
              onClick={handleTerminate}
            >
              Terminate Rental
            </Button>

            <Button
              variant="outline"
              onClick={handleDelete}
            >
              Delete Rental
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                navigate(`/users/${rental.tenant_id}`)
              }
            >
              View Tenant
            </Button>
            
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

        </CardContent>

      </Card>

    </div>
  )
}

export default RentalDetails