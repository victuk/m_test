import Image from "next/image";
import { PiPencilSimpleLine } from "react-icons/pi";

function EditProfile() {
    return (
        <div>
            <div className="flex flex-col w-[800px] gap-10 mx-auto py-20">

                <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden mx-auto">
                    <Image src="/auth_pic.jpeg" fill={true} alt="Profile picture" style={{zIndex: "20"}} />
                    <button style={{zIndex: "120", position: "absolute", left: "50%"}} className="text-black bg-white bottom-[20px] translate-x-[-50%] px-4 py-1 rounded-[10px]"><PiPencilSimpleLine /> Edit</button>
                </div>

                <div>
                    <label htmlFor="">Full Name</label>
                    <input type="text" placeholder="Enter full name" className="border border-greybg rounded-[5px] w-full p-3" />
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter email address" className="border border-greybg rounded-[5px] w-full p-3" />
                </div>

                <div>
                    <label htmlFor="">Phone Number</label>
                    <input type="tel" placeholder="Enter phone number" className="border border-greybg rounded-[5px] w-full p-3" />
                </div>

                <div>
                    <button className="text-center w-full bg-yellow p-4 rounded-[5px]">Save</button>
                </div>
            </div>
        </div>
    );
}

export {
    EditProfile
}
