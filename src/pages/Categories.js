import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from '../components/Card'
import { LoadingSpinner } from '../components/Loading'
import '../styles/css/Categories.css'

export function Categories () {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const category = location.state

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])
    const itemRender = category.items.map(product => {
        return(
            <Card
                key={product._id}
                item={product}
            />
        )
    })
    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className='category'>
                    <h1>{category.name}</h1>
                    <div className='container'>
                        <div className='item-container'>
                            {itemRender}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}