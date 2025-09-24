import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", image: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem("recruiter");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
                name: parsedUser.name,
                image: `http://localhost:5000/${parsedUser.image}`
            });
        }
    }, []);

    return (
        <div className='min-h-screen bg-gray-100'>
            {/* Navbar */}
            <div className='shadow-lg py-4 bg-gradient-to-r from-black to-gray-600'>
                <div className='px-6 flex justify-between items-center'>
                    {/* Web Logo */}
                    <img 
                        onClick={() => navigate('/')} 
                       className="cursor-pointer h-24 p-4 mr-4 max-md:mb-4 bg-gradient-to-r from-yellow-400 via-lime-500 to-green-500 rounded-2xl shadow-lg border border-white hover:scale-105 hover:shadow-xl transition-all duration-300"
                        src={assets.logo} 
                        alt="Web Logo" 
                    />

                    {/* Profile Section */}
                    <div className='flex items-center gap-4 '>
                        <p className='text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg border border-white hover:scale-105 hover:shadow-xl transition-all duration-300'>Welcome, {user.name}</p>
                        <div className='relative group'>
                            <img 
                                className='w-12 h-12 border-2 border-white rounded-full shadow-md bg-gradient-to-r from-blue-500 to-purple-600' 
                                src={user.image} 
                                alt="Company Logo" 
                            />
                            <div className='absolute hidden group-hover:block top-12 right-0 z-20 text-black rounded pt-2'>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border shadow-md text-sm'>
                                    <li className='py-1 px-3 cursor-pointer hover:bg-gray-100 transition-colors' onClick={() => {
                                        localStorage.removeItem("recruiter");
                                        navigate('/');
                                    }}>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Layout */}
            <div className='flex items-start'>
                {/* Sidebar */}
                <div className='w-64 min-h-screen bg-gradient-to-r from-black to-gray-600 shadow-inner p-4'>
                    <ul className='flex flex-col gap-2'>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-cyan-400/40 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 cursor-pointer transition-all duration-300 hover:scale-105 ${isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-gray-700'}`
                            }
                            to={'/dashboard/add-job'}
                        >
                            <img className='w-5' src={assets.add_icon} alt="" />
                            <p className='font-medium text-white'>Add Job</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-cyan-400/40 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 cursor-pointer transition-all duration-300 hover:scale-105 ${isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-gray-700'}`
                            }
                            to={'/dashboard/manage-job'}
                        >
                            <img className='w-5' src={assets.home_icon} alt="" />
                            <p className='font-medium text-white'>Manage Jobs</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-cyan-400/40 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 cursor-pointer transition-all duration-300 hover:scale-105 ${isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-gray-700'}`
                            }
                            to={'/dashboard/view-applications'}
                        >
                            <img className='w-5' src={assets.person_tick_icon} alt="" />
                            <p className='font-medium text-white'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                {/* Main content */}
                <div className='flex-1 p-6 bg-white rounded-tl-3xl shadow-inner min-h-screen'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
