import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
    return (
        <div className="bg-primary-background min-h-screen">
            {/* Header skeleton */}
            <div className="relative h-96 overflow-hidden">
                <Skeleton className="absolute inset-0 size-full" />
                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="text-center">
                        <Skeleton className="mx-auto mb-4 h-12 w-64" />
                        <Skeleton className="mx-auto h-6 w-96" />
                    </div>
                </div>
            </div>

            {/* Services grid skeleton */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-lg" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
