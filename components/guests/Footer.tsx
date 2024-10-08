import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

function GuestFooter() {
    return (
        <div className="grid grid-cols-2 xl:grid-cols-6 justify-center gap-4 px-8 xl:px-20 py-14 bg-greybg">
            <div className="col-span-2 xl:col-span-2">
                <div className="relative h-[60px] w-[180px] mb-4">
                    <Image src="/maij_logo.png" fill={true} alt="Maji logo" />
                </div>
                <div className="text-[14px]">The Media Awareness and Justice Initiative (MAJI) is a Nigerian organization committed to empowering marginalized communities through participatory media and advocacy. They focus on Human, Gender, and Environmental Rights, Inclusive Governance, Youth Development, and Community Health, supporting independent media projects and citizen journalism. MAJI's approach emphasizes ongoing dialogue, community engagement, and democratic values for sustainable social change.</div>
            </div>

            <div>
                <div className="font-bold text-[16px]">About Us</div>
                <div className="text-[14px] flex flex-col gap-2 mt-4">
                    <Link href="/aboutus#aboutwhoweare">Who We Are</Link>
                    <Link href="/aboutus#aboutwherewework">Where We Work</Link>
                    <Link href="/aboutus#historyandbackground">Our History and Background</Link>
                    <Link href="/aboutus#ourmethodology">Our Methodology</Link>
                </div>
            </div>
            <div>
                <div className="font-bold text-[16px]">Thematic Areas</div>
                <div className="text-[14px] flex flex-col gap-2 mt-4">
                    <Link href="/researchandreport/bycategory/enviromental-rights">Enviromental Rights</Link>
                    <Link href="/researchandreport/bycategory/human-rights">Human Rights</Link>
                    <Link href="/researchandreport/bycategory/technology">Technology</Link>
                    <Link href="/researchandreport/bycategory/gender-rights">Gender Rights</Link>
                </div>
            </div>
            <div className="col-span-2 xl:col-span-1">
                <div className="font-bold text-[16px]">Quick Links</div>
                <div className="text-[14px] flex flex-col gap-2 mt-4">
                    <Link href="/researchandreport/bycategory/report">Reports</Link>
                    <Link href="/researchandreport/bycategory/research">Research</Link>
                    <Link href="/media">Media</Link>
                </div>
            </div>
            <div className="col-span-2 xl:col-span-1 flex flex-col gap-8">
                <div className="font-bold text-[16px]">Follow Us</div>
                <div className="flex gap-8">
                    <a href="https://www.facebook.com/Media4JusticeNG"><BsFacebook className="h-[40px] w-[40px]" /></a>
                    {/* <a href=""><BsInstagram className="h-[40px] w-[40px]" /></a> */}
                    <a href="https://twitter.com/MediaMaji"><BsTwitter className="h-[40px] w-[40px]" /></a>
                    {/* <a href=""><BsYoutube className="h-[40px] w-[40px]" /></a> */}
                    {/* <a href=""><BsYoutube className="h-[40px] w-[40px]" /></a> */}
                </div>
                <div className="flex gap-2">
                <Link href="">Contact Us</Link>|<Link href="">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}


export {
    GuestFooter
}

