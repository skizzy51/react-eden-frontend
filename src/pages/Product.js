import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {faInstagram, faFacebook, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { useLocation } from 'react-router-dom'
import '../styles/css/Product.css'
import { useEffect, useState } from "react"
import { LoadingSpinner } from "../components/Loading"


export function Product () {
    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    const location = useLocation()
    const product = location.state
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1500)
    }, [])

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
                                    <button className="cart"><FontAwesomeIcon icon={faShoppingCart}/> Add to Cart</button>
                                    <button className="unmarked"><FontAwesomeIcon icon={faHeart}/></button>
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