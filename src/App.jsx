import { useState } from "react"
import MyThemeProvider from "./context/themeContext"
import AuthProvider from "./context/AuthContext"
import { BrowserRouter, Routes, Route } from "react-router"
import Products from "./component/Products"
import PublicRoute from "./component/PublicRoute"
import ProtectedRoute from "./component/ProtectedRoute"
import Login from "./component/Login"
import Layout from "./layout"
function App() {

  return (
    <MyThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={
                <PublicRoute>
                  <Login/>
                </PublicRoute>
              } />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/products" index element={
                      <Products></Products>
                    } />
                  </Routes>
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </MyThemeProvider>

  )
}

export default App
