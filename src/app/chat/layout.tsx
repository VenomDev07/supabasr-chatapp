import Header from '@/component/Header'
import RightSidebar from '@/component/RightSidebar'
import Sidebar from '@/component/Sidebar'
import React from 'react'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id='container' className='h-screen w-full'>
      <div id='header'><Header /></div>
      <div id='sidebar'><Sidebar /></div>
      <div id='main'>{children}</div>
      <div id='rightsidebar'><RightSidebar /></div>
    </div>
  )
}
