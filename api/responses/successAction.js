module.exports = function permissionsError(err, info,redirect){
    var req = this.req
    var res = this.res
    var sails = req._sails;

    var newError = new Error('Succesful Action')
    newError = err;
    _.extend(newError,info)
    console.log(info.when)
    res.status(200)
    return res.view('pages/account/successTemp', {data:err, redirectTo:redirect})    
}