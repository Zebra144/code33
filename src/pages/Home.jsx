import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import jobListing from   '../components/jobListing'

const Home =() => {
    return(
        <div>
            <Navbar />
            <Hero />
            <jobListing />
        </div>
    )
}

export default Home