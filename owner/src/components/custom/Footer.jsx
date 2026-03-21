import { useNavigate } from "react-router-dom"
import logo from "/logo.svg"

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-brown-dark font-montserrat">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Dwellio" className="h-6 w-auto brightness-0 invert" />
          <span className="text-sm font-semibold text-white/60">Owner Dashboard</span>
        </div>
        <p className="text-xs font-semibold text-white/40">
          © {new Date().getFullYear()} Dwellio — Rental Management System
        </p>
      </div>
    </footer>
  )
}

export default Footer