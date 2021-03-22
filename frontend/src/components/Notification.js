import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    if (message.type === 'success') {
      return (
        <div>
          <Alert severity="success">
            {message.text}
          </Alert>
        </div>
      )
    } else if (message.type === 'error') {
      return (
        <div className="message error">
          {message.text}
        </div>
      )
    } else {
      return null
    }
  }
}

export default Notification