import React from 'react'
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import PublicIcon from '@mui/icons-material/Public'

const CamoesSection = () => {
  return (
    <Box
      id="camoes"
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
          Camões & Portugal
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <PersonIcon sx={{ fontSize: 40, color: '#4DA6D9' }} />
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  color: '#3B4755',
                }}
              >
                Luís de Camões (c. 1524-1580)
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                mb: 3,
                color: '#3B4755',
              }}
            >
              Luís Vaz de Camões was quite the character: a soldier, a traveler, and a poet whose life was as intense as the epic poem he created. Born in Portugal around 1524, he fought in North Africa and ended up losing an eye in one of those battles. He journeyed far and wide throughout the Portuguese empire, visiting places like India, Macau, and maybe even Mozambique, soaking in the experiences that later found their way into his poetry.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                mb: 3,
                color: '#3B4755',
              }}
            >
             Camões often felt like he was "never at home anywhere"—an eternal wanderer whose life echoed the journeys he chronicled. He dabbled in both epic and lyric poetry, but it’s <em>Os Lusíadas</em> that truly shines as his greatest work, finished after a long stretch of travel and struggle. The poem captures not just historical moments but also his personal feelings of separation, loss, and the intricate ties between empire and individual.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                color: '#3B4755',
              }}
            >
              His work connects Portugal's rich classical history with its modern day, crafting a national epic that both honors and critiques the Age of Discoveries. Camões passed away in 1580, the very year when Portugal fell under Spanish rule a poignant moment that highlights the poem's themes of glory, loss, and the relentless march of time.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: '#E6703E',
                color: '#F8F8F6',
                height: '100%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <PublicIcon sx={{ fontSize: 36, color: '#F8F8F6' }} />
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 700,
                    }}
                  >
                    Dia de Camões
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  June 10th is celebrated as Dia de Camões, Day of Portugal, and Day of the
                  Portuguese Communities. This date commemorates Camões's death and recognizes his
                  status as Portugal's national poet.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    lineHeight: 1.8,
                  }}
                >
                  Camões is often called the "soul of Portugal" because <em>Os Lusíadas</em> gave
                  the nation a literary identity equal to those of ancient Greece and Rome. The poem
                  remains central to Portuguese cultural identity, taught in schools and celebrated
                  as a monument to the country's maritime heritage.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CamoesSection

