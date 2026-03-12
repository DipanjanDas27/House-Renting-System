import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PropertyCard = ({ property, onView }) => {

  return (
    <Card>

      <CardHeader>
        <CardTitle>{property.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center">

        <div className="space-y-1 text-sm">
          <p>{property.city}</p>
          <p>₹{property.rent_amount}</p>
        </div>

        <Button
          variant="outline"
          onClick={() => onView(property.id)}
        >
          View
        </Button>

      </CardContent>

    </Card>
  )
}

export default memo(PropertyCard)