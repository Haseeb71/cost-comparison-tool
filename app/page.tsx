import { AnnouncementBar } from '../components/AnnouncementBar'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { SearchFilters } from '../components/SearchFilters'
import { FeaturedCategories } from '../components/FeaturedCategories'
import { FeaturedTools } from '../components/FeaturedTools'
import { HowItWorks } from '../components/HowItWorks'
import { WhyTrustUs } from '../components/WhyTrustUs'
import { LatestComparisons } from '../components/LatestComparisons'
import { FAQ } from '../components/FAQ'
import { CTABand } from '../components/CTABand'
import { Footer } from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <SearchFilters />
        <FeaturedCategories />
        <FeaturedTools />
        <HowItWorks />
        <WhyTrustUs />
        <LatestComparisons />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </div>
  )
}