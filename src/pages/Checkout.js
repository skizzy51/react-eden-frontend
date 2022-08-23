import { useContext, useEffect, useState } from 'react'
import { Valuables } from '../App'
import '../styles/css/Checkout.css'
import { UserVerification } from '../functions/User-Verification'
import { LoadingSpinner } from '../components/Loading'

export function Checkout () {
    const [loading, setLoading] = useState(false)
    const {cartState} = useContext(Valuables)
    let internationalNumberFormat = new Intl.NumberFormat('en-US')

    UserVerification()

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    const checkoutItems = cartState.cart.map(item => {
        let priceNumber = item.price.toString()
        priceNumber = priceNumber.replaceAll(',', '')
        priceNumber = Number(priceNumber)
        let productTotal = priceNumber * item.productQuantity
        return (
            <div className='checkout-product' key={item.id}>
                <div className='product-container'>
                    <img src={item.image} alt={item.name}/>
                    <div className='checkout-product-body'>
                        <div className='checkout-product-name'>{item.name}</div>
                        <div className='checkout-quantity-price'>
                            <p>Qty : {item.productQuantity}</p>
                            <p className='price'>Price : ₦{internationalNumberFormat.format(item.price)}</p>
                        </div>
                    </div>
                </div>
                <div className='product-total'>₦{internationalNumberFormat.format(productTotal)}</div>
            </div>
        )
    })

    function checkout () {
        window.location.assign('https://paystack.com/pay/obi-steve')
    }
    
    if (cartState.cart.length < 1) {
        return (
            <h1 style={{marginTop : '20vh'}}>No items in Cart</h1>
        )
    }else{
        return (
            <>
                {
                    loading
                    ? <LoadingSpinner/>
                    : <div className='checkout-page'>
                        <h1>Checkout</h1>
                        <div className='checkout-container'>
                            <div className='item-total'>
                                <div className='item'>ITEM</div>
                                <div className='total'>TOTAL</div>
                            </div>
                            <div className='checkout-item-container'>{checkoutItems}</div>
                            <div className='subtotal'>
                                <h2>Subtotal : <span className='price'>₦{internationalNumberFormat.format(cartState.totalPrice)}</span></h2>
                                <button onClick={checkout} className='checkout-btn'>Checkout</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}