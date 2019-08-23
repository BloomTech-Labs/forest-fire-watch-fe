import axios from 'axios'
import stats from './status.js'

class connector{
    /**
     * This class is built as a helper to deal with all connection requests.
     */
    constructor(){
        this.connector=axios;
        if(process.env.NODE_ENV==='production')
            this.coreString='https://fireflight-lambda.herokuapp.com/api/'//http here
        else
            this.coreString='http://localhost:5000/api/'
        this.fireflight=process.env.REACT_APP_FIREFLIGHT;
        if(localStorage.getItem('token')!=null)
            this.connector.defaults.headers.common['Authorization']=this.localString.getItem('token')
        this.user=null
    }

    /**
     * Attempts to login to the application, passes a token to axios upon request. 
     * Sends a status with stats:true upon succes, and stats:false upon failure. Message will contain reason
     * @param {username:String, password:string} creds, Credentials to test against
     */
    async login(creds){

        let res = await axios.post(this.coreString+"login",creds)
        console.log(res);
        // let data = await res.data;


        // if(true){//success test
        //     localStorage.setItem('token',data)
        //     this.connector.defaults.headers.common['Authorization']=data
        //     return stats(true,data);
        // }else{
        //     //success failed
        //     throw {status:false,data:"Login Failed"}
        // }
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
        try{
            console.log(creds);
            let response = await axios.post(`${this.coreString}auth/register`,creds)
            console.log(response);
            let data = await response.data;
            return data
        }
        catch(e){
            console.error(e);
        }
    } 
}

const connect = new connector();

export default connect;