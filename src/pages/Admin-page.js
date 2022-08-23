import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading'
import { AdminUserVerification } from '../functions/User-Verification'
import '../styles/css/Admin-page.css'


export function AdminPage () {
    AdminUserVerification()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    function logout () {
        localStorage.removeItem('token')
        window.location.assign('/')
    }
    
    return (
        <>
        {
            loading
            ? <LoadingSpinner/>
            : <>
                <div className='welcome-admin'>
                    <h1><u>Welcome Admin</u></h1>
                    <button onClick={logout} className='logout-show'>Log Out</button>
                </div>
                <div className='admin-dashboard'>
                    <h2>Choose your course of action</h2>
                    <div className='dashboard-actions'>
                        <Link to='/admin-create-product' className='action-body' style={{ backgroundImage : 'url(images/createProduct.png)' }}>
                            <h5>Create a Product</h5>
                        </Link>
                        <Link to='/admin-inventory' className='action-body' style={{ backgroundImage : 'url(images/inventory.png)' }}>
                            <h5>Inventory</h5>
                        </Link>
                        <Link to='/admin-create-category' className='action-body' style={{ backgroundImage : 'url(images/categories.png)' }}>
                            <h5>Create a Category</h5>
                        </Link>
                        <Link to='/admin-add-product' className='action-body' style={{ backgroundImage : 'url(images/addToOnlineStore.png)' }}>
                            <h5>Add to online store home page</h5>
                        </Link>
                    </div>
                    <button onClick={logout} className='logout-hide'>Log Out</button>
                </div>
            </>
        }
        </>
    )
}