import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { HomeCarousel } from '../components/Carousel'
import { LoadingSpinner } from '../components/Loading'
import '../styles/css/Home.css'


export function Home () {
    const [normalProductTab, setNormalProductTab] = useState()
    const [splitProductTab, setSplitProductTab] = useState()
    const [normalCategoryTab, setNormalCategoryTab] = useState()
    const [splitCategoryTab, setSplitCategoryTab] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
        axios.get('https://eden-backend.onrender.com/shop/normal-product-tab')
        .then(res => setNormalProductTab(res.data.data)).catch(err => {return})

        axios.get('https://eden-backend.onrender.com/shop/split-product-tab')
        .then(res => setSplitProductTab(res.data.data)).catch(err => {return})

        axios.get('https://eden-backend.onrender.com/shop/normal-category-tab')
        .then(res => setNormalCategoryTab(res.data.data)).catch(err => {return})
        
        axios.get('https://eden-backend.onrender.com/shop/split-category-tab')
        .then(res => setSplitCategoryTab(res.data.data)).catch(err => {return})
        
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 3000)
    }, [])
    
    const normalProductRender = normalProductTab?.map(data => {
        const products = data.items.map(product => {
            return (
                <Card 
                    key={product._id}
                    item = {product}
                />
            )
        })
        return (
            <div key={data._id} className='normal-tab-container'>
                <h3 className='tab-head bor-top'>
                    {data.tabName}
                </h3>
                <div className='tab-item-container bor-bottom'>
                    <div className='product-tab'>
                        {products}
                    </div>
                </div>
            </div>
        )
    })
    const splitCategoryRender = splitCategoryTab?.map(data => {
        let categoryArray = []
        let imageArray = []
        data.categories.forEach(category=> {
            categoryArray.push(category)
        })
        data.images.forEach(image=>{
            imageArray.push(image)
        })
        return (
            <div key={data._id} className='split-category bor-top bor-bottom'>
                <h3>Shop By Categories</h3>
                <div className='category-section'>
                    <Link to='/categories' className='category' state={categoryArray[0]} style={{backgroundImage : `url(${imageArray[0].filePath})`}}>
                        <h4>{categoryArray[0].name}</h4>
                    </Link>
                    <Link to='/categories' className='category' state={categoryArray[1]} style={{backgroundImage : `url(${imageArray[1].filePath})`}}>
                        <h4>{categoryArray[1].name}</h4>
                    </Link>
                </div>
                <div className='category-section'>
                    <Link to='/categories' className='category' state={categoryArray[2]} style={{backgroundImage : `url(${imageArray[2].filePath})`}}>
                        <h4>{categoryArray[2].name}</h4>
                    </Link>
                    <Link to='/categories' className='category' state={categoryArray[3]} style={{backgroundImage : `url(${imageArray[3].filePath})`}}>
                        <h4>{categoryArray[3].name}</h4>
                    </Link>
                </div>
            </div>
        )
    })

    const splitProductRender = splitProductTab?.map(data => {
        const firstTabProducts = data.tab1.items.map(product => {
            return(
                <Card 
                    key={product._id}
                    item = {product}
                />
            )
        })
        const secondTabProducts = data.tab2.items.map(product => {
            return(
                <Card 
                    key={product._id}
                    item = {product}
                />
            )
        })
        return(
            <div key={data._id} className='split-product'>
                <div className='tab bor-top bor-bottom'>
                    <h5>{data.tab1.tabName}</h5>
                    <div className='item-cont'>
                        {firstTabProducts}
                    </div>
                </div>
                <div className='tab bor-top bor-bottom'>
                    <h5>{data.tab2.tabName}</h5>
                    <div className='item-cont'>
                        {secondTabProducts}
                    </div>
                </div>
            </div>
        )
    })

    const normalCategoryRender = normalCategoryTab?.map(data => {
        const products = data.category.items.map(product => {
            return (
                <Card 
                    key={product._id}
                    item = {product}
                />
            )
        })
        return(
            <div key={data._id} className='normal-tab-container'>
                <h3 className='tab-head bor-top'>
                    {data.category.name}
                </h3>
                <div className='tab-item-container bor-bottom'>
                    <div className='product-tab'>
                        {products}
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            {
                loading 
                ? <LoadingSpinner />
                : <><HomeCarousel/>
                {normalProductRender}
                {splitCategoryRender}
                {splitProductRender}
                {normalCategoryRender}
                </>
            }
        </>
    )
}