import React,{useState,useContext,useEffect} from 'react'
import AddressContext from '../context/addressContextProvider'
import {FireContext} from '../context/contextProvider'
import { isArray } from 'util';

function Address(props) {
    
    const address=useContext(AddressContext)
    const global=useContext(FireContext)
    const [addy,setAddy]=useState('')
    const [zip,setZip]=useState('')
    const [state,setState]=useState('')
    const [apartment,setApartment]=useState('')
    const [street,setStreet]=useState('')
    const [saveState,setSaveState]=useState('')
    const [id,setId]=useState(undefined)
    const [err,setErr]=useState(undefined)

    const testFetch=e=>{
        if(e)
            e.preventDefault()
        address.fetchAddress().then(()=>{
            console.log('render time');
            console.log(address.state.address);
        })
    }

    const testSubmit=async e=>{
        if(e)
            e.preventDefault()

        if(! [zip,state,street].every(i=>i.length>0) ){
            setSaveState("Please fill out Street Address, Zip Code, and State")
            return;
        }

        address.saveAddress(addy).then(data=>{
            console.log(data);
            setSaveState(`Saved as ${data}`)
            setZip('')
            setState('')
            setApartment('')
            setStreet('')
        })
    }

    const parseCSV=async direction=>{
        if(direction==='to'){
            setAddy(`${street}, ${apartment}, ${state}, ${zip}`)
        }else{
            if(addy.length>0){
                let temp=addy.split(',').map(s=>s.trim())
                console.log(temp);
                setStreet(temp[0])
                setApartment(temp[1])
                setState(temp[2])
                setZip(temp[3])
            }
        }
    }

    useEffect(()=>{
        parseCSV('to')
        return (e=>{
            parseCSV('to')
        })
    }
    ,[street,zip,apartment,state]
    )

    useEffect(()=>{
        const fetch=async ()=>{
            try{
                let temp=await global.state.remote.fetchLocations()
                if(temp.stats && temp.reason.length>0){
                    console.log(temp.reason);
                    setAddy(temp.reason[0].address)
                    parseCSV('from')
                }else{
                    console.log('none :',temp);
                }
            }catch(err){
                console.error(err);
            }
        }
        fetch()
    },[])


    return (
        <>
            <>
                <button onClick={testSubmit}>
                    test submit
                </button>
                <button onClick={testFetch}>
                    test fetch
                </button>
                <br></br>
            </>
            <form onSubmit={testSubmit}>
                <label>Street Address   :<input type="text" name="street" value={street} onChange={e=>{setStreet(e.target.value)}}/></label><br/>
                <label>Apartment Number :<input type="text" name="apartment" value={apartment} onChange={e=>setApartment(e.target.value)}/></label><br/>
                <label>State            :<input type="text" name="state" value={state} onChange={e=>setState(e.target.value)}/></label><br/>
                <label>Zip Code         :<input type="number" name="zip" value={zip} onChange={e=>setZip(e.target.value)}/></label><br/>
                <button type="submit">Save Location</button>
            </form>
            <div>
                {saveState}
            </div>
        </>
    )
}

export default Address
