import { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { ownerGetProperties } from "@/services/ownerPropertyThunks"

import PropertyCard from "@/components/custom/PropertyCard"

import { Button } from "@/components/ui/button"

const OwnerProperties = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { properties, loading } = useSelector((state) => state.property)

  useEffect(() => {
    dispatch(ownerGetProperties())
  }, [dispatch])

  const handleView = useCallback(
    (id) => navigate(`/owner/properties/${id}`),
    [navigate]
  )

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">

      <div className="flex justify-between">

        <h1 className="text-2xl font-semibold">
          Properties
        </h1>

        <Button
          onClick={() =>
            navigate("/owner/properties/create")
          }
        >
          Add Property
        </Button>

      </div>

      <div className="grid gap-4">

        {properties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onView={handleView}
          />
        ))}

      </div>

    </div>
  )
}

export default OwnerProperties