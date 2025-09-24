import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { useClerk, UserButton,useUser } from '@clerk/clerk-react'
import { Link ,useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

const {openSignIn} =useClerk()
const {user} = useUser()
const navigate =useNavigate()
const {setShowRecruiterLogin} =useContext(AppContext)

  return (
    <div className='shadow py-4 bg-gradient-to-r from-black to-gray-600'>
      <div className='container  px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img onClick={()=> navigate('/')} className="cursor-pointer h-24 p-4 mr-4 max-md:mb-4 bg-gradient-to-r from-yellow-400 via-lime-500 to-green-500 rounded-2xl shadow-lg border border-white hover:scale-105 hover:shadow-xl transition-all duration-300" src={assets.logo} alt="" />
        {
          user
          ?<div className='flex items-center gap-3'>
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
            <UserButton/>

          </div>
          :
           <div className='flex gap-4 max-sm:text-xs'>
          <button onClick={e=> setShowRecruiterLogin(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 m-1">Recruiter Login</button>
          <button onClick={ e=> openSignIn()} className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 m-1">Login</button>
        </div>
        }
       
      </div>
    </div>
  )
}

export default Navbar
