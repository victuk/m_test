'use client'
import { toast } from 'react-toastify';
import { CldUploadButton } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { edit, selectStatus } from '@/lib/features/news/newsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { UploadFile } from '../../../../../../components/admindashboard/UploadFile';
import { AddAreaHeader } from '../../../../../../components/admindashboard/AddAreaHeader';
import { SpinLoaderTwo } from '../../../../../../components/LoadingAnimation/spinLoader';
import { AnyARecord } from 'dns';
import { useParams, useRouter } from 'next/navigation';
import { singleNews } from '@/lib/features/news/newsAPI';

export default function Page() {

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);

    const params = useParams();
    const router = useRouter();

    const maxwords = 2500;

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [semanticText, setSemanticText] = useState("");
    const [title, setTitle] = useState("");
    const [pictureUrl, setpictureUrl] = useState("");
    const [originalFileName, setOriginalFileName] = useState("");

    const hasReachedLimit = () => {
        if (semanticText.length > maxwords) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (semanticText != "" && title != "" && pictureUrl != "") {
            if (hasReachedLimit()) {
                setButtonDisabled(true);
            } else {
                setButtonDisabled(false);
            }
        } else {
            setButtonDisabled(true);
        }

    }, [semanticText, title]);

    const submitHandler = () => {
        dispatch(edit({
            _id: params!!.id as string,
            title,
            picture: pictureUrl,
            details: semanticText
        })).then(() => {
            setSemanticText("");
            setTitle("");
            setpictureUrl("");
            setOriginalFileName("");
        });

        setTimeout(() => {
            router.push("/admin/dashboard/news");
        }, 4000);
    }

    useEffect(() => {
        if (status == "success") {
            toast.success("News edited successfully");
        }
    }, [status]);

    const removeFile = () => {
        setpictureUrl("");
        setOriginalFileName("");
    }

    const getInputs = async () => {

        const result = await singleNews(params!!.id as string);
        console.log("News area result", result.response.news);

        const { title, picture, details } = result.response.news;

        console.log("Result:", title, picture, details);

        setSemanticText(details);
        setTitle(title);
        setpictureUrl(picture);
        setOriginalFileName(picture);

    }

    useEffect(() => {
        getInputs();
    }, []);

    const inputClass = "p-3 rounded-[5px] border border-[0.5px] bg-adminbg border-[#878787]";

    return (
        <div>
            <div className='flex flex-col w-full xl:w-[800px] mx-auto py-20 gap-6'>

                <AddAreaHeader
                    title='Upload News'
                    key='news-header'
                />

                <UploadFile
                    title='Drop your image file here or open gallery'
                    body='Maximum upload files less than 30mb'
                    buttonTitle='Browse file'
                    iconType='picture'
                    forId='news_upload_1'
                    fileUrl={originalFileName}
                    clearFile={removeFile}
                    key={"news_file_upoload"}
                >
                    <CldUploadButton

                        className="border rounded-[8px] py-3 px-8 w-fit mx-auto"
                        options={{
                            multiple: false,
                            sources: ["local", "dropbox", "google_drive"]
                        }}
                        onSuccess={(result: any, widget) => {
                            if (result.event == "success") {
                                setpictureUrl(result!!.info.secure_url);  // { public_id, secure_url, etc }
                                setOriginalFileName(result.info.original_filename);
                            } else {
                                toast.error("File upload failed, kindly retry.");
                            }
                            widget.close();
                        }}

                        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
                    >
                        Upload picture
                    </CldUploadButton>
                </UploadFile>

                {/* <div className='flex flex-col'>
                    <label htmlFor="select-category">Select category</label>
                    <select className={inputClass} value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="">Select a category for your thematic area</option>
                        <option value="human-rights">Human Rights</option>
                        <option value="gender-rights">Gender Rights</option>
                        <option value="enviromental-rights">Enviromental Rights</option>
                        <option value="technology">Technology</option>
                    </select>
                </div> */}

                <div className='flex flex-col'>
                    <label htmlFor="area-title">Thematic Area Title</label>
                    <input type="text" className={inputClass} value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter a semantic title' />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="area-title">Thematic Area Body</label>
                    <textarea className={inputClass} value={semanticText} name="" id="" rows={12} placeholder='Type text here' onChange={(e) => { setSemanticText(e.target.value) }}></textarea>
                    <div className='text-right'>
                        <small>{semanticText.length}/{maxwords}</small>
                    </div>
                </div>

                <div>
                    <button className={`${buttonDisabled ? "bg-[#E6E6E6] text-[#595959]" : "bg-yellow text-[#1A1A1A]"} w-full p-3 rounded-[5px]`} disabled={buttonDisabled} onClick={submitHandler}>{status == "loading" ? (<SpinLoaderTwo />) : "Edit news"}</button>
                </div>

            </div>
        </div>
    );
}