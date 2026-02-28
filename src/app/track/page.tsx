import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Track Order | The Green Story',
    description: 'Track your package delivery status.',
};

export default function TrackOrder() {
    return (
        <div className="bg-brand-gray min-h-screen pb-24">
            <header className="bg-brand-white py-24 px-6 border-b border-brand-gray-dark/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold tracking-tighter uppercase mb-4">Track Order.</h1>
                    <p className="text-[13px] text-brand-gray-dark font-medium leading-relaxed max-w-xl mx-auto">
                        Enter your order details below to view current shipping and delivery status.
                    </p>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-6 mt-24">
                <div className="bg-brand-white p-8 md:p-12 border border-brand-gray-dark/10 shadow-sm">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="orderNumber" className="block text-[10px] font-bold uppercase tracking-widest">Order Number</label>
                            <input
                                type="text"
                                id="orderNumber"
                                placeholder="e.g. MIN-123456"
                                className="w-full border border-brand-gray-dark/20 bg-brand-gray p-4 text-[13px] focus:outline-none focus:border-brand-black transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="The email used at checkout"
                                className="w-full border border-brand-gray-dark/20 bg-brand-gray p-4 text-[13px] focus:outline-none focus:border-brand-black transition-colors"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-brand-black text-brand-white py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-brand-gray-dark transition-colors mt-4">
                            Find Order
                        </button>
                    </form>

                    <div className="mt-8 text-center text-[11px] font-medium text-brand-gray-dark">
                        <p>Please note: Tracking information may take up to 24 hours to update after dispatch.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
