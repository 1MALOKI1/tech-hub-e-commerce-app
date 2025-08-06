import { createContext } from "react";
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lime } from '@mui/material/colors';


export const themeContext = createContext()

export default function MyThemeProvider({children}){
 const [isDark, setIsDark] = useState(localStorage.getItem('theme'));
  if(!isDark){
    setIsDark('dark')
    localStorage.setItem('theme', isDark)
  } 
  const theme = createTheme({
    ...(isDark === 'dark' ? {
     palette: {
      mode:'dark',
      primary:{
        main:'#a9e3e6ff',
        dark:'#86b5b8ff',
      },
      background:{
      container:'grey.900',
      button : 'linear-gradient(to right, rgb(40, 110, 0), rgb(14, 165, 0))',
      main:'#121212',
      },
    },
    } : {
      palette: {
      mode:'light',
      primary:{
        main:'#005f8bff',
        dark:'#86b5b8ff',
      },
      secondary: lime,
      background:{
      container:'grey.200',
      button : 'linear-gradient(to right, rgba(39, 40, 139, 1), rgba(7, 122, 199, 1))',
      main:'#f1f1f1ff',
      },
    },
    }),
  });

const setTheme = ()=> {
    setIsDark((prev) => prev === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', isDark === 'dark' ? 'light' : 'dark');
  }
    return(
    <ThemeProvider theme={theme}>
    <CssBaseline />
        <themeContext.Provider value={{setTheme, isDark}} >
            {children}
        </themeContext.Provider>
    </ThemeProvider>    
    )
}