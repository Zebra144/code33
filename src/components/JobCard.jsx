import React from 'react'
import { assets , jobsData} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {

const navigate = useNavigate()
  return (
    <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-cyan-400/40 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 cursor-pointer transition-all duration-300 hover:scale-105">
        <div className='flex justify-between items-center'>
            <img className='h-8' src={assets.company_icon} alt=""/>
        </div>
        <h4 className='font-medium text-white mt-2'>{job.title}</h4>
        <div className='flex items-center gap-3 mt-2 text-xs'>
            <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded text-black'>{job.location}</span>
           <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded text-black'>{job.level}</span>
        </div>
        <p className='text-white text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
        <div className='mt-4 flex gap-4 text-sm'>
            <button onClick={() => {navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 m-1">Apply now</button>
            <button onClick={() => {navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 m-1">Learn more</button>
        </div>
    </div>
  )
}

export default JobCard  