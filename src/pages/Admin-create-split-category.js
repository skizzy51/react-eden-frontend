import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { AdminUserVerification } from "../functions/User-Verification"
import { useContext, useEffect, useRef, useState } from "react"
import { Link } from 'react-router-dom'
import { Valuables } from "../App"
import '../styles/css/Admin-add-product.css'
import { LoadingSpinner } from '../components/Loading'

export function CreateSplitCategoryTab () {
    AdminUserVerification()
    const token = localStorage.getItem('token') || null
    const formData  = new FormData()
    const dropdownOptions = useRef()
    const selectTag1 = useRef()
    const selectTag2 = useRef()
    const selectTag3 = useRef()
    const selectTag4 = useRef()
    const [ file1, setFile1] = useState([])
    const [ file2, setFile2] = useState([])
    const [ file3, setFile3] = useState([])
    const [ file4, setFile4] = useState([])
    const [loading, setLoading] = useState(false)
    const { categories } = useContext(Valuables)

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

    function back () {
        window.location.assign('/admin-add-product')
    }

    const categorySelect = categories?.map(category => {
        return (
            <option key={category._id} id={category._id} value={category.name.toLowerCase()}>{category.name}</option>
        )
    })
    
    async function addSplitCategoryTab (e) {
        e.preventDefault()
        AdminUserVerification()
        if (file1.length < 1 || file2.length < 1 || file3.length < 1 || file4.length < 1 ) {
            return alert('All categories must have an image file selected')
        }
        else if (selectTag1.current.value.length < 1 || selectTag2.current.value.length < 1 || selectTag3.current.value.length < 1 || selectTag4.current.value.length < 1) {
            return alert('Category must be selected')
        }

        for (let i = 0; i < selectTag1.current.childNodes.length; i++) {
            if (selectTag1.current.childNodes[i].selected) {
                selectTag1.current.id = selectTag1.current.childNodes[i].id
            }
        }
        for (let i = 0; i < selectTag2.current.childNodes.length; i++) {
            if (selectTag2.current.childNodes[i].selected) {
                selectTag2.current.id = selectTag2.current.childNodes[i].id
            }
        }
        for (let i = 0; i < selectTag3.current.childNodes.length; i++) {
            if (selectTag3.current.childNodes[i].selected) {
                selectTag3.current.id = selectTag3.current.childNodes[i].id
            }
        }
        for (let i = 0; i < selectTag4.current.childNodes.length; i++) {
            if (selectTag4.current.childNodes[i].selected) {
                selectTag4.current.id = selectTag4.current.childNodes[i].id
            }
        }
        if (
            selectTag1.current.id === selectTag2.current.id ||
            selectTag1.current.id === selectTag3.current.id ||
            selectTag1.current.id === selectTag4.current.id ||
            selectTag2.current.id === selectTag3.current.id ||
            selectTag2.current.id === selectTag4.current.id ||
            selectTag3.current.id === selectTag4.current.id
        ) {
            return alert('Four different categories must be selected')
        }
        let IdList = [selectTag1.current.id, selectTag2.current.id, selectTag3.current.id, selectTag4.current.id]
        let filesArray = [file1[0], file2[0], file3[0], file4[0]]
        IdList.forEach(id => formData.append('categories', id))
        filesArray.forEach(image => formData.append('file', image))
        
        let response = await fetch('https://eden-backend.onrender.com/shop/split-category-tab',{
            method : 'post',
            headers : {
                'authorization' : `Bearer ${token}`
            },
            body : formData
        }).then(res=>res.json()).catch(err=>{return})
        
        if (!response) {
            alert('Please upload a JPG/JPEG/PNG/SVG/JFIF file less than 10mb')
            window.location.reload()
            return
        }
        if (response === 'You cannot add more split category tabs') {
            alert('You cannot add more split category tabs')
            window.location.assign('/admin-add-product')
            return
        }
        alert('Tabs have successfully been added to online store')
        window.location.assign('/admin-add-product')
    }
    
    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className="admin-add-online">
                    <div className='add-online-head'>
                        <h2><u>ADD PRODUCTS TO ONLINE STORE</u></h2>
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

                    <div encType='multipart/form-data' className='add-split-category' id='tab4'>
                        <div className='section-container'>
                            <div className='category-cont'>
                                <label>Select Category</label>
                                <select ref={selectTag1}>{categorySelect}</select>
                            </div>
                            <input onChange={(e)=>setFile1(e.target.files)} accept='.jpg, .jpeg, .png, .svg, .jfif' type='file'/>
                        </div>
                        <div className='section-container'>
                            <div className='category-cont'>
                                <label>Select Category</label>
                                <select ref={selectTag2}>{categorySelect}</select>
                            </div>
                            <input onChange={(e)=>setFile2(e.target.files)} accept='.jpg, .jpeg, .png, .svg, .jfif' type='file'/>
                        </div>
                        <div className='section-container'>
                            <div className='category-cont'>
                                <label>Select Category</label>
                                <select ref={selectTag3}>{categorySelect}</select>
                            </div>
                            <input onChange={(e)=>setFile3(e.target.files)} accept='.jpg, .jpeg, .png, .svg, .jfif' type='file'/>
                        </div>
                        <div className='section-container'>
                            <div className='category-cont'>
                                <label>Select Category</label>
                                <select ref={selectTag4}>{categorySelect}</select>
                            </div>
                            <input onChange={(e)=>setFile4(e.target.files)} accept='.jpg, .jpeg, .png, .svg, .jfif' type='file'/>
                        </div>
                        <div className='back-done'>
                            <div onClick={back} className='confirm-btn'>{'<<'} Back</div>
                            <button type='button' onClick={(e)=> addSplitCategoryTab(e)} className='confirm-btn'>Done</button>
                        </div>
                    </div>
                </div>
            }
        </>
        
    )
}