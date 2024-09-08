const dateFormat = require('dateformat')


class NewBooking {
    constructor(startDate, trainerId, customerId, locationId, cancelStatus,endingDate) {
        this._startDate = startDate;
        this._isCancelled = cancelStatus;
        this._trainerId = trainerId;
        this._customerId = customerId;
        this._locationId = locationId;
        this._endDate = endingDate;
    }
    get startDate(){
        return this._startDate;
    }

    set startDate(date){
        this._startDate = date;
    }
    set endDate(date){
        if(!endingDate){
            this._endDate = this.calcEndDate()
        }else{
            this._endDate = date;
        }
    }
    get endDate(){
        if(!this._endDate){
            return this.calcEndDate()
        } else {
            return this._endDate
        }
    }
    /**
     * Ensuring correct format for db entry. IDs *must* be in INT format.
     * Through the use of getters we can always return the correct data type for insertion
     * but...
     * getters can not exist without setters.
     * 
    */
    get isCancelled() {
        return this._isCancelled
    }

    // If no value is passed to the constructor it automatically assigns false
    set isCancelled(status){
        if(!cancelStatus){
            this._isCancelled = 0
        } else {
            this._isCancelled = status
        }
    }
    get trainerId(){
        return parseInt(this._trainerId);
    }
    set trainerId(id){
        this._trainerId = id;
    }
    get customerId(){
        return parseInt(this._customerId);
    }
    set customerId(id){
        this._customerId = id;
    }
    get locationId(){
        return this._locationId;
    }

    set locationId(loc){
        this._locationId = loc;
    }
    // calcEndDate is a function to calculate and return the starting date + 2 hours. It uses the dateformat module included above

    calcEndDate(){
        let _dateTime = new Date(this.startDate);
        _dateTime.setHours(_dateTime.getHours()+2)
        let dateTime = dateFormat(_dateTime, "yyyy-mm-dd HH:MM")
        return dateTime;

    }
}

module.exports = NewBooking;