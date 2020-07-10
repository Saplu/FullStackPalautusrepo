import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ success }) => {
  const notification = useSelector(state => state)

  if (notification === null)
    return null
  return (
    <div className={success}>
      {notification}
    </div>
  )
}

export default Notification