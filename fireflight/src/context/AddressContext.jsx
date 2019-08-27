import React,{useReducer,useContext,useEffect} from 'react'
import AddressContext,{UPDATE_ADDRESSES, FETCHING_ADDRESSES,ERROR,CLEAR,NONE} from './addressContextProvider';
import {FireContext} from './contextProvider'
import { isArray } from 'util';

export class loc{
    constructor(id,address){
        this.id=id
        this.address=address
    }
    update(address){
        this.address=address
    }
}

const defaultState={
    addresses:[],
    fetching:false,
    error:undefined,
    tester:false,
    current:null
}

function AddressContextProvider(props) {


    const global=useContext(FireContext)

    const reducers=(state,action)=>{
        switch (action.type) {
            case UPDATE_ADDRESSES:
                if(isArray(action.payload))
                    return {
                        ...state,
                        fetching:false,
                        addresses:state.addresses.concat(...action.payload),
                        tester:true
                    }
                else
                    return {
                        ...state,
                        fetching:false,
                        addresses:[...state.addresses,action.payload],
                        tester:true
                    }
                
                break;
            case FETCHING_ADDRESSES:
                return{
                    ...state,
                    fetching:true
                }
                break;
            case ERROR:
                return{
                    ...state,
                    fetching:false,
                    error:action.payload,
                    addresses:null
                }
                break;
            case NONE:
                return{
                    ...state,
                    fetching:false,
                    error:null,
                    tester:false
                }
                break;
            case CLEAR:
                return{
                    ...state,
                    tester:false,
                    current:null
                }
                break;
            default:
                return defaultState;
                break;
        }
    }

    const [state,dispatch]=useReducer(reducers,defaultState)

    const updateAddresses=async payload=>{
        dispatch({
            type:UPDATE_ADDRESSES,
            payload:payload
        })
    }

    useEffect(()=>{
        global.state.remote.fetchLocations().then(data=>{
            updateAddresses(data.reason)
        })
    },[])

    const fetchAddress=async ()=>{
        dispatch({type:FETCHING_ADDRESSES})
        return global.state.remote.fetchLocations()
            .then( data => {
                if(data.reason.length<1){
                    dispatch({type:NONE})
                }
                else{
                    console.log(data.reason);
                    updateAddresses(data.reason)
                }
            }).catch( err =>{
                dispatch({type:ERROR,payload:err})
            })
    }

    const saveAddress=async str=>{
        return global.state.remote.saveLocations(str)
            .then(data=>{
                console.log(data.reason);
                updateAddresses(data.reason.address)
                return data.reason
            }).catch(err=>{
                console.error("something went wrong", err);
                throw err
            })
    }

    const clear=()=>{
        dispatch({type:CLEAR})
    }

    const ctx={
        updateAddresses,
        fetchAddress,
        saveAddress,
        clear,
        state
    }

    return (
        <AddressContext.Provider value={ctx}>
            {props.children}
        </AddressContext.Provider>
    )
}

export default AddressContextProvider
