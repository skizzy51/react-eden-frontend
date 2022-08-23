import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Valuables } from "../App"
import { Card } from "../components/Card"
import { LoadingSpinner } from "../components/Loading"
import '../styles/css/Search-results.css'

export function SearchPage () {
    const location = useLocation()
    const searchResult = location.state
    const { products } = useContext(Valuables)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1500)
    }, [])
    
    const resultList = products.map(item => {
        let tags = ''
        item.tags.forEach(tag => tags += tag)
        
        if (item.name.toLowerCase().includes(searchResult.toLowerCase())) {
            return (
                <Card key={item._id} item={item} />
            )
        }
        else if (tags.toLowerCase().includes(searchResult.toLowerCase())) {
            return (
                <Card key={item._id} item={item} />
            )
        }
    })


    return (
        <>
            {
                loading
                ? <LoadingSpinner/>
                : <div className="result-list-cont">
                    <h3>Products that match keyword : <span>{searchResult}</span></h3>
                    <div className="result-list">
                        {resultList}
                    </div>
                </div>
            }
        </>
        
    )
}