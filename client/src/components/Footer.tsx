import React from 'react'
import { Link } from 'react-router-dom';
import FooterCard from './FooterCard';
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";


const Footer = () => {
    return (
        <footer className="bg-white w-full justify-center flex flex-col border-t">
            <div className="container mx-auto w-full px-5 md:px-10">
                {/* footer infos */}
                <div className="flex  flex-wrap space-y-4 pb-10 pt-8    border-b justify-between items-center">
                    <FooterCard
                        image="/icons/f1.svg"
                        title="Free Shopping"
                        subtitle="For All Orders over 2000TK"
                    />
                    <FooterCard
                        image="/icons/f2.svg"
                        title="1 & 1 Returns"
                        subtitle="Cancellation after 1 day"
                    />
                    <FooterCard
                        image="/icons/f3.svg"
                        title="100% Secure Payment"
                        subtitle="Gurantee secure payments"
                    />
                    <FooterCard
                        image="/icons/f4.svg"
                        title="24/7 Dedicated Support"
                        subtitle="Anywhere & anytime"
                    />
                    <FooterCard
                        image="/icons/f5.svg"
                        title="Daily Offers"
                        subtitle="Discount up to 70% OFF"
                    />
                </div>

                {/* footer widgets */}
                <div className="my-10 flex flex-wrap gap-10 justify-between">
                    <div className="max-w-sm">
                        <h2 className="text-xl mb-5 font-bold">
                            Labbaik Motors – Your Online Auto Mobile Parts.
                        </h2>
                        <p>
                            Labbaik Motors is a leading e-commerce platform committed to delivering safe,
                            healthy, and organic food products across Bangladesh.
                            Renowned for its dedication to quality, Labbaik Motors offers a diverse range of
                            health-focused items, including premium mustard oil, pure ghee, organic honey,
                            dates, chia seeds, and an assortment of nuts.
                            Each product is carefully sourced and crafted to ensure maximum health benefits,
                            meeting the highest standards of purity and freshness.
                        </p>
                    </div>
                    {/* Links  */}
                    <div className="">
                        <h2 className="text-lg mb-6 font-bold">Useful Links</h2>
                        <div className="">
                            <ul>
                                <FooterLink href="/" text="About Us" />
                                <FooterLink href="/" text="Contact" />
                                <FooterLink href="/" text="Checkout" />
                                <FooterLink href="/" text="Shipping" />
                                <FooterLink href="/" text="Policy" />
                                <FooterLink href="/" text="Flash Sale" />
                                <FooterLink href="/" text="Official" />
                                <FooterLink href="/" text="Payments" />
                            </ul>
                        </div>
                    </div>
                    {/* Links  */}

                    {/* News */}
                    <div className="max-w-sm">
                        <h2 className="text-lg mb-6 font-bold">Labbaik Motors Busines</h2>
                        <p className="text-color">
                            Register now to get updates on promotions and coupns. Don&apos;t worry!
                            We not spam
                        </p>
                        <span className="flex items-start mt-6">
                            <FiPhoneCall className="text-color text-xl mt-[5px] " />
                            <div className="flex flex-col ml-4">
                                <p className="text-2xl font-semibold text-muted-foreground">Hotline 24/7</p>
                                <h3 className="text-2xl font-semibold text-muted-foreground">
                                    <a href="tel:+8801921563031"> (+880) 1711153876</a>
                                </h3>
                            </div>
                        </span>
                        <span className="flex items-center mt-5">
                            <AiOutlineShop className="text-color  text-xl " />
                            <address className=" ml-4">
                                <p className="">1/1/A, Oriental Bongshal Motors Parts Market, New Eskaton, Dhaka-1000 </p>
                            </address>
                        </span>
                        <span className="flex items-center mt-5">
                            <HiOutlineMail className="text-color text-xl  " />
                            <div className=" ml-4">
                                <p className="">
                                    <a href="mailto:kaziarifmaksud80@gmail.com">
                                        {" "}
                                        labbaikmotors@gmail.com
                                    </a>
                                </p>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="py-8 max-sm:mb-12 bg-gray-200 flex w-full flex-wrap space-y-3 justify-center  items-center border-t">
                <p className="text-sm  text-center">Developed & Maintain by
                    <Link className="hover:text-orange-800 font-bold  hover:underline" to="https://amirhamzadev.com">  Amir Hamza  </Link>
                    &copy;Copyrights: {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
};
const FooterLink = ({ href = "/", text }) => (
    <li className="mb-2 text-color hover:text-primary ">
        <Link href={href}>{text} </Link>
    </li>
);

export default Footer