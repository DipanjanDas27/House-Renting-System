import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PaymentCard = ({ payment, onView }) => {

  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Transaction {payment.transaction_id}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center">

        <div className="space-y-1 text-sm">
          <p>Amount: ₹{payment.amount}</p>
          <p>Status: {payment.status}</p>
        </div>

        <Button
          variant="outline"
          onClick={() => onView(payment.id)}
        >
          View
        </Button>

      </CardContent>

    </Card>
  )
}

export default memo(PaymentCard)