import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import {
  Building2, FileText, BedDouble, Sofa, MapPin,
  IndianRupee, Home, Shield, Clock, ImagePlus,
  ArrowLeft, Plus, Users
} from "lucide-react"

import { ownerCreateProperty } from "@/services/ownerPropertyThunks.js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

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

const CreateProperty = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.property)

  const [imagePreview, setImagePreview] = useState(null)
  const [isShared,     setIsShared]     = useState(false)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          if (data.image?.[0]) formData.append("image", data.image[0])
        } else {
          formData.append(key, data[key])
        }
      })
      formData.append("is_shared", isShared)
      if (!isShared) formData.append("max_tenants", "1")
      await dispatch(ownerCreateProperty(formData)).unwrap()
      navigate("/owner/properties")
    } catch {}
  }

  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">
      <div className="max-w-2xl mx-auto px-6 py-10">

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
            <h1 className="text-2xl font-extrabold text-brown-dark leading-none">Create Property</h1>
            <p className="text-sm font-semibold text-brown-muted mt-1">Add a new property to your portfolio</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Image upload */}
          <motion.div
            className="bg-white rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="bg-beige-card px-6 py-4 border-b border-beige-card/60">
              <p className="text-xs font-bold text-brown-muted uppercase tracking-widest">Property Image</p>
            </div>
            <div className="p-6">
              <label htmlFor="property-image" className="block cursor-pointer">
                {imagePreview ? (
                  <div className="relative rounded-card overflow-hidden h-52">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-brown-dark/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-bold">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-beige-card rounded-card h-52 flex flex-col items-center justify-center gap-3 hover:border-brown-muted hover:bg-beige-input transition-colors">
                    <div className="size-12 rounded-card bg-beige-card flex items-center justify-center">
                      <ImagePlus size={22} className="text-brown-muted" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-brown-dark">Click to upload image</p>
                      <p className="text-xs font-semibold text-brown-muted mt-0.5">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                )}
                <input
                  id="property-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image", {
                    required: "Property image is required",
                    onChange: handleImageChange
                  })}
                />
              </label>
              {errors.image && <p className="text-xs font-semibold text-red-500 mt-2">{errors.image.message}</p>}
            </div>
          </motion.div>

          {/* Basic info */}
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
                <Input
                  placeholder="e.g. Spacious 2BHK in Salt Lake"
                  className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30"
                  {...register("title", { required: "Title is required" })}
                />
              </FormField>

              <FormField label="Description" icon={<FileText size={14} className="text-brown-muted" />} delay={0.22}>
                <Textarea
                  placeholder="Describe your property — amenities, nearby places, highlights..."
                  rows={4}
                  className="bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30 resize-none"
                  {...register("description")}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="BHK" icon={<BedDouble size={14} className="text-brown-muted" />} error={errors.bhk?.message} delay={0.26}>
                  <Input
                    type="number"
                    min={1}
                    placeholder="2"
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30"
                    {...register("bhk", { required: "BHK is required", min: { value: 1, message: "Min 1" } })}
                  />
                </FormField>

                <FormField label="Furnishing" icon={<Sofa size={14} className="text-brown-muted" />} delay={0.28}>
                  <select
                    className="w-full h-12 bg-beige-input border border-beige-card rounded-btn text-brown-dark font-semibold px-3 focus:outline-none focus:ring-1 focus:ring-brown-dark/30"
                    {...register("furnishing")}
                  >
                    <option value="">Select...</option>
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

              <FormField label="Full Address" icon={<MapPin size={14} className="text-brown-muted" />} error={errors.address?.message} delay={0.3}>
                <Input
                  placeholder="221B Baker Street"
                  className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30"
                  {...register("address", { required: "Address is required" })}
                />
              </FormField>

              <div className="grid grid-cols-3 gap-4">
                <FormField label="City" icon={<MapPin size={14} className="text-brown-muted" />} error={errors.city?.message} delay={0.32}>
                  <Input
                    placeholder="Kolkata"
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30"
                    {...register("city", { required: "City is required" })}
                  />
                </FormField>
                <FormField label="State" icon={<MapPin size={14} className="text-brown-muted" />} error={errors.state?.message} delay={0.34}>
                  <Input
                    placeholder="West Bengal"
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30"
                    {...register("state", { required: "State is required" })}
                  />
                </FormField>
                <FormField label="Pincode" icon={<MapPin size={14} className="text-brown-muted" />} delay={0.36}>
                  <Input
                    placeholder="700001"
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold placeholder:text-brown-muted/60 focus-visible:ring-brown-dark/30"
                    {...register("pincode")}
                  />
                </FormField>
              </div>

            </div>
          </motion.div>

          {/* Pricing & Rooms */}
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
                <FormField label="Rent Amount" icon={<IndianRupee size={14} className="text-brown-muted" />} error={errors.rent_amount?.message} delay={0.38}>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brown-muted">₹</span>
                    <Input
                      type="number"
                      placeholder="15000"
                      className="pl-8 h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30"
                      {...register("rent_amount", {
                        required: "Rent is required",
                        min: { value: 1, message: "Must be greater than 0" }
                      })}
                    />
                  </div>
                </FormField>

                <FormField label="Security Deposit" icon={<Shield size={14} className="text-brown-muted" />} error={errors.security_deposit?.message} delay={0.4}>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-brown-muted">₹</span>
                    <Input
                      type="number"
                      placeholder="30000"
                      className="pl-8 h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30"
                      {...register("security_deposit", {
                        min: { value: 0, message: "Cannot be negative" }
                      })}
                    />
                  </div>
                </FormField>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField label="Total Rooms" icon={<Home size={14} className="text-brown-muted" />} error={errors.total_rooms?.message} delay={0.42}>
                  <Input
                    type="number"
                    placeholder="3"
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30"
                    {...register("total_rooms", {
                      min: { value: 1, message: "Min 1" }
                    })}
                  />
                </FormField>

                <FormField label="Available Rooms" icon={<Home size={14} className="text-brown-muted" />} error={errors.available_rooms?.message} delay={0.44}>
                  <Input
                    type="number"
                    placeholder="3"
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30"
                    {...register("available_rooms", {
                      min: { value: 0, message: "Cannot be negative" }
                    })}
                  />
                </FormField>

                <FormField label="Notice Period (days)" icon={<Clock size={14} className="text-brown-muted" />} error={errors.notice_period_days?.message} delay={0.46}>
                  <Input
                    type="number"
                    placeholder="30"
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30"
                    {...register("notice_period_days", {
                      min: { value: 0, message: "Cannot be negative" }
                    })}
                  />
                </FormField>
              </div>

            </div>
          </motion.div>

          {/* Shared Room — optional toggle */}
          <motion.div
            className="bg-white rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="bg-beige-card px-6 py-4 border-b border-beige-card/60">
              <p className="text-xs font-bold text-brown-muted uppercase tracking-widest">Shared Room (Optional)</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-brown-dark">Enable Shared Room</p>
                  <p className="text-xs font-semibold text-brown-muted mt-0.5">Allow multiple tenants in this property</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsShared(v => !v)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${isShared ? "bg-brown-dark" : "bg-beige-card"}`}
                >
                  <span className={`absolute top-1 size-4 rounded-full bg-white shadow transition-transform duration-200 ${isShared ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </div>

              {isShared && (
                <FormField label="Max Tenants" icon={<Users size={14} className="text-brown-muted" />} error={errors.max_tenants?.message} delay={0}>
                  <Input
                    type="number"
                    placeholder="3"
                    min={1}
                    className="h-12 bg-beige-input border-beige-card rounded-btn text-brown-dark font-semibold focus-visible:ring-brown-dark/30"
                    {...register("max_tenants", {
                      required: "Required for shared rooms",
                      min: { value: 1, message: "Min 1" }
                    })}
                  />
                </FormField>
              )}
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
            transition={{ delay: 0.35, duration: 0.4 }}
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
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus size={17} />
                    Create Property
                  </span>
                )}
              </Button>
            </motion.div>

          </motion.div>

        </form>
      </div>
    </div>
  )
}

export default CreateProperty