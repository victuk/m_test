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

 const labelStyle = {
    backgroundColor: "indigo",
    color: "white",
    padding: "0.5rem",
    fontFamily: "sans-serif",
    borderRadius: "0.3rem",
    cursor: "pointer",
    marginTop: "1rem"
  }

import { Option, optionClasses } from '@mui/base/Option';
import { useEffect, useState } from 'react';
import { add, selectStatus, selectValue } from '@/lib/features/videos/videosSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { SpinLoader } from '@/components/LoadingAnimation/spinLoader';
import { UploadFile } from '@/components/admindashboard/UploadFile';
import { AddAreaHeader } from '@/components/admindashboard/AddAreaHeader';

export default function Page() {

    const dispatch = useAppDispatch();
    const thematicarea = useAppSelector(selectValue);
    const status = useAppSelector(selectStatus);

    const maxwords = 2500;

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [youtube, setYoutube] = useState("");

    const hasReachedLimit = () => {
        console.log(description.length, "of", maxwords);
        if (description.length > maxwords) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (description != "" && youtube != "" && title != "") {
            if (hasReachedLimit()) {
                setButtonDisabled(true);
            } else {
                setButtonDisabled(false);
            }
        } else {
            setButtonDisabled(true);
        }

        console.log(buttonDisabled);

    }, [youtube, description, title]);

    const submitHandler = () => {
        dispatch(add({
            title,
            details: description,
            youtubeURL: youtube
        }))
    }

    const inputClass = "p-3 rounded-[5px] border border-[0.5px] bg-adminbg border-[#878787]";

    return (
        <div>
            <div className='flex flex-col w-[800px] mx-auto py-20 gap-6'>

                    <AddAreaHeader
                        title='Upload Video'
                        key="upload-video-header"
                    />

                <div className='flex flex-col'>
                    <label htmlFor="area-title">Video Title</label>
                    <input type="text" className={inputClass} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter a title' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="area-title">Video Description</label>
                    <textarea className={inputClass} name="" id="" rows={12} placeholder='Type text here' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    <div className='text-right'>
                        <small>{description.length}/{maxwords}</small>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="area-title">Youtube URL</label>
                    <input type="text" className={youtube} onChange={(e) => { setYoutube(e.target.value) }} placeholder='Enter the yourube url' />
                </div>

                <div>
                    <button className={`${buttonDisabled ? "bg-[#E6E6E6] text-[#595959]" : "bg-yellow text-[#1A1A1A]"} w-full p-3 rounded-[5px]`} disabled={buttonDisabled || status == "loading"} onClick={submitHandler}>{status == "loading" ? <SpinLoader /> : "Upload"}</button>
                </div>

            </div>
        </div>
    );
}