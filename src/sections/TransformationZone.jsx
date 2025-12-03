import React, { useState } from 'react'
import { Box, Container, Typography, Card, CardContent, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const TransformationZone = () => {
  const [view, setView] = useState('before')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView)
    }
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#F8F8F6',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: 6,
            color: '#3B4755',
          }}
        >
          Before & After the Voyage
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view toggle"
            sx={{
              '& .MuiToggleButton-root': {
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                color: '#3B4755',
                borderColor: '#3B4755',
                '&.Mui-selected': {
                  backgroundColor: '#4DA6D9',
                  color: '#F8F8F6',
                  '&:hover': {
                    backgroundColor: '#3d95c7',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(77, 166, 217, 0.1)',
                },
              },
            }}
          >
            <ToggleButton value="before" aria-label="before">
              Before 1497
            </ToggleButton>
            <ToggleButton value="after" aria-label="after">
              After 1499
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            mt: 4,
          }}
        >
          <Card
            sx={{
              backgroundColor: view === 'before' ? '#E6703E' : '#F8F8F6',
              color: view === 'before' ? '#F8F8F6' : '#3B4755',
              border: view === 'before' ? 'none' : '2px solid #3B4755',
              transition: 'all 0.5s ease',
              transform: view === 'before' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: view === 'before' ? '0 8px 24px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => setView('before')}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Before 1497 – Ocean as Edge
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                The ocean was seen as the world's edge—a barrier that marked the limits of known
                geography. Beyond lay only myth, monsters, and the fear of falling off the edge of
                the world. The sea represented the unknown, the dangerous, the boundary between
                civilization and chaos.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: view === 'after' ? '#4DA6D9' : '#F8F8F6',
              color: view === 'after' ? '#F8F8F6' : '#3B4755',
              border: view === 'after' ? 'none' : '2px solid #3B4755',
              transition: 'all 0.5s ease',
              transform: view === 'after' ? 'scale(1.05)' : 'scale(1)',
              boxShadow: view === 'after' ? '0 8px 24px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => setView('after')}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                After 1499 – Ocean as World's Stage
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                Vasco da Gama's successful voyage transformed the ocean from barrier to bridge. The
                sea became a metaphor for destiny, knowledge, and global connection. It was no
                longer the edge of the world but the stage upon which empires, cultures, and ideas
                would meet and transform each other forever.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Letter images */}
        <Box
          sx={{
            mt: 6,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            height: { xs: '200px', md: '300px' },
          }}
        >
          <Box
            component="img"
            src={view === 'before' ? '/assets/beforeLetter.webp' : '/assets/afterLetter.webp'}
            alt={view === 'before' ? 'Before 1497 letter' : 'After 1499 letter'}
            sx={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
              transition: 'opacity 0.5s ease',
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default TransformationZone

