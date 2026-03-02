"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "Before 4 Weeks", afterLabel = "After 4 Weeks" }: BeforeAfterSliderProps) {
    const [sliderPos, setSliderPos] = useState(50);

    return (
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden select-none touch-none bg-brand-gray border border-brand-gray-dark/10 group">
            {/* After Image (Background) */}
            <Image
                src={afterImage}
                alt="After"
                fill
                priority
                className="object-cover object-center"
            />
            {/* After Label */}
            <div className="absolute top-4 right-4 bg-brand-white text-brand-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest z-10 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {afterLabel}
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
                className="absolute top-0 left-0 bottom-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
            >
                <div className="relative w-full h-full min-w-max">
                    <Image
                        src={beforeImage}
                        alt="Before"
                        fill
                        priority
                        className="object-cover object-center !w-auto"
                        style={{ minWidth: '100%', maxWidth: 'none' }}
                    />
                    {/* Before Label */}
                    <div className="absolute top-4 left-4 bg-brand-black text-brand-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest z-10 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {beforeLabel}
                    </div>
                </div>
            </div>

            {/* Range Slider for Interaction */}
            <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />

            {/* Visible Slider Line & Handle */}
            <div
                className="absolute top-0 bottom-0 pointer-events-none z-10 w-0.5 bg-brand-white flex items-center justify-center transform -translate-x-1/2"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="w-8 h-8 rounded-full bg-brand-white border-2 border-brand-black shadow-lg flex items-center justify-center pointer-events-auto">
                    <div className="flex gap-1">
                        <div className="w-0.5 h-3 bg-brand-gray-dark/30 rounded-full" />
                        <div className="w-0.5 h-3 bg-brand-gray-dark/30 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
