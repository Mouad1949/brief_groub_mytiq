import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import Dashboard from '../components/Dashboard'
import DashboardContent from '../components/Cards'

export default function DashboardPage() {
  return (
    <div>
       <DashboardHeader/>
       <Dashboard/>
       <DashboardContent/>
    </div>
  )
}
