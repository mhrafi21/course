import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <div>
        <header>
          <Navbar />
        </header>
        <main><Outlet /></main>
        <footer>Footer</footer>
    </div>
  )
}

export default RootLayout