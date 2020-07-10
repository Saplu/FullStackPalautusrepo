import React, { useState } from 'react'

const User = ({user}) => {
  const [details, setDetails] = useState(false)
  console.log(user)
  const lowDetails = () => (
    <div>
      {user.name}, created {user.blogs.length} blogtexts so far. 
    </div>
  )

  const moreDetails = () => (
    <div>
      asd
    </div>
  )

  return (
    <div>
      {details === false ?
        lowDetails() :
        moreDetails()
      }
    </div>
  )
}

export default User