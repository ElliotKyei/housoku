import './createAccount.scss'

export default function CreateAccount() {
    return (
        <>
            <div className='createAccount'>
                <div className='heading'>
                    <h4>Create Account</h4>
                </div>
                <div className='createAccount-form'>
                    <form method='POST' target=''>

                        <label>Email</label>
                        <input type='text' name='email' id='email' size='60' maxLength='12' />
                        <div className='errorMsg' id='emailErrors' hidden>The email field cannot be blank.</div>

                        <label>First name</label>
                        <input type='text' name='firstName' id='firstName' size='60' maxLength='12' />
                        <div className='errorMsg' id='emailErrors' hidden>The first name field cannot be blank.</div>

                        <label>Last name</label>
                        <input type='text' name='lastName' id='lastName' size='60' maxLength='12' />
                        <div className='errorMsg' id='emailErrors' hidden>The last name field cannot be blank.</div>

                        <label>Create password</label>
                        <input type='password' name='password' id='password' size='60' maxLength='12' />
                        <div className='errorMsg' id='emailErrors' hidden>The password field cannot be blank.</div>

                        <p style={{ 'padding-top': '1em' }}>By creating an account, you agree to our <span style={{ 'text-decoration': 'underline' }}>Privacy Policy</span> and <span style={{ 'text-decoration': 'underline' }}>Terms & Conditions</span>.</p>

                        <button type='submit' className='createAccountBtn'>Create Account</button>
                    </form>
                </div>
            </div>
        </>
    )
}