import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { User, Mail, Phone, KeyRound, ArrowRight } from "lucide-react"

import { getCurrentUser } from "@/services/userThunks.js"
import { Button } from "@/components/ui/button"
import { ProfileSkeleton } from "@/components/custom/skeletons/index.jsx"

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-beige-card/60 last:border-0">
    <div className="flex items-center gap-2 text-sm font-semibold text-brown-muted shrink-0">
      {icon}
      {label}
    </div>
    <span className="text-sm font-bold text-brown-dark text-right">{value ?? "—"}</span>
  </div>
)

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading } = useSelector((state) => state.auth)

  useEffect(() => {
     dispatch(getCurrentUser())
  }, [dispatch, user])

  if (loading || !user) return <ProfileSkeleton />

  return (
    <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 0.68, 0, 1.1] }}
      >
        <div className="bg-white rounded-card shadow-card-md overflow-hidden">

          {/* ── Header ──────────────────────────────────────── */}
          <div className="bg-beige-card px-6 py-6 flex items-center gap-4">
            {user.profile_image_url ? (
              <img
                src={user.profile_image_url}
                alt={user.full_name}
                className="size-16 rounded-full object-cover border-4 border-white shadow-card shrink-0"
              />
            ) : (
              <div className="size-16 rounded-full bg-white border-4 border-white shadow-card flex items-center justify-center shrink-0">
                <User size={26} className="text-brown-muted" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-brown-muted uppercase tracking-widest mb-1">Owner Account</p>
              <p className="text-xl font-extrabold text-brown-dark leading-none">{user.full_name}</p>
              <p className="text-sm font-semibold text-brown-muted mt-1">{user.email}</p>
            </div>
          </div>

          {/* ── Details ─────────────────────────────────────── */}
          <div className="px-6 py-2">
            <DetailRow icon={<User size={14} />}  label="Full Name" value={user.full_name} />
            <DetailRow icon={<Mail size={14} />}  label="Email"     value={user.email} />
            <DetailRow icon={<Phone size={14} />} label="Phone"     value={user.phone} />
          </div>

          {/* ── Actions ─────────────────────────────────────── */}
          <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => navigate("/profile/update")}
                className="w-full h-12 bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-sm rounded-btn flex items-center justify-center gap-2"
              >
                <User size={15} />
                Update Profile
                <ArrowRight size={15} className="ml-auto" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                onClick={() => navigate("/forgot-password")}
                className="w-full h-12 border-beige-card text-brown-dark font-semibold text-sm rounded-btn hover:bg-beige-input flex items-center justify-center gap-2"
              >
                <KeyRound size={15} />
                Change Password
              </Button>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Profile