import axios from "axios";


async function uploadFile(file: any) {

    const formData = new FormData();

    formData.append("file", file);

    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET as string);
    formData.append('public_id', process.env.NEXT_PUBLIC_PUBLIC_ID as string);
    formData.append('api_key', process.env.NEXT_PUBLIC_API_KEY as string);

    const cacheControl = "max-age=0, no-cache, no-store, must-revalidate";

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/auto/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        params: {
            cache_control: cacheControl
        }
    });

    return response.data;

}


async function uploadFileToCloudinary(files: any, fileType="file") {


    return await uploadFile(files);


    // if (files instanceof File) {

    //     console.log(files);


    // } else if (Array.isArray(files) && files.every((file) => file instanceof File)) {
    //     const filesArray = Array.from(files);
    //     const promises = filesArray.map(file => {
    //         return uploadFile(file, fileType);
    //     });

    //     return Promise.all(promises)
    //     .then((results) => {
    //         return {
    //             isSuccessful: true,
    //             results
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         return {
    //             isSuccesful: false,
    //             error
    //         }
    //     });
    // }

    // console.log("File", files);

}

function deleteFileFromCloudinary(path: string) {
    console.log("Delete file");
}

export {
    uploadFileToCloudinary,
    deleteFileFromCloudinary
}
