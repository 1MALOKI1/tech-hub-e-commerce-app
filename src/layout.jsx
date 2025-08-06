import {Box, AppBar, Toolbar, Stack, Typography, Button, Avatar, Menu, MenuItem, Breadcrumbs, Link} from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useContext, useState, UseEffect } from 'react';
import { themeContext } from './context/themeContext';
import MaterialUISwitch from './styles/muiSwitch';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './context/AuthContext';
import TechLogo from './assets/techHub.png';


export default function Layout({children}) {
  const {setTheme, isDark}= useContext(themeContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, logout, user } = useAuth()
  const open = Boolean(anchorEl);
  const isAdmin = user?.role === "SUPER_ADMIN"

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <AppBar position="fixed" sx={{display:{md:'block', sm:'none', xs:'none', xxs:'none'}}}  >
          <Toolbar >
            <Box sx={{flexGrow:1 ,height:'50px', minWidth:'100px', overflow:'hidden',mr: 2, display:'flex', alignItems:'center'}} >
              <Box component="img" sx={{  height: 200 }} alt="Tech Hub Logo" src={TechLogo} />
            {isAuthenticated && (
              <Avatar sx={{ bgcolor: '#ff9633ff' }}>{user?.name[0]}</Avatar>
            )}
            </Box>
            {isAuthenticated && (
            <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1, color: 'inherit' }}>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/products"
              >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Products
              </Link>
              <Button variant='secondary' onClick={logout} >
                Logout
              </Button>
              {isAdmin && (
                <Typography variant='h6' sx={{ml:2, color:'#66ff00ff'}} >
                  Admin
                </Typography>
            )}
            </Breadcrumbs>
            )}
            <MaterialUISwitch onChange={()=>{setTheme()}} size='small' sx={{ m: 0, w:10 }} checked={isDark === 'dark'?true:false} />
          </Toolbar>
        </AppBar>

        <Toolbar />

        <AppBar position="fixed" sx={{display:{sm:'flex', md:'none'} }}  >
          <Toolbar>
            {isAuthenticated && (
              <Avatar sx={{ bgcolor: '#ff9633ff' }}>{user?.name[0]}</Avatar>
            )}
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon color='action' />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem onClick={handleClose}><Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/posts"
              >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Post
              </Link></MenuItem>
              <MenuItem>
              <Button variant='secondary' onClick={logout} >
                Logout
              </Button>
              </MenuItem>
              <MaterialUISwitch onChange={()=>{setTheme()}} size='small' sx={{ m: 0, w:10 }} checked={isDark === 'dark'?true:false} />
            </Menu>
            {isAdmin && (
               <Typography >
                 Admin
               </Typography>
            )}
            <Box sx={{ height:'50px', minWidth:'100px', overflow:'hidden',mr: 2, display:'flex', alignItems:'center'}} >
              
              <Box component="img" sx={{  height: 200 }} alt="Tech Hub Logo" src={TechLogo} />
            </Box>
          </Toolbar>
        </AppBar>
        {children}
    <Stack direction='row' spacing={2}  sx={{ justifyContent: "center", alignItems: "center", width:{sm:'100%', md:'80%', lg:'60%'}, m:'20px auto', p:3, borderTop:'1px solid gray'}} >
      <Link href="/about">About</Link>
      <Link href="#">Courses</Link>
      <Link href="/contact">Contact</Link>
    </Stack>
    <Typography variant='body2' sx={{ textAlign: 'center', color: 'text.secondary', pb: 2}}>
      &copy; 2025 Tech Hub
    </Typography>
    </>
  )
}