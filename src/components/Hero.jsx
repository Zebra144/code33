
import React, {useContext,useRef} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'




const Hero = () => {

    const {setSearchFilter,setIsSearched} = useContext(AppContext)
    const titleRef =  useRef(null)
     const locationRef =  useRef(null)

     const onSearch= () =>{
            setSearchFilter({
                title:titleRef.current.value,
                location:locationRef.current.value
            })
            setIsSearched(true)
            
           
     }


  return (
    <div className="container 2xl:px-20 mx-auto my-10">
  <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg rounded-2xl text-gray-200 max-w-3xl px-4 py-2 mx-4 sm:mx-auto transition-all duration-300">
    {/* Search Input */}
    <div className="flex items-center gap-2 flex-1 border-r border-gray-700 pr-3">
      <img className="h-5 sm:h-6 opacity-70" src={assets.search_icon} alt="" />
      <input
        type="text"
        placeholder="Search your required jobs..."
        className="bg-transparent text-sm sm:text-base p-2 rounded outline-none w-full placeholder-gray-400 focus:placeholder-gray-300"
        ref={titleRef}
      />
    </div>

    {/* Location Input */}
    <div className="flex items-center gap-2 flex-1 border-r border-gray-700 pr-3 pl-3">
      <img className="h-5 sm:h-6 opacity-70" src={assets.location_icon} alt="" />
      <input
        type="text"
        placeholder="Location"
        className="bg-transparent text-sm sm:text-base p-2 rounded outline-none w-full placeholder-gray-400 focus:placeholder-gray-300"
        ref={locationRef}
      />
    </div>

    {/* Search Button */}
    <button
      onClick={onSearch}
      className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 m-1"
    >
      Search
    </button>
  </div>
</div>

  )
}

export default Hero
