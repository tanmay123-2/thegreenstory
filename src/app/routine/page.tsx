import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Build Routine | The Green Story',
    description: 'A simple, science-backed 4-step skincare routine.',
};

export default function Routine() {
    const steps = [
        {
            number: 'Step 01',
            name: 'Cleanse',
            description: 'Remove impurities, excess oil, and environmental pollutants without disrupting the delicate stratum corneum (skin barrier). A clean canvas is crucial for active ingredient penetration.',
            linkTitle: 'Explore Cleansers'
        },
        {
            number: 'Step 02',
            name: 'Treat',
            description: 'This is where the targeted work happens. Deliver high concentrations of active ingredients (like Vitamin C, Niacinamide, or Retinol) directly to the skin to address your primary concerns.',
            linkTitle: 'Explore Serums'
        },
        {
            number: 'Step 03',
            name: 'Moisturize',
            description: 'Seal in the active ingredients and prevent transepidermal water loss (TEWL). A robust moisturizer supports barrier repair and maintains skin hydration.',
            linkTitle: 'Explore Moisturizers'
        },
        {
            number: 'Step 04',
            name: 'Protect',
            description: 'The most important step for long-term skin health. Defend against UV radiation to prevent photoaging, hyperpigmentation, and collagen degradation.',
            linkTitle: 'Explore Sunscreen'
        }
    ];

    return (
        <div className="bg-brand-cream min-h-screen">
            <header className="bg-brand-ivory py-20 md:py-28 px-6 border-b border-brand-border-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">The Clinical Routine.</h1>
                    <p className="text-[13px] text-brand-muted font-medium leading-relaxed max-w-xl mx-auto font-sans">
                        Efficacy requires consistency. Follow these four foundational steps to optimize active ingredient delivery and maintain barrier health.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-20 md:py-28 space-y-16">
                {steps.map((step, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                        <div className="md:col-span-3 text-brand-gold font-bold text-[10px] uppercase tracking-widest md:pt-2 border-b md:border-none border-brand-border-light pb-2 md:pb-0 font-sans">
                            {step.number}
                        </div>
                        <div className="md:col-span-9 pb-12 border-b border-brand-border-light last:border-0">
                            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">{step.name}</h2>
                            <p className="text-[13px] text-brand-muted font-medium leading-relaxed mb-6 max-w-2xl font-sans">
                                {step.description}
                            </p>
                            <Link href="/shop" className="inline-block border-b border-brand-green pb-1 text-[11px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity text-brand-green font-sans">
                                {step.linkTitle}
                            </Link>
                        </div>
                    </div>
                ))}

                <div className="bg-brand-green text-brand-ivory p-12 mt-12 text-center">
                    <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4">Still Not Sure?</h3>
                    <p className="text-[13px] text-brand-ivory/70 font-medium mb-8 max-w-md mx-auto leading-relaxed font-sans">
                        Reach out to our clinical formulation team for personalized advice based on your specific skin type and concerns.
                    </p>
                    <Link href="/contact" className="bg-brand-ivory text-brand-green px-8 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-brand-cream transition-colors font-sans">
                        Contact Support
                    </Link>
                </div>
            </main>
        </div>
    );
}
