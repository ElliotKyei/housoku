import axios from 'axios';
import './createAccount.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'



export default function CreateAccount() {

    const navigate = useNavigate();

    // State variable to dynamically change the input style when there is an error

    const [inputClassName, setInputClassName] = useState({
        emailClass: "",
        firstNameClass: "",
        lastNameClass: "",
        passwordClass: ""
    });

    // State variable to dynamically change to the current input selected
    // Allows useEffect to only validate the current input selected

    const [inputSelected, setInputSelected] = useState("");

    // State variable to store form errors

    const [formErrors, setFormErrors] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    // State variable to store user input

    const [values, setValues] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    // Behaviour modeled after calvinklein.ca  create account validation
    // clearRequiredErrorWhenInput clears the "Required" error if user starts typing (Values dependency)

    useEffect(() => {
        clearRequiredErrorWhenInput(inputSelected)
        if (formErrors.other) {
            const newFormErrors = { ...formErrors };
            delete newFormErrors.other
            setFormErrors(newFormErrors);
        }
    }, [values])

    // Clear "Required" error message if the user starts typing in the input

    const clearRequiredErrorWhenInput = (name) => {
        if (name) {

            // if the current input length is not 0, remove the error style and error message under current input

            if (0 !== values[name].trim().length) {
                setInputClassName(prev => ({
                    ...prev,
                    [`${name}Class`]: ""
                }))

                let newFormErrors = { ...formErrors };
                delete newFormErrors[name]
                setFormErrors(prev => newFormErrors)
            }
        }
    }

    // handleChange stores the the value from the input into a state variable
    // <input /> onChange handler passes event to handleChange

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((values) => ({
            ...values,
            [name]: value
        }))

    }


    // This function will validate the specified input name property
    // 2 ways this function is called: When user clicks off input field (onBlur) and when submit button is pressed

    const validate = (name) => {
        if (name) {
            let errorMsg = ""

            // First check if input is empty

            if (values[name].trim().length === 0) {
                errorMsg = "Required"
            }


            else {

                // Validate input depending on what name is passed to function

                switch (name) {
                    case "email":

                        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                        if (!emailPattern.test(values.email)) {
                            errorMsg = "Please enter a valid email address."
                        }
                        break;

                    case "firstName":

                        if (values.firstName.trim().length > 30) {
                            errorMsg = "First name must be less than 30 characters"
                        }
                        break;

                    case "lastName":

                        if (values.lastName.length > 30) {
                            errorMsg = "Last name must be less than 30 characters"
                        }
                        break;

                    case "password":
                        if (values.password.length < 8) {
                            errorMsg = "Passwords must have a minimum of 8 characters"
                        }
                        break;

                    default:
                        errorMsg = "An error has occurred."
                        break;
                }
            }

            // Set error message to formErrors useState. (Overriding the error message for the current input)


            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMsg
            }));


            // If there are errors, change the className of the input to error styling

            if (errorMsg.trim().length !== 0) {
                setInputClassName(prev => ({
                    ...prev,
                    [`${name}Class`]: "inputError"
                }))
                return false;
            }

            // If there are no errors, get rid of error styling and remove any error message for the input

            else {
                setInputClassName(prev => ({
                    ...prev,
                    [`${name}Class`]: ""
                }))

                const newFormErrors = { ...formErrors };
                delete newFormErrors[name]
                setFormErrors(prev => newFormErrors)
                return true;
            }
        }

    }

    // This function will run when the form is submitted.
    // Validate each input one by one. If there are no errors in formErrors useState, form is valid.

    const handleSubmit = async (e) => {

        e.preventDefault();

        for (const input in values) {
            validate(input)
        }

        if (Object.keys(formErrors).length !== 0) {
            return false
        }

        else {

            // Will implement HTTPS at a later date. HTTP for now ;(

            try {
                const response = await axios.post('http://localhost:8080/api/create-account', values, {
                    headers: {
                        "Content-Type": "application/json",
                        'Cache-Control': 'no-cache',
                    },
                    withCredentials: true
                })

                if (response.status === 201) {
                    navigate('/')
                }

            }

            catch (error) {
                let errorMsg = error.message
                if (error.response) {
                    if (error.response.data.alreadyExists) {
                        errorMsg = error.response.data.alreadyExists
                    }
                }

                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    other: errorMsg
                }));

            }
        }
    }

    return (
        <>
            <div className='createAccount'>
                <div className='heading'>
                    <h4>Create Account</h4>
                </div>
                <div className='createAccount-form'>
                    <form method='POST' target='' noValidate onSubmit={handleSubmit}>

                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            className={inputClassName.emailClass}
                            size='50'
                            maxLength='64'
                            onInput={handleChange}
                            onFocus={(e) => setInputSelected(i => e.target.name)}
                            onBlur={(e) => validate(e.target.name)}
                            value={values.email}
                            required
                        />

                        {formErrors.email && <div className='errorMsg' id='emailErrors'>{formErrors.email}</div>}

                        <label>First name</label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            className={inputClassName.firstNameClass}
                            size='50'
                            maxLength='30'
                            onInput={handleChange}
                            onFocus={(e) => setInputSelected(i => e.target.name)}
                            onBlur={(e) => validate(e.target.name)}
                            value={values.firstName}
                            required
                        />
                        {formErrors.firstName && <div className='errorMsg' id='firstNameErrors'>{formErrors.firstName}</div>}

                        <label>Last name</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            className={inputClassName.lastNameClass}
                            size='50'
                            maxLength='30'
                            onInput={handleChange}
                            onFocus={(e) => setInputSelected(i => e.target.name)}
                            onBlur={(e) => validate(e.target.name)}
                            value={values.lastName}
                            required
                        />

                        {formErrors.lastName && <div className='errorMsg' id='lastNameErrors'>{formErrors.lastName}</div>}

                        <label>Create password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            className={inputClassName.passwordClass}
                            size='50'
                            maxLength='40'
                            onInput={handleChange}
                            onFocus={(e) => setInputSelected(i => e.target.name)}
                            onBlur={(e) => validate(e.target.name)}
                            value={values.password}
                            required
                        />
                        {formErrors.password && <div className='errorMsg' id='passwordErrors'>{formErrors.password}</div>}
                        {formErrors.other && <div className='errorMsg' id='otherErrors'>{formErrors.other}</div>}

                        <p style={{ paddingTop: '1em' }}>By creating an account, you agree to our <span style={{ textDecoration: 'underline' }}>Privacy Policy</span> and <span style={{ textDecoration: 'underline' }}>Terms & Conditions</span>.</p>

                        <button type='submit' className='createAccountBtn'>Create Account</button>
                    </form>
                </div>
            </div >
        </>
    )
}