'use client';

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">

                <div>
                    <h3 className="font-bold mb-4">About Speero</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Know More</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-300">Blog</a></li>
                        <li><a href="#" className="hover:text-gray-300">Premium Quotation</a></li>
                        <li><a href="#" className="hover:text-gray-300">Customer Service Center</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Before You Start</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-gray-300">Premium Quotation</a></li>
                        <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-gray-300">Terms and Conditions</a></li>
                        <li><a href="#" className="hover:text-gray-300">Payment Methods</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Contact Speero</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="mailto:support@speero.net" className="hover:text-gray-300">support@speero.net</a></li>
                    </ul>
                    <h3 className="font-bold mt-6 mb-4">Our Social Networks</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300">FB</a>
                        <a href="#" className="hover:text-gray-300">TW</a>
                        <a href="#" className="hover:text-gray-300">IG</a>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-4">Download the App Now</h3>
                    <div className="space-y-3">
                        <a href="#"><Image src="/image/footer/apple-store.png" alt="Apple App Store" width={120} height={40} /></a>
                        <a href="#"><Image src="/image/footer/google-play.png" alt="Google Play Store" width={120} height={40} /></a>
                        <a href="#"><Image src="/image/footer/app-gallery-black.png" alt="Huawei App Gallery" width={120} height={40} /></a>
                    </div>
                    <h3 className="font-bold mt-6 mb-4">We Accept Payments With</h3>
                    <div className="grid grid-cols-3 gap-2 items-center">
                        <Image src="/image/footer/mada-footer.svg" alt="Mada" width={40} height={25} />
                        <Image src="/image/footer/visa.svg" alt="Visa" width={40} height={25} />
                        <Image src="/image/footer/mastercard.svg" alt="Mastercard" width={40} height={25} />
                        <Image src="/image/footer/apple-pay-logo.svg" alt="Apple Pay" width={40} height={25} />
                        <Image src="/image/footer/tabby-logo.svg" alt="Tabby" width={40} height={25} />
                        <Image src="/image/footer/tamara-logo.svg" alt="Tamara" width={40} height={25} />
                    </div>
                </div>
            </div>
        </footer>
    );  
}