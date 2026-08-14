import { SiteShell } from '@/components/site-shell'
import { Hero } from '@/components/hero'
import { TrustBar } from '@/components/trust-bar'
import { ProblemSection } from '@/components/problem-section'
import { SolutionSection } from '@/components/solution-section'
import { SolutionsGrid } from '@/components/solutions-grid'
import { BusinessTypes } from '@/components/business-types'
import { ProcessSection } from '@/components/process-section'
import { DemoSection } from '@/components/demo-section'
import { ROICalculator } from '@/components/roi-calculator'
import { LeadMagnet } from '@/components/lead-magnet'
import { FAQ } from '@/components/faq'
import { DiagnosticSection } from '@/components/diagnostic-section'
import { FinalCTA } from '@/components/final-cta'

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <SolutionsGrid />
      <BusinessTypes />
      <ProcessSection />
      <DemoSection />
      <ROICalculator />
      <LeadMagnet />
      <FAQ />
      <DiagnosticSection />
      <FinalCTA />
    </SiteShell>
  )
}
