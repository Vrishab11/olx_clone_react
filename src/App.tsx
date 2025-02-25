import './App.css'
import Details from "./components/Details"
import Login from "./components/Login"
import Main from "./components/Main"
import SignUp from "./components/signup"
import { Route, Routes } from "react-router-dom"
import AuthRoute from "./components/authRoute"
import CreateP from "./components/create"
import ProductDetails from "./components/productDetail"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <AuthRoute> <Main/> </AuthRoute>  }/>
        <Route path="/details" element={ <Details/> }/>
        <Route path="/login" element={ <Login/> } />
        <Route path="/SignUp" element={ <SignUp/> } />
        <Route path="/sell" element={<CreateP/> }/>
        <Route path="/product/:id" element={ <ProductDetails/>}/>
      </Routes>
    </>
  )
}

export default App
