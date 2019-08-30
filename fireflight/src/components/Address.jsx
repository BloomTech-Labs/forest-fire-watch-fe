import React,{useState,useContext,useEffect} from 'react'
import AddressContext from '../context/addressContextProvider'
import {FireContext} from '../context/contextProvider'
import { isArray } from 'util';
import {Button,ErrorText,FormContainer,FormInput,Form,FormSelect} from '../styles/Forms'

function Address(props) {
    
    const address=useContext(AddressContext)
    const global=useContext(FireContext)
    const [addy,setAddy]=useState('')
    const [zip,setZip]=useState('')
    const [state,setState]=useState('')
    const [apartment,setApartment]=useState('')
    const [street,setStreet]=useState('')
    const [city,setCity]=useState('')
    const [saveState,setSaveState]=useState('')
    const [id,setId]=useState(undefined)
    const [radius,setRadius]=useState(10)
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
            // setZip('95969')
            // setState('CA')
            // setStreet('750 Henshaw Ave')
            // parseCSV('to')
        }

        if(! [zip,state,street].every(i=>i.length>0) ){
            setSaveState("Please fill out Street Address, Zip Code, and State")
            return;
        }

        if(id==null){
            let temp = await address.saveAddress(addy,radius)
            try {
                if(temp){
                    setSaveState(`Saved as ${temp.address}`)
                    setZip('')
                    setState('')
                    setApartment('')
                    setStreet('')
                    setCity('')
                    setRadius(10)
                }else{
                    setSaveState('Data is undefined')
                    setZip('')
                    setState('')
                    setApartment('')
                    setStreet('')
                    setCity('')
                    setRadius(10)
                }
            } catch (err) {
                console.error(err);
            }   
        }
        else{
            let temp = await address.updateAddress(addy,radius,id)
            try {
                if(temp){
                    setSaveState(`Updated as ${temp.address}`)
                }else{
                    setSaveState('Server Error')
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    const parseCSV=async direction=>{
        if(direction==='to'){
            setAddy(`${street}, ${apartment}, ${city}, ${state}, ${zip}`)
        }else{
            if(addy.length>0){
                let temp=addy.split(',').map(s=>s.trim())
                console.log(temp);
                setStreet(temp[0])
                setApartment(temp[1])
                setCity(temp[2])
                setState(temp[3])
                setZip(temp[4])
            }
        }
    }

    useEffect(()=>{
        parseCSV('to')
        return (e=>{
            parseCSV('to')
        })
    }
    ,[street,zip,apartment,state,city]
    )

    useEffect(()=>{
        const fetch=async ()=>{
            try{
                let temp=await global.state.remote.fetchLocations()
            }catch(err){
                console.error(err);
            }
        }
        fetch()
    },[])

    const edit=e=>{
        if(e.target.value==-1){
            setZip('')
            setState('')
            setApartment('')
            setStreet('')
            setId(null)
            setRadius(10)
        }else{
            let temp = address.state.addresses.filter(i=>{
                return i.id==e.target.value
            })[0]
            setId(temp.id)
            setRadius(temp.radius)
            temp=temp.address.split(',').map(i=>i.trim())
            setStreet(temp[0])
            setApartment(temp[1])
            setCity(temp[2])
            setState(temp[3])
            setZip(temp[4])
        }
    }

    const remove=async e=>{
        e.preventDefault()
        try{
            let res = await global.state.remote.deleteLocation(id)
            res = global.state.remote.fetchLocations()
            setZip('')
            setState('')
            setApartment('')
            setStreet('')
            setId(null)
            setRadius(1)
            setSaveState('Deleted')          
            address.reset()  
        }
        catch(err){
            setSaveState(err)
        }
    }

    return (
        <FormContainer>
            {/* <>
                <button onClick={testSubmit}>
                    test submit
                </button>
                <button onClick={testFetch}>
                    test fetch
                </button>
                <br></br>
            </> */}
            <FormSelect onChange={edit}>
                <option value={-1}>Add an Address</option>
                {address.state.addresses.map(i=>(
                    <option value={i.id} key={i.id}>{i.address}</option>
                ))}
            </FormSelect>
            <Form onSubmit={testSubmit}>
                <label>Street Address   :</label><FormInput type="text" name="street" value={street} onChange={e=>{setStreet(e.target.value)}}/><br/>
                <label>Apartment Number :</label><FormInput type="text" name="apartment" value={apartment} onChange={e=>setApartment(e.target.value)}/><br/>
                <label>City             :</label><FormInput type="text" name="city" value={city} onChange={e=>setCity(e.target.value)}/><br/>
                <label>State            :</label><FormInput type="text" name="state" value={state} onChange={e=>setState(e.target.value)}/><br/>
                <label>Zip Code         :</label><FormInput type="number" name="zip" value={zip} onChange={e=>setZip(e.target.value)}/><br/>
                <label>Radius           :</label><FormInput type="number" name="radius" value={radius} onChange={e=>setRadius(e.target.value)} min="10" step="1"/><br/>
                <Button type="submit">Save Location</Button><br/>
                <Button onClick={remove}>Delete</Button>
            </Form>
            <ErrorText>
                {saveState}
            </ErrorText>
        </FormContainer>
    )
}

export default Address
