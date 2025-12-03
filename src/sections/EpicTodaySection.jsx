import React from 'react'
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import ExploreIcon from '@mui/icons-material/Explore'

const prompts = [
  {
    icon: <CelebrationIcon sx={{ fontSize: 48, color: '#4DA6D9' }} />,
    title: 'What do we celebrate?',
    description:
      'The courage of explorers, the expansion of knowledge, the connections between cultures. The poem invites us to honor human achievement and the spirit of discovery that drives us to venture into the unknown.',
  },
  {
    icon: <QuestionMarkIcon sx={{ fontSize: 48, color: '#E6703E' }} />,
    title: 'What do we question?',
    description:
      'The costs of empire: violence, exploitation, cultural destruction. Camões himself critiques the greed and corruption he witnessed in places like Goa. The poem asks us to consider what price we pay for expansion and dominance.',
  },
  {
    icon: <ExploreIcon sx={{ fontSize: 48, color: '#3B4755' }} />,
    title: 'What does exploration mean now?',
    description:
      "Today we explore space, the deep ocean, and digital frontiers. The questions remain: Who benefits? What is lost? How do we balance discovery with responsibility? The epic's anti-epic challenges remains relevant as we navigate new frontiers.",
  },
]

const EpicTodaySection = () => {
  return (
    <Box
      id="epic-today"
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
            mb: 3,
            color: '#3B4755',
          }}
        >
          Epic Today – Reflection
        </Typography>

        <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 6 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.8,
              textAlign: 'center',
              color: '#3B4755',
              mb: 4,
            }}
          >
            <em>Os Lusíadas</em> not only celebrates Portuguese accomplishments but also takes a critical look at the darker sides of empire. This mix of praise and criticism gives the poem a rich complexity, exploring themes of exploration, power, and human nature—issues that still resonate with us today.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {prompts.map((prompt) => (
            <Grid item xs={12} md={4} key={prompt.title}>
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
                <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {prompt.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 700,
                      mb: 2,
                      color: '#3B4755',
                    }}
                  >
                    {prompt.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      lineHeight: 1.8,
                      color: '#3B4755',
                    }}
                  >
                    {prompt.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card
          sx={{
            backgroundColor: '#3B4755',
            color: '#F8F8F6',
            maxWidth: '900px',
            mx: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 5 } }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                mb: 3,
                textAlign: 'center',
              }}
            >
              Epic vs. Empire
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                textAlign: 'center',
              }}
            >
             The poem captures the glory of Portugal, but it also sheds light on the darker aspects of empire—like the violence in Goa, the greed of officials, and the suffering experienced by both the colonizers and the colonized. This 'counter-epic' side of <em>Os Lusíadas</em> doesn't just celebrate achievements; it also invites readers to reflect on the moral implications, urging them to consider both the triumphs and the costs involved. It's this complexity that keeps the epic relevant today, especially as we still deal with the challenges that come with exploration, power, and our responsibilities.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default EpicTodaySection

