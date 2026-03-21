import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Mail, Send } from "lucide-react"

import { sendOtp, sendForgotPasswordOtp } from "@/services/authThunks.js"
import { clearAuthState } from "@/store/slices/authSlice.js"
import { getCurrentUser } from "@/services/userThunks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import logo from "/logo.svg"

const SendOtp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearAuthState())
    if (!user) dispatch(getCurrentUser())
  }, [dispatch])

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" })

  const onSubmit = async (data) => {
    try {
      if (isAuthenticated) {
        await dispatch(sendOtp()).unwrap()
      } else {
        await dispatch(sendForgotPasswordOtp(data.email)).unwrap()
      }
      navigate("/verify-otp")
    } catch {}
  }

  return (
    <div className="min-h-screen bg-cream-bg flex items-center justify-center px-4 font-montserrat">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1.1] }}
      >
        <div className="bg-white rounded-card shadow-card-md px-10 py-10">

          <motion.div className="flex flex-col items-center mb-8" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <img src={logo} alt="Dwellio" className="h-9 w-auto mb-5 cursor-pointer" onClick={() => navigate("/")} />
            <h1 className="text-2xl font-extrabold text-brown-dark">Send OTP</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">
              {isAuthenticated ? "We'll send a verification code to your email" : "Enter your email to receive a reset code"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {isAuthenticated ? (
              <motion.div
                className="bg-beige-card/60 border border-beige-card rounded-card px-5 py-4 flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <div className="size-10 rounded-btn bg-white flex items-center justify-center shadow-card shrink-0">
                  <Mail size={18} className="text-brown-dark" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brown-muted">OTP will be sent to</p>
                  <p className="text-sm font-extrabold text-brown-dark">{user?.email}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div className="space-y-1.5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}>
                <Label className="text-sm font-bold text-brown-dark">Email</Label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-muted" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && <p className="text-xs font-semibold text-red-500">{errors.email.message}</p>}
              </motion.div>
            )}

            {error && (
              <motion.p className="text-xs font-semibold text-red-500 text-center bg-red-50 border border-red-200 rounded-btn py-2.5 px-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                {error}
              </motion.p>
            )}

            <motion.div className="space-y-3 pt-1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Button
                type="submit"
                disabled={(!isAuthenticated && !isValid) || loading}
                className="w-full h-12 bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-base rounded-btn flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={17} />
                    Send OTP
                  </span>
                )}
              </Button>

              <Button type="button" variant="outline" className="w-full h-12 border-beige-card text-brown-dark font-semibold text-base rounded-btn hover:bg-beige-input" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </motion.div>

          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default SendOtp