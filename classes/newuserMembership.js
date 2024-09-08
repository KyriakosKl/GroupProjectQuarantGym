const dateFormat = require('dateformat')

class NewUserMembership {
    constructor(id, startDate, price, isCancelled, userId, membershipId) {
            this._id = id;
            this._startDate = startDate;
            this._price = price;
            this._isCancelled = isCancelled;
            this._userId = userId;
            this.membershipId = membershipId;
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }
    
    /**
     * @dimitris Updated the get startDate() to return a string for formatting reasons. This corrects
     * formatting issues. Now stored correctly on the db.
     */
    
    
    get startDate(){
        let _tempDate = new Date(this._startDate)
        _tempDate = dateFormat(_tempDate, "yyyy-mm-dd HH:MM")
        return _tempDate;
    }
    set startDate(date){
        this._startDate = date;
    }
    get endDate(){
        return this.calcEndDate();
    }
    // calcEndDate is a function to calculate and return the starting date + 2 hours. It uses the dateformat module included above
    
    calcEndDate(){
        let _dateTime = new Date(this.startDate);
        // _dateTime.setMonth(_dateTime.getMonth() + 12) -> replacing with monthly model

        _dateTime.setMonth(_dateTime.getMonth() + 1)
        let dateTime = dateFormat(_dateTime, "yyyy-mm-dd HH:MM")
        return dateTime;
    }
    get price() {
        return parseInt(this._price)
        
    }
    set price(newPrice) {
        this._price = newPrice;
    }
    get isCancelled() {
        return this._isCancelled;
    }
    set isCancelled(newState) {
        this._isCancelled = newState;
    }

    get userId() {
        return parseInt(this._userId);
    }
    set userId(id) {
        this._userId = id;
    }

    get membershipId() {
        return parseInt(this._membershipId);
    }
    set membershipId(id) {
        this._membershipId = id;
    }
    
}

module.exports = NewUserMembership;