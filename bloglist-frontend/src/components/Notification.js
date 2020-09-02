import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const errorExists = useSelector(state => state.notification.errorExists)

  if (message === '') {
    return null
  }

  if (errorExists) {
    return (
      <div>
      {(message &&
        <Alert severity="error">
          {message}
        </Alert>
      )}
    </div>
    )
  }

  return (
    <div>
      {(message &&
        <Alert severity="success">
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
