import React from 'react'
import {Button} from "@/components/ui/button"
const Dashboard: React.FC = () => {
  return (
    <div className=''>
      <h1>Dashboard</h1>
      <Button>Click Me</Button>
      <p>Welcome to the dashboard</p>
      <img src="https://example.com/image.jpg" alt="Example"/>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  )
}

export default Dashboard