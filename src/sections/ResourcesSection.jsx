import React from 'react'
import { Box, Container, Typography, Card, CardContent, Grid, Button } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import SchoolIcon from '@mui/icons-material/School'
import PublicIcon from '@mui/icons-material/Public'
import ArticleIcon from '@mui/icons-material/Article'

const resources = [
  {
    icon: <BookIcon sx={{ fontSize: 36, color: '#4DA6D9' }} />,
    title: 'Full Text (English)',
    description: 'Complete English translation of Os Lusíadas',
    link: '#',
    linkText: 'Read the full poem',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 36, color: '#E6703E' }} />,
    title: 'Camões Background',
    description: 'Biographical information and historical context',
    link: '#',
    linkText: 'Learn about Camões',
  },
  {
    icon: <PublicIcon sx={{ fontSize: 36, color: '#3B4755' }} />,
    title: 'Vasco da Gama & Indian Ocean Trade',
    description: 'Historical background on the voyage and its impact',
    link: '#',
    linkText: 'Explore the history',
  },
  {
    icon: <ArticleIcon sx={{ fontSize: 36, color: '#4DA6D9' }} />,
    title: 'Further Reading',
    description: 'Academic articles and critical essays on the epic',
    link: '#',
    linkText: 'View resources',
  },
]

const ResourcesSection = () => {
  return (
    <Box
      id="resources"
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
            mb: 2,
            color: '#3B4755',
          }}
        >
          Resources
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            textAlign: 'center',
            mb: 6,
            color: '#3B4755',
            opacity: 0.8,
          }}
        >
          For Teachers & Students
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {resources.map((resource) => (
            <Grid item xs={12} sm={6} md={6} key={resource.title}>
              <Card
                sx={{
                  height: '100%',
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
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    {resource.icon}
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        fontWeight: 700,
                        color: '#3B4755',
                      }}
                    >
                      {resource.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      lineHeight: 1.8,
                      mb: 3,
                      color: '#3B4755',
                    }}
                  >
                    {resource.description}
                  </Typography>
                  <Button
                    variant="contained"
                    href={resource.link}
                    sx={{
                      backgroundColor: '#4DA6D9',
                      color: '#F8F8F6',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#3d95c7',
                      },
                    }}
                  >
                    {resource.linkText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            backgroundColor: '#3B4755',
            color: '#F8F8F6',
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Additional Resources
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.8,
              opacity: 0.9,
            }}
          >
            For more in-depth study, consider exploring Portuguese language editions, historical
            maps of the voyage, and critical analyses of the epic's themes. Many universities offer
            courses on Renaissance literature and Portuguese studies that include Os Lusíadas.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default ResourcesSection

