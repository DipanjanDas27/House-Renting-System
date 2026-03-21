import { lazy } from "react"
import AuthLayout from "@/components/custom/AuthLayout"

const OwnerProperties = lazy(() => import("@/pages/properties/OwnerProperties"))
const CreateProperty = lazy(() => import("@/pages/properties/CreateProperty"))
const UpdateProperty = lazy(() => import("@/pages/properties/UpdateProperty"))
const PropertyDetails = lazy(() => import("@/pages/properties/PropertyDetails"))

const propertyRoutes = [
  {
    path: "/owner/properties",
    element: (
      <AuthLayout authentication={true}>
        <OwnerProperties />
      </AuthLayout>
    )
  },
  {
    path: "/owner/properties/create",
    element: (
      <AuthLayout authentication={true}>
        <CreateProperty />
      </AuthLayout>
    )
  },
  {
    path: "/owner/properties/:propertyId",
    element: (
      <AuthLayout authentication={true}>
        <PropertyDetails />
      </AuthLayout>
    )
  },
  {
    path: "/owner/properties/:propertyId/edit",
    element: (
      <AuthLayout authentication={true}>
        <UpdateProperty />
      </AuthLayout>
    )
  }
]

export default propertyRoutes