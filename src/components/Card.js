import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Valuables } from "../App";
import axios from "axios";





export function Card (props) {
    const { dispatch, user } = useContext(Valuables)
    const token = localStorage.getItem('token')
    const favButton = useRef()

    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    function addToCart () {
        let items = localStorage.getItem('cart') || '{}'
        items = JSON.parse(items)
        
        
        const { name, price, quantity } = props.item
        if (quantity < 1) {
            return alert('Product is out of stock')
        }
        const id = props.item._id
        const image = props.item.images[0].filePath
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
        let firstRequest = await axios.post('https://eden-react-backend.herokuapp.com/shop/markFavorite', {id : id}, {
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
        
        let secondRequest = await axios.post('https://eden-react-backend.herokuapp.com/shop/unmarkFavorite', {id : id}, {
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
        <div className="product-card">
            <div className="fav-cart">
                <FontAwesomeIcon onClick={()=>addFavorites(props.item._id)} icon={faHeart} className={ user?.role === 'user' && user?.favorites?.includes(props.item._id) ? 'marked' : 'unmarked'} ref={favButton} />
                <FontAwesomeIcon onClick={addToCart} icon={faShoppingCart} className='unmarked' />
            </div>
            <Link to="/product" state={props.item}>
                <img alt={`pic of ${props.item.name}`} src={props.item.images[0].filePath} className="product-card-img" ></img>
            </Link>
            <Link to="/product" state={props}>
                <div className="product-card-body">
                    <p className="product-card-name">{props.item.name}</p>
                    <p className="product-card-price">₦{internationalNumberFormat.format(props.item.price)}</p>
                    <p style={{color : 'grey', opacity : '60%'}}>{props.item.quantity < 1 ? 'Out of stock' : null}</p>
                </div>
            </Link>
        </div>
    )
}