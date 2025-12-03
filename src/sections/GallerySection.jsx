import React from 'react'
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material'

const galleryItems = [
  {
    id: 1,
    title: 'Ship Leaving Lisbon',
    description: 'Stylized ship departing from Lisbon harbor, beginning the voyage to India',
    theme: 'Hero section - The journey begins',
    alt: 'A stylized ship leaving Lisbon into swirling blue-green seas in Camões aesthetic',
  },
  {
    id: 2,
    title: 'Council of the Gods',
    description: 'Jupiter, Venus, and Bacchus on Olympus deciding the fate of the Portuguese voyage',
    theme: 'Canto I - Divine intervention',
    alt: 'Classical gods Jupiter, Venus, and Bacchus in council on Mount Olympus',
  },
  {
    id: 3,
    title: 'Adamastor',
    description: 'The terrifying giant spirit of the Cape of Good Hope warning the Portuguese',
    theme: 'Canto V - The monster of the Cape',
    alt: 'Adamastor, the giant spirit of the Cape of Good Hope, looming over the Portuguese ships',
  },
  {
    id: 4,
    title: "St Elmo's Fire",
    description: 'The mysterious light on the mast, interpreted as a divine sign by the sailors',
    theme: 'Canto V - Science and observation',
    alt: "St Elmo's Fire appearing as a bright light on the ship's mast during a storm",
  },
  {
    id: 5,
    title: 'Celestial Navigation',
    description: 'Sailors using the Southern Cross and stars to navigate the southern ocean',
    theme: 'Canto V - Maritime science',
    alt: 'Portuguese sailors observing the Southern Cross constellation for navigation',
  },
  {
    id: 6,
    title: 'Vasco da Gama',
    description: 'The Portuguese captain leading the fleet through unknown waters',
    theme: 'Historical figure - The explorer',
    alt: 'Portrait of Vasco da Gama, Portuguese explorer and captain of the voyage to India',
  },
  {
    id: 7,
    title: 'Lisbon Harbor',
    description: 'The departure point, where the epic journey begins',
    theme: 'Setting - The starting point',
    alt: 'Lisbon harbor in the 16th century, showing ships preparing for the voyage',
  },
  {
    id: 8,
    title: 'Calicut Arrival',
    description: 'The fleet reaching India, the destination of the epic voyage',
    theme: 'Climax - Reaching the goal',
    alt: 'Portuguese ships arriving at Calicut, India, completing the historic voyage',
  },
  {
    id: 9,
    title: 'Ocean Map',
    description: 'Stylized map showing the route from Portugal around Africa to India',
    theme: 'Geography - The voyage route',
    alt: 'Map showing the route of Vasco da Gama from Lisbon to Calicut via the Cape of Good Hope',
  },
]

const GallerySection = () => {
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
          Gallery
        </Typography>

        <Grid container spacing={3}>
          {galleryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#F8F8F6',
                  border: '2px solid #3B4755',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    borderColor: '#4DA6D9',
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: '#3B4755',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, #4DA6D9 0%, #3B4755 50%, #E6703E 100%)`,
                      opacity: 0.6,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      color: '#F8F8F6',
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      px: 2,
                    }}
                  >
                    {item.alt}
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 600,
                      mb: 1,
                      color: '#3B4755',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      mb: 2,
                      color: '#3B4755',
                      opacity: 0.8,
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.8rem',
                      color: '#E6703E',
                      fontWeight: 600,
                    }}
                  >
                    {item.theme}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default GallerySection

