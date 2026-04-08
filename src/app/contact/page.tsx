import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | The Green Story',
    description: 'Get in touch with our support team.',
};

export default function Contact() {
    return (
        <div className="bg-brand-cream min-h-screen pb-16 md:pb-24">
            {/* Header */}
            <header className="bg-brand-ivory py-16 md:py-28 px-6 border-b border-brand-border-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">Contact Us.</h1>
                    <p className="text-[13px] text-brand-muted font-medium leading-relaxed max-w-xl mx-auto font-sans">
                        Have questions about anything? We are here to assist.
                    </p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 mt-16 md:mt-28 flex flex-col items-center text-center">
                {/* Contact Info */}
                <div className="space-y-16 w-full">
                    <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-border pb-2 inline-block px-12 font-sans">Customer Care</h3>
                        <p className="text-[13px] text-brand-muted font-medium mb-2 font-sans">📞 +91 9891790879</p>
                        <p className="text-[13px] text-brand-muted font-medium font-sans">✉️ goyalreena60@gmail.com</p>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-border pb-2 inline-block px-12 font-sans">Social &amp; Support</h3>
                        <p className="text-[13px] text-brand-muted font-medium mb-2 font-sans">Instagram: (Link coming soon)</p>
                        <p className="text-[13px] text-brand-muted font-medium font-sans">WhatsApp Support: +91 9891790879</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
