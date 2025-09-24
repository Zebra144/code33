import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20 bg-gradient-to-r from-black to-gray-600'>
        <img width={160} className="cursor-pointer h-24 p-4 mr-4 max-md:mb-4 bg-gradient-to-r from-yellow-400 via-lime-500 to-green-500 rounded-2xl shadow-lg border border-white hover:scale-105 hover:shadow-xl transition-all duration-300"  src={assets.logo} alt="" />
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-white max-sm:hidden'>
            Copyright insider.dev | All right reserved.</p>
        <div className='flex gap-2.5'>
            <img width={38} className='bg-white rounded-2xl shadow-lg border border-white ' src={assets.facebook_icon} alt="" />
            <img width={38} className='bg-white rounded-2xl shadow-lg border border-white ' src={assets.twitter_icon} alt="" />
            <img width={38} className='bg-white rounded-2xl shadow-lg border border-white ' src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer