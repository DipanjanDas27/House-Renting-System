import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { LogOut } from "lucide-react"
import { logoutUser } from "@/services/authThunks.js"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate("/login")
  }

  return (
    <motion.button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-btn text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-colors duration-150"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <LogOut size={15} />
      Logout
    </motion.button>
  )
}

export default LogoutButton