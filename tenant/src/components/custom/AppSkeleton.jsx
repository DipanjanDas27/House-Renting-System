import { Skeleton } from "@/components/ui/skeleton"

const AppSkeleton = () => {
  return (
    <div className="min-h-screen bg-cream-bg font-montserrat">

      <div className="fixed top-0 left-0 right-0 z-50 h-20 bg-cream-bg/90 backdrop-blur-md border-b border-beige-card/40 flex items-center justify-between px-page">
        <Skeleton className="h-8 w-30 rounded-btn bg-beige-card" />
        <div className="flex items-center gap-8">
          <Skeleton className="h-4 w-16 rounded-btn bg-beige-card" />
          <Skeleton className="h-4 w-20 rounded-btn bg-beige-card" />
          <Skeleton className="h-4 w-16 rounded-btn bg-beige-card" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-20 rounded-btn bg-beige-card" />
          <Skeleton className="h-11 w-24 rounded-btn bg-beige-card" />
        </div>
      </div>

      <div className="pt-20">

        <div className="min-h-screen bg-cream-bg flex items-center px-page overflow-hidden">
          <div className="flex-none w-125 pb-24 space-y-6">
            <Skeleton className="h-5 w-48 rounded-full bg-beige-card" />

            <div className="space-y-3">
              <Skeleton className="h-16 w-105 rounded-btn bg-beige-card" />
              <Skeleton className="h-14 w-90 rounded-btn bg-beige-card" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-95 rounded-btn bg-beige-card" />
              <Skeleton className="h-4 w-80 rounded-btn bg-beige-card" />
              <Skeleton className="h-4 w-75 rounded-btn bg-beige-card" />
            </div>

            <Skeleton className="h-14.5 w-36 rounded-btn bg-beige-card" />
          </div>

          <div className="absolute right-0 top-0 w-[58%] h-full">
            <Skeleton className="w-full h-full bg-beige-card/60" />
          </div>
        </div>

        <div className="flex justify-center px-page -mt-10 relative z-10">
          <Skeleton className="w-full max-w-267.5 h-25 rounded-card bg-beige-card" />
        </div>

        <div className="px-page py-25 bg-white">
          <Skeleton className="h-10 w-72 rounded-btn bg-beige-card mx-auto mb-14" />

          <div className="grid grid-cols-3 gap-7">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-beige-card/40 rounded-card overflow-hidden">

                <Skeleton className="w-full h-70 bg-beige-card" />

                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4 rounded-btn bg-beige-card" />
                  <Skeleton className="h-4 w-1/2 rounded-btn bg-beige-card" />
                  <Skeleton className="h-6 w-1/3 rounded-btn bg-beige-card" />
                  <Skeleton className="h-10 w-full rounded-btn bg-beige-card" />
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default AppSkeleton