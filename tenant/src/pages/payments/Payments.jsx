import { useEffect, useMemo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getTenantPayments } from "@/services/tenantPaymentThunks.js"
import PaymentCard from "@/components/custom/PaymentCard"

const Payments = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { payments } = useSelector(
    (state) => state.payment
  )

  useEffect(() => {
    dispatch(getTenantPayments())
  }, [dispatch])

  const paymentList = useMemo(
    () => payments || [],
    [payments]
  )

  const handleView = useCallback(
    (id) => navigate(`/payments/${id}`),
    [navigate]
  )

  return (

    <div className="grid gap-4">

      {paymentList.map((payment) => (

        <PaymentCard
          key={payment.id}
          payment={payment}
          onView={handleView}
        />

      ))}

    </div>

  )
}

export default Payments