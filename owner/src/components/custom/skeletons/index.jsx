import { Skeleton } from "@/components/ui/skeleton"

// ── Reusable skeleton primitives ──────────────────────────────

const SkeletonCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-card shadow-card overflow-hidden ${className}`}>
    {children}
  </div>
)

const SkeletonHeader = () => (
  <div className="bg-beige-card px-6 py-5 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Skeleton className="size-11 rounded-btn bg-white/60" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-20 rounded-btn bg-white/60" />
        <Skeleton className="h-5 w-32 rounded-btn bg-white/60" />
      </div>
    </div>
    <Skeleton className="h-6 w-16 rounded-full bg-white/60" />
  </div>
)

const SkeletonRows = ({ count = 4 }) => (
  <div className="px-6 py-2 space-y-1">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="flex justify-between py-3.5 border-b border-beige-card/60 last:border-0">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32 rounded-btn bg-beige-card" />
          <Skeleton className="h-3 w-20 rounded-btn bg-beige-card" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-14 rounded-full bg-beige-card" />
          <Skeleton className="h-4 w-20 rounded-btn bg-beige-card" />
        </div>
      </div>
    ))}
  </div>
)

const SkeletonButtons = ({ count = 1 }) => (
  <div className="px-6 pb-6 pt-3 space-y-3">
    {[...Array(count)].map((_, i) => (
      <Skeleton key={i} className="h-12 w-full rounded-btn bg-beige-card" />
    ))}
  </div>
)

const SkeletonGrid = ({ count = 6, cols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }) => (
  <div className={`grid ${cols} gap-6`}>
    {[...Array(count)].map((_, i) => (
      <div key={i} className="bg-white rounded-card shadow-card overflow-hidden">
        <Skeleton className="w-full h-44 bg-beige-card" />
        <div className="p-5 space-y-3">
          <Skeleton className="h-5 w-3/4 rounded-btn bg-beige-card" />
          <Skeleton className="h-4 w-1/2 rounded-btn bg-beige-card" />
          <Skeleton className="h-6 w-1/3 rounded-btn bg-beige-card" />
          <Skeleton className="h-9 w-full rounded-btn bg-beige-card" />
        </div>
      </div>
    ))}
  </div>
)

// ── Page skeletons ─────────────────────────────────────────────

export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-cream-bg font-montserrat">
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 rounded-btn bg-beige-card" />
        <Skeleton className="h-9 w-64 rounded-btn bg-beige-card" />
        <Skeleton className="h-4 w-48 rounded-btn bg-beige-card" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-card shadow-card p-6 flex items-center gap-4">
            <Skeleton className="size-14 rounded-card bg-beige-card shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-16 rounded-btn bg-beige-card" />
              <Skeleton className="h-7 w-20 rounded-btn bg-beige-card" />
              <Skeleton className="h-3 w-14 rounded-btn bg-beige-card" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-28 rounded-btn bg-beige-card" />
        <div className="grid md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i}>
              <div className="bg-beige-card px-6 py-4 flex items-center gap-3">
                <Skeleton className="size-10 rounded-btn bg-white/60" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-24 rounded-btn bg-white/60" />
                  <Skeleton className="h-3 w-36 rounded-btn bg-white/60" />
                </div>
              </div>
              <div className="px-6 py-4 space-y-2.5">
                <Skeleton className="h-10 w-full rounded-btn bg-beige-card" />
                <Skeleton className="h-10 w-full rounded-btn bg-beige-card" />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <SkeletonCard key={i}>
            <div className="bg-beige-card px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded bg-white/60" />
                <Skeleton className="h-4 w-28 rounded-btn bg-white/60" />
              </div>
              <Skeleton className="h-3 w-14 rounded-btn bg-white/60" />
            </div>
            <SkeletonRows count={3} />
          </SkeletonCard>
        ))}
      </div>
    </div>
  </div>
)

export const PropertiesSkeleton = () => (
  <div className="min-h-screen bg-cream-bg font-montserrat">
    <div className="bg-beige-card/50 border-b border-beige-card px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40 rounded-btn bg-beige-card" />
            <Skeleton className="h-4 w-52 rounded-btn bg-beige-card" />
          </div>
          <Skeleton className="h-10 w-36 rounded-btn bg-beige-card" />
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SkeletonGrid count={6} />
    </div>
  </div>
)

export const PropertyDetailsSkeleton = () => (
  <div className="min-h-screen bg-cream-bg font-montserrat">
    <Skeleton className="w-full h-105 bg-beige-card" />
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
      <Skeleton className="h-9 w-2/3 rounded-btn bg-beige-card" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-32 rounded-btn bg-beige-card" />
        <Skeleton className="h-4 w-28 rounded-btn bg-beige-card" />
      </div>
      <Skeleton className="h-32 w-full rounded-card bg-beige-card" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-card bg-beige-card" />
        ))}
      </div>
      <Skeleton className="h-14 w-full rounded-btn bg-beige-card" />
    </div>
  </div>
)

export const FormSkeleton = () => (
  <div className="min-h-screen bg-cream-bg flex items-center justify-center px-4 py-12 font-montserrat">
    <div className="w-full max-w-lg bg-white rounded-card shadow-card-md overflow-hidden">
      <div className="bg-beige-card px-8 py-6 flex items-center gap-4">
        <Skeleton className="size-12 rounded-btn bg-white/60" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-16 rounded-btn bg-white/60" />
          <Skeleton className="h-6 w-40 rounded-btn bg-white/60" />
        </div>
      </div>
      <div className="px-8 py-7 space-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-4 w-24 rounded-btn bg-beige-card" />
            <Skeleton className="h-12 w-full rounded-btn bg-beige-card" />
          </div>
        ))}
        <Skeleton className="h-12 w-full rounded-btn bg-beige-card" />
      </div>
    </div>
  </div>
)

export const RentalsSkeleton = () => (
  <div className="min-h-screen bg-cream-bg font-montserrat">
    <div className="bg-beige-card/50 border-b border-beige-card px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Skeleton className="size-11 rounded-btn bg-beige-card" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-36 rounded-btn bg-beige-card" />
            <Skeleton className="h-4 w-24 rounded-btn bg-beige-card" />
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto px-6 py-10">
      <SkeletonGrid count={4} cols="grid-cols-1 md:grid-cols-2" />
    </div>
  </div>
)

export const RentalDetailsSkeleton = () => (
  <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
    <div className="max-w-lg mx-auto">
      <Skeleton className="h-4 w-32 rounded-btn bg-beige-card mb-6" />
      <SkeletonCard>
        <SkeletonHeader />
        <SkeletonRows count={6} />
        <SkeletonButtons count={2} />
      </SkeletonCard>
    </div>
  </div>
)

export const PaymentsSkeleton = () => (
  <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="size-11 rounded-btn bg-beige-card" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-28 rounded-btn bg-beige-card" />
          <Skeleton className="h-4 w-20 rounded-btn bg-beige-card" />
        </div>
      </div>
      <div className="flex gap-2 mb-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-32 rounded-btn bg-beige-card" />
        ))}
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i}>
            <div className="px-5 pt-5 pb-4 border-b border-beige-card/60 flex items-center gap-3">
              <Skeleton className="size-10 rounded-btn bg-beige-card" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24 rounded-btn bg-beige-card" />
                <Skeleton className="h-4 w-40 rounded-btn bg-beige-card" />
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <Skeleton className="h-5 w-16 rounded-full bg-beige-card" />
                <Skeleton className="h-5 w-16 rounded-full bg-beige-card" />
              </div>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16 rounded-btn bg-beige-card" />
                <Skeleton className="h-7 w-24 rounded-btn bg-beige-card" />
              </div>
              <Skeleton className="h-9 w-20 rounded-btn bg-beige-card" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  </div>
)

export const PaymentDetailsSkeleton = () => (
  <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
    <div className="max-w-lg mx-auto">
      <Skeleton className="h-4 w-36 rounded-btn bg-beige-card mb-6" />
      <SkeletonCard>
        <SkeletonHeader />
        <SkeletonRows count={7} />
        <div className="px-6 pb-6 pt-2">
          <Skeleton className="h-11 w-40 rounded-btn bg-beige-card" />
        </div>
      </SkeletonCard>
    </div>
  </div>
)

export const ProfileSkeleton = () => (
  <div className="min-h-screen bg-cream-bg px-4 py-10 font-montserrat">
    <div className="max-w-lg mx-auto">
      <SkeletonCard>
        <div className="bg-beige-card px-8 py-6 flex items-center gap-4">
          <Skeleton className="size-12 rounded-btn bg-white/60" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-16 rounded-btn bg-white/60" />
            <Skeleton className="h-6 w-32 rounded-btn bg-white/60" />
          </div>
        </div>
        <div className="px-8 py-7 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="size-24 rounded-full bg-beige-card" />
            <Skeleton className="h-3 w-32 rounded-btn bg-beige-card" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-4 w-20 rounded-btn bg-beige-card" />
                <Skeleton className="h-12 w-full rounded-btn bg-beige-card" />
              </div>
            ))}
          </div>
          <Skeleton className="h-12 w-full rounded-btn bg-beige-card" />
        </div>
      </SkeletonCard>
    </div>
  </div>
)