
import React from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

const Notification = (props) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  }

  const notification = useSelector(({ anecdotes, notification}) => {
    console.log('Notice Recieved: ', notification)
    if (notification) {
      style.display = ''
      return notification
    }
    return ''
  })
  
  // const notification = useSelector(( {anecdotes, notification }) => {
  //   const findAnecdoteContent = () => anecdotes.find(anecdote => anecdote.id === notification.id).content

  //   console.log('Notice Received: ', notification)
  //   if (notification && notification.id) {
  //     style.display = ''
  //     switch(notification.type) {
  //       case 'VOTE':
  //         return `you voted '${anecdotes.find(anecdote => anecdote.id === notification.id).content}'`
  //       case 'NEW_ANECDOTE':
  //         console.log('should print new anecdote')
  //         return `you created '${findAnecdoteContent()}`
  //       default:
  //         return ''
  //     } 
      
      
  //   }
  //   return ''
  // })

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification

// export default Notification