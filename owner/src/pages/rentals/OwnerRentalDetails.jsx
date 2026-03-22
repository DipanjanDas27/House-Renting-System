import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import {
  Home, IndianRupee, User, CheckCircle2, Clock,
  XCircle, ArrowLeft, Trash2, AlertTriangle,
  CalendarDays, FileText, AlertCircle
} from "lucide-react"

import {
  ownerGetRentalById,
  ownerTerminateRental,
  ownerDeleteRental
} from "@/services/ownerRentalThunks.js"
import { Button } from "@/components/ui/button"
import { RentalDetailsSkeleton } from "@/components/custom/skeletons/index.jsx"
import ConfirmModal from "@/components/custom/ConfirmModal.jsx"

const STATUS_CONFIG = {
  active:     { icon: <CheckCircle2 size={14} />, classes: "bg-green-50 text-green-700 border border-green-200"  },
  pending:    { icon: <Clock size={14} />,         classes: "bg-amber-50 text-amber-700 border border-amber-200"  },
  terminated: { icon: <XCircle size={14} />,       classes: "bg-red-50 text-red-700 border border-red-200"        },
  cancelled:  { icon: <XCircle size={14} />,       classes: "bg-gray-50 text-gray-600 border border-gray-200"     },
}

const getStatus = (status) =>
  STATUS_CONFIG[status?.toLowerCase()] ?? {
    icon: <Clock size={14} />,
    classes: "bg-beige-card text-brown-muted border border-beige-card",
  }

const DetailRow = ({ label, value, icon }) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-beige-card/60 last:border-0">
    <div className="flex items-center gap-2 text-sm font-semibold text-brown-muted shrink-0">
      {icon}
      {label}
    </div>
    <span className="text-sm font-bold text-brown-dark text-right">{value}</span>
  </div>
)

const formatDate = (ts) =>
  ts ? new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  }) : "—"

const OwnerRentalDetails = () => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { rentalId } = useParams()

  const { rental, loading, error } = useSelector((state) => state.rental)

  const [deleteModal,    setDeleteModal]    = useState(false)
  const [terminateModal, setTerminateModal] = useState(false)
  const [terminating,    setTerminating]    = useState(false)
  const [deleting,       setDeleting]       = useState(false)

  useEffect(() => {
    dispatch(ownerGetRentalById(rentalId))
  }, [dispatch, rentalId])

  const handleConfirmTerminate = async () => {
    setTerminating(true)
    await dispatch(ownerTerminateRental(rentalId))
    setTerminating(false)
    setTerminateModal(false)
    dispatch(ownerGetRentalById(rentalId))
  }

  const handleConfirmDelete = async () => {
    setDeleting(true)
    await dispatch(ownerDeleteRental(rentalId))
    setDeleting(false)
    setDeleteModal(false)
    navigate("/owner/rentals")
  }

  if (loading || !rental) return <RentalDetailsSkeleton />

  const { icon, classes } = getStatus(rental.status)

  return (
    <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">

      <ConfirmModal
        isOpen={terminateModal}
        onClose={() => setTerminateModal(false)}
        onConfirm={handleConfirmTerminate}
        loading={terminating}
        title="Schedule Termination"
        description={`This will schedule termination of the rental after the notice period of ${rental.notice_period ?? 0} days. The tenant will be notified.`}
        confirmLabel="Schedule"
        variant="warning"
      />

      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        title="Delete Rental"
        description="This will permanently delete this rental agreement. Only terminated or cancelled rentals can be deleted."
      />

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
          Back to Rentals
        </button>

        <div className="bg-white rounded-card shadow-card-md overflow-hidden">

          <div className="bg-beige-card px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-btn bg-white flex items-center justify-center">
                <Home size={20} className="text-brown-dark" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brown-muted leading-none mb-1">Agreement</p>
                <p className="text-base font-extrabold text-brown-dark leading-none">Rental Details</p>
              </div>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize ${classes}`}>
              {icon}
              {rental.status}
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-btn">
              <p className="text-xs font-semibold text-red-600">{error}</p>
            </div>
          )}

          {rental.termination_effective_date && rental.status === "active" && (
            <div className="mx-6 mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-btn flex items-center gap-2">
              <AlertTriangle size={15} className="text-amber-600 shrink-0" />
              <p className="text-xs font-semibold text-amber-700">
                Termination scheduled for {formatDate(rental.termination_effective_date)}
              </p>
            </div>
          )}

          <div className="px-6 py-2">
            <DetailRow label="Tenant"        value={rental.tenant_name ?? "—"}                                         icon={<User size={14} />} />
            <DetailRow label="Monthly Rent"  value={`₹${Number(rental.monthly_rent).toLocaleString("en-IN")}/mo`}     icon={<IndianRupee size={14} />} />
            <DetailRow label="Status"        value={rental.status}                                                      icon={<CheckCircle2 size={14} />} />
            <DetailRow label="Start Date"    value={formatDate(rental.start_date)}                                     icon={<CalendarDays size={14} />} />
            <DetailRow label="End Date"      value={formatDate(rental.end_date)}                                       icon={<CalendarDays size={14} />} />
            <DetailRow label="Notice Period" value={rental.notice_period ? `${rental.notice_period} days` : "—"}       icon={<AlertCircle size={14} />} />
            <DetailRow label="Security Paid" value={rental.security_paid ? "Yes" : "No"}                               icon={<CheckCircle2 size={14} />} />
            {rental.agreement_document_url && (
              <div className="flex items-center justify-between gap-4 py-3.5 border-b border-beige-card/60">
                <div className="flex items-center gap-2 text-sm font-semibold text-brown-muted shrink-0">
                  <FileText size={14} />
                  Agreement
                </div>
                <a
                  href={rental.agreement_document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-brown-dark hover:underline"
                >
                  View Document
                </a>
              </div>
            )}
            <DetailRow label="Created At" value={formatDate(rental.created_at)} icon={<CalendarDays size={14} />} />
          </div>

          <div className="px-6 pb-6 pt-3 flex flex-col gap-3">

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                onClick={() => navigate(`/users/${rental.tenant_id}`)}
                className="w-full h-12 border-beige-card text-brown-dark font-semibold text-sm rounded-btn hover:bg-beige-input flex items-center justify-center gap-2"
              >
                <User size={15} />
                View Tenant
              </Button>
            </motion.div>

            {rental.status === "active" && !rental.termination_effective_date && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setTerminateModal(true)}
                  className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-btn flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={15} />
                  Schedule Termination
                </Button>
              </motion.div>
            )}

            {(rental.status === "terminated" || rental.status === "cancelled") && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setDeleteModal(true)}
                  className="w-full h-12 border border-red-200 text-red-600 hover:bg-red-50 bg-white font-semibold text-sm rounded-btn flex items-center justify-center gap-2"
                >
                  <Trash2 size={15} />
                  Delete Rental
                </Button>
              </motion.div>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default OwnerRentalDetails