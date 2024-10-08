"use client"
import React, { useEffect, useState } from 'react';
import { GuestFooter } from "@/components/guests/Footer";
import { GuestHeader } from "@/components/guests/Header"
import { ThematicAreaList } from "@/components/guests/ThematicAreaList";
import { GuestPaginateNumbers } from '@/components/guests/GuestPaginateNumbers';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { guestThematicAreaListByCategory } from '@/lib/features/guestAPI/homePage';
import { ThematicAreaInterface } from '@/lib/features/thematic/thematicSlice';
import { SpinLoader } from '@/components/LoadingAnimation/spinLoader';



export default function GuestThematicAreaByCategory({params}: {params: {category: string}}) {

    const [list, setList] = useState<ThematicAreaInterface[]>([]);
    const [listState, setListState] = useState("loading");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchIt = async () => {
        const result = await guestThematicAreaListByCategory(params.category, 1, 10);
        setList(result.response.details.results);
        setCurrentPage(result.response.details.currentPage);
        setTotalPages(result.response.details.totalPages);
        setListState("idle");
    }

    const parameter = useParams();

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
                {(parameter.category as string).split("-").map((value: string) => value[0].toLocaleUpperCase() + value.slice(1)).join(" ")}
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