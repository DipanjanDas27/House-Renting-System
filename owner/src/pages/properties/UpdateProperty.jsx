import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import {
  Building2, FileText, BedDouble, Sofa, MapPin,
  IndianRupee, Home, Shield, Clock, ImagePlus,
  ArrowLeft, Save
} from "lucide-react"

import { getProperty, ownerUpdateProperty, ownerUpdatePropertyImage } from "@/services/ownerPropertyThunks.js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FormSkeleton } from "@/components/custom/skeletons/index.jsx"

const FURNISHING_OPTIONS = ["unfurnished", "semi", "fully"]

const FormField = ({ label, icon, error, children, delay }) => (
  <motion.div
    className="space-y-1.5"
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Label className="text-sm font-bold text-brown-dark flex items-center gap-1.5">
      {icon}
      {label}
    </Label>
    {children}
    {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
  </motion.div>
)

const UpdateProperty = () => {
  const dispatch    = useDispatch()
  const navigate    = useNavigate()
  const { propertyId } = useParams()
  const { property, loading, error } = useSelector((state) => state.property)

  const [file,         setFile]         = useState(null)
  const [preview,      setPreview]      = useState(null)
  const [imageLoading, setImageLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm({ mode: "onChange" })

  useEffect(() => {
    dispatch(getProperty(propertyId))
  }, [dispatch, propertyId])

  useEffect(() => {
    if (property) {
      reset({
        title:            property.title,
        description:      property.description,
        bhk:              property.bhk,
        furnishing:       property.furnishing,
        address:          property.address,
        city:             property.city,
        state:            property.state,
        pincode:          property.pincode,
        rent_amount:      property.rent_amount,
        security_deposit: property.security_deposit,
        total_rooms:      property.total_rooms,
        available_rooms:  property.available_rooms,
        notice_period_days: property.notice_period_days,
      })
      setPreview(property.image_url)
    }
  }, [property, reset])

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(selected)
  }

  const updateImage = async () => {
    if (!file) return
    setImageLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)
      await dispatch(ownerUpdatePropertyImage({ propertyId, formData })).unwrap()
      setFile(null)
    } catch {}
    setImageLoading(false)
  }

  const updateDetails = async (data) => {
    try {
      await dispatch(ownerUpdateProperty({ propertyId, data })).unwrap()
      navigate(`/owner/properties/${propertyId}`)
    } catch {}
  }

  if (loading && !property) return <FormSkeleton />

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="size-10 rounded-btn bg-white border border-beige-card flex items-center justify-center shadow-card hover:bg-beige-input transition-colors"
          >
            <ArrowLeft size={18} className="text-brown-dark" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-brown-dark leading-none">Edit Property</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">{property?.title}</p>
          </div>
        </motion.div>

        <div className="space-y-6">

          {/* ── Image update ──────────────────────────────── */}
          <motion.div
            className="bg-white rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="bg-beige-card px-6 py-4 border-b border-beige-card/60">
              <p className="text-xs font-bold text-brown-muted uppercase tracking-widest">Property Image</p>
            </div>
            <div className="p-6 space-y-4">
              {preview && (
                <div className="relative rounded-card overflow-hidden h-52">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <label htmlFor="update-image" className="flex items-center gap-3 h-12 px-4 bg-beige-input border border-beige-card rounded-btn cursor-pointer hover:border-brown-muted transition-colors">
                <ImagePlus size={16} className="text-brown-muted shrink-0" />
                <span className="text-sm font-semibold text-brown-muted truncate">
                  {file ? file.name : "Choose new image..."}
                </span>
                <input id="update-image" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              {file && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="button"
                    onClick={updateImage}
                    disabled={imageLoading}
                    className="w-full h-10 bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-sm rounded-btn flex items-center justify-center gap-2"
                  >
                    {imageLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Uploading...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ImagePlus size={15} />
                        Update Image
                      </span>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── Details form ──────────────────────────────── */}
          <form onSubmit={handleSubmit(updateDetails)} className="space-y-6">

            {/* Basic Info */}
            <motion.div
              className="bg-white rounded-card shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <div className="bg-beige-card px-6 py-4 border-b border-beige-card/60">
                <p className="text-xs font-bold text-brown-muted uppercase tracking-widest">Basic Information</p>
              </div>
              <div className="p-6 space-y-5">

                <FormField label="Property Title" icon={<Building2 size={14} className="text-brown-muted" />} error={errors.title?.message} delay={0.18}>
                  <Input className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("title", { required: "Title is required" })} />
                </FormField>

                <FormField label="Description" icon={<FileText size={14} className="text-brown-muted" />} delay={0.22}>
                  <Textarea rows={4} className="bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30 resize-none" {...register("description")} />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="BHK" icon={<BedDouble size={14} className="text-brown-muted" />} error={errors.bhk?.message} delay={0.24}>
                    <Input type="number" min={1} className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("bhk")} />
                  </FormField>
                  <FormField label="Furnishing" icon={<Sofa size={14} className="text-brown-muted" />} delay={0.26}>
                    <select className="w-full h-12 bg-beige-input border border-beige-card rounded-btn text-brown-dark font-semibold px-3 focus:outline-none focus:ring-1 focus:ring-brown-dark/30" {...register("furnishing")}>
                      {FURNISHING_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="capitalize">{opt}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              className="bg-white rounded-card shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="bg-beige-card px-6 py-4 border-b border-beige-card/60">
                <p className="text-xs font-bold text-brown-muted uppercase tracking-widest">Location</p>
              </div>
              <div className="p-6 space-y-5">
                <FormField label="Full Address" icon={<MapPin size={14} className="text-brown-muted" />} error={errors.address?.message} delay={0.28}>
                  <Input className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("address", { required: "Address is required" })} />
                </FormField>
                <div className="grid grid-cols-3 gap-4">
                  <FormField label="City" icon={<MapPin size={14} className="text-brown-muted" />} error={errors.city?.message} delay={0.3}>
                    <Input className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("city", { required: true })} />
                  </FormField>
                  <FormField label="State" icon={<MapPin size={14} className="text-brown-muted" />} error={errors.state?.message} delay={0.32}>
                    <Input className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("state", { required: true })} />
                  </FormField>
                  <FormField label="Pincode" icon={<MapPin size={14} className="text-brown-muted" />} delay={0.34}>
                    <Input className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("pincode")} />
                  </FormField>
                </div>
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div
              className="bg-white rounded-card shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <div className="bg-beige-card px-6 py-4 border-b border-beige-card/60">
                <p className="text-xs font-bold text-brown-muted uppercase tracking-widest">Pricing & Rooms</p>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Rent Amount" icon={<IndianRupee size={14} className="text-brown-muted" />} error={errors.rent_amount?.message} delay={0.36}>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brown-muted">₹</span>
                      <Input type="number" className="pl-8 h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("rent_amount", { required: true, min: { value: 1, message: "Must be > 0" } })} />
                    </div>
                  </FormField>
                  <FormField label="Security Deposit" icon={<Shield size={14} className="text-brown-muted" />} delay={0.38}>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brown-muted">₹</span>
                      <Input type="number" className="pl-8 h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("security_deposit")} />
                    </div>
                  </FormField>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <FormField label="Total Rooms" icon={<Home size={14} className="text-brown-muted" />} delay={0.4}>
                    <Input type="number" className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("total_rooms")} />
                  </FormField>
                  <FormField label="Available" icon={<Home size={14} className="text-brown-muted" />} delay={0.42}>
                    <Input type="number" className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("available_rooms")} />
                  </FormField>
                  <FormField label="Notice Period" icon={<Clock size={14} className="text-brown-muted" />} delay={0.44}>
                    <Input type="number" className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30" {...register("notice_period_days")} />
                  </FormField>
                </div>
              </div>
            </motion.div>

            {error && (
              <motion.p
                className="text-xs font-semibold text-red-500 text-center bg-red-50 border border-red-200 rounded-btn py-2.5 px-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.p>
            )}

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full h-12 bg-brown-dark hover:bg-[#1a0f09] text-white font-semibold text-base rounded-btn flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save size={17} />
                      Save Changes
                    </span>
                  )}
                </Button>
              </motion.div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-beige-card text-brown-dark font-semibold text-base rounded-btn hover:bg-beige-input"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </motion.div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProperty