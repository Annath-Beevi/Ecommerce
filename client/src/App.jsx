import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage, SignUpPage, ActivationPage, HomePage, BestSellingPage, EventPage, FAQPage, ProductsDetailsPage, ProductsPage } from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/user'

function App() {

  const { loading } = useSelector((state) => state.user)

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/activation/:activation_token' element={<ActivationPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/products/:name" element={<ProductsDetailsPage />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
        </BrowserRouter>
      )}
    </>
  )
}

export default App
