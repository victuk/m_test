"use client"
import { ThematicAreaInterface, get, remove, selectPage, selectTotalPages, selectValue } from "@/lib/features/thematic/thematicSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { Menu } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu, MenuListboxSlotProps } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { PaginateNumbers } from "./PaginateNumbers";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { RxExclamationTriangle } from "react-icons/rx";

interface thematicarealistprop {
    navigateTo: string
}

interface openStateInterface {
    openState: boolean,
    setOpen: (state: boolean) => void,
    id: string,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    // border: '2px solid #000',
    boxShadow: 24,
    zIndex: "100",
    p: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRadius: "10px"
  };

function DeleteModal({openState, setOpen, id}: openStateInterface) {

    const dispatch = useAppDispatch();
    
    const handleClose = () => {
        setOpen(false)
    }

    const removeFromThematic = () => {
        dispatch(remove(id));
        setOpen(false);
    }

    // useEffect(() => {

    //     setOpen(openState)
    // }, [openState]);

    return (
        <Modal
            open={openState}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >   
            <Box sx={style}>
                <Typography id="modal-modal-title" className="flex items-center justify-center" variant="h6" component="h2">
                <RxExclamationTriangle className="mr-4" /> Delete thematic area?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this thematic area?
                </Typography>
                <div className="flex gap-4">
                    <button className="pointer-cursor w-full p-2 rounded-[10px] border" onClick={() => {handleClose()}}>Cancel</button>
                    <button className="pointer-cursor w-full p-2 rounded-[10px] text-white bg-deletebutton" onClick={() => {removeFromThematic()}}>Delete</button>
                </div>
            </Box>
        </Modal>
    );
}

function ThematicAreaList(props: thematicarealistprop) {

    const thematicarea = useAppSelector(selectValue);
    const curretPage = useAppSelector(selectPage);
    const totalPages = useAppSelector(selectTotalPages);

    const router = useRouter();

    const [open, setOpen] = useState(false);
    
//   const handleOpen = () => setOpen(true);

    const [id, setId] = useState("");
  

    const dispatch = useAppDispatch();

    console.log(thematicarea);


    const goToPage = (page: number, limit: number) => {
        console.log(page, limit);
        dispatch(get({page, limit}));
    }
    

    return (
        <div>
            <div className="text-right mb-4">
                <button
                    onClick={() => router.push(props.navigateTo)}
                    className="p-4 bg-yellow"
                >Add Thematic Area</button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 z-40 mb-20">
                {thematicarea.length > 0 && thematicarea.map((record: ThematicAreaInterface) => {
                    return (
                        <div className="w-full p-4 bg-white relative">
                            <div className="w-full h-[240px] relative z-10" style={{ backgroundImage: `url("${record.picture}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat", borderRadius: "5px", backgroundPosition: "center" }}>
                                {/* <Image src={record.picture} fill={true} alt="Thematic picture list" className="z-10" /> */}
                                <div className="top-[20px] left-[20px] absolute z-40 bg-yellow rounded-[40px] w-fit px-2">{record.category?.split("-").map(v => v[0].toLocaleUpperCase() + v.slice(1)).join(" ")}</div>
                            </div>
                            <div className="pt-4 flex justify-between w-full">
                                <div className="font-bold" style={{ textWrap: "wrap" }}>{record.title!!.length > 100 ? record.title?.slice(0, 100) + "..." : record.title}</div>
                                <Dropdown>
                                    <MenuButton className='flex gap-2'>
                                        <BsThreeDotsVertical />
                                    </MenuButton>
                                    <Menu className='bg-white flex flex-col gap-8 p-4' style={{ zIndex: "80" }}>
                                        <MenuItem className="cursor-pointer" onClick={() => {router.push(`/thematicarea/${record!!._id}`)}}>View More</MenuItem>
                                        <MenuItem className="cursor-pointer" onClick={() => {router.push(`/admin/dashboard/thematicarea/${record!!._id}`)}}>Edit</MenuItem>
                                        <MenuItem className="cursor-pointer text-deletebutton" onClick={() => { setId(record!!._id as string); setOpen(true) }}>Delete</MenuItem>
                                    </Menu>
                                </Dropdown>
                            </div>
                        </div>
                    );
                })}
                <DeleteModal openState={open} setOpen={setOpen} id={id} />
            </div>
            <PaginateNumbers
                currentPage={curretPage}
                totalPages={totalPages}
                setPageAndMove={goToPage}
            />
        </div>
    );
}


export {
    ThematicAreaList
}
