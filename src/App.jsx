import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './sections/HeroSection'
import TransformationZone from './sections/TransformationZone'
import WhyEpicSection from './sections/WhyEpicSection'
import KeyThemesSection from './sections/KeyThemesSection'
import CantoISection from './sections/CantoISection'
import CantoVSection from './sections/CantoVSection'
import CamoesSection from './sections/CamoesSection'
import EpicTodaySection from './sections/EpicTodaySection'
import GallerySection from './sections/GallerySection'
import ResourcesSection from './sections/ResourcesSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-off-white">
      <NavBar />
      <HeroSection />
      <TransformationZone />
      <WhyEpicSection />
      <KeyThemesSection />
      <CantoISection />
      <CantoVSection />
      <CamoesSection />
      <EpicTodaySection />
      <Footer />
    </div>
  )
}

export default App

