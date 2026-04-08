'use client';

export default function SkeletonProductCard() {
    return (
        <div className="flex flex-col pt-4 bg-brand-ivory border border-brand-border-light">
            {/* Image placeholder */}
            <div className="mx-2 md:mx-4 mb-3 aspect-square animate-shimmer" />

            {/* Mobile button placeholder */}
            <div className="md:hidden mx-2 mb-2.5 h-9 animate-shimmer" />

            <div className="flex flex-col flex-1 px-2 md:px-4 pb-3 md:pb-4 space-y-3">
                {/* Category */}
                <div className="h-3 w-16 animate-shimmer" />

                {/* Name */}
                <div className="h-4 w-3/4 animate-shimmer" />

                {/* Description */}
                <div className="space-y-1.5">
                    <div className="h-3 w-full animate-shimmer" />
                    <div className="h-3 w-2/3 animate-shimmer" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-3 h-3 rounded-full animate-shimmer" />
                    ))}
                    <div className="h-3 w-12 animate-shimmer ml-1" />
                </div>

                {/* Price row */}
                <div className="mt-auto pt-4 border-t border-brand-border-light flex items-center justify-between">
                    <div className="h-4 w-12 animate-shimmer" />
                    <div className="h-3 w-16 animate-shimmer" />
                </div>
            </div>
        </div>
    );
}
