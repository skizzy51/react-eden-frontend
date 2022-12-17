import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/css/Admin-create-product.css'
import { AdminUserVerification } from '../functions/User-Verification'
import axios from 'axios'
import { LoadingSpinner } from '../components/Loading'


export function AdminCreateProduct () {
    const token = localStorage.getItem('token') || null
    AdminUserVerification()
    const [filestate, setFileState] = useState([])
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productTag, setProductTag] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const dropdownOptions = useRef()
    const form = useRef()
    const formData = new FormData()

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

    async function createProduct (e) {
        e.preventDefault()
        AdminUserVerification()

        if (productName.length < 1 || productPrice.length < 1 || filestate.length < 1) {
            return alert('A product should at least have a valid name, price and image(s)')
        }
        else if (isNaN(productPrice)) {
            return alert('Price must be valid number')
        }
        else if (filestate.length > 5) {
            return alert('Only a maximum of 5 images can be added to a product')
        }
        formData.append('name', productName)
        formData.append('price', productPrice)
        let tagsArray = productTag.split(',')
        tagsArray.forEach(tag=> {
            tag = tag.trim()
            formData.append('tags', tag)
        })
        formData.append('description', productDescription)
        for (const file of filestate) {
            formData.append('file', file)
        }

        let response = await axios.post('https://eden-backend.cyclic.app/shop/item', formData, {
            headers : { 'authorization' : `Bearer ${token}` }
        }).then(res => res.data).catch(err=>{return})

        if (response?.message === 'Successfully Created') {
            form.current?.reset()
            alert(`'${formData.get('name')}' has been added to the inventory`)
            window.location.reload()
            return
        }else{
            formData.delete('name')
            formData.delete('price')
            formData.delete('tags')
            formData.delete('description')
            formData.delete('file')
            return alert('Please upload a JPG/JPEG/PNG/SVG/JFIF file less than 5mb')
        }
    }

    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className='admin-create-product'>
                    <div className='create-head'>
                        <h2><u>CREATE PRODUCT</u></h2>
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
                    <div className='create-inputs'>
                        <form ref={form} encType='multipart/form-data'>
                            <div className='create-product-input'>
                                <h6>Enter Product Name : </h6>
                                <input type='text' onChange={(e)=>setProductName(e.target.value)} />
                            </div>
                            <div className='create-product-input'>
                                <h6>Enter Product Price(₦) : </h6>
                                <input type='number' onChange={(e)=>setProductPrice(e.target.value)} />
                            </div>
                            <div className='create-product-input'>
                                <div className='create-product-tags'>
                                    <h6>Enter Product Tag(s) : </h6>
                                    <p>Tags should be seperated by a comma ' , '</p>
                                </div>
                                <input type='text' onChange={(e)=>setProductTag(e.target.value)} />
                            </div>
                            <div className='create-product-input'>
                                <h6>Enter Product Description : </h6>
                                <input type='text' onChange={(e)=>setProductDescription(e.target.value)} />
                            </div>
                            <input onChange={(e)=>setFileState(e.target.files)} accept='.jpg, .jpeg, .png, .svg, .jfif' className='image-upload' multiple type='file' name='files'/>
                            <button type='button' onClick={(e)=>createProduct(e)} className='create-submit'>Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>
        
    )
}