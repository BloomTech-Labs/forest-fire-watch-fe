import React, { useReducer, useContext, useEffect } from 'react'
import AddressContext, {
  UPDATE_ADDRESSES,
  FETCHING_ADDRESSES,
  ERROR,
  CLEAR,
  NONE,
  UPDATE
} from './addressContextProvider'
import { GlobalContext } from './contextProvider'
import { isArray } from 'util'

export class loc {
  constructor(id, address) {
    this.id = id
    this.address = address
  }
  update(address) {
    this.address = address
  }
}

const defaultState = {
  addresses: [],
  fetching: false,
  error: undefined,
  tester: false,
  current: null
}

function AddressContextProvider(props) {
  const global = useContext(GlobalContext)

  const reducers = (state, action) => {
    switch (action.type) {
      case UPDATE_ADDRESSES:
        if (isArray(action.payload))
          return {
            ...state,
            fetching: false,
            addresses: state.addresses.concat(...action.payload),
            tester: true
          }
        else
          return {
            ...state,
            fetching: false,
            addresses: [...state.addresses, action.payload],
            tester: true
          }
        break
      case FETCHING_ADDRESSES:
        return {
          ...state,
          fetching: true
        }
        break
      case ERROR:
        return {
          ...state,
          fetching: false,
          error: action.payload,
          addresses: null
        }
        break
      case NONE:
        return {
          ...state,
          fetching: false,
          error: null,
          tester: false
        }
        break
      case CLEAR:
        return {
          ...state,
          tester: false,
          addresses: []
        }
        break
      case UPDATE:
        return {
          ...state,
          tester: false,
          current: null,
          addresses: state.addresses.map(i =>
            i.id === action.payload.id ? action.payload : i
          )
        }
      default:
        return defaultState
        break
    }
  }

  const [state, dispatch] = useReducer(reducers, defaultState)

  const updateAddresses = async payload => {
    dispatch({
      type: UPDATE_ADDRESSES,
      payload: payload
    })
  }

  const reset = async () => {
    clear()
    global.state.remote.fetchLocations().then(data => {
      updateAddresses(data.reason)
    })
  }

  const fetchAddress = async () => {
    dispatch({ type: FETCHING_ADDRESSES })
    return global.state.remote
      .fetchLocations()
      .then(data => {
        if (data.reason.length < 1) {
          dispatch({ type: NONE })
        } else {
          updateAddresses(data.reason)
        }
      })
      .catch(err => {
        dispatch({ type: ERROR, payload: err })
      })
  }

  useEffect(() => {
    reset()
  }, [])

  const saveAddress = async (str, radius, name) => {
    return global.state.remote
      .saveLocations(str, radius, name)
      .then(data => {
        updateAddresses(
          data.reason.address,
          data.reason.radius,
          'fire',
          data.reason.id
        )
        reset()
        return data.reason
      })
      .catch(err => {
        console.error(err)
        throw err
      })
  }

  const clear = () => {
    dispatch({ type: CLEAR })
  }

  const updateAddress = async (address, radius, name, id) => {
    return global.state.remote
      .updateLocation(address, radius, name, id)
      .then(data => {
        dispatch({
          type: UPDATE,
          payload: data.reason
        })
      })
  }

  const ctx = {
    updateAddresses,
    fetchAddress,
    saveAddress,
    updateAddress,
    clear,
    reset,
    state
  }

  return (
    <AddressContext.Provider value={ctx}>
      {props.children}
    </AddressContext.Provider>
  )
}

export default AddressContextProvider
