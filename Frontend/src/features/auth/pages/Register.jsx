import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (<main className="auth-page" style={{ justifyContent: 'center', alignItems: 'center' }}><h1>Loading.......</h1></main>)
    }

    return (
        <main className="auth-page">
            
            {/* Left Decorative Panel */}
            <div className="auth-page__visual">
                <div className="glow-orb glow-orb--1"></div>
                <div className="glow-orb glow-orb--2"></div>
                <div className="brand-tagline">
                    <h1><span className="highlight">Resuno</span> <span>AI Prep</span></h1>
                    <p>Your AI-Powered Career Coach. Build winning interview strategies automatically.</p>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="auth-page__form">
                <div className="auth-card">
                    <div className="auth-card__header">
                        <div className="logo highlight">Resuno</div>
                        <p>Create your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Full Name</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='John Doe' required />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='name@example.com' required />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='••••••••' required />
                        </div>

                        <button type="submit" className='button primary-button auth-button'>Create Account</button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to={"/login"}>Sign In</Link>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Register