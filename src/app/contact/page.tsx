import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | The Green Story',
    description: 'Get in touch with our support team.',
};

export default function Contact() {
    return (
        <div className="bg-brand-gray min-h-screen pb-24">
            {/* Header */}
            <header className="bg-brand-white py-24 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold tracking-tighter uppercase mb-4">Contact Us.</h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed max-w-xl mx-auto">
                        Have questions about anything? We are here to assist.
                    </p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Contact Info */}
                <div className="space-y-12">
                    <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-gray-dark/10 pb-2">Customer Care</h3>
                        <p className="text-[13px] text-brand-gray-dark font-medium mb-1">📞 +91 9891790879</p>
                        <p className="text-[13px] text-brand-gray-dark font-medium">✉️ goyalreena60@gmail.com</p>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-gray-dark/10 pb-2">Social & Support</h3>
                        <p className="text-[13px] text-brand-gray-dark font-medium mb-1">Instagram: (Link coming soon)</p>
                        <p className="text-[13px] text-brand-gray-dark font-medium">WhatsApp Support: (Coming soon)</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-brand-white p-8 border border-brand-gray-dark/10">
                    <h2 className="text-2xl font-bold tracking-tighter uppercase mb-8">Send a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-widest">First Name</label>
                                <input type="text" id="firstName" className="w-full border border-brand-gray-dark/20 bg-brand-gray p-3 text-[13px] focus:outline-none focus:border-brand-black transition-colors" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-widest">Last Name</label>
                                <input type="text" id="lastName" className="w-full border border-brand-gray-dark/20 bg-brand-gray p-3 text-[13px] focus:outline-none focus:border-brand-black transition-colors" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                            <input type="email" id="email" className="w-full border border-brand-gray-dark/20 bg-brand-gray p-3 text-[13px] focus:outline-none focus:border-brand-black transition-colors" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-widest">Subject</label>
                            <select id="subject" className="w-full border border-brand-gray-dark/20 bg-brand-gray p-3 text-[13px] focus:outline-none focus:border-brand-black transition-colors appearance-none">
                                <option>Order Inquiry</option>
                                <option>Product Recommendation</option>
                                <option>Returns & Refunds</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest">Message</label>
                            <textarea id="message" rows={5} className="w-full border border-brand-gray-dark/20 bg-brand-gray p-3 text-[13px] focus:outline-none focus:border-brand-black transition-colors resize-none" required></textarea>
                        </div>

                        <button type="submit" className="w-full bg-brand-black text-brand-white py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-brand-gray-dark transition-colors">
                            Submit Request
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
