/* 
Form Check policy : 
    will create an empty error logging object on init. If errors do not occur, proceeds to the initial request.
    If errors do occur, they are added to the error object and then returned to the sign up page. Record on db does not happen

    we will be using the req.body method. 
    details here : https://sailsjs.com/documentation/reference/request-req/req-body
    differences between params and req.body : https://stackoverflow.com/questions/22076230/sailsjs-difference-between-req-body-and-req-params-all

*/


module.exports = async function(req, res, proceed) {
    
    
    // Prepare variables 
    let errorsLog = {};
    let regexObj = {
        nameRegex : /^[a-zA-Z\s]+$/,
        emailRegex : /^\S+@\S+\.\S+$/,
        passRegex : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    };
    
    // Begin form validation 
    
    if (req.body) {
        let fname = req.body.fname
        let lname = req.body.lname
        let address = req.body.address
        let email = req.body.email
        let password = req.body.password
        let confirmPass = req.body.confirmPass
        
        if (fname == "") {
            errorsLog.fnameError = "Please enter your first name";
        } else {

            if (regexObj.nameRegex.test(fname) === false) {
                errorsLog.fnameError = "Please enter a valid name";
            }
        }
        if (lname == "") {
            errorsLog.lnameError = "Please enter your last name";
        } else {

            if (regexObj.nameRegex.test(fname) === false) {
                errorsLog.lnameError = "Please enter a valid last name";
            }
        }
        // Validate email address
        if (email == "") {
            errorsLog.emailError = "Please enter your email address";
        } else {
            if (regexObj.emailRegex.test(email) === false) {
               errorsLog.emailError = "Please enter a valid email address";
            }
        }

        // Validate Password
        if (password == "") {
            errorsLog.passwordError = "Please enter your password";
        } else {
            if (regexObj.passRegex.test(password) === false) {
               errorsLog.passwordError = "Min : 6 character in form Asd4$l";
            }
        }

        // Validate Confirm Password
        if(password !== confirmPass) {
            errorsLog.confirmPassError = "Passwords do not match"
        }

        /* 
        Simple object key count to determine route. If object has any number of keys we will redirect to the sign up page with errors.
        If not we proceed to write to db and create records
        */
        
        if(Object.keys(errorsLog).length>0) {
            console.log('Returning to signup with errors.')
            return res.view('pages/account/signup', {errorList:errorsLog})
            }
            
        }
        
        return proceed();
} 
