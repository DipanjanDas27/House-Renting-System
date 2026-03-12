import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Home = () => {

  const navigate = useNavigate()

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-8">

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Owner Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage your properties, rentals and payments
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <Card>

          <CardHeader>
            <CardTitle>Properties</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            <p className="text-sm text-muted-foreground">
              Manage and update your listed properties
            </p>

            <Button
              className="w-full"
              onClick={() =>
                navigate("/owner/properties")
              }
            >
              View Properties
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                navigate("/owner/properties/create")
              }
            >
              Add Property
            </Button>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Rentals</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            <p className="text-sm text-muted-foreground">
              View tenant rentals and agreements
            </p>

            <Button
              className="w-full"
              onClick={() =>
                navigate("/owner/rentals")
              }
            >
              Manage Rentals
            </Button>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Payments</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            <p className="text-sm text-muted-foreground">
              Track rent and deposit payments
            </p>

            <Button
              className="w-full"
              onClick={() =>
                navigate("/payments")
              }
            >
              View Payments
            </Button>

          </CardContent>

        </Card>

      </div>

    </div>

  )
}

export default Home