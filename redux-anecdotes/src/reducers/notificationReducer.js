export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

const notificationReducer = ( state = null, action) => {
  switch (action.type) {
    case 'VOTE':
      return `You voted for '${action.data.content}'`
    case 'NEW_ANECDOTE':
      return `You created '${action.data.content}'`
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }


  // switch (action.type) {
  //   case 'VOTE':
  //     return {
  //       type: 'VOTE',
  //       id: action.id,
  //     }
  //   case 'NEW_ANECDOTE':
  //     return {
  //       type: 'NEW_ANECDOTE',
  //       id: action.data.id,
  //     }
  //   case 'CLEAR_NOTIFICATION':
  //     return null
  //   default:
  //     return state
  // }
}

export default notificationReducer