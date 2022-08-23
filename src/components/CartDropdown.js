import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faPlus, faMinus} from "@fortawesome/free-solid-svg-icons"
import '../styles/css/App.css'
import { useContext } from "react";
import { Valuables } from "../App";

export function CartDropdown() {
    const { cartState, dispatch, user } = useContext(Valuables)
    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    
    function closeCart () {
        document.getElementById('cart-menu').style.display = 'none'
    }
    
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

    function goToCheckoutPage() {
        if (user?.role === 'user') {
            window.location.assign('/checkout')
        }
        else{
            return alert('User must be logged in')
        }
    }

    let cartItem = cartState.cart.map(item => {
        return (
            <div key={item.id} className="item">
                <div className="name-price">
                    <span className="name">{item.name}</span>
                    <p className="price">₦{internationalNumberFormat.format(item.price)}</p>
                </div>
                <div className="quantity-counter">
                    <div className="quantity">{item.productQuantity}</div>
                    <div className="quantity-control">
                        <FontAwesomeIcon onClick={()=>increaseCart(item.id)} className="action" icon={faPlus} />
                        <FontAwesomeIcon onClick={()=>decreaseCart(item.id)} className="action" icon={faMinus} />
                    </div>
                </div>
                <FontAwesomeIcon onClick={()=>deleteCart(item.id)} className="delete" icon={faTimes} />
            </div>
        )
    })

    if (window.location.pathname === '/checkout'
    || window.location.pathname === '/sign-in'
    || window.location.pathname === '/cart'
    || window.location.pathname === '/admin'
    || window.location.pathname === '/admin-inventory'
    || window.location.pathname === '/admin-create-product'
    || window.location.pathname === '/admin-add-product'
    || window.location.pathname === '/admin-create-split-category'
    || window.location.pathname === '/admin-create-category' ) return null

    return (
        <div style={{position : 'relative'}}>
            <div className="cart-menu" id="cart-menu">
                <div className="cart-menu-head">
                    <h5>Your Products</h5>
                    <FontAwesomeIcon onClick={closeCart} icon={faTimes} />
                </div><hr/>
                <div className="item-container">
                    {cartItem}
                </div>
                <div className="total">
                    <h4>TOTAL : </h4>
                    <h4 className="price">₦{internationalNumberFormat.format(cartState.totalPrice)}</h4>
                </div>
                <div className="cart-actions">
                    <button onClick={goToCheckoutPage} className="checkout">Checkout</button>
                    <button onClick={()=>window.location.assign('cart')} className="view-cart">View Cart</button>
                </div>
            </div>
        </div>
    )
}
