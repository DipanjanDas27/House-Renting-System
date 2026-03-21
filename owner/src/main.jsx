import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"

import store from "@/store/store"
import { router } from "@/routes/router"

import "./index.css"
import { DashboardSkeleton } from "./components/custom/skeletons"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={<DashboardSkeleton/>} >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
)