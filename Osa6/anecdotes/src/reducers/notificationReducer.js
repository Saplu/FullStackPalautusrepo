const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let id = 0

export const setNotification = (notification, time) => {
  return async dispatch => {
    clearTimeout(id)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    id = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer