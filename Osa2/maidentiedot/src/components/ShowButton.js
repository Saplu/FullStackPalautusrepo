import React from 'react'

const ShowButton = ({name, showSingle}) => {
    console.log(name)
    return(
        <button onClick={showSingle}>
            Show
        </button>
    )
}

export default ShowButton