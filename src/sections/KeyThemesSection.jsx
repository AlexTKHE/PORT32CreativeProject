import React from 'react'
import { Box, Container, Typography, Card, CardContent, Button, Grid } from '@mui/material'
import ExploreIcon from '@mui/icons-material/Explore'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PsychologyIcon from '@mui/icons-material/Psychology'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

const themes = [
  {
    id: 'exploration',
    icon: <ExploreIcon sx={{ fontSize: 48, color: '#4DA6D9' }} />,
    title: 'Portuguese Exploration',
    description:
        "The epic highlights Portugal's amazing maritime feats, showcasing everything from naval battles to empire-building across Africa, Asia, and the Americas. But Camões also subtly points out the darker side of conquest: the violence, greed, and suffering that often came with exploration.",
    link: '#canto-i',
  },
  {
    id: 'mythology',
    icon: <AutoAwesomeIcon sx={{ fontSize: 48, color: '#E6703E' }} />,
    title: 'Mythology and the Gods',
    description:
      "In the Portuguese voyage, the classical gods play a significant role: Jupiter symbolizes order and fate, Venus acts as a divine protector for the Portuguese, while Bacchus stands in opposition, worried about the impact on his Eastern territories. This mix of pagan myths and the early-modern Christian perspective results in a complex and intriguing story.",
      link: '#canto-i',
  },
  {
    id: 'reflection',
    icon: <PsychologyIcon sx={{ fontSize: 48, color: '#3B4755' }} />,
    title: 'Human Reflection',
    description:
        "Underneath all the glory, the poem digs into the personal toll that exploration takes. The sailors face storms, monsters, scurvy, and dangerous shores, which really put their bravery and lives on the line. As they journey on, they’re pushed to reflect on their own fears, losses, and just how far humans can go.",
    link: '#canto-v',
  },
  {
    id: 'counter-epic',
    icon: <CompareArrowsIcon sx={{ fontSize: 48, color: '#4DA6D9' }} />,
    title: 'Epic & Counter-Epic',
    description:
    "Camões uses a 'double vision' in his poem: he praises Portuguese bravery and accomplishments, but at the same time, he doesn't shy away from pointing out the empire's wrongs, like greed, corruption, and violence in places such as Goa. This mix of celebration and critique is what makes Os Lusíadas not just a national epic, but also a thoughtful moral commentary.",
    link: '#epic-today',
  },
]

const KeyThemesSection = () => {
  const handleScrollTo = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Box
      id="themes"
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
          Key Themes
        </Typography>

        <Grid container spacing={4}>
          {themes.map((theme) => (
            <Grid item xs={12} sm={6} md={6} key={theme.id}>
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
                <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {theme.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 700,
                      mb: 2,
                      textAlign: 'center',
                      color: '#3B4755',
                    }}
                  >
                    {theme.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      lineHeight: 1.8,
                      mb: 3,
                      color: '#3B4755',
                      flexGrow: 1,
                    }}
                  >
                    {theme.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleScrollTo(theme.link)}
                    sx={{
                      borderColor: '#4DA6D9',
                      color: '#4DA6D9',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#3d95c7',
                        backgroundColor: 'rgba(77, 166, 217, 0.1)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default KeyThemesSection

