<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Products from './components/Products';
import Users from './components/Users';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ProductDetails from './components/ProductDetails';

const AppContent = () => {
const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#1976D2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EC407A',
    },
    background: {
      default: darkMode ? '#121212' : '#F3F6F9',
      paper: darkMode ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: darkMode ? '#ffffff' : '#1A2027',
      secondary: darkMode ? '#cccccc' : '#4F5B62',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#1976D2',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#115293',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkMode ? '#1e1e1e' : '#1976D2',
          color: '#ffffff',
        },
      },
    },
  },
});

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <ProtectedRoute>
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/users" element={<Users />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/login" element={<Navigate to="/products" replace />} />
            </Routes>
          </ProtectedRoute>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
>>>>>>> f8c069907909bdc60946216f566910039d8231b7
}

export default App