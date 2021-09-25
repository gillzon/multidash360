import React from 'react'
import AppNav from '../components/AppNav'
import AppFooter from '../components/AppFooter'
import AppContent from '../components/AppContent'
const DefaultLayout = (props) => {
  console.log(props.data)
  return (
    <div>
      <AppNav />
      <AppContent data={props.data} />
      <AppFooter />
    </div>
  )
}

export default DefaultLayout