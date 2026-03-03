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
        <div className="bg-brand-gray min-h-screen pb-24">
            <header className="bg-brand-white py-24 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold tracking-tighter uppercase mb-4">FAQ.</h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed max-w-xl mx-auto">
                        Answers to common questions regarding our formulations, testing protocols, and shipping policies.
                    </p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 mt-24 space-y-8">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-brand-white p-8 border border-brand-gray-dark/10">
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-4">{faq.question}</h3>
                        <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </main>
        </div>
    );
}
