import Properties from "../pages/properties/Properties.jsx"
import PropertyDetails from "../pages/properties/PropertyDetails.jsx"

const propertyRoutes = [
  { path: "/properties", element: <Properties /> },
  { path: "/properties/:propertyId", element: <PropertyDetails /> }
]

export default propertyRoutes