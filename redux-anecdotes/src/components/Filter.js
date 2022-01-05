import React from 'react'
import { connect } from 'react-redux'
// import mergeProps from 'react-redux/lib/connect/mergeProps'
//import { useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'




const Filter = (props) => {
  //const dispatch = useDispatch()
  const handleChange = (event) => {
    props.createFilter(event.target.value)
    //dispatch(createFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  createFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter

//export default Filter