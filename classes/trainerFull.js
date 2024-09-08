/*
This class needs getters and setters. Through getters and setters we can ensure data integrity
.

nevermind. Added them. However we still need to add date formatting inside the getters and the setters for the birth date.
Also might be worth looking into some data integrity & compatibility. 
*/
//const dateFormat = require('dateformat')

class TrainerFull  {
    constructor(id,fname,lname,email,address,imageLocation,birthDate,bio){
        this._id = id;
        this._fname = fname;
        this._lname = lname;
        this._email = email;
        this._address = address;
        this._imageLocation = imageLocation;
        this._birthDate = birthDate;
        this._bio = bio;

    }
    get id(){
        return parseInt(this._id);
    }
    set id(newId){
        this._id = newId;
    }
    get fname(){
        return this._fname;
    }
    set fname(newFname){
        this._fname = newFname;
    }
    get lname(){
        return this._lname;
    }
    set lname(newLname){
        this._lname = newLname;
    }
    get email(){
        return this._email;
    }
    set email(newEmail){
        this._email = newEmail;
    }
    get address(){
        return this._address;
    }
    set address(newAddress){
        this._address = newAddress;
    }
    get imageLocation(){
        return this._imageLocation;
    }
    set imageLocation(newLoc){
        this._imageLocation = newLoc;
    }
    get birthDate(){
        return this._birthDate;
    }
    set birthDate(newDate){
        this._birthDate = newDate;
    }
    get bio(){
        return this._bio
    }
    set bio(newBio){
        this._bio = newBio
    }

}

module.exports = TrainerFull;