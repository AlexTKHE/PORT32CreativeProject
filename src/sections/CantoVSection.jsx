import React, { useState } from 'react'
import { Box, Container, Typography, Card, CardContent, Grid, Chip } from '@mui/material'
import SailingIcon from '@mui/icons-material/Sailing'
import StarsIcon from '@mui/icons-material/Stars'
import WarningIcon from '@mui/icons-material/Warning'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import NavigationIcon from '@mui/icons-material/Navigation'
import BoltIcon from '@mui/icons-material/Bolt'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import SickIcon from '@mui/icons-material/Sick'

const journeySteps = [
  {
    label: 'Lisbon – Departure',
    icon: <SailingIcon sx={{ fontSize: 32 }} />,
    description: 'The Armada sets sail from Lisbon, heading toward the far-off coast of Melinde.',
  },
  {
    label: 'Oceans – Signs in the Sky',
    icon: <StarsIcon sx={{ fontSize: 32 }} />,
    description:
      "Out on the vast ocean, the crew observes the Southern Cross lighting up the night sky. They also encounter the eerie St. Elmo's Fire—that 'Maritime Whirlwind' that casts its glow across the vessel.",
  },
  {
    label: 'Near Melinde – Human & Supernatural Threats',
    icon: <WarningIcon sx={{ fontSize: 32 }} />,
    description:
      "Approaching unfamiliar shores, the expedition encounters hostile natives, as seen in the Fernão Veloso incident. They also meet the Giant Adamastor's wrath, a figure representing the perils that protect their path.",
  },
  {
    label: 'On Board – Invisible Enemy',
    icon: <LocalHospitalIcon sx={{ fontSize: 32 }} />,
    description: 'Scurvy takes hold among the men, claiming lives quietly as the voyage continues toward their destination.',
  },
]

const perilsCards = [
  {
    title: 'The Southern Cross',
    icon: <NavigationIcon sx={{ fontSize: 40, color: '#4DA6D9' }} />,
    description: 'A new constellation for the sailors, marking their path in the southern skies.',
  },
  {
    title: "St. Elmo's Fire – The Maritime Whirlwind",
    icon: <BoltIcon sx={{ fontSize: 40, color: '#E6703E' }} />,
    description: 'A strange glow around the ship, both awe-inspiring and frightening to the crew.',
  },
  {
    title: 'Hostility & Adamastor',
    icon: <GpsFixedIcon sx={{ fontSize: 40, color: '#3B4755' }} />,
    description:
      "Hostile natives threaten the expedition, and the Giant Adamastor erupts in fury, embodying the ocean's rage.",
  },
  {
    title: 'Scurvy on Deck',
    icon: <SickIcon sx={{ fontSize: 40, color: '#8B4513' }} />,
    description: 'Disease runs through the ship. Scurvy claims many lives before the Armada reaches Melinde.',
  },
]

const CantoVSection = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Box
      id="canto-5"
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#F8F8F6',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title + Tagline */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              color: '#3B4755',
            }}
          >
            Canto V – Perils on the Way to Melinde
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 400,
              color: '#3B4755',
              opacity: 0.85,
              fontStyle: 'italic',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            From Lisbon to Melinde, the Armada sails into stars, fire, giants, disease—and a poet's
            frustration.
          </Typography>
        </Box>

        {/* Horizontal Journey Strip */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 1 },
              position: 'relative',
            }}
          >
            {journeySteps.map((step, index) => (
              <Box
                key={index}
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
                sx={{
                  flex: 1,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <Card
                  sx={{
                    backgroundColor: activeStep === index ? '#4DA6D9' : '#F8F8F6',
                    border: '2px solid',
                    borderColor: activeStep === index ? '#4DA6D9' : '#3B4755',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      borderColor: '#4DA6D9',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
                    <Box
                      sx={{
                        color: activeStep === index ? '#F8F8F6' : '#3B4755',
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h4"
                      sx={{
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        fontWeight: 600,
                        mb: 1.5,
                        color: activeStep === index ? '#F8F8F6' : '#3B4755',
                      }}
                    >
                      {step.label.split(' – ')[0]}
                    </Typography>
                    <Chip
                      label={step.label.split(' – ')[1]}
                      size="small"
                      sx={{
                        backgroundColor: activeStep === index ? '#3B4755' : '#E6703E',
                        color: '#F8F8F6',
                        fontSize: '0.75rem',
                        mb: 1.5,
                        height: '24px',
                      }}
                    />
                    {activeStep === index && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.85rem', md: '0.9rem' },
                          lineHeight: 1.6,
                          color: '#F8F8F6',
                          mt: 1.5,
                        }}
                      >
                        {step.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
                {/* Connector line for desktop */}
                {index < journeySteps.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      position: 'absolute',
                      top: '50%',
                      right: '-8px',
                      width: '16px',
                      height: '2px',
                      backgroundColor: activeStep >= index ? '#4DA6D9' : '#3B4755',
                      zIndex: 1,
                      transition: 'all 0.3s ease',
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* The Perils Card Grid */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              color: '#3B4755',
            }}
          >
            The Perils
          </Typography>
          <Grid container spacing={3}>
            {perilsCards.map((peril) => (
              <Grid item xs={12} sm={6} key={peril.title}>
                <Card
                  sx={{
                    backgroundColor: '#F8F8F6',
                    border: '2px solid #3B4755',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: '#4DA6D9',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      {peril.icon}
                      <Typography
                        variant="h6"
                        component="h4"
                        sx={{
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          color: '#3B4755',
                        }}
                      >
                        {peril.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                        lineHeight: 1.8,
                        color: '#3B4755',
                      }}
                    >
                      {peril.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Closing Panel – The Poet Speaks Back */}
        <Card
          sx={{
            backgroundColor: '#3B4755',
            color: '#F8F8F6',
            maxWidth: '900px',
            mx: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 5 } }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                fontWeight: 600,
                mb: 3,
                textAlign: 'center',
                color: '#F8F8F6',
              }}
            >
              The Poet's Complaint
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.9,
                textAlign: 'center',
                color: '#F8F8F6',
                opacity: 0.95,
              }}
            >
              As Canto V ends, the poet turns away from the sea and toward his own time. He
              criticizes those who dismiss poetry and urges his contemporaries to recognize its
              importance and value.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default CantoVSection

