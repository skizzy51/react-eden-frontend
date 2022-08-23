import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faPlus, faAngleDown} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from "react";
import { Valuables } from "../App";
import '../styles/css/App.css'

export function SideNav(){
    const {categories, user} = useContext(Valuables)

    function closeNavbar(){
        document.getElementById("sidenav").style.transform ="translateX(-100%)"
        document.getElementById("body-2").style.opacity = "100%"
        document.getElementById("body-2").style.pointerEvents = "all"
    }
    
    function logout () {
        localStorage.removeItem('token')
        window.location.assign('/')
    }

    const categoriesData = categories.map(data => {
        return (
            <Link to="/categories" state={data} key={data._id} className="acc-button" onClick={closeNavbar}>{data.name}</Link>
        )
    })

    if (
        window.location.pathname === '/sign-in'
        || window.location.pathname === '/admin'
        || window.location.pathname === '/admin-inventory'
        || window.location.pathname === '/admin-create-product'
        || window.location.pathname === '/admin-add-product'
        || window.location.pathname === '/admin-create-category'
        || window.location.pathname === '/admin-create-split-category'
    ) return null

    return (
        <div id="sidenav" className="sidenav">
            <div className="sidenav-top">
                <img src="images/eden super white.png" alt="logo"></img>
                <FontAwesomeIcon onClick={closeNavbar} className="closeIcon" icon={faTimes} />
            </div><hr/>
            <div style={{textAlign : 'center'}}>
                {
                    user?.role === 'user'
                    ? <>
                        <div className="sidenav-signUp">
                            <h2>Welcome {user.username}</h2>
                        </div><hr/>
                    </>
                    : <>
                        <div className="sidenav-signUp">
                            <h5>Sign in to get the best out of your account</h5>
                            <a href="/sign-in">Sign in</a>
                        </div><hr/>
                    </>
                }
                <div style={{textAlign : 'left'}}>
                    <div className="sidenav-button">Deals</div>
                    <Accordion>
                        <Accordion.Item eventKey="0" style={{backgroundColor : 'transparent', border : 'none'}}>
                            <Accordion.Header className="accordion-modified">
                                <div>Categories</div> 
                                <FontAwesomeIcon icon={faPlus}/>
                                <FontAwesomeIcon icon={faAngleDown} className="f-none"/>
                            </Accordion.Header>
                            <Accordion.Body className="body">
                                {categoriesData}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="sidenav-button">Coupons</div>
                </div>
            </div>
            {
                user?.role === 'user'
                ? <button onClick={logout} className="logout">Log out</button>
                : null
            }
        </div>
    )
}