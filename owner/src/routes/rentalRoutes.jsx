import { lazy } from "react"
import AuthLayout from "@/components/custom/AuthLayout"

const OwnerRentals       = lazy(() => import("@/pages/rentals/OwnerRentals"))
const OwnerRentalDetails = lazy(() => import("@/pages/rentals/OwnerRentalDetails"))

const RentalRoutes = [
  {
    path: "/owner/rentals",
    element: <AuthLayout authentication={true}><OwnerRentals /></AuthLayout>
  },
  {
    path: "/owner/rentals/:rentalId",
    element: <AuthLayout authentication={true}><OwnerRentalDetails /></AuthLayout>
  }
]

export default RentalRoutes