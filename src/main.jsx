import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx'
import ProductsDetails from './components/ProductsDetails.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<App/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/products' element={<Products/>}/>
  <Route path='/cart' element={<Cart/>}/>

  <Route path='/products/:id' element={<ProductsDetails/>} />

 </Routes>
 </BrowserRouter>
)
