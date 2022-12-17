import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react"
import { Valuables } from "../App"
import '../styles/css/Cart.css'
import { UserVerification } from "../functions/User-Verification";
import axios from "axios";
import { LoadingSpinner } from "../components/Loading";

export function Cart () {
    const { cartState, dispatch, user } = useContext(Valuables)
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')
    let internationalNumberFormat = new Intl.NumberFormat('en-US')

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    function increaseCart (id) {
        let items = localStorage.getItem('cart') || '{}'
        items = JSON.parse(items)
        if (items[id].productQuantity >= 50) return
        items[id].productQuantity += 1
        dispatch({ type : 'update cart', payload : items })
    }
    
    function decreaseCart (id) {
        let items = localStorage.getItem('cart') || '{}'
        items = JSON.parse(items)
        if (items[id].productQuantity <= 1) return
        items[id].productQuantity -= 1
        dispatch({ type : 'update cart', payload : items })
    }

    function deleteCart (id) {
        let items = localStorage.getItem('cart') || '{}'
        items = JSON.parse(items)
        delete items[id]
        dispatch({ type : 'update cart', payload : items })
    }

    async function addFavorites (id) {
        if (!user) { return alert('User must be logged in') }
        UserVerification()
        let markfav = await axios.post('https://eden-backend.onrender.com/shop/markFavorite', {id : id}, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})
        
        if (markfav?.message === 'Marked as favorite') {
            window.location.reload()
            return alert('Item added to favorites')
        }else{
            return alert('Server error')
        }
    }

    async function removeFavorites (id) {
        UserVerification()
        let unmarkFav = await axios.post('https://eden-backend.onrender.com/shop/unmarkFavorite', {id : id}, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})

        if (unmarkFav?.message === 'Unmarked as favorite') {
            window.location.reload()
            return alert('Item removed from favorites')
        }else{
            return alert('Server error')
        }
    }
    
    let cartItems = cartState.cart.map(item => {
        return (
            <div key={item.id} className="items-container">
                <div className="item">
                    <img src={item.image} alt={item.name}/>
                    <div className="item-text">
                        <h5>{item.name}</h5>
                        <div className="actions">
                            {
                                user?.role === 'user' && user?.favorites.includes(item.id)
                                ? <div onClick={()=>removeFavorites(item.id)} className="marked first">
                                    <FontAwesomeIcon icon={faHeart} /><span>Remove from Favorites</span>
                                </div>
                                : <div onClick={()=>addFavorites(item.id)} className="unmarked first">
                                    <FontAwesomeIcon icon={faHeart} /><span>Add to Favorites</span>
                                </div>
                            }
                            
                            <div className="unmarked">
                                <FontAwesomeIcon onClick={()=>deleteCart(item.id)} icon={faTrashAlt} /><span>Remove</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="price-quantity">
                    <div className="quantity-counter">
                        <div className="quantity">{item.productQuantity}</div>
                        <div className="quantity-control">
                            <FontAwesomeIcon onClick={()=>increaseCart(item.id)} className="action" icon={faPlus} />
                            <FontAwesomeIcon onClick={()=>decreaseCart(item.id)} className="action" icon={faMinus} />
                        </div>
                    </div>

                    <p className="price">₦{internationalNumberFormat.format(item.price)}</p>
                </div>
            </div>
        )
    })

    return (
        <>
        {
            loading
            ? <LoadingSpinner/>
            : <>
                <div className="cart-page">
                    <h3 className="head"><u>Cart</u></h3>
                    <div className="cart-container">
                        {cartItems}
                    </div><hr className="d-none"/>
                    <div className="total-cont">
                        <h4>TOTAL :&nbsp;</h4>
                        <h4 className="total-price"> ₦{internationalNumberFormat.format(cartState.totalPrice)}</h4>
                    </div>
                </div>
                <div onClick={()=>{
                    if (user) {window.location.assign('/checkout')}
                    else{return alert('User must be logged in')}
                }} className="cart-checkout">Go to Checkout</div>
            </>
        }
        </>
    )
}