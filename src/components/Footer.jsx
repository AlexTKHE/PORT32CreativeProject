import React from 'react'
import { Box, Container, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#3B4755',
        color: '#F8F8F6',
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ mb: 1 }}>
          The Lusiads Project
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 1, opacity: 0.8 }}>
          A creative guide to Os Lusíadas by Luís de Camões
        </Typography>
        <Typography variant="body2" align="center" sx={{ opacity: 0.7, fontSize: '0.85rem' }}>
          This site is a student project. Visuals are creative interpretations based on The Lusiads, not historical reconstructions.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2, opacity: 0.6, fontSize: '0.8rem' }}>
          Course: PRT 32 | Fall 2025
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

