import { useContext, useEffect, useRef, useState } from 'react'
import { Valuables } from '../App'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { InventoryProduct } from '../components/Inventory-product'
import '../styles/css/Admin-inventory.css'
import { AdminUserVerification } from '../functions/User-Verification'
import { LoadingSpinner } from '../components/Loading'


export function AdminInventory () {
    AdminUserVerification()
    const dropdownOptions = useRef()
    const {products} = useContext(Valuables)
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    function dropdown () {
        if (dropdownOptions.current.classList.contains('dropdown-options-close')) {
            dropdownOptions.current.classList.replace('dropdown-options-close', 'dropdown-options-open')
        }
        else if(dropdownOptions.current.classList.contains('dropdown-options-open')) {
            dropdownOptions.current.classList.replace('dropdown-options-open', 'dropdown-options-close')
        }
    }
    function logout () {
        localStorage.removeItem('token')
        window.location.assign('/')
    }

    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className='admin-inventory'>
                    <div className='admin-head'>
                        <h2><u>INVENTORY</u></h2>
                        <input onChange={(e)=>setSearchValue(e.target.value)} className='admin-inventory-search' placeholder='Search products in inventory' />
                        <div className='admin-dropdown'>
                            <div className='dropdown-head' onClick={dropdown}>
                                <div>Menu</div>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            <div className='dropdown-options-close' ref={dropdownOptions}>
                                <Link to='/admin-create-product'><div>Create product</div></Link>
                                <Link to='/admin-inventory'><div>Inventory Control</div></Link>
                                <Link to='/admin-add-product'><div>Add product to online store</div></Link>
                                <Link to='/admin-create-category'><div>Create Category</div></Link>
                                <div onClick={logout}>Log out</div>
                            </div>
                        </div>
                    </div>

                    <div className='admin-inventory-body'>
                        <div className='admin-inventory-head'>
                            <div className='admin-inventory-item'>
                                <h4>ITEM</h4>
                            </div>
                            <div className='admin-inventory-quantity'>
                                <h4>QUANTITY</h4>
                            </div>
                            <div className='admin-inventory-price'>
                                <h4>PRICE</h4>
                            </div>
                            <div className='admin-inventory-action'></div>
                        </div>
                        <div className='admin-inventory-products'>
                            {
                                searchValue.length < 1
                                ? products.map(item => {
                                    return (
                                        <InventoryProduct key={item._id} item={item} />
                                    )
                                })
                                : products.map(item => {
                                    return (
                                        item.name.toLowerCase().includes(searchValue.toLowerCase()) ?
                                        <InventoryProduct key={item._id} item={item} /> :
                                        null
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}