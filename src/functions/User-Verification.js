import axios from 'axios'

export async function AdminUserVerification () {
    const token = localStorage.getItem('token') || null
    if (!token) {
        window.location.assign('/')
    }
    let response = await axios.get('https://eden-react-backend.herokuapp.com/shop/getUser', {
        headers : { 'authorization' : `Bearer ${token}` }
    }).then(res => res.data).catch(err => {return})
    if (!response?.user || response?.user.role !== 'admin') {
        window.location.assign('/')
        localStorage.removeItem('token')
        return
    }
}

export async function UserVerification () {
    const token = localStorage.getItem('token') || null
    if (!token) {
        window.location.assign('/')
        return
    }
    let response = await axios.get('https://eden-react-backend.herokuapp.com/shop/getUser', {
        headers : { 'authorization' : `Bearer ${token}` }
    }).then(res => res.data).catch(err => {return})

    if (!response?.user || response?.user.role !== 'user') {
        window.location.assign('/')
        localStorage.removeItem('token')
        return
    }
}