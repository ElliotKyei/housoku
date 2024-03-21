import './signIn.scss'

export default function SignIn() {
    return (
        <>
            <div className='signIn'>
                <div className='heading'>
                    <h4>Sign In</h4>
                </div>
                <div className='signIn-form'>
                    <form method='POST' target=''>

                        <label for='email'>Email</label>
                        <input type='text' name='email' id='email' size='60' maxLength='12' />
                        <div className='errorMsg' id='emailErrors' hidden>The email field cannot be blank.</div>

                        <label for='password'>Password</label>
                        <input type='password' name='password' id='password' size='60' maxLength='12' />
                        <div className='errorMsg' id='emailErrors' hidden>The password field cannot be blank.</div>

                        <button type='submit' className='signInBtn'>Sign In</button><br /><br />

                        <p>Don't have an account? <a style={{ 'color': 'black' }} href='/create-account'><span style={{ 'text-decoration': 'underline' }}>Create Account</span></a></p>
                    </form>
                </div>
            </div>
        </>
    )
}