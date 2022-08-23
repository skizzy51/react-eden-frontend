import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import '../styles/css/Sign-in.css'
import { LoadingSpinner } from '../components/Loading'

export function SignInPage () {
    const token = localStorage.getItem('token') || null
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [createUsername, setCreateUsername] = useState('')
    const [createPassword1, setCreatePassword1] = useState('')
    const [createPassword2, setCreatePassword2] = useState('')
    const [loading, setLoading] = useState(false)
    const signInCont = useRef()
    const signUpCont = useRef()
    

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1500)
    }, [])

    useEffect(()=>{
        async function verifyUser () {
            let response = await axios.get('https://eden-react-backend.herokuapp.com/shop/getUser', {
                headers : { 'authorization' : `Bearer ${token}` }
            }).then(res => res.data).catch(err => {return})
    
            if (response?.user.role === 'admin') {
                window.location.assign('/admin')
                return
            }
            else if (response?.user.role === 'user') {
                window.location.assign('/')
                return
            }
            else if (!response) {
                localStorage.removeItem('token')
            }
        }
        verifyUser()
    }, [token])


    function goToSignUp (){
        signInCont.current.style.display = 'none'
        signUpCont.current.style.display = 'block'
        let form1 = document.getElementById('form1')
        form1.reset()
        let form2 = document.getElementById('form2')
        form2.reset()
    }
    function goToSignIn (){
        signInCont.current.style.display = 'block'
        signUpCont.current.style.display = 'none'
        let form1 = document.getElementById('form1')
        form1.reset()
        let form2 = document.getElementById('form2')
        form2.reset()
    }

    async function signIn () {
        if (username.length < 1 || password.length < 1) {
            return alert('Username field and password field must be filled')
        }
        let data = {
            username : username,
            password : password
        }

        let response = await axios.post('https://eden-react-backend.herokuapp.com/shop/loginUser', data, {
            headers : { 'Content-Type' : 'application/json' }
        }).then(res => res.data).catch(err => {return})

        if (response?.message === 'logged in') {
            localStorage.setItem('token', response?.token)
            let verify = await axios.get('https://eden-react-backend.herokuapp.com/shop/getUser', {
                headers : { 'authorization' : `Bearer ${response?.token }`}
            }).then(res => res.data)
            if (verify.user.role === 'admin') {
                window.location.assign('/admin')
                return
            }
            else if (verify.user.role === 'user') {
                window.location.assign('/')
                return
            }
        }
        else {
            return alert('Invalid Username or Password')
        }
    }

    async function signUp () {
        if (createUsername.length < 1 || createPassword1.length < 1 || createPassword2.length < 1) {
            return alert('Username field and password field must be filled')
        }
        if (createUsername.length < 4) {
            return alert('Username must be at least 4 characters long')
        }
        if (createPassword1 === createPassword2) {
            let data = {
                username : createUsername,
                password : createPassword1
            }
            let response = await axios.post('https://eden-react-backend.herokuapp.com/shop/user', data, {
                headers : { 'Content-Type' : 'application/json' }
            }).then(res => res.data).catch(err => {return})

            console.log(response)
            if (response.message === 'User Created and signed in') {
                localStorage.setItem('token', response.token)
                let verify = await axios.get('https://eden-react-backend.herokuapp.com/shop/getUser', {
                    headers : {
                        'authorization' : `Bearer ${response.token}`
                    }
                }).then(res=>res.data).catch(err => {return})
                if (verify.user.role !== 'admin') {
                    window.location.assign('/')
                }
            }
            else {
                return alert('Username already exists')
            }
        }
        else{
            return alert('First and second passwords do not match')
        }
    }

    return (
        <>
        {
            loading 
            ? <LoadingSpinner/>
            : <div className='sign-container'>
                <div className='sign-in-cont' ref={signInCont}>
                    <h1>Sign In</h1>
                    <form className='sign-in' id='form1'>
                        <div className='sign-input'>
                            <b>Enter username :</b>
                            <input onChange={(e)=>setUserName(e.target.value)} type='text' placeholder='Username'/>
                        </div>
                        <div className='sign-input'>
                            <b>Enter password :</b>
                            <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password'/>
                        </div>
                        <button onClick={signIn} type='button' className='sign-button'>Sign In</button>
                        <p>Don't have an account?&nbsp;<span onClick={goToSignUp}>Sign up</span></p>
                    </form>
                </div>

                <div className='sign-up-cont' ref={signUpCont}>
                    <h1>Sign Up</h1>
                    <form className='sign-in' id='form2'>
                        <div className='sign-input'>
                            <b>Enter valid username :</b>
                            <input onChange={(e)=>setCreateUsername(e.target.value)} type='text' placeholder='Username'/>
                        </div>
                        <div className='sign-input'>
                            <b>Enter password :</b>
                            <input onChange={(e)=>setCreatePassword1(e.target.value)} type='password' placeholder='Password'/>
                        </div>
                        <div className='sign-input'>
                            <b>Re-enter password :</b>
                            <input onChange={(e)=>setCreatePassword2(e.target.value)} type='password' placeholder='Re-enter password'/>
                        </div>
                        <button onClick={signUp} type='button' className='sign-button'>Sign Up</button>
                        <p>Already have an account?&nbsp;<span onClick={goToSignIn}>Sign in</span></p>
                    </form>
                </div>
            </div>
        }
        </>
    )
}