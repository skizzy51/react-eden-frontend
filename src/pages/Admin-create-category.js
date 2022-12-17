import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/css/Admin-create-category.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Valuables } from '../App'
import { AdminUserVerification } from '../functions/User-Verification'
import axios from 'axios'
import { LoadingSpinner } from '../components/Loading'

export function AdminCreateCategory () {
    AdminUserVerification()
    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    const token = localStorage.getItem('token') || null
    const dropdownOptions = useRef()
    const [categoryName, setCategoryName] = useState('')
    const { products } = useContext(Valuables)
    const [selectedArray, setSelectedArray] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1500)
    }, [])
    
    function logout () {
        localStorage.removeItem('token')
        window.location.assign('/')
    }
    
    function dropdown () {
        if (dropdownOptions.current.classList.contains('dropdown-options-close')) {
            dropdownOptions.current.classList.replace('dropdown-options-close', 'dropdown-options-open')
        }
        else if(dropdownOptions.current.classList.contains('dropdown-options-open')) {
            dropdownOptions.current.classList.replace('dropdown-options-open', 'dropdown-options-close')
        }
    }

    function selectItem (e, item) {
        if (e.target.checked === true) {
            setSelectedArray(prevArray => [...prevArray, {id : item._id, name : item.name}])
        }
        else if (e.target.checked === false) {
            selectedArray.forEach(element => {
                if (element.id === item._id) {
                    let filteredArray = selectedArray.filter(function(value){
                        return value !== element
                    })
                    setSelectedArray(filteredArray)
                }
            })
        }
    }

    const selectedItems = selectedArray.map(item => {
        return (
            <li key={item.id} id={item.id}>{item.name}</li>
        )
    })

    async function createCategory () {
        AdminUserVerification()
        if (categoryName.length < 1) {
            return alert('A category name must be added')
        }
        else if (selectedArray.length < 1) {
            return alert('A product must be selected')
        }
        let itemsArray = []
        selectedArray.forEach(item => {
            itemsArray.push(item.id)
        })
        const data = {
            name : categoryName,
            items : itemsArray
        }
        let response = await axios.post('https://eden-backend.cyclic.app/shop/category', data, {
            headers : {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then(res=>res.data).catch(err=>{return})
        if (!response) {
            alert('Server error')
            window.location.reload()
            return
        }
        alert(`The '${categoryName}' category has been created `)
        window.location.reload()
    }

    return (
        <>
            {
                loading 
                ? <LoadingSpinner/>
                : <div className='admin-category'>
                    <div className='create-head'>
                        <h2><u>CREATE PRODUCT CATEGORIES</u></h2>
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
                    <div className='admin-create-category'>
                        <div className='category-name'>
                            <h4>Enter Category Name : </h4>
                            <input type='text' onChange={(e)=>setCategoryName(e.target.value)} />
                        </div>
                        <div className='category-products'>
                            
                            <div className='product-cont'>
                                {
                                    products?.map(item => {
                                        return (
                                            <div key={item._id} id={item._id} className='category-product'>
                                                <img src={item.images[0].filePath} alt={item.name} />
                                                <p>{item.name}</p>
                                                <span>₦{internationalNumberFormat.format(item.price)}</span>
                                                <input type='checkbox' defaultChecked={selectedArray.includes({id : item._id, name : item.name}) ? true : false} onClick={(e)=>{selectItem(e, item)}} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <ol className='selected-cont'>
                                {selectedItems}
                            </ol>
                        </div>
                        <button onClick={createCategory}>Submit</button>
                    </div>
                </div>
            }
        </>
    )
}