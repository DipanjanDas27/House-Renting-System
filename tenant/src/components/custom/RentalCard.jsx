import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const RentalCard = ({ rental, onView }) => {

  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Rental #{rental.id.slice(0, 8)}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center">

        <div className="space-y-1 text-sm">

          <p>
            Property: {rental.property_title}
          </p>

          <p>
            Rent: ₹{rental.monthly_rent}
          </p>

          <p>
            Status: {rental.status}
          </p>

        </div>

        <Button
          variant="outline"
          onClick={() => onView(rental.id)}
        >
          View
        </Button>

      </CardContent>

    </Card>
  )
}

export default memo(RentalCard)