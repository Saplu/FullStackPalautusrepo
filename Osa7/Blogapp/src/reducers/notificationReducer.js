const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET':
      return action.notification
    case 'REMOVE':
      return null
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET',
    notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer