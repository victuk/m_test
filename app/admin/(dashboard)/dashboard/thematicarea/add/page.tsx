'use client'
import {
    Select,
    selectClasses,
    SelectListboxSlotProps,
    SelectProps,
    SelectRootSlotProps,
} from '@mui/base/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IoArrowBack } from "react-icons/io5";
import { toast } from 'react-toastify';



import { Option, optionClasses } from '@mui/base/Option';
import { useEffect, useState } from 'react';
import { add, selectStatus, selectValue } from '@/lib/features/thematic/thematicSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { UploadFile } from '@/components/admindashboard/UploadFile';
import { AddAreaHeader } from '@/components/admindashboard/AddAreaHeader';
import { SpinLoaderTwo } from '@/components/LoadingAnimation/spinLoader';

export default function Page() {

    const dispatch = useAppDispatch();
    const thematicarea = useAppSelector(selectValue);
    const status = useAppSelector(selectStatus);

    const maxwords = 2500;

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [semanticText, setSemanticText] = useState("");
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [pictureUrl, setpictureUrl] = useState("");   

    const hasReachedLimit = () => {
        console.log(semanticText.length, "of", maxwords);
        if (semanticText.length > maxwords) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (semanticText != "" && category != "" && title != "" && pictureUrl != "") {
            if (hasReachedLimit()) {
                setButtonDisabled(true);
            } else {
                setButtonDisabled(false);
            }
        } else {
            setButtonDisabled(true);
        }

        console.log(buttonDisabled);

    }, [semanticText, category, title]);

    const submitHandler = () => {
        dispatch(add({
            category,
            title,
            picture: pictureUrl,
            details: semanticText
        }));
    }

    useEffect(() => {

        if(status == "success") {
            toast.success("Thematic area added successfully");
        }

    }, [status]);


    const inputClass = "p-3 rounded-[5px] border border-[0.5px] bg-adminbg border-[#878787]";

    return (
        <div>
            <div className='flex flex-col w-[800px] mx-auto py-20 gap-6'>

                <AddAreaHeader
                    title='Upload Thematic Area'
                    key='thematic-area-header'
                />

                <UploadFile
                    title='Drop your image file here or open gallery'
                    body='Maximum upload files less than 30mb'
                    buttonTitle='Browse file'
                    iconType='picture'
                    setFileUrl={setpictureUrl}
                    key={"file_upoload"}
                />

                <div className='flex flex-col'>
                    <label htmlFor="select-category">Select category</label>
                    <select className={inputClass} onChange={(e) => { setCategory(e.target.value) }}>
                        <option>Select a category for your thematic area</option>
                        <option value="human-rights">Human Rights</option>
                        <option value="gender-rights">Gender Rights</option>
                        <option value="enviromental-rights">Enviromental Rights</option>
                        <option value="technology">Technology</option>
                    </select>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="area-title">Thematic Area Title</label>
                    <input type="text" className={inputClass} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter a semantic title' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="area-title">Thematic Area Title</label>
                    <textarea className={inputClass} name="" id="" rows={12} placeholder='Type text here' value={semanticText} onChange={(e) => { setSemanticText(e.target.value) }}></textarea>
                    <div className='text-right'>
                        <small>{semanticText.length}/{maxwords}</small>
                    </div>
                </div>

                <div>
                    <button className={`${buttonDisabled ? "bg-[#E6E6E6] text-[#595959]" : "bg-yellow text-[#1A1A1A]"} w-full p-3 rounded-[5px]`} disabled={buttonDisabled} onClick={submitHandler}>{status == "loading" ? (<SpinLoaderTwo />) : "Upload thematic area"}</button>
                </div>

            </div>
        </div>
    );
}