import React from 'react'
import Hero from './Hero/Hero'
import Features from './Features/Features'
import PopularCourse from './PopularCourse/PopularCourse'
import CallToAction from './CalToAction/CallToAction'
import Faq from './Faq/Faq'

const Home:React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <PopularCourse />
      <Faq />
      <CallToAction />

    </>
  )
}

export default Home