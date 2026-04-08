import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Testimonials | The Green Story',
    description: 'What our customers say about our formulations.',
};

export default function Testimonials() {
    return (
        <div className="bg-brand-cream min-h-screen pb-24">
            <header className="bg-brand-ivory py-20 md:py-28 px-6 border-b border-brand-border-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
                        What People Are Saying.
                    </h1>
                    <p className="text-[13px] text-brand-muted font-medium leading-relaxed max-w-xl mx-auto font-sans">
                        Real results from real customers.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 mt-20 md:mt-28">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-16">
                    <div className="bg-brand-ivory p-6 md:p-8 border border-brand-border-light text-center">
                        <span className="block text-3xl md:text-4xl font-bold tracking-tighter text-brand-green">100+</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Happy Customers</span>
                    </div>
                    <div className="bg-brand-ivory p-6 md:p-8 border border-brand-border-light text-center">
                        <span className="block text-3xl md:text-4xl font-bold tracking-tighter text-brand-gold">4.9</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Average Rating</span>
                    </div>
                    <div className="bg-brand-ivory p-6 md:p-8 border border-brand-border-light text-center">
                        <span className="block text-3xl md:text-4xl font-bold tracking-tighter text-brand-green">98%</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Would Recommend</span>
                    </div>
                </div>

                {/* Placeholder */}
                <div className="bg-brand-ivory text-center p-16 border border-brand-border-light">
                    <p className="text-[13px] text-brand-muted font-medium font-sans">More Coming Soon</p>
                </div>
            </main>
        </div>
    );
}
