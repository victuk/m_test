"use client"
import { PaginateNumbers } from "@/components/admindashboard/PaginateNumbers";
import { GuestFooter } from "@/components/guests/Footer";
import { GuestHeader } from "@/components/guests/Header"
import { ThematicAreaList } from "@/components/guests/ThematicAreaList";
import { GuestPaginateNumbers } from '@/components/guests/GuestPaginateNumbers';
import { useEffect, useState } from "react";
import { ThematicAreaInterface } from "@/lib/features/thematic/thematicSlice";
import { guestThematicAreaList } from "@/lib/features/guestAPI/homePage";
import { SpinLoader } from "@/components/LoadingAnimation/spinLoader";

export default function GuestThematicAreaPage() {

    const [list, setList] = useState<ThematicAreaInterface[]>([]);
    const [listState, setListState] = useState("loading");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchIt = async () => {
        const result = await guestThematicAreaList(1, 10);
        setList(result.response.details.results);
        setCurrentPage(result.response.details.currentPage);
        setTotalPages(result.response.details.totalPages);
        setListState("idle");
    }

    useEffect(() => {
        fetchIt();
    }, []);

    const gotoPage = (page:number, _limit: number) => {
        setCurrentPage(page);
        fetchIt();
    }

    if(listState == "loading") {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <SpinLoader />
            </div>
        );
    }

    return (
        <div style={{overflow: "auto", height: "100vh"}}>
            <GuestHeader />
            <div className="px-20 py-16 bg-black text-white text-center text-[32px] font-bold">
                Thematic Areas
            </div>
            <ThematicAreaList list={list} />
            <GuestPaginateNumbers
                currentPage={currentPage}
                totalPages={totalPages}
                setPageAndMove={gotoPage}
            />
            <GuestFooter />
        </div>
    );
}