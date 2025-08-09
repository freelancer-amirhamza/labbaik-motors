import React, { useState } from 'react';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const StarRating = ({ rating, handleRatingChange }) => {

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={handleRatingChange ? () => handleRatingChange(star) : null}
                    className="border-none p-[2px] focus:outline-none rounded-full transition-colors"
                >
                    {star <= rating ? (
                        <IoIosStar  className="text-yellow-500 hover  w-5 h-5 cursor-pointer" /> // Filled star
                    ) : (
                        <IoIosStarOutline   className="text-yellow-500 w-5 h-5 cursor-pointer" /> // Outlined star
                    )}
                </button>
            ))}
        </div>
    );
};

export default StarRating;