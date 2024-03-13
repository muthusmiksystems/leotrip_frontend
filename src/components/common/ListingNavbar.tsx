import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Leo } from '../../assets/icons/LeoLogo.svg';
import BusNavIcon from '../../assets/images/listbus.png';
import FlightNavIcon from '../../assets/images/listflist.png';
import HotelNavIcon from '../../assets/images/listhotel.png';
import CarNavIcon from '../../assets/images/listcar.png';
import BusShrinkIcon from '../../assets/icons/bus-bgless.svg';
import FlightShrinkIcon from '../../assets/icons/flight-bgless.svg';
import HotelShrinkIcon from '../../assets/icons/hotel-bgless.svg';
import CarShrinkIcon from '../../assets/icons/car-bgless.svg';
import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg';
import { Avatar } from './ListingAvatar';
import menu from '../../assets/images/menu.png'



// type AnyFunction = (...args: any[]) => any;

// // function debounce<F extends AnyFunction>(func: F, delay: number): (...args: Parameters<F>) => void {
// //     let timeoutId: ReturnType<typeof setTimeout>;

// //     return function (...args: Parameters<F>): void {
// //         clearTimeout(timeoutId);
// //         timeoutId = setTimeout(() => {
// //             func.apply(null, args);
// //         }, delay);
// //     };
// // }


function Navbar() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(false)
    const handleScroll = () => {
        console.log(window.scrollY)
        if (window.scrollY > 200) {
            setIsScrolled(true);
        } else if (window.scrollY > 190 && window.scrollY < 200) {
            // Scroll to 190
            window.scrollTo(0, 180);
        } else if (window.scrollY > 201 && window.scrollY < 220) {
            // Scroll to 220
            window.scrollTo(0, 220);
        } else {
            setIsScrolled(false);
            setOpenMenu(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) {
                setOpenMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const navbarLinks = [
        { to: '/flights', label: 'Flights', icon: isScrolled ? FlightShrinkIcon : FlightNavIcon },
        { to: '/hotel', label: 'Hotel', icon: isScrolled ? HotelShrinkIcon : HotelNavIcon },
        { to: '/bus', label: 'Bus', icon: isScrolled ? BusShrinkIcon : BusNavIcon },
        { to: '/car', label: 'Car', icon: isScrolled ? CarShrinkIcon : CarNavIcon },
    ];
    const menuLinks = [
        { to: '/flights', label: 'Flights', icon: isScrolled ? FlightShrinkIcon : FlightShrinkIcon },
        { to: '/hotel', label: 'Hotel', icon: isScrolled ? HotelShrinkIcon : HotelShrinkIcon },
        { to: '/bus', label: 'Bus', icon: isScrolled ? BusShrinkIcon : BusShrinkIcon },
        { to: '/car', label: 'Car', icon: isScrolled ? CarShrinkIcon : CarShrinkIcon },
    ];
    const handlemenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            <nav className={`navbar bg-white  pt-1 shadow-bottom sticky top-0 ${isScrolled ? (openMenu ? "flex flex-wrap h-[125px] animate-slide-in-top" : "h-16 animate-slide-in-top") : (openMenu ? "flex flex-wrap h-[150px] " : 'h-20')
                } transition-all duration-300 z-50 `}>
                <div className={`container border-int-dark-blue border-5 flex justify-between items-center ${isScrolled ? 'h-12' : 'h-16 mt-3'} transition-all duration-300 `}>
                    <div className="flex ml-3 items-center space-x-6 md:space-x-16 md:ml-0 lg:ml-[5%] w-full">
                        <Link to="/" className='w-[10%]'>
                            <Leo className={`${isScrolled ? 'w-10' : 'w-20'} h-auto`} />
                        </Link>

                        <div className={`hidden md:flex space-x-2 md:space-x-16 py-5 md:py-0 mt-1 w-[60%] `}>
                            {navbarLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex p-[1px] rounded-[2px] flex-col m-2 items-center text-int-black w-[70px] hover:bg-int-background hover:border-b-4 ${location.pathname === link.to
                                        ? 'border-b-4 border-int-yellow hover:border-int-yellow'
                                        : 'hover:border-int-gray-20'
                                        }`}
                                >
                                    <div className={`${isScrolled ? "h-[20px]" : "h-[30px"} mb-1 ${isScrolled ? 'scale-90' : ''} transition-all duration-300`}>
                                        <img src={link.icon} alt={''} className={`${isScrolled ? 'w-8' : 'w-10'} h-auto`} />
                                    </div>
                                    <span className={` font-poppinsRegular ${isScrolled ? 'text-sm' : 'mt-2'} transition-all duration-300`}>{link.label}</span>
                                </Link>
                            ))}
                        </div>

                        <div className=' ml-auto  min-w-[1%] hidden md:flex'>
                            <Avatar />
                        </div>
                    </div>
                    <div className="flex row md:hidden mx-3 ">
                        {/* <Avatar /> */}
                        <div className='m-auto mx-2 ' onClick={handlemenu}>
                            <img src={menu} alt='404' />
                        </div>
                    </div>

                </div>
                <div className=''>
                {openMenu && (
                    <div className={`flex space-x-2 mt-0 pt-0 md:space-x-16 py-5 md:py-0  w-[100%] `}>
                        {menuLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex p-[1px] rounded-[2px] flex-col m-2 items-center text-int-black w-[70px] hover:bg-int-background hover:border-b-4 ${location.pathname === link.to
                                    ? 'border-b-4 border-int-yellow hover:border-int-yellow'
                                    : 'hover:border-int-gray-20'
                                    }`}
                            >
                                <div className={`h-[20px]" mb-1 scale-90 transition-all duration-300`}>
                                    <img src={link.icon} alt={''} className={`w-8 h-auto`} />
                                </div>
                                <span className={` font-poppinsRegular text-sm' transition-all duration-300`}>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
                </div>
            </nav>

        </>
    );
}

export default Navbar;