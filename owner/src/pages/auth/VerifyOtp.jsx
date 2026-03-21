import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { ShieldCheck } from "lucide-react"

import { verifyOtp, verifyForgotPasswordOtp } from "@/services/authThunks.js"
import { clearAuthState } from "@/store/slices/authSlice.js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import logo from "/logo.svg"

const VerifyOtp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearAuthState())
  }, [dispatch])

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" })

  const onSubmit = async (data) => {
    try {
      if (isAuthenticated) {
        await dispatch(verifyOtp(data.otp)).unwrap()
        navigate("/profile/update")
      } else {
        await dispatch(verifyForgotPasswordOtp(data.otp)).unwrap()
        navigate("/reset-password")
      }
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
            <div className="size-14 rounded-card bg-beige-card flex items-center justify-center mb-4">
              <ShieldCheck size={26} className="text-brown-dark" />
            </div>
            <h1 className="text-2xl font-extrabold text-brown-dark">Verify OTP</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1 text-center">
              Enter the 6-digit code sent to your email
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <motion.div className="space-y-1.5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}>
              <Label className="text-sm font-bold text-brown-dark">OTP Code</Label>
              <Input
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="h-14 bg-beige-input border-beige-card rounded-btn text-brown-dark font-extrabold text-center text-2xl tracking-[0.5em] placeholder:text-brown-muted/40 placeholder:text-base placeholder:tracking-normal focus-visible:ring-brown-dark/30"
                {...register("otp", {
                  required: "OTP required",
                  minLength: { value: 6, message: "Enter 6-digit OTP" },
                  maxLength: { value: 6, message: "OTP must be 6 digits" }
                })}
              />
              {errors.otp && <p className="text-xs font-semibold text-red-500">{errors.otp.message}</p>}
            </motion.div>

            {error && (
              <motion.p className="text-xs font-semibold text-red-500 text-center bg-red-50 border border-red-200 rounded-btn py-2.5 px-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                {error}
              </motion.p>
            )}

            <motion.div className="space-y-3 pt-1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Button
                type="submit"
                disabled={!isValid || loading}
                className="w-full h-12 bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-base rounded-btn flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={17} />
                    Verify OTP
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

export default VerifyOtp