import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])

  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const PAGE_SIZE = 4 // show 4 per page

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
    )
  }

  useEffect(() => {
    const matchesCategory = job =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category)

    const matchesLocation = job =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location)

    const matchesTitle = job =>
      searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

    const matchesSearchLocation = job =>
      searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job))

    setFilteredJobs(newFilteredJobs)
    setCurrentPage(1)
  }, [jobs, selectedCategories, selectedLocations, searchFilter])

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE)
  const start = (currentPage - 1) * PAGE_SIZE
  const current = filteredJobs.slice(start, start + PAGE_SIZE)

  // counts for button badge
  const activeCount = selectedCategories.length + selectedLocations.length

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col py-8">

      {/* Top heading (search bar is above on the page) */}
      <section className="w-full text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">Latest Jobs</h3>
        <p className="mb-4">Get your desired Job from top companies</p>

        {/* Current search pills (unchanged) */}
        {isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
          <div className="mb-4 text-gray-600">
            {searchFilter.title && (
              <span className="inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded mr-2">
                {searchFilter.title}
                <img
                  onClick={() => setSearchFilter(prev => ({ ...prev, title: '' }))}
                  className="cursor-pointer h-4 w-4"
                  src={assets.cross_icon}
                  alt=""
                />
              </span>
            )}
            {searchFilter.location && (
              <span className="inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded">
                {searchFilter.location}
                <img
                  onClick={() => setSearchFilter(prev => ({ ...prev, location: '' }))}
                  className="cursor-pointer h-4 w-4"
                  src={assets.cross_icon}
                  alt=""
                />
              </span>
            )}
          </div>
        )}

        {/* COLLAPSIBLE FILTERS — after search bar, horizontal */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilter(s => !s)}
            className="px-4 py-2 rounded border border-gray-400 inline-flex items-center gap-2"
          >
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded bg-blue-600 text-white">
                {activeCount}
              </span>
            )}
            <img
              src={showFilter ? assets.up_arrow_icon || assets.left_arrow_icon : assets.down_arrow_icon || assets.right_arrow_icon}
              alt=""
              className="h-4 w-4 opacity-60"
            />
          </button>

          {showFilter && (
            <div className="mt-4 border border-gray-200 rounded-lg p-4">
              <div className="flex flex-wrap gap-10">

                {/* Categories */}
                <div className="min-w-[260px]">
                  <h4 className="font-medium text-lg mb-3">Search by Categories</h4>
                  <ul className="flex flex-wrap gap-4 text-gray-600">
                    {JobCategories.map((category, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <input
                          className="scale-125"
                          type="checkbox"
                          onChange={() => handleCategoryChange(category)}
                          checked={selectedCategories.includes(category)}
                        />
                        <span>{category}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Locations */}
                <div className="min-w-[260px]">
                  <h4 className="font-medium text-lg mb-3">Search by Location</h4>
                  <ul className="flex flex-wrap gap-4 text-gray-600">
                    {JobLocations.map((location, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <input
                          className="scale-125"
                          type="checkbox"
                          onChange={() => handleLocationChange(location)}
                          checked={selectedLocations.includes(location)}
                        />
                        <span>{location}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Optional quick actions */}
              <div className="mt-4 flex gap-3">
                <button
                  className="px-3 py-1.5 border rounded"
                  onClick={() => { setSelectedCategories([]); setSelectedLocations([]); }}
                >
                  Clear all
                </button>
                <button
                  className="px-3 py-1.5 rounded bg-blue-600 text-white"
                  onClick={() => setShowFilter(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ONE PER LINE */}
        <div className="grid grid-cols-1 gap-4">
          {current.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>

            {Array.from({ length: totalPages }).map((_, index) => (
              <a key={index} href="#job-list">
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                    currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'
                  }`}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

export default JobListing
