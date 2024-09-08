class MembershipType2 {
    constructor(id, name, typecount, description, price, isOffer) {
        this._id = id;
        this._name = name;
        this._typecount = typecount;
        this._description = description;
        this._price = price;
        this._isOffer = isOffer;
    }
    get id(){
        return parseInt(this._id);
    }
    set id(newId){
        this._id = newId;
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
    get price() {
        return this._price;
        
    }
  
    set price(newPrice) {
        this._price = newPrice;
    }
     get isOffer(){
        return this._isOffer
    }
    set isOffer(newOffer) {
        this._isOffer = newOffer;
    }
}

module.exports = MembershipType2;