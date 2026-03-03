import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | The Green Story',
    description: 'Get in touch with our support team.',
};

export default function Contact() {
    return (
        <div className="bg-brand-gray min-h-screen pb-16 md:pb-24">
            {/* Header */}
            <header className="bg-brand-white py-16 md:py-24 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">Contact Us.</h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed max-w-xl mx-auto">
                        Have questions about anything? We are here to assist.
                    </p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 mt-16 md:mt-24 flex flex-col items-center text-center">
                {/* Contact Info */}
                <div className="space-y-16 w-full">
                    <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-gray-dark/10 pb-2 inline-block px-12">Customer Care</h3>
                        <p className="text-[13px] text-brand-gray-dark font-medium mb-2">📞 +91 9891790879</p>
                        <p className="text-[13px] text-brand-gray-dark font-medium">✉️ goyalreena60@gmail.com</p>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-gray-dark/10 pb-2 inline-block px-12">Social & Support</h3>
                        <p className="text-[13px] text-brand-gray-dark font-medium mb-2">Instagram: (Link coming soon)</p>
                        <p className="text-[13px] text-brand-gray-dark font-medium">WhatsApp Support: +91 9891790879</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
