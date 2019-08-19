export default classObj=>{
    let temp=''
    for (const key in classObj) {
        if (classObj.hasOwnProperty(key)) {
            const element = classObj[key];
            if(element)
                temp+=`${key} `
        }
    }
    return temp;
}