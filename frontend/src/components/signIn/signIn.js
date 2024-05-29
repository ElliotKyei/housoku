import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './_signIn.scss'
import { useDispatch } from 'react-redux';
import { signIn } from '../../reducers/user/userSlice';
import { signOut } from '../../reducers/user/userSlice';

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State variable to dynamically change the input style when there is an error

    const [inputClassName, setInputClassName] = useState({
        emailClass: "",
        passwordClass: "",
    })

    // State variable to dynamically change to the current input selected
    // Allows useEffect to only validate the current input selected

    const [inputSelected, setInputSelected] = useState("");

    // State variable to store form errors

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    })

    // State variable to store user input

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        const endServerSession = async () => {
            try {
                await axios.get("https://housoku-server-8d1399a4e220.herokuapp.com/api/sign-out", { withCredentials: true, headers: { 'Cache-Control': 'no-cache' } })
                dispatch(signOut());


            }
            catch (error) {
                dispatch(signOut());

            }
        }

        endServerSession()
    }, [dispatch])


    // Behaviour modeled after calvinklein.ca  create account validation
    // clearRequiredErrorWhenInput clears the "Required" error if user starts typing (Values dependency)

    useEffect(() => {
        clearRequiredErrorWhenInput(inputSelected);
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

            if (values[name].trim().length !== 0) {
                setInputClassName(prev => ({
                    ...prev,
                    [`${name}Class`]: ""
                }))

                let newFormErrors = { ...formErrors }
                delete newFormErrors[name]
                setFormErrors(prev => newFormErrors)
            }
        }
    }


    // handleChange stores the the value from the input into a state variable
    // <input /> onChange handler passes event to handleChange

    const handleChange = (e) => {
        const { name, value } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // This function will validate the specified input name property
    // Called  when: user clicks off input field (onBlur) and when submit button is pressed

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

                    case "password":
                        break

                    default:
                        errorMsg = "An error has occurred."
                }
            }

            // Set error message to formErrors useState. (Overriding the error message for the current input)

            setFormErrors((prev) => ({
                ...prev,
                [name]: errorMsg
            }))

            // If there are errors, change the className of the input to error styling

            if (errorMsg.trim().length !== 0) {

                setInputClassName(prev => ({
                    ...prev,
                    [`${name}Class`]: "inputError"
                }))
                return false
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
        e.preventDefault()

        for (const input in values) {
            validate(input)
        }

        if (Object.keys(formErrors).length !== 0) {
            return false
        }


        else {

            // Will implement HTTPS at a later date. HTTP for now ;(
            try {
                const response = await axios.post('https://housoku-server-8d1399a4e220.herokuapp.com/api/sign-in', values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache'
                    },
                    withCredentials: true
                })

                // Successful sign in.

                if (response.status === 200) {
                    dispatch(signIn())
                    navigate('/')
                }
            }
            catch (error) {
                let errorMsg = error.message
                if (error.response) {
                    if (error.response.data.error) {
                        errorMsg = error.response.data.error
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
            <div className='signIn'>
                <div className='item heading'>
                    <h4>Sign In</h4>
                </div>
                <div className='item signIn-form'>
                    <form method='POST' target='' onSubmit={handleSubmit} noValidate>

                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            className={inputClassName.emailClass}
                            size='50'
                            maxLength='64'
                            onChange={handleChange}
                            onBlur={(e) => { validate(e.target.name) }}
                            onFocus={(e) => setInputSelected(prev => e.target.name)}
                        />

                        {formErrors.email && <div className='errorMsg' id='emailErrors'>{formErrors.email}</div>}

                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            className={inputClassName.passwordClass}
                            size='50'
                            maxLength='40'
                            onChange={handleChange}
                            onBlur={(e) => { validate(e.target.name) }}
                            onFocus={(e) => setInputSelected(prev => e.target.name)}
                        />

                        {formErrors.password && <div className='errorMsg' id='passwordErrors'>{formErrors.password}</div>}
                        {formErrors.other && <div className='errorMsg' id='otherErrors'>{formErrors.other}</div>}

                        <button type='submit' className='signInBtn'>Sign In</button><br /><br />

                        <p>Don't have an account? <a style={{ 'color': 'black' }} href='/create-account'><span style={{ textDecoration: 'underline' }}>Create Account</span></a></p>
                    </form>
                </div>
            </div>
        </>
    )
}