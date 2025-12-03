import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const HeroSection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleScrollTo = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/assets/desktopCoverPhoto.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        pt: 10,
      }}
    >
      {/* Dark overlay for text readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            color: '#F8F8F6',
            py: { xs: 4, md: 8 },
          }}
          className="animate-fade-up"
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            The Lusiads:
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 600,
              mb: 4,
              lineHeight: 1.2,
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Voyage Beyond the Edge of the World
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              opacity: 0.95,
            }}
          >
            A creative guide to Luís de Camões's epic about Vasco da Gama's voyage to India,
            blending myth, history, and reflection on the Portuguese Age of Discoveries.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => handleScrollTo('#why-epic')}
              sx={{
                backgroundColor: '#E6703E',
                color: '#F8F8F6',
                px: 4,
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#d45f2e',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start with the Story
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleScrollTo('#canto-i')}
              sx={{
                borderColor: '#F8F8F6',
                color: '#F8F8F6',
                px: 4,
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#F8F8F6',
                  backgroundColor: 'rgba(248, 248, 246, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Jump to Canto I
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection

