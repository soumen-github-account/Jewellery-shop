import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashBoard from './pages/DashBoard';
import AddOrder from './pages/AddOrder';
import AllOrders from './pages/AllOrders';
import AllProduct from './pages/AllProduct';
import AddProduct from './pages/AddProduct';
import AddCategory from './pages/AddCategory';
import AddBanner from './pages/AddBanner';
import AddCustomer from './pages/AddCustomer';
import EditProduct from './pages/EditProduct';
import CustomerEdit from './pages/CustomerEdit';
import AllCustomers from './pages/AllCustomers';
import AllCategory from './pages/AllCategory';
import EditCategory from './pages/EditCategory';


const App = () => {
  // const {atoken} = useContext(AdminContext)
  return (
    <div className='bg-[#F8F9FD]'>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<DashBoard />} />
          <Route path='/add-order' element={<AddOrder />} />
          <Route path='/all-orders' element={<AllOrders />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/all-product' element={<AllProduct />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/edit-category/:id' element={<EditCategory />} />
          <Route path='/all-category' element={<AllCategory />} />
          <Route path='/add-banner' element={<AddBanner />} />
          <Route path='/add-customer' element={<AddCustomer />} />
          <Route path='/all-customer' element={<AllCustomers/>} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/customer/edit/:id" element={<CustomerEdit />} />
        </Routes>
      </div>
      <Toaster 
      toastOptions={{
        className: "",
        style:{
          fontSize:"13px",
        },
      }}
      />
    </div>
  )
}

export default App
