import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Why This Epic?', href: '#why-epic' },
  { label: 'Themes', href: '#themes' },
  { label: 'Canto I', href: '#canto-i' },
  { label: 'Canto V', href: '#canto-v' },
  { label: 'About Camões', href: '#camoes' },
]

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? 'rgba(248, 248, 246, 0.95)' : 'rgba(248, 248, 246, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box
            component="h1"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              color: '#3B4755',
              cursor: 'pointer',
            }}
            onClick={() => handleNavClick('#hero')}
          >
            The Lusiads Project
          </Box>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ color: '#3B4755' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    color: '#3B4755',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    '&:hover': {
                      color: '#4DA6D9',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#F8F8F6',
          },
        }}
      >
        <Box sx={{ pt: 8, px: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <Button
                  fullWidth
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    color: '#3B4755',
                    fontWeight: 500,
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    py: 1.5,
                    '&:hover': {
                      color: '#4DA6D9',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {link.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default NavBar

