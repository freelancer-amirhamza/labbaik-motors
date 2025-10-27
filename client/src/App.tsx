/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Toaster } from "react-hot-toast";
import fetchUserDetails from './utils/fetchUserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { setAllCategory, setAllSubCategory } from './store/productSlice';
import SummeryApi from './common/SummeryApi';
import AxiosToastError from './utils/AxiosToastError';
import Axios from './utils/Axios';
import GlobalProvider from './provider/GlobalProvider';
import MobileCart from './components/MobileCart';
import { FaArrowUp } from 'react-icons/fa'; // Import an icon for the button

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for the scroll-to-top button
  const location = useLocation();
  const user = useSelector((state) => state.user?.user);

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getCategory,
      });
      if (response?.data?.success) {
        dispatch(setAllCategory(response?.data?.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getSubCategory,
      });
      if (response?.data?.success) {
        dispatch(setAllSubCategory(response?.data?.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser()
    fetchCategory();
    fetchSubCategory();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show the scroll-to-top button when scrolled down 300px
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[98vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        toastOptions={{
          success: {
            style: {
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              background: '#FFCDD2',
              fontWeight: "bold",
            },
          },
        }}
      />
      {location.pathname !== "/checkout" && <MobileCart />}
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-14 border-2 cursor-pointer right-5 z-50
        bg-orange-600/80 text-white sm:p-3 p-2 rounded-full shadow-lg hover:bg-orange-700/95 transition"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </GlobalProvider>
  );
};

export default App;