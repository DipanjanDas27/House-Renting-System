import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import {
  Building2, Home, CreditCard, User,
  ChevronDown, Menu, X, LogOut
} from "lucide-react"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/services/authThunks.js"
import logo from "/logo.svg"

const Navbar = () => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const dispatch  = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const [userOpen,   setUserOpen]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const userRef = useRef(null)

  useEffect(() => {
    setUserOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const fn = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [])

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate("/login")
  }

  const navLinks = [
    { label: "Properties", icon: <Building2 size={15} />, path: "/owner/properties" },
    { label: "Rentals",    icon: <Home size={15} />,      path: "/owner/rentals"    },
    { label: "Payments",   icon: <CreditCard size={15} />, path: "/payments"        },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-beige-card shadow-card font-montserrat">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">

        <img
          src={logo}
          alt="Dwellio"
          className="h-7 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />

        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-btn text-sm font-bold transition-colors duration-150 ${
                  location.pathname.startsWith(link.path)
                    ? "bg-beige-card text-brown-dark"
                    : "text-brown-muted hover:text-brown-dark hover:bg-beige-input"
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>
        )}

       
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block px-4 py-2 rounded-btn text-sm font-bold text-brown-dark border border-beige-card hover:bg-beige-input transition-colors duration-150"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="hidden md:block px-4 py-2 rounded-btn text-sm font-bold bg-brown-dark text-white hover:bg-[#1a0f09] transition-colors duration-150"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserOpen(v => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-btn hover:bg-beige-input transition-colors duration-150"
              >
                {user?.profile_image_url ? (
                  <img src={user.profile_image_url} alt="" className="size-7 rounded-full object-cover border-2 border-beige-card" />
                ) : (
                  <div className="size-7 rounded-full bg-beige-card flex items-center justify-center">
                    <User size={14} className="text-brown-muted" />
                  </div>
                )}
                <span className="hidden md:block text-sm font-bold text-brown-dark max-w-30 truncate">
                  {user?.full_name?.split(" ")[0]}
                </span>
                <ChevronDown size={14} className={`text-brown-muted transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {userOpen && (
                  <motion.div
                    className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white rounded-card shadow-card-md border border-beige-card overflow-hidden z-50"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="px-4 py-3 border-b border-beige-card/60 bg-beige-card/50">
                      <p className="text-xs font-bold text-brown-dark truncate">{user?.full_name}</p>
                      <p className="text-xs font-semibold text-brown-muted truncate">{user?.email}</p>
                    </div>
                    {[
                      { label: "Profile",     icon: <User size={14} />,       path: "/profile"  },
                    ].map(item => (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-brown-dark hover:bg-beige-input transition-colors duration-150"
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                    <div className="h-px bg-beige-card mx-3" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            className="md:hidden p-2 rounded-btn hover:bg-beige-input transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} className="text-brown-dark" /> : <Menu size={20} className="text-brown-dark" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-beige-card px-6 py-4 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isAuthenticated && navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-btn text-sm font-bold text-brown-dark hover:bg-beige-input transition-colors text-left"
              >
                {link.icon}
                {link.label}
              </button>
            ))}
            {!isAuthenticated && (
              <>
                <button onClick={() => navigate("/login")}    className="w-full px-4 py-2.5 rounded-btn text-sm font-bold text-brown-dark hover:bg-beige-input transition-colors text-left">Login</button>
                <button onClick={() => navigate("/register")} className="w-full px-4 py-2.5 rounded-btn text-sm font-bold bg-brown-dark text-white hover:bg-[#1a0f09] transition-colors text-left">Register</button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar