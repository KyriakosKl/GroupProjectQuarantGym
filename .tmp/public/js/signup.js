    // Defining a function to display errorText message
    function printerrtext(elemId, hintMsg) {
        document.getElementById(elemId).innerHTML = hintMsg;
    }

    // Defining a function to validate form
    function validateForm() {
        // Retrieving the values of form elements
        const name = document.demoForm.name.value;
        const email = document.demoForm.email.value;
        const pswd = document.demoForm.pswd.value;
        const pswd2 = document.demoForm.pswd2.value;


        // Defining errorText variables with a default value
        var nameError = emailError = countryError = pswdError = pswdError2 = true;
        // Validate name
        if (name == "") {
            printerrtext("nameError", "Please enter your name");
        } else {
            var regex = /^[a-zA-Z\s]+$/;
            if (regex.test(name) === false) {
                printerrtext("nameError", "Please enter a valid name");
            } else {
                printerrtext("nameError", "");
                nameError = false;
            }
        }
        // Validate email address
        if (email == "") {
            printerrtext("emailError", "Please enter your email address");
        } else {
            // Regular expression for basic email validation
            var regex = /^\S+@\S+\.\S+$/;
            if (regex.test(email) === false) {
                printerrtext("emailError", "Please enter a valid email address");
            } else {
                printerrtext("emailError", "");
                emailError = false;
            }
        }

        // Validate Password
        if (pswd == "") {
            printerrtext("pswdError", "Please enter your password");
        } else {
            var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (regex.test(pswd) === false) {
                printerrtext("pswdError", "Min : 6 character in form Asd4$l");
            } else {
                printerrtext("pswdError", "");
                pswdError = false;
            }
        }

        // Validate Confirm Password
        if(pswd2 !== pswd) {
            printerrtext("pswdError2", "Passwords do not match")
        } else {
            printerrtext("pswdError2", "");
            pswdError = false;
        }


        // Prevent the form from being submitted if there are any errtexts
        if ((nameError || emailError || pswdError || pswdError2) == true) {
            return false;
        } 
        else {
            // Creating a string from input data for preview
            var dataPreview = "You've entered the following details: \n" +
                "Full Name: " + name + "\n" +
                "Email Address: " + email + "\n" +
                "Country: " + country + "\n" +
            // Display input data in a dialog box before submitting the form
            alert(dataPreview);
        }
    };