class MembershipType {
    constructor( name, typecount, description, isoffer) {
       
        this._name = name;
        this._typecount = typecount;
        this._description = description;
        this._isoffer = isoffer;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName
    }
    get typecount() {
        return parseInt(this._typecount);
    }
    set typecount(newTypecount) {
        parseInt(this._typecount) = newTypecount
    }
    get description() {
        return this._description;
    }
    set description(newDescription) {
        this._description = newDescription;
    }

    get isoffer(){
        return this._isoffer
    }
    set isoffer(newOffer) {
        this._isoffer = newOffer
    }
    
}

module.exports = MembershipType;