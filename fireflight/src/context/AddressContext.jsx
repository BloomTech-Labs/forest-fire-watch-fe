import React,{useReducer,useContext,useEffect} from 'react'
import AddressContext,{UPDATE_ADDRESSES, FETCHING_ADDRESSES,ERROR,CLEAR,NONE, SELECT} from './addressContextProvider';
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
    address:null,
    fetching:false,
    error:undefined,
    tester:false,
    current:null
}

function AddressContextProvider(props) {


    const global=useContext(FireContext)

    const reducers=async (state,action)=>{
        switch (action.type) {
            case UPDATE_ADDRESSES:
                if(isArray(action.payload))
                    console.log(...action.payload)
                else
                    console.log(action.payload);
                return {
                    ...state,
                    fetching:false,
                    addresses:action.payload,
                    tester:true,
                    current:action.payload
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
            case SELECT:
                return{
                    ...state,
                    tester:true,
                    error:false,
                    current:state.address[action.payload]
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
        if(state.address==null){
            global.state.remote.fetchLocations().then(data=>{
                updateAddresses(data)
            })
        }
    })

    const fetchAddress=async ()=>{
        dispatch({type:FETCHING_ADDRESSES})
        global.state.remote.fetchLocations()
            .then( data => {
                if(data.reason.length<1){
                    dispatch({type:NONE})
                }
                else{
                    console.log(data.reason);
                    // updateAddresses(data.reason)
                }
            }).catch( err =>{
                dispatch({type:ERROR,payload:err})
            })
    }

    const saveAddress=async str=>{
        global.state.remote.saveLocations(str)
            .then(data=>{
                console.log(data.reason);
                updateAddresses(data.reason.address)
                setLocation(data.reason)
            }).catch(err=>{
                console.error("something went wrong", err);
            })
    }

    const clear=()=>{
        dispatch({type:CLEAR})
    }

    const setLocation=add=>{
        dispatch({
            type:SELECT,
            payload:add
        })
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
