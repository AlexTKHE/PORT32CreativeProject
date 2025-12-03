import React from 'react'
import { Box, Container, Typography, Card, CardContent } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'

const WhyEpicSection = () => {
  return (
    <Box
      id="why-epic"
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#F8F8F6',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <BookIcon sx={{ fontSize: 48, color: '#4DA6D9', mb: 2 }} />
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 3,
              color: '#3B4755',
            }}
          >
            Why an Epic?
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 6 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.8,
              mb: 4,
              color: '#3B4755',
            }}
          >
            Luís de Camões aimed to create a national epic for Portugal that matched its ambitious Age of Discoveries. Impactful in the same ways of Homer's <em>Iliad</em> and <em>Odyssey</em>, as well as Virgil's <em>Aeneid</em>, <em>Os Lusíadas</em> shifts the focus from battlefields to the ocean. It highlights Vasco da Gama's famous journey to India, weaving together history, mythology, and thoughtful insights on the sacrifices involved in building an empire.
          </Typography>

          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              pl: 0,
              mb: 4,
              '& li': {
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                mb: 2,
                color: '#3B4755',
                '&::before': {
                  content: '"•"',
                  color: '#E6703E',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  width: '1em',
                  marginRight: '0.5em',
                },
              },
            }}
          >
            <li>Celebrates Vasco da Gama's route to India (1497-1499)</li>
            <li>Blends historical events with classical mythology</li>
            <li>Written in ten cantos using ottava rima (eight-line stanzas)</li>
            <li>Establishes Portugal's place among the great epic traditions</li>
          </Box>
        </Box>

        <Card
          sx={{
            backgroundColor: '#3B4755',
            color: '#F8F8F6',
            maxWidth: '900px',
            mx: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                mb: 3,
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              "Arms are my theme, and those matchless heros..."
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.9,
                textAlign: 'center',
                fontStyle: 'italic',
                opacity: 0.95,
              }}
            >
              Arms are my theme, and those matchless heros<br />
              Who from Portugal's far western shores<br />
              By oceans where none had ventured<br />
              Voyaged to Taprobana and beyond,<br />
              Enduring hazards and assaults<br />
              Such as drew on more than human prowess<br />
              Among far distant peoples, to proclaim<br />
              A New Age and win undying fame;
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 3,
                textAlign: 'center',
                opacity: 0.8,
                fontSize: '0.9rem',
              }}
            >
              — Opening lines of Os Lusíadas (translated)
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default WhyEpicSection

