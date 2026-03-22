import { motion, AnimatePresence } from "motion/react"
import { AlertTriangle, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading     = false,
  title       = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel  = "Cancel",
  variant      = "danger",
}) => {
  if (!isOpen) return null

  const confirmClasses = variant === "danger"
    ? "bg-red-600 hover:bg-red-700 text-white border-transparent"
    : "bg-brown-dark hover:bg-[#1a0f09] text-white border-transparent"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 bg-brown-dark/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ── Modal ────────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0,    scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 0.68, 0, 1.1] }}
          >
            <div
              className="w-full max-w-sm bg-white rounded-card shadow-card-lg overflow-hidden font-montserrat"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-beige-card px-6 py-5 flex items-center justify-between border-b border-beige-card/60">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-btn flex items-center justify-center shrink-0 ${
                    variant === "danger" ? "bg-red-50" : "bg-beige-card"
                  }`}>
                    <AlertTriangle size={18} className={variant === "danger" ? "text-red-600" : "text-brown-dark"} />
                  </div>
                  <p className="text-base font-extrabold text-brown-dark">{title}</p>
                </div>
                <button
                  onClick={onClose}
                  className="size-8 rounded-btn flex items-center justify-center hover:bg-beige-input transition-colors text-brown-muted hover:text-brown-dark"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-sm font-semibold text-brown-muted leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 h-11 rounded-btn border-beige-card text-brown-dark font-semibold text-sm hover:bg-beige-input"
                >
                  {cancelLabel}
                </Button>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={onConfirm}
                    disabled={loading}
                    className={`w-full h-11 rounded-btn font-semibold text-sm flex items-center justify-center gap-2 ${confirmClasses}`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Deleting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Trash2 size={15} />
                        {confirmLabel}
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConfirmModal