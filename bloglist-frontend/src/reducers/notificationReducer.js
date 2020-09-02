const initialNotification = {message: '', timeOut: 0, errorExists: false}


const notificationReducer = ( state = initialNotification, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.message!==''){clearTimeout(state.timeOut)}
      return action.notification
    case 'NOTIFICATION_OFF':
      return initialNotification
    default:
      return state
  }

}

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const notificationOff = () => {
  return {
    type: 'NOTIFICATION_OFF',
  }
}

export const setNotification = (notification, seconds, error) => {

  return async dispatch => {
    dispatch(notificationChange({
      message: notification, 
      errorExists: error,
      timeOut: setTimeout(() => {
        dispatch(notificationOff())
      }, 1000*seconds)
    }))
  }
}

export default notificationReducer