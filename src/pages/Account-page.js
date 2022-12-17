import { faCircleUser, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Valuables } from '../App'
import { LoadingSpinner } from '../components/Loading'
import { UserVerification } from '../functions/User-Verification'
import '../styles/css/Account-page.css'


export function AccountPage () {
    UserVerification()
    const [newUsername, setNewUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [loading, setLoading] = useState(false)
    const usernameInputCont = useRef()
    const passwordInputCont = useRef()
    const { user } = useContext(Valuables)
    const token = localStorage.getItem('token')

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])
    
    function openUsernameInput () {
        if (usernameInputCont.current.classList.contains('username-input-shown')) {
            usernameInputCont.current.classList.replace('username-input-shown', 'username-input-hidden')
        }
        else if (usernameInputCont.current.classList.contains('username-input-hidden')) {
            usernameInputCont.current.classList.replace('username-input-hidden', 'username-input-shown')
        }
    }
    function openPasswordInput () {
        if (passwordInputCont.current.classList.contains('password-input-shown')) {
            passwordInputCont.current.classList.replace('password-input-shown', 'password-input-hidden')
        }
        else if (passwordInputCont.current.classList.contains('password-input-hidden')) {
            passwordInputCont.current.classList.replace('password-input-hidden', 'password-input-shown')
        }
    }

    async function changeUsername () {
        UserVerification()
        if (newUsername.length < 4) {
            return alert('Username must be at least 4 characters long')
        }

        let response = await axios.post('https://eden-backend.cyclic.app/shop/update/username', {username : newUsername}, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})
        if (response.message === 'Username already exists') {
            return alert('Username already exists')
        }
        else if (response.message !== 'Username updated') {
            return alert('Error updating username')
        }
        window.location.reload()
        alert('Username updated')
    }

    async function changePassword () {
        UserVerification()
        if (oldPassword.length < 1 || newPassword1.length < 1 || newPassword2.length < 1) {
            return alert('All password fields must be filled')
        }
        if (newPassword1 !== newPassword2) {
            return alert('New passwords do not match')
        }
        let passwords = {
            oldPassword : oldPassword,
            newPassword : newPassword1
        }
        let response = await axios.post('https://eden-backend.cyclic.app/shop/update/password', passwords, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})

        if (response.message === 'Invalid Password') {
            return alert('Old password is invalid')
        }
        else if (response.message !== 'Password updated') {
            return alert('Error updating password')
        }
        window.location.reload()
        alert('Password successfully updated')
    }

    async function deleteUser () {
        let response = await fetch('https://eden-backend.cyclic.app/shop/user', {
            method : 'delete',
            headers : {
                'authorization' : `Bearer ${token}`
            }
        }).then(data =>data.json()).catch(err => {return})
        console.log(response)

        if (response.message !== 'User deleted') {
            return alert('Error deleting account')
        }else{
            localStorage.removeItem('token')
            window.location.assign('/')
            return alert('Account successfully deleted')
        }
    }

    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className='account'>
                    <div className='account-user'>
                        <FontAwesomeIcon className='user-icon' icon={faCircleUser} />
                        <h2 className='username'>{user?.username}</h2>
                        <div className='change-detail'>
                            <div className='change-username'>
                                <div style={{display : 'flex', alignItems : 'center'}}>
                                    <h4><u>Change Username</u></h4>
                                    <FontAwesomeIcon onClick={openUsernameInput} className='edit-btn' icon={faPencilAlt} />
                                </div>
                                <div className='username-input-hidden' ref={usernameInputCont}>
                                    <input onChange={(e)=>setNewUsername(e.target.value)} className='input' autoComplete='off' type='text' placeholder=' ' />
                                    <label className='label'>Username</label>
                                    <button onClick={changeUsername} type='button'>Change Username</button>
                                </div>
                            </div>
                            <div className='change-password'>
                                <div style={{display : 'flex', alignItems : 'center'}}>
                                    <h4><u>Change Password</u></h4>
                                    <FontAwesomeIcon onClick={openPasswordInput} className='edit-btn' icon={faPencilAlt} />
                                </div>
                                <div className='password-input-hidden' ref={passwordInputCont}>
                                    <label htmlFor='previous-password'>Enter previous Password :</label>
                                    <input onChange={(e)=>setOldPassword(e.target.value)} type='password' placeholder='Previous password' id='previous-password' />

                                    <label htmlFor='new-password1'>Enter New Password :</label>
                                    <input onChange={(e)=>setNewPassword1(e.target.value)} type='password' placeholder='New-password' id='new-password1' />
                                    
                                    <label htmlFor='new-password2'>Confirm New Password :</label>
                                    <input onChange={(e)=>setNewPassword2(e.target.value)} type='password' placeholder='New-password' id='new-password2' />

                                    <button onClick={changePassword} type='button'>Change password</button>
                                </div>
                            </div>
                        </div>
                        <button className='delete-account' onClick={deleteUser}>Delete account</button>
                    </div>
                    <div className='account-menu'>
                        <Link to='/account'><button>account information</button></Link>
                        <Link to='/favorites'><button>favorites</button></Link>
                    </div>
                </div>
            }
        </>
        
    )
}