import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {faInstagram, faFacebook, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { useLocation } from 'react-router-dom'
import '../styles/css/Product.css'
import { useContext, useEffect, useRef, useState } from "react"
import { LoadingSpinner } from "../components/Loading"
import { Valuables } from "../App"
import axios from "axios"


export function Product () {
    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    const token = localStorage.getItem('token')
    const { user, dispatch } = useContext(Valuables)
    const location = useLocation()
    const product = location.state
    const [loading, setLoading] = useState(false)
    const favButton = useRef()

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1500)
    }, [])

    function addToCart (product) {
        let items = localStorage.getItem('cart') || '{}'
        items = JSON.parse(items)
        
        
        const { name, price, quantity } = product
        if (quantity < 1) {
            return alert('Product is out of stock')
        }
        const id = product._id
        const image = product.images[0].filePath
        if (items[id]) {
            items[id].productQuantity += 1
        }else{
            const productQuantity = 1
            items[id] = {
                id : id,
                name : name,
                price : price,
                productQuantity : productQuantity,
                image : image
            }
        }
        dispatch({ type : 'update cart', payload : items })
        alert('Your Item has been added to the Cart')
    }

    async function addFavorites (id) {
        if (!token) {return alert('User must be signed in')}
        let firstRequest = await axios.post('https://eden-backend.onrender.com/shop/markFavorite', {id : id}, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})
        
        if (firstRequest?.message === 'Marked as favorite') {
            favButton.current.classList.replace('unmarked', 'marked')
            console.clear()
            return alert('Item added to favorites')
        }
        
        let secondRequest = await axios.post('https://eden-backend.onrender.com/shop/unmarkFavorite', {id : id}, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})

        if (secondRequest?.message === 'Unmarked as favorite') {
            favButton.current.classList.replace('marked', 'unmarked')
            console.clear()
            return alert('Item removed from favorites')
        }
        if (!firstRequest && !secondRequest) {
            localStorage.removeItem('token')
            return alert('User must be logged in')
        }
    }

    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className="product">
                    <div className='product-container'>
                        <div className="container-flex">
                            <img src={product.images[0].filePath} className='product-img' alt={`${product.name}`} />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p style={{opacity : '75%'}}>Product Code : <span>{product._id}</span></p>
                                <p style={{opacity : '75%'}}>Brand : <span>No brand specified</span></p>
                                <p className="out-of-stock">{product.quantity < 1 ? 'Out of Stock' : null}</p>
                                <h2 className="product-price">₦{internationalNumberFormat.format(product.price)}</h2>
                                <div className="fav-cart">
                                    <button onClick={(e)=>addToCart(product)} className="cart"><FontAwesomeIcon icon={faShoppingCart}/> Add to Cart</button>
                                    <button onClick={(e)=>addFavorites(product._id)} className={user?.role === 'user' && user?.favorites?.includes(product._id) ? 'marked' : 'unmarked'} ref={favButton} ><FontAwesomeIcon icon={faHeart}/></button>
                                </div>
                                <div className="share">
                                    <h4>Share this product:</h4>
                                    <div>
                                        <FontAwesomeIcon className="social" icon={faInstagram}/>
                                        <FontAwesomeIcon className="social" icon={faFacebook}/>
                                        <FontAwesomeIcon className="social" icon={faTwitter}/>
                                        <FontAwesomeIcon className="social" icon={faWhatsapp}/>
                                    </div>
                                </div>
                                <p className="report">Report incorrect product information</p>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <h4>Product Details</h4>
                        <div>
                            <span style={{fontWeight : 'bold'}}>About: &nbsp;</span>
                            {product.description !== "" ? product.description : 'No description available for this product'}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}