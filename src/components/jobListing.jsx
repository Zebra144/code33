import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const jobListing = () => {
  const{isSearched, searchedFilter} = useContext(Appcontext)
  return (
    <div>
        {   /* Sidebar */}
        <div>
          {/* Search Filter From Hero Content */}
          {
              isSearched && (searchedFilter.title !== "" || searchedFilter.location !=="" ) && (
                <>
                <h3>Current Search</h3>
                <div>
                  {searchedFilter.title && (
                    <span>
                        {searchedFilter.title}
                    </span>
                  )}
                  {searchedFilter.location && (
                    <span>
                      {searchedFilter.location}
                    </span>
                  )}
                </div>
                </>
              )
          }
        </div>
    </div>
  )
}

export default jobListing