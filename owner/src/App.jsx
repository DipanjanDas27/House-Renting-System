import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Navbar from "./components/custom/Navbar"
import Footer from "./components/custom/Footer"
import { DashboardSkeleton } from "@/components/custom/skeletons/index.jsx"
import { getCurrentUser } from "./services/userThunks"
import ScrollToTop from "./components/custom/ScrollToTop"

const App = () => {
  const dispatch = useDispatch()
  const { isInitialized } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <DashboardSkeleton />
    )
  }

  return (
    <>
      <Navbar />
      <ScrollToTop/>
      <main className="min-h-screen bg-cream-bg pt-18">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App