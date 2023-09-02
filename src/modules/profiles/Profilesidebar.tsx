import { useRef, useState } from 'react';
import profileuser from '../../assets/icons/profileuser.svg';
import profilerolling from '../../assets/icons/profilerolling.svg';
import profilelove from '../../assets/icons/profilelove.svg';
import profilesearch from '../../assets/icons/profilesearch.svg';
import profilelogout from '../../assets/icons/profilelogout.svg';
import user from '../../assets/icons/user.svg';
import edit from '../../assets/icons/edit.svg';


export default function Profilesidebar() {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [userImage, setUserImage] = useState(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setUserImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isDropOpen, setIsDropOpen] = useState(false);

    const Dropdown = () => {
        setIsDropOpen(!isDropOpen);
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionClick = (option: any) => {
        setIsOpen(false);
        setIsDropOpen(false);
    };

    return (
        <>
            <div className="h-48 w-48 mx-auto border bg-gradient-to-tl from-blue-500 via-blue-50 to-blue-500">
                <img src={userImage || user} alt="user" className={`${user ? 'h-20 w-20 m-14' : ''} ${userImage ? 'h-48 w-48 m-[0]' : ''} z-0 overflow-hidden`} />
                <button onClick={handleButtonClick} className='w-full'>
                    <img src={edit} alt="edit" className='border-4 border-white rounded-full ml-[12.5%] h-10 z-40 absolute mt-[-75px]' />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
            <div className='font-poppinsRegular text-xl ml-7 mt-10 leading-[3.3rem]'>
                <button onClick={toggleDropdown} className={`flex gap-x-2 w-48 hover:bg-blue-200 ${isOpen ? 'bg-blue-200': ''}`}>
                    <img src={profileuser} alt='profileuser' className='mt-3' />
                    My Profile</button>
                
                {isOpen && (
                    <ul className='w-48 hover:bg-gradient-to-r from-white via-white to-blue-200'>
                        <li onClick={() => handleOptionClick('Travellers') }>&nbsp;&nbsp;&nbsp;&nbsp;-  Travellers</li>
                    </ul>
                )}
                <button onClick={Dropdown} className={`flex gap-x-2 w-48 hover:bg-blue-200 ${isDropOpen ? 'bg-blue-200': ''}`}>
                    <img src={profilerolling} alt='profilerolling' className='mt-3' />
                    My Trips</button>
                {isDropOpen && (
                    <ul >
                        <li onClick={() => handleOptionClick('Flight')} className='w-48 hover:bg-gradient-to-r from-white via-white to-blue-200'>&nbsp;&nbsp;&nbsp;&nbsp;-  Flight</li>
                        <li onClick={() => handleOptionClick('Hotel')} className='w-48 hover:bg-gradient-to-r from-white via-white to-blue-200'>&nbsp;&nbsp;&nbsp;&nbsp;-  Hotel</li>
                        <li onClick={() => handleOptionClick('Bus')} className='w-48 hover:bg-gradient-to-r from-white via-white to-blue-200'>&nbsp;&nbsp;&nbsp;&nbsp;-  Bus</li>
                        <li onClick={() => handleOptionClick('Car')} className='w-48 hover:bg-gradient-to-r from-white via-white to-blue-200'>&nbsp;&nbsp;&nbsp;&nbsp;-  Car</li>
                    </ul>
                )}
                <button  className={`flex gap-x-2 w-48 hover:bg-blue-200`}>
                    <img src={profilelove} alt='profilelove' className='mt-3' />
                    Saved
                </button>
                <button className={`flex gap-x-2 w-48 hover:bg-blue-200`}>
                    <img src={profilesearch} alt='profilesearch' className='mt-3' />
                    Offers
                </button>
                <button className={`flex gap-x-2 w-48 hover:bg-blue-200`}>
                    <img src={profilelogout} alt='profilelogout' className='mt-3' />
                    Logout
                </button>
            </div>
        </>
    );
}