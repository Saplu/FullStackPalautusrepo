import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'

const User = ({users, details}) => {
  console.log(users)
  const id = useParams().id
  if(users.length === 0)
    return null


  const lowDetails = () => (
    <div>
      <h2>Users</h2>
      {users.map(user => 
        <p key={user.id}><Link to={`/users/${user.id}`}>{user.name}, created {user.blogs.length} blogtexts so far.</Link></p>
      )}
    </div>
  )

  const moreDetails = () => {
    const user = users.find(u => u.id === id)
    return(
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        {user.blogs.map(b =>
          <li key={b.id}>{b.title}</li>)}
      </div>
    )
  }

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