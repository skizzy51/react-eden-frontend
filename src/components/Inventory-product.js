import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { AdminUserVerification } from "../functions/User-Verification"
import { useRef, useState } from "react"
import axios from "axios"

export function InventoryProduct (props) {
    const [inputQuantity, setInputQuantity] = useState(0)
    const inputBoxValue = useRef()
    const quantityTag = useRef()
    const token = localStorage.getItem('token') || null
    let internationalNumberFormat = new Intl.NumberFormat('en-US')

    async function updateQuanity () {
        AdminUserVerification()
        if (inputQuantity >= 0 && inputQuantity <= 100 && inputQuantity !== '' ) {
            let data = {
                id : props.item._id,
                quantity : Number(inputQuantity)
            }
            await axios.post('https://eden-backend.cyclic.app/shop/update/quantity', data, {
                headers : { 
                    'authorization' : `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(err => {return})
            inputBoxValue.current.value = ''
            quantityTag.current.innerText = inputQuantity
        }
        else if (inputQuantity > 100) {
            inputBoxValue.current.value = ''
            alert("A maximum of 100 products can be added to the inventory")
        }
        else if (inputQuantity < 0) {
            inputBoxValue.current.value = ''
            alert("Negative numbers not allowed")
        }
        else if (isNaN(inputQuantity)) {
            inputBoxValue.current.value = ''
            alert("Only numbers allowed")
        }
    }

    async function deleteProduct () {
        AdminUserVerification()
        let response = await axios.post('https://eden-backend.cyclic.app/shop/item/delete', {id : props.item._id}, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => res.data).catch(err => {return})
        if (!response) {
            alert('Server error')
            window.location.reload()
            return
        }
        alert(`${props.item.name} has been deleted from inventory`)
        window.location.reload()
    }

    return (
        <div className="inventory-product">
            <div className="inventory-img-name">
                <img src={props.item.images[0].filePath} alt={props.item.name} />
                <p>{props.item.name}</p>
            </div>
            <div className="inventory-quantity">
                <span ref={quantityTag}>{props.item.quantity}</span>
                <div className="inventory-quantity-control">
                    <input onChange={(e)=>setInputQuantity(e.target.value)} ref={inputBoxValue} type='number' min='0' max='100' />
                    <button onClick={updateQuanity}>Update</button>
                </div>
            </div>
            <div className="inventory-price">₦{internationalNumberFormat.format(props.item.price)}</div>
            <div className="inventory-action">
                <div className="inventory-delete" onClick={deleteProduct}>
                    <FontAwesomeIcon icon={faBan} />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}