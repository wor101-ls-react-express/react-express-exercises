export const createFilter = (content) => {
  return {
    type: 'FILTER',
    content: content,
  }
}


const filterReducer = (state = '', action) => {

  switch(action.type) {
    case 'FILTER':
      return action.content
    default:
      return state
  }
}

export default filterReducer