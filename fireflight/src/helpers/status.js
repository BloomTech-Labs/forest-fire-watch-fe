export default class{
    /**
     * A class designed to assist inner-app communication
     * @param {boolean} status success of attempt
     * @param {any} reason reeason for report/report for transfer
     */
    constructor(status,reason){
        this.stats=status
        this.reason=reason
    }

    /**
     * Change a created status. Designed for if you have to keep track of a status.
     * @param {boolean} status updated status
     * @param {reason} reason updated reason
     */
    change(status,reason){
        this.stats=status;
        this.reason=reason;
    }
}