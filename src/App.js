import { createContext, useEffect, useReducer, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { SideNav } from './components/Sidenav'
import { CartDropdown } from './components/CartDropdown'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'
import { Categories } from './pages/Categories'
import { Checkout } from './pages/Checkout'
import { SearchPage } from './pages/Search-results'
import { SignInPage } from './pages/Sign-in'
import { AdminPage } from './pages/Admin-page'
import { AdminInventory } from './pages/Admin-inventory'
import { AdminCreateProduct } from './pages/Admin-create-product'
import { AdminAddProduct } from './pages/Admin-add-product'
import { AdminCreateCategory } from './pages/Admin-create-category'
import { Favorites } from './pages/Favorites'
import { AccountPage } from './pages/Account-page'
import axios from "axios";
import { NotFound } from './pages/Not-found'
import { CreateSplitCategoryTab } from './pages/Admin-create-split-category'

export const Valuables = createContext()

function cartLocalStorage () {
  const cartData = localStorage.getItem('cart') || null
  if (cartData == null) return []

  const parseCart = JSON.parse(cartData)
  let data = []
  for (const key in parseCart) {
      data.push(parseCart[key])
  }
  return data
}

function cartNumber () {
  let cartData = localStorage.getItem('cart') || null
  if (cartData) {
    return Object.keys(JSON.parse(cartData)).length
  }else{
    return 0
  }
}

function cartTotal () {
  const cartData = localStorage.getItem('cart') || null
  if (cartData == null) return 0

  let total = 0
  const parseCart = JSON.parse(cartData)
  for (const key in parseCart) {
    let price = parseCart[key].price
    price = price.toString()
    price = price.replace(',','')
    price = Number(price)
    total += price * parseCart[key].productQuantity
  }
  return total
}

function reducer (state, action) {
  switch (action.type) {
    case 'update cart':
      localStorage.setItem('cart', JSON.stringify(action.payload))
      return {
        cart : cartLocalStorage(),
        cartNumber : cartNumber(),
        totalPrice : cartTotal()
      }
    default:
      return state
  }
}

function App() {
  const token = localStorage.getItem('token') || null
  const [cartState, dispatch] = useReducer(reducer, { 
    cart : cartLocalStorage(),
    cartNumber : cartNumber(),
    totalPrice : cartTotal()
  })
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState()


  useEffect(()=>{
    axios.get('https://eden-react-backend.herokuapp.com/shop/item')
    .then(res =>{setProducts(res.data.data)}).catch(err => {return})

    axios.get('https://eden-react-backend.herokuapp.com/shop/category')
    .then(res =>{setCategories(res.data.data)}).catch(err => {return})

  }, [])
  
  useEffect(()=>{
    axios.get('https://eden-react-backend.herokuapp.com/shop/getUser', {
        headers : { 'authorization' : `Bearer ${token}` }
    }).then(res => {setUser(prev => res.data.user)}).catch(err => {return})
  }, [token])
  
  return (
    <Valuables.Provider value={{products, cartState, dispatch, categories, user}}>
      <SideNav/>
      <div id='body-2'>
        <Navbar/>
        <CartDropdown/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product' element={<Product/>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/search-results' element={<SearchPage/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/favorites' element={<Favorites/>} />
          <Route path='/account' element={<AccountPage/>} />
          <Route path='/sign-in' element={<SignInPage/>} />
          <Route path='/admin' element={<AdminPage/>} />
          <Route path='/admin-inventory' element={<AdminInventory/>} />
          <Route path='/admin-create-product' element={<AdminCreateProduct/>} />
          <Route path='/admin-add-product' element={<AdminAddProduct/>} />
          <Route path='/admin-create-split-category' element={<CreateSplitCategoryTab/>} />
          <Route path='/admin-create-category' element={<AdminCreateCategory/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <Footer/>
      </div>
    </Valuables.Provider>
  )
}

export default App;
