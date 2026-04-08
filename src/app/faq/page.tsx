import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | The Green Story',
    description: 'Frequently asked questions about our products.',
};

export default function FAQ() {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day money-back guarantee. If a formulation doesn't work for your skin, simply return the unused portion for a full refund."
        },
    ];

    return (
        <div className="bg-brand-cream min-h-screen pb-24">
            <header className="bg-brand-ivory py-20 md:py-28 px-6 border-b border-brand-border-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">FAQ.</h1>
                    <p className="text-[13px] text-brand-muted font-medium leading-relaxed max-w-xl mx-auto font-sans">
                        Answers to common questions regarding our formulations, testing protocols, and shipping policies.
                    </p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 mt-20 md:mt-28 space-y-8">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-brand-ivory p-8 border border-brand-border-light">
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">{faq.question}</h3>
                        <p className="text-[13px] text-brand-muted font-medium leading-relaxed font-sans">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </main>
        </div>
    );
}
