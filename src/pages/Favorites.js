import { UserVerification } from '../functions/User-Verification'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/css/Favorites.css'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../components/Loading'


export function Favorites () {
    UserVerification()
    const [favoritesResponse, setFavoritesResponse] = useState()
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token') || null

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    async function removeFromFavorites (id) {
        UserVerification()
        let response = await axios.post('https://eden-backend.cyclic.app/shop/unmarkFavorite', {id : id}, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})

        if (response.message === 'Unmarked as favorite') {
            window.location.reload()
            return alert('Item removed from favorites')
        }
    }
    
    useEffect(()=>{
        axios.get('https://eden-backend.cyclic.app/shop/allFavorites', {
            headers : { 'authorization' : `Bearer ${token}` }
        }).then(res => setFavoritesResponse(res.data))
    }, [token])
    
    const favoritesList = favoritesResponse?.data.favorites.map(item =>{
        return (
            <div key={item._id} className='fav-item-cont'>
                <Link to='/product' state={item}>
                    <img src={item.images[0].filePath} alt={item.name} />
                    <p>{item.name}</p>
                </Link>
                <button onClick={(e)=>removeFromFavorites(item._id)} >Remove Item</button>
            </div>
        )
    })

    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className='account'>
                    <div className='favorites'>
                        {
                            favoritesResponse?.data.favorites.length < 1
                            ? <h2>You have no favorite items</h2>
                            : favoritesList
                        }
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