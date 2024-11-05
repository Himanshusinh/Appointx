import React from 'react'
import HomeScreen from './Screens/home/main/HomeScreen'
import RegisterMain from './Screens/registerVendor/RegisterMain'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Select from './Screens/Selectction/Select'
import ClientRegister from './Screens/clientlogin/ClientRegister'
import Clientsignin from './Screens/clientlogin/Clientsignin'
import Vendorsignup from './Screens/vendorlogin/Vendorsignup'
import Vendorsignin from './Screens/vendorlogin/Vendorsignin'
import ProfileVendor from './Screens/profiles/vendorprofile/ProfileVendor'

function App() {
  return (
    <div className='bg-[#FAFBFC]'>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomeScreen />}> </Route>
      <Route path='/home' element={<HomeScreen />}> </Route>
      <Route path='/vendorRegister/:uid' element={<RegisterMain />}></Route>
      <Route path='/select' element={<Select />}></Route>
      <Route path='/clientsignup' element={<ClientRegister />}></Route>
      <Route path='/clientsignin' element={<Clientsignin />}></Route>
      <Route path='/vendorsignup' element={<Vendorsignup />}></Route>
      <Route path='/vendorsignin' element={<Vendorsignin />}></Route>
      <Route path='/profilevendor' element={<ProfileVendor />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
   
  )
}

export default App
