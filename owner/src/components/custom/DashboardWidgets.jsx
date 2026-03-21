import { motion } from "motion/react"

export const StatCard = ({ icon, label, value, sub, color, delay }) => (
  <motion.div
    className="bg-white rounded-card shadow-card p-6 flex items-center gap-4"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(43,27,18,0.12)" }}
  >
    <div className={`size-14 rounded-card flex items-center justify-center shrink-0 ${color}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold text-brown-muted uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-extrabold text-brown-dark leading-none">{value ?? "—"}</p>
      {sub && <p className="text-xs font-semibold text-brown-muted mt-1">{sub}</p>}
    </div>
  </motion.div>
)

export const RecentRow = ({ left, right, sub, badge, onClick }) => (
  <div
    className="flex items-center justify-between gap-4 py-3 border-b border-beige-card/60 last:border-0 cursor-pointer hover:bg-beige-card/30 px-2 -mx-2 rounded-btn transition-colors duration-150"
    onClick={onClick}
  >
    <div className="min-w-0">
      <p className="text-sm font-bold text-brown-dark truncate">{left}</p>
      {sub && <p className="text-xs font-semibold text-brown-muted mt-0.5">{sub}</p>}
    </div>
    <div className="flex items-center gap-2 shrink-0">
      {badge}
      <p className="text-sm font-bold text-brown-dark">{right}</p>
    </div>
  </div>
)

export const StatusBadge = ({ status }) => {
  const config = {
    active:        "bg-green-50 text-green-700 border-green-200",
    pending:       "bg-amber-50 text-amber-700 border-amber-200",
    terminated:    "bg-red-50 text-red-700 border-red-200",
    cancelled:     "bg-gray-50 text-gray-600 border-gray-200",
    success:       "bg-green-50 text-green-700 border-green-200",
    failed:        "bg-red-50 text-red-700 border-red-200",
    refunded:      "bg-blue-50 text-blue-700 border-blue-200",
    available:     "bg-green-50 text-green-700 border-green-200",
    not_available: "bg-red-50 text-red-700 border-red-200",
  }
  const label = {
    active:        "Active",
    pending:       "Pending",
    terminated:    "Terminated",
    cancelled:     "Cancelled",
    success:       "Paid",
    failed:        "Failed",
    refunded:      "Refunded",
    available:     "Available",
    not_available: "Not Available",
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border capitalize ${config[status] ?? "bg-beige-card text-brown-muted border-beige-card"}`}>
      {label[status] ?? status}
    </span>
  )
}