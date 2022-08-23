import '../styles/css/Home.css'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'

export function HomeCarousel() {
    return (
        <Carousel className='Carousel-cont'>
            <Carousel.Item>
                <div className="images" style={{backgroundImage : 'url(images/jeshoots-com-7VOyZ0-iO0o-unsplash.jpg)'}} ></div>
                <Carousel.Caption>
                    <h3>Christmas Deals</h3>
                    <p>Get a 20% discount on winter clothes bought between now and Dec 24th!!!</p>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
                <div className="images" style={{backgroundImage : 'url(images/patrick-fore-hoxqcGUheeo-unsplash.jpg)'}} ></div>
                <Carousel.Caption>
                    <h3>ThanksGiving Deals</h3>
                    <p>Get a 10% discount on all kitchen utensils bought between now and friday!!!</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className="images" style={{backgroundImage : 'url(images/daniel-romero-73tFTwOrKPg-unsplash.jpg)'}} ></div>
                <Carousel.Caption>
                    <h3>Phones</h3>
                    <p>Get 10% off on all phones purchased promo code 'PHONE'. Only available to all Eden premium members</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}