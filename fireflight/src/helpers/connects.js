import axios from 'axios'
import stats from './status.js'
import { isArray } from 'util';

class connector{
    /**
     * This class is built as a helper to deal with all connection requests.
     */
    constructor(){
        console.log("loading");
        this.connector=axios;
        if(process.env.NODE_ENV==='production')
            this.coreString='https://fireflight-lambda.herokuapp.com/api/'//http here
        else
            this.coreString='http://localhost:5000/api/'
        this.fireflight=process.env.REACT_APP_FIREFLIGHT;
        if(localStorage.getItem('token')!=null)
            this.connector.defaults.headers.common['Authorization']=localStorage.getItem('token')
        this.user=null
    }

    /**
     * Attempts to login to the application, passes a token to axios upon request. 
     * Sends a status with stats:true upon succes, and stats:false upon failure. Message will contain reason
     * @param {username:String, password:string} creds, Credentials to test against
     */
    async login(creds){

        let res = await axios.post(this.coreString+"auth/login",creds)

        let data = await res.data;

        if(res.status==200){//success test
            localStorage.setItem('token',data.token)
            this.connector.defaults.headers.common['Authorization']=data.token
            let who = await this.self()
            return new stats(true,who.username);
        }else{
            //success failed
            throw {status:false,data:"Login Failed"}
        }
    }

    /**
     * Destroyed stored authorization token and removes the token from storage
     */
    logout(){
        this.connector.defaults.headers.common['Authorization']=null
        localStorage.removeItem('token')
    }
    

    /**
     * returns user object
     */
    async self(){
        let response = await axios.get(`${this.coreString}users/session`)
        let data = await response.data;
        return data;
    }

    /**
     * Registers a user with given credentials
     * Returns a status with {stats:true} upon success, and {stats:false} upon failure.
     * @param {username,password} creds Creditals wanted to register
     */
    async register(creds){
        let response = await axios.post(`${this.coreString}auth/register`,creds)
        if(response.status==201){
            let data = await response.data;
            this.connector.defaults.headers.common['Authorization']=data.token;
            localStorage.setItem('token',data.token)
            let who = await this.self();
            
            return new stats(true,{username:who.username})
        }else{
            let errors = {code:response.status}
            errors.message=response.data.message
            return new stats(false,errors)
        }
    } 

    /**
     * Fetch all locations associated with current login
     */
    async fetchLocations(){
        let response = await this.connector.get(`${this.coreString}locations`)
        let data = await response.data;
        if(response.status==200){
            return new stats(true,data)
        }
        else{
            return new stats(false,data)
        }
    }

    /**
     * 
     * @param {location} locs save location to server and return the saved location
     */
    async saveLocations(locs){
        try {
            let user=await this.self();
            if(isArray(locs))
                locs=locs.map(i=>({user_id:user.user_id,address:i,radius:5}))
            else
                locs={user_id:user.user_id,address:locs,radius:0}
            console.log(locs);
            let response = await this.connector.post(`${this.coreString}locations`,locs)
            let data = await response.data
            return new stats(true,data)
        } catch (err) {
            throw err
        }
    }

    /**
     * 
     * @param {Address} add Address to swap to
     * @param {id} id Id to change
     */
    async updateLocation(add,id){
        try{
            let user = await this.self()
            let sender={address:add,user_id:user.user_id,radius:5}
            let res=await this.connector.put(`${this.coreString}locations/${id}`,sender)
            let data = await res.data
            return new stats(true,add)
        }catch(err){
            throw new stats(false,err)
        }
    }

    async deleteLocation(id){
        try{
            let user = await this.self()
            let res=await this.connector.delete(`${this.coreString}locations/${id}`)
            let data=await res.data
            return new stats(true,'deleted '+id)
        }catch(err){
            throw new stats(false,err)
        }
    }
}

const connect = new connector();

export default connect;