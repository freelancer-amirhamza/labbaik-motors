import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false);
    const isMobile = useMobile();
    const params = useLocation();
    const searchText = params?.search?.slice(7);

    const handleOnChange = (e)=>{
        const value = e.target.value;
        const url = `/search?query=${value}`
        navigate(url)
    }
    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])
    return (
        <div onClick={() => navigate("/search")} className='flex w-full border gap-2 group lg:min-w-[420px] bg-slate-100 focus-within:bg-amber-50 h-11 items-center
         min-w-[300px] rounded-md border-neutral-300  focus-within:border-primary'>

            {isSearchPage && isMobile ?
                (
                    <Link to={'/'}
                    onClick={(e)=> e.stopPropagation()}
                    className=' p-2 rounded-full m-1 shadow-md text-neutral-500 bg-white group-focus-within:text-primary'>
                        <FaArrowLeft size={22} />
                    </Link>
                ) : (
                    <button className=' p-3 text-neutral-500 group-focus-within:text-primary'>
                        <FaSearch size={22} />
                    </button>
                )
            }
            {!isSearchPage ? (
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Search "Oil Filter"',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Search "Brakes"',
                        1000,
                        'Search "Horns"',
                        1000,
                        'Search "Spark Plugs"',
                        1000,
                        'Search "Wiper blade"',
                        1000,
                        'Search "Additive"',
                        1000,
                        'Search "Air filter"',
                        1000,
                        'Search "Air Freshener"',
                        1000,
                        'Search "Batteries"',
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: "15px", display: 'inline-block' }}
                    repeat={Infinity}
                    className="text-neutral-500 uppercase "
                />
            ) : (
                <input type="text"
                    onFocus
                    defaultValue={searchText}
                    onChange={handleOnChange}
                    className='w-full h-full bg-transparent outline-none placeholder-gray-400 '
                    placeholder="Search like egg, sugar and more.. " />

            )}
        </div>
    )
}

export default Search