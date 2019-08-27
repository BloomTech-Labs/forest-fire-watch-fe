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
        if(e){
            e.preventDefault()
            setZip('95969')
            setState('CA')
            setStreet('750 Henshaw Ave')
            parseCSV('to')
        }

        if(! [zip,state,street].every(i=>i.length>0) ){
            setSaveState("Please fill out Street Address, Zip Code, and State")
            return;
        }

        let temp = await address.saveAddress(addy)
        try {
            console.log(temp);
            if(temp){
                setSaveState(`Saved as ${temp}`)
                setZip('')
                setState('')
                setApartment('')
                setStreet('')
            }else{
                setSaveState('Data is undefined')
                setZip('')
                setState('')
                setApartment('')
                setStreet('')
            }
        } catch (err) {
            console.error(err);
        }   
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
            console.log('this one')
            try{
                let temp=await global.state.remote.fetchLocations()
            }catch(err){
                console.error(err);
            }
        }
        fetch()
    },[])

    const edit=e=>{
        console.log(e.target.value);
        if(e.target.value==-1){
            setZip('')
            setState('')
            setApartment('')
            setStreet('')
            setId(null)
        }else{
            let temp = address.state.addresses.filter(i=>{i.id==e.target.value})[0]
            temp=temp.split(',').map(i=>i.trim())
            setId(id)
            setStreet(temp[0])
            setApartment(temp[1])
            setState(temp[2])
            setZip(temp[3])
        }
    }

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
            <select onChange={edit}>
                <option value={-1}>Add an Address</option>
                {address.state.addresses.map(i=>(
                    <option value={i.id}>{i.address}</option>
                ))}
            </select>
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
