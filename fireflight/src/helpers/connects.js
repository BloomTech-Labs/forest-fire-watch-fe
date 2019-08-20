import axios from 'axios'
import stats from './status.js'

export default class{
    constructor(){
        this.connector=axios;
        this.coreString=''//http here
        if(localStorage.getItem('token')!=null)
            this.connector.defaults.headers.common['Authorization']=data.data.payload
        this.user=null
    }

    async login(creds){
        let res = await axios.post(this.coreString+"/login",creds)
        //let {data}  =res.data
        //success test

        let data = {id:1,}

        if(true){//success test
            localStorage.setItem('token',data)
            this.connector.defaults.headers.common['Authorization']=data
            return stats(true,data);
        }else{
            //success failed
            throw {status:false,data:"Login Failed"}
        }
    }

    logout(){
        this.connector.defaults.headers.common['Authorization']=null
        localStorage.removeItem('token')
    }
    
    async self(){
        //async this.connector.post(self) //get self
        this.user=data;
        return stats(true,data);
    
    }
}