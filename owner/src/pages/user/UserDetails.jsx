import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { User, Mail, Phone, ArrowLeft } from "lucide-react"

import { getUserDetails } from "@/services/userThunks.js"
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

const UserDetails = () => {
  const { userId } = useParams()
  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const { userDetails, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (userId) dispatch(getUserDetails(userId))
  }, [dispatch, userId])

  if (loading || !userDetails) return <ProfileSkeleton />

  return (
    <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 0.68, 0, 1.1] }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-brown-muted hover:text-brown-dark transition-colors duration-150 mb-6"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        <div className="bg-white rounded-card shadow-card-md overflow-hidden">

          <div className="bg-beige-card px-6 py-6 flex items-center gap-4">
            {userDetails.profile_image_url ? (
              <img
                src={userDetails.profile_image_url}
                alt={userDetails.full_name}
                className="size-16 rounded-full object-cover border-4 border-white shadow-card shrink-0"
              />
            ) : (
              <div className="size-16 rounded-full bg-white border-4 border-white shadow-card flex items-center justify-center shrink-0">
                <User size={26} className="text-brown-muted" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-brown-muted uppercase tracking-widest mb-1">Tenant</p>
              <p className="text-xl font-extrabold text-brown-dark leading-none">{userDetails.full_name}</p>
              <p className="text-sm font-semibold text-brown-muted mt-1">{userDetails.email}</p>
            </div>
          </div>

          <div className="px-6 py-2">
            <DetailRow icon={<User size={14} />}  label="Full Name" value={userDetails.full_name} />
            <DetailRow icon={<Mail size={14} />}  label="Email"     value={userDetails.email} />
            <DetailRow icon={<Phone size={14} />} label="Phone"     value={userDetails.phone} />
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default UserDetails