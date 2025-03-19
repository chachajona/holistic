import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
    return (
        <div className="bg-primary-background relative w-full py-16 sm:px-8 lg:px-16">
            {/* Background decoration */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('/Paper.png')" }}
                aria-hidden="true"
            />

            {/* Header section skeleton */}
            <div className="text-primary-text relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
                <Skeleton className="mb-4 h-8 w-32 rounded-lg" />
                <Skeleton className="mb-6 h-10 w-full max-w-xl rounded-lg" />
                <Skeleton className="mb-8 h-20 w-full max-w-lg rounded-lg" />
            </div>

            {/* Services grid skeleton */}
            <div className="container relative z-10 mt-10 flex">
                <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array(6)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col rounded-lg border border-gray-300 bg-white/20 p-6 shadow-md"
                            >
                                <Skeleton className="mb-6 size-12 rounded-full" />
                                <Skeleton className="mb-6 h-8 w-3/4 self-center rounded-lg" />
                                <Skeleton className="mb-8 h-20 w-full rounded-lg" />
                                <Skeleton className="mt-auto h-8 w-32 self-center rounded-lg" />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
