module.exports = function permissionsError(err, info,redirect){
    var req = this.req
    var res = this.res
    var sails = req._sails;

    var newError = new Error('Permission error')
    newError = err;
    _.extend(newError,info)
    console.log(info.when)
    res.status(400)
    return res.view('pages/account/failTemp', {data:err ,redirectTo:redirect})    
}