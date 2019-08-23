export default class{
    constructor(status,reason){
        this.stats=status
        this.reason=reason
    }

    change(status,reason){
        this.stats=status;
        this.reason=reason;
    }
}