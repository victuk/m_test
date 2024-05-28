import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

function GuestFooter() {
    return (
        <div className="flex fustify-center gap-4 mx-20 my-10">
            <div className="w-[40%]">
                <div className="relative h-[40px] w-[100px]">
                    <Image src="/maij_logo.png" fill={true} alt="Maji logo" />
                </div>
                <div className="text-[14px]">The Media Awareness and Justice Initiative (MAJI) is a Nigerian organization committed to empowering marginalized communities through participatory media and advocacy. They focus on Human, Gender, and Environmental Rights, Inclusive Governance, Youth Development, and Community Health, supporting independent media projects and citizen journalism. MAJI's approach emphasizes ongoing dialogue, community engagement, and democratic values for sustainable social change.</div>
            </div>

            <div className="w-[15%]">
                <div className="font-bold text-[16px]">About Us</div>
                <div className="text-[14px] flex flex-col gap-2 mt-4">
                    <Link href="">Who We Are</Link>
                    <Link href="">Where We Work</Link>
                    <Link href="">Our History and Background</Link>
                    <Link href="">Our Methodology</Link>
                </div>
            </div>
            <div className="w-[15%]">
                <div className="font-bold text-[16px]">Semantics</div>
                <div className="text-[14px] flex flex-col gap-2 mt-4">
                    <Link href="">Enviromental Rights</Link>
                    <Link href="">Human Rights</Link>
                    <Link href="">Technology</Link>
                    <Link href="">Gender Rights</Link>
                </div>
            </div>
            <div className="w-[15%]">
                <div className="font-bold text-[16px]">Quick Links</div>
                <div className="text-[14px] flex flex-col gap-2 mt-4">
                    <Link href="">Reports</Link>
                    <Link href="">Research</Link>
                    <Link href="">Media</Link>
                </div>
            </div>
            <div className="w-[15%] flex flex-col gap-8">
                <div className="font-bold text-[16px]">Follow Us</div>
                <div className="flex justify-between">
                    <a href=""><BsFacebook className="h-[40px] w-[40px]" /></a>
                    <a href=""><BsInstagram className="h-[40px] w-[40px]" /></a>
                    <a href=""><BsTwitter className="h-[40px] w-[40px]" /></a>
                    <a href=""><BsYoutube className="h-[40px] w-[40px]" /></a>
                </div>
                <div className="flex gap-4">
                <Link href="">Contact Us</Link>|<Link href="">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}


export {
    GuestFooter
}

