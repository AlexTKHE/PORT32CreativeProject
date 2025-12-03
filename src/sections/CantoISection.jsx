import React from 'react'
import { Box, Container, Typography, Card, CardContent } from '@mui/material'

const steps = [
  {
    label: 'Dedication to King Sebastião',
    description:
      "Camões opens with a dedication to the young King Sebastião, positioning the epic as both a celebration of Portugal's past glories and a call to future greatness. He also pays tribute to Homer and Virgil, acknowledging the classical tradition while asserting Portugal's right to an epic of its own.",
  },
  {
    label: 'In Medias Res',
    description:
      'Following epic convention, the poem begins in the middle of the action. The fleet is already near the Cape of Good Hope, having left Lisbon months earlier. This technique immediately places readers in the dramatic moment of the voyage.',
  },
  {
    label: 'Council on Olympus',
    description:
      'Jupiter convenes the gods to decide the fate of the Portuguese voyage. Bacchus, god of wine and the East, opposes the Portuguese, fearing they will disrupt his domains. Venus, protector of the Portuguese, argues for their success. Jupiter sides with Venus, setting the divine framework for the epic.',
  },
]

const CantoISection = () => {
  return (
    <Box
      id="canto-i"
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
          Canto I – Gods, Kings, and a New Epic
        </Typography>

        <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 6 }}>
          {steps.map((step, index) => (
            <Card
              key={step.label}
              sx={{
                backgroundColor: '#F8F8F6',
                border: '2px solid #3B4755',
                borderRadius: 2,
                mb: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(4px)',
                  borderColor: '#4DA6D9',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    fontWeight: 600,
                    mb: 2,
                    color: '#E6703E',
                  }}
                >
                  {index + 1}. {step.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.8,
                    color: '#3B4755',
                  }}
                >
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Card
          sx={{
            backgroundColor: '#E6703E',
            color: '#F8F8F6',
            maxWidth: '900px',
            mx: 'auto',
            mb: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 600,
                mb: 2,
                fontStyle: 'italic',
              }}
            >
              "Boast no more about the subtle Greek..."
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.9,
                fontStyle: 'italic',
                mb: 2,
              }}
            >
              Boast no more about the subtle Greek,<br />
              Or the long odyssey of Trojan Aeneas;<br />
              Enough of the oriental conquests<br />
              Of great Alexander and of Trajan;<br />
              I sing of the famous Portuguese<br />
              To whom both Mars and Neptune bowed.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.9rem',
                opacity: 0.9,
              }}
            >
              Camões asserts that Portugal's achievements surpass those of classical heroes, claiming
              a place for Portuguese epic poetry alongside the greatest works of antiquity.
            </Typography>
          </CardContent>
        </Card>

        <Box
          sx={{
            backgroundColor: '#3B4755',
            color: '#F8F8F6',
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            maxWidth: '900px',
            mx: 'auto',
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
            The Epic Ambition
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.8,
            }}
          >
            Canto I establishes Camões's ambition: to create an epic that equals or surpasses those
            of Homer and Virgil, but centered on Portuguese maritime achievement rather than war or
            founding myths. The council of the gods provides the mythological framework, while the
            dedication to King Sebastião connects the poem to contemporary Portuguese identity and
            aspirations.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default CantoISection

