'use client';

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#fefefe] text-[#0d0630] pt-10 pb-0 border-t border-[#ddd]">
            <ul className="flex list-none p-0 m-0">

                <li className="w-[15%] p-[10px]">
                    <h3 className="text-[16px] font-[400] text-[#0d0630] leading-[21px] pb-[5px]">About Speero</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">About Us</a></li>
                    </ul>
                </li>

                <li className="w-[15%] p-[10px]">
                    <h3 className="text-[16px] font-[400] text-[#0d0630] leading-[21px] pb-[5px]">Know More</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">Blog</a></li>
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">Premium Quotation</a></li>
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">Customer Service Center</a></li>
                    </ul>
                </li>

                <li className="w-[15%] p-[10px]">
                    <h3 className="text-[16px] font-[400] text-[#0d0630] leading-[21px] pb-[5px]">Before You Start</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">Premium Quotation</a></li>
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">Privacy Policy</a></li>
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">Terms and Conditions</a></li>
                        <li><a href="#" className="text-[#524f5e] text-[14px] leading-[21px]">Payment Methods</a></li>
                    </ul>
                </li>

                <li className="w-[15%] p-[10px]">
                    <h3 className="text-[16px] font-[400] text-[#0d0630] leading-[21px] pb-[5px]">Contact Speero</h3>
                    <ul className="space-y-1 text-sm">
                            <h3 className="font-bold mt-0 mb-1">Support</h3>
                            <a href="mailto:support@speero.net" className="text-[#524f5e] text-[14px] leading-[21px]">support@speero.net</a>
                            <h4 className="text-[14px] font-bold text-[#0d0630] leading-[21px] mb-0 mt-0">Our Social Networks</h4>
                            <div className="flex space-x-1">
                                <a href="#" className="hover:text-gray-300"><Image src="/image/icons/twitter.svg" alt="Facebook" width={27} height={27} /></a>
                                <a href="#" className="hover:text-gray-300"><Image src="/image/icons/insta.svg" alt="Instagram" width={27} height={27} /></a>
                                <a href="#" className="hover:text-gray-300"><Image src="/image/icons/tiktok.svg" alt="Tiktok" width={27} height={27} /></a>
                            </div>
                    </ul>
                </li>

                <li className="w-[35%] ml-[5%] p-[10px]">
                    <p className="text-[#0d0630] text-[14px] font-bold mb-[10px]">Download the App Now</p>
                    <div className="flex flex-wrap gap-x-[12px] gap-y-[7px]">
                        <a href="#"><Image src="/image/footer/apple-store.png" alt="Apple App Store" width={138} height={40} /></a>
                        <a href="#"><Image src="/image/footer/google-play.png" alt="Google Play Store" width={138} height={40} /></a>
                        <a href="#"><Image src="/image/footer/app-gallery-black.png" alt="Huawei App Gallery" width={138} height={40} /></a>
                    </div>
                    <p className="text-[#0d0630] text-[14px] font-bold mb-[10px] mt-4">We Accept Payments With</p>
                    <div className="flex flex-wrap gap-[7px] items-center -ml-[10px]">
                        <Image src="/image/footer/mada-footer.svg" alt="Mada" width={80} height={27} className="max-h-[27px] max-w-[80px] ml-[10px]"/>
                        <Image src="/image/footer/visa.svg" alt="Visa" width={84} height={27} className="max-h-[27px] max-w-[84px]"/>
                        <Image src="/image/footer/mastercard.svg" alt="Mastercard" width={35} height={27} className="max-h-[27px] max-w-[35px]"/>
                        <Image src="/image/footer/apple-pay-logo.svg" alt="Apple Pay" width={84} height={27} className="max-h-[27px] max-w-[84px] -ml-[18px] -mr-[28px]"/>
                        <Image src="/image/footer/tabby-logo.svg" alt="Tabby" width={84} height={27} className="max-h-[27px] max-w-[84px]"/>
                        <Image src="/image/footer/tamara-logo.svg" alt="Tamara" width={84} height={27} className="max-h-[27px] max-w-[84px]"/>
                        <Image src="/image/footer/mispay.svg" alt="MISPay" width={84} height={27} className="max-h-[27px] max-w-[84px]"/>
                    </div>
                </li>
            </ul>
            <div className="copy-right text-center text-[16px] font-[700] text-[rgb(85,80,110)] mt-12 bg-[#eff2f7] py-1 border footer-dotted-border">
                <p>All rights reserved for Speero Saudi 2026</p>
            </div>
        </footer>
    );  
}