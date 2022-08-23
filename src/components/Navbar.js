import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react";
import { Valuables } from "../App";
import { Link, useNavigate } from "react-router-dom";
import "../styles/css/App.css"

export function Navbar () {
    const [searchData, setData] = useState([])
    const { products, cartState, user } = useContext(Valuables)
    const navigate = useNavigate()
    
    let searchBar = document.getElementById('search-bar')

    function openCart(){
        document.getElementById("cart-menu").style.display = "block"
        document.getElementById("cart-menu").style.zIndex="11"
    }
    function openNavbar(){
        document.getElementById("sidenav").style.transform = "translateX(0%)"
        document.getElementById("body-2").style.opacity = "55%"
        document.getElementById("body-2").style.pointerEvents = "none"
    }

    function goToAccountPage() {
        if (user?.role === 'user') {
            window.location.assign('/account')
        }
        else{
            return alert('User must be logged in')
        }
    }

    document.getElementById('root').addEventListener('click', (e)=> {
        if (e.target.id === "search-bar") {
            return
        }
        else if (e.target.parentElement.id === "search-result") {
            e.target.click()
        }
        else{
            if (
                window.location.pathname === '/checkout'
                || window.location.pathname === '/sign-in'
                || window.location.pathname === '/favorites'
                || window.location.pathname === '/account'
                || window.location.pathname === '/admin'
                || window.location.pathname === '/admin-inventory'
                || window.location.pathname === '/admin-create-product'
                || window.location.pathname === '/admin-add-product'
                || window.location.pathname === '/admin-create-category'
                || window.location.pathname === '/admin-create-split-category'
            ) return
            document.getElementById('search-result').style.display = 'none'
        }
    })
    
    function searchRender (e) {
        let results = []
        let keyword = e.target.value
        products.forEach(element => {
            if (keyword.length < 1) {
                setData('')
            }
            else if(element.name.toLowerCase().includes(keyword.toLowerCase())) {
                results.push(element)
                document.getElementById('search-result').style.display = 'flex'
            }
        })
        setData(results)
    }
    function search () {
        const searchParameter = searchBar.value
        if (searchParameter.length > 2) navigate(`/search-results`, { state : searchParameter })
        setData('')
    }

    const searchResults = searchData.length > 0 ? searchData.map(result => {
        return (
            <Link
                to='/product'
                key={result._id}
                id={result._id}
                className="result-item"
                state={result}
                onClick={()=> document.getElementById('search-result').style.display = 'none'}
            >{result.name}</Link>
        )
    }):null


    if (
        window.location.pathname === '/checkout'
        || window.location.pathname === '/account'
        || window.location.pathname === '/favorites'
    ) {
        return (
            <div className="search-cont">
                <div className="logo">
                    <FontAwesomeIcon onClick={openNavbar} className="open-nav" icon={faBars}/>
                    <a href="/">
                        <img src="images/eden supermarket logo.png" alt="logo"></img>
                    </a>
                </div>
                <div className="account-cart">
                    <div className="account" onClick={goToAccountPage}>
                        <FontAwesomeIcon style={{ marginRight : '.5rem'}} icon={faUser} />
                        <span>ACCOUNT</span>
                    </div>
                </div>
            </div>
        )
    }
    else if ( window.location.pathname === '/sign-in') {
        return (
            <div className="eden">
                <a href="/">
                    <img src="images/eden supermarket logo.png" alt="logo"></img>
                </a>
            </div>
        )
    }
    else if (
        window.location.pathname === '/admin'
        || window.location.pathname === '/admin-inventory'
        || window.location.pathname === '/admin-create-product'
        || window.location.pathname === '/admin-add-product'
        || window.location.pathname === '/admin-create-category'
        || window.location.pathname === '/admin-create-split-category'
    ) {
        return (
            <div className="eden">
                <a href="/admin">
                    <img src="images/eden supermarket logo.png" alt="logo"></img>
                </a>
            </div>
        )
    }

    return (
        <div style={{ position : 'relative'}}>
            <div style={{ position : 'fixed', top : 0, width : '100%', zIndex : '12' }}>
                <div className="search-cont">
                    <div className="logo">
                        <FontAwesomeIcon onClick={openNavbar} className="open-nav" icon={faBars}/>
                        <a href="/">
                            <img src="images/eden supermarket logo.png" alt="logo"></img>
                        </a>
                    </div>
                    <div className="search-bar">
                        <input 
                            type="text"
                            placeholder="Search products, brands and categories"
                            id="search-bar"
                            className="s-bar"
                            onInput={searchRender}
                            onKeyPress={(e)=>{
                                if (e.key === "Enter") search()
                            }}
                        />
                        <span className="search" onClick={search}>SEARCH</span>
                    </div>
                    <div className="account-cart">
                        <div onClick={goToAccountPage} className="account" style={
                            window.location.pathname === '/cart' && window.screen.width <= 768
                            ? { fontSize : '.9rem', marginTop : '.5rem' }
                            : {}
                        }>
                            <FontAwesomeIcon style={{ marginRight : '.5rem'}} icon={faUser} />
                            <span>ACCOUNT</span>
                        </div>
                        {window.location.pathname !== '/cart' ?
                        <div id="cart" className="cart" onClick={openCart}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span>CART<span className="cart-counter" id="cart-counter">{cartState.cartNumber}</span></span>
                        </div> : null}
                    </div>
                </div>
                {/* search body */}
                <div className="search-result" id="search-result">
                    {searchResults}
                </div>
            </div>
        </div>
    )
    
}