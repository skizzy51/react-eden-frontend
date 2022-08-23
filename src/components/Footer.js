import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faFacebook, faYoutube, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import '../styles/css/App.css'

export function Footer () {
    if (window.location.pathname === '/checkout'
    || window.location.pathname === '/sign-in'
    || window.location.pathname === '/admin'
    || window.location.pathname === '/admin-inventory'
    || window.location.pathname === '/admin-create-product'
    || window.location.pathname === '/admin-add-product'
    || window.location.pathname === '/admin-create-split-category'
    || window.location.pathname === '/admin-create-category') {
        return null
    }
    return (
        <div className='footer'>
            <div className='head'>
                <img src="images/eden super white.png" alt="logo"></img>
                <div className='input-cont'>
                    <h6 style={{ margin : '.5rem 0' }}>Get Latest Deals</h6>
                    <p style={{ margin : '.5rem 0' }}>Our best promotions sent to your inbox</p>
                    <div className='input'>
                        <input type={'email'} placeholder="Enter e-mail address" />
                        <span>Subscribe</span>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='item'>
                    <h6>About Us</h6>
                    <a href="##">About Eden Supermarket</a>
                    <a href="##">Careers</a>
                    <a href="##">Forum</a>
                    <a href="##">Blog</a>
                </div>
                <div className='item'>
                    <h6>Help</h6>
                    <a href="##">Help Center</a>
                    <a href="##">How to shop on Eden Supermarket</a>
                    <a href="##">How to return a product on Eden</a>
                    <a href="##">Report a product</a>
                    <a href="##">Your Account</a>
                </div>
                <div className='item'>
                    <h6>More Info</h6>
                    <a href="##">Site Map</a>
                    <a href="##">Track my order</a>
                    <a href="##">Privacy Policy</a>
                    <a href="##">Authentic items Policy</a>
                </div>
                <div className='f-none item'>
                    <h6>Report a Product</h6>
                </div>
                <div className='f-none item'>
                    <h6>Terms & Conditions</h6>
                </div>
            </div><hr/>
            <div className='contact-cont'>
                <h5>Connect With Us</h5>
                <div>
                    <FontAwesomeIcon className='social' icon={faInstagram}/>
                    <FontAwesomeIcon className='social' icon={faFacebook}/>
                    <FontAwesomeIcon className='social' icon={faYoutube}/>
                    <FontAwesomeIcon className='social' icon={faTwitter}/>
                    <FontAwesomeIcon className='social' icon={faWhatsapp}/>
                </div>
            </div>
            <p className='copyright'>Copyright © 2022, Eden Supermarket. All rights reserved</p>
        </div>
    )
}