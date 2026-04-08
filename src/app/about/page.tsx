import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | The Green Story',
    description: 'Our philosophy of transparency and efficacy.',
};

export default function About() {
    return (
        <div className="bg-brand-cream min-h-screen pb-24">
            {/* Hero Section */}
            <header className="bg-brand-ivory py-20 md:py-28 px-6 border-b border-brand-border-light">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-gold-dark text-[10px] uppercase font-bold tracking-widest w-fit mb-6 border border-brand-gold/20 font-sans">
                        Our Story
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 leading-none">
                        Nothing to Hide.
                    </h1>
                    <p className="text-base md:text-lg text-brand-muted font-medium leading-relaxed max-w-2xl mx-auto font-sans">
                        The beauty industry is filled with unverified claims and miracle cures. We exist to bring scientific rigor and absolute transparency back to skincare.
                    </p>
                </div>
            </header>

            {/* Content Sections */}
            <main className="max-w-4xl mx-auto px-6 mt-20 md:mt-28 space-y-20 md:space-y-28">
                {/* Section 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4">Total Transparency</h2>
                        <p className="text-[13px] text-brand-muted font-medium leading-relaxed font-sans">
                            We list every single ingredient and its exact percentage in our formulas. You have the right to know exactly what you are applying to your skin. We don&apos;t hide behind proprietary blends or &quot;key&quot; ingredients.
                        </p>
                    </div>
                    <div className="bg-brand-ivory aspect-square flex items-center justify-center p-12 border border-brand-border-light">
                        <div className="text-center">
                            <span className="block text-6xl font-bold tracking-tighter mb-2 text-brand-green">100%</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Disclosure</span>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 bg-brand-ivory aspect-square flex items-center justify-center p-12 border border-brand-border-light">
                        <div className="text-center">
                            <span className="block text-6xl font-bold tracking-tighter mb-2 text-brand-green">&lt; 5.5</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Optimal pH</span>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4">Clinically Proven</h2>
                        <p className="text-[13px] text-brand-muted font-medium leading-relaxed font-sans">
                            Every formula is developed around active ingredients that have significant, independent clinical studies proving their efficacy. We formulate at the optimal pH and concentration levels necessary for these ingredients to actually work.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4">No Fluff</h2>
                        <p className="text-[13px] text-brand-muted font-medium leading-relaxed font-sans">
                            You won&apos;t find artificial fragrances, essential oils, dyes, or unnecessary fillers in our products. If an ingredient doesn&apos;t directly benefit the skin or the stability of the formula, it doesn&apos;t make the cut.
                        </p>
                    </div>
                    <div className="bg-brand-ivory aspect-square flex items-center justify-center p-12 border border-brand-border-light">
                        <div className="text-center">
                            <span className="block text-6xl font-bold tracking-tighter mb-2 text-brand-green">0%</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Fragrance</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
