import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Lock, ShieldCheck } from "lucide-react"

import { changePassword, resetPassword } from "@/services/authThunks.js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import logo from "/logo.svg"

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, isAuthenticated } = useSelector((state) => state.auth)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" })

  const onSubmit = async (data) => {
    try {
      if (isAuthenticated) {
        await dispatch(changePassword(data)).unwrap()
        navigate("/profile")
      } else {
        await dispatch(resetPassword(data)).unwrap()
        navigate("/login")
      }
    } catch {}
  }

  const fieldAnim = (delay) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay, duration: 0.45 },
  })

  return (
    <div className="min-h-screen bg-cream-bg flex items-center justify-center px-4 font-montserrat">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.1] }}
      >
        <div className="bg-white rounded-card shadow-card-md px-10 py-10">

          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <img
              src={logo}
              alt="Dwellio"
              className="h-9 w-auto mb-5 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="size-14 rounded-card bg-beige-card flex items-center justify-center mb-4">
              <ShieldCheck size={26} className="text-brown-dark" />
            </div>
            <h1 className="text-2xl font-extrabold text-brown-dark tracking-tight">
              {isAuthenticated ? "Change Password" : "Reset Password"}
            </h1>
            <p className="text-sm font-semibold text-brown-muted mt-1 text-center">
              {isAuthenticated
                ? "Update your current account password"
                : "Set a new password for your account"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {isAuthenticated && (
              <motion.div className="space-y-1.5" {...fieldAnim(0.22)}>
                <Label className="text-sm font-bold text-brown-dark">Old Password</Label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-muted" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30 focus-visible:border-brown-dark"
                    {...register("oldPassword", { required: "Old password required" })}
                  />
                </div>
                {errors.oldPassword && (
                  <p className="text-xs font-semibold text-red-500">{errors.oldPassword.message}</p>
                )}
              </motion.div>
            )}

            <motion.div className="space-y-1.5" {...fieldAnim(0.3)}>
              <Label className="text-sm font-bold text-brown-dark">New Password</Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-muted" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30 focus-visible:border-brown-dark"
                  {...register("newPassword", {
                    required: "New password required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
              </div>
              {errors.newPassword && (
                <p className="text-xs font-semibold text-red-500">{errors.newPassword.message}</p>
              )}
            </motion.div>

            <motion.div
              className="space-y-3 pt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.45 }}
            >
              <Button
                type="submit"
                disabled={!isValid || loading}
                className="w-full h-12 bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-base rounded-btn transition-colors duration-150"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Processing...
                  </span>
                ) : "Update Password"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-beige-card text-brown-dark font-semibold text-base rounded-btn hover:bg-beige-input transition-colors duration-150"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </motion.div>

          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPassword