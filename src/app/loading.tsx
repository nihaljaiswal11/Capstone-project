import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <main className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-10">
      <div className="mb-8">
        <Skeleton className="w-full h-40 rounded mb-2" />
        <Skeleton className="w-1/2 h-6 mb-2" />
        <Skeleton className="w-1/3 h-4 mb-2" />
        <Skeleton className="w-2/3 h-5" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-0">
            <div className="hover:shadow-lg transition flex flex-col cursor-pointer rounded border bg-card">
              <div className="p-4">
                <Skeleton className="w-full h-40 rounded mb-2" />
                <Skeleton className="w-2/3 h-6 mb-1" />
                <Skeleton className="w-1/3 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 