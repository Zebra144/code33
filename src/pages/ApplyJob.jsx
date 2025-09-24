import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import kConvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'

const ApplyJob = () => {
  const { id } = useParams()
  const [jobData, setJobData] = useState(null)
  const { jobs } = useContext(AppContext)

  const fetchJob = async () => {
    const data = jobs.filter(jobs => jobs._id === id)
    if (data.length !== 0) {
      setJobData(data[0])
      console.log(data[0])
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob()
    }
  }, [id, jobs])

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">

          {/* Header block */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-black border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border" src={jobData.companyId.image} alt="" />
              <div className="text-center md:text-left text-white">
                <h1 className="text-2xl sm:text-4xl font-medium ">{jobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-white mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {kConvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
                     px-8 py-2.5 rounded-2xl text-white font-semibold shadow-md 
                     hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-blue-500 
                     transition-all duration-300 m-1">
                🚀 Apply Now
              </button>
              <p className="mt-2 text-gray-200 text-xs italic">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col">
            {/* Job Description */}
            <div className="w-full">
              <h2 className="font-extrabold text-3xl mb-6 text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Job Description
              </h2>

              <div
                className="prose max-w-none text-gray-700 leading-relaxed rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />

              <button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-8 py-2.5 mt-6 rounded-2xl text-white font-semibold shadow-md hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-blue-500 transition-all duration-300">
                Apply Now
              </button>
            </div>

            {/* More Jobs From ...  (MOVED BELOW) */}
            <div className="w-full mt-12">
              <h2 className="font-bold text-xl text-gray-800 border-b-2 border-gray-200 pb-2">
                More Jobs From {jobData.companyId.name}
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4">
                {jobs
                  .filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
                  .slice(0, 4)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob