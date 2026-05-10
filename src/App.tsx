import React, { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url) return
    setIsScanning(true)
    
    // Simulate high-tech scan for the demo
    setTimeout(() => {
      setIsScanning(false)
      setIsComplete(true)
    }, 4000)
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const bookDemo = () => {
    window.location.href = 'mailto:contact@atlasbiznow.com?subject=Booking a Demo - AtlasBizNow';
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center m-4 max-w-[calc(100%-2rem)]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src={logo} alt="ABN Logo" className="w-10 h-10" />
          <span className="text-xl font-bold gold-text">AtlasBizNow</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition">Services</button>
          <button onClick={() => scrollTo('audit')} className="hover:text-amber-400 transition">Free Audit</button>
          <button onClick={() => scrollTo('results')} className="hover:text-amber-400 transition">Results</button>
        </div>
        <button onClick={bookDemo} className="btn-primary text-sm">Book Demo</button>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Scale Your Business <br />
            <span className="gold-text">Autonomously.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            We deploy the "Big 3" AI Growth Engine to secure high-ticket leads, 
            automate your bookings, and scale your content 24/7.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="btn-primary px-10 py-4 text-lg" onClick={() => scrollTo('audit')}>Get My Free Audit</button>
            <button className="glass px-10 py-4 text-lg font-semibold hover:bg-white/5 transition" onClick={() => scrollTo('services')}>See the System</button>
          </div>
        </div>
      </section>

      {/* The Big 3 */}
      <section id="services" className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Big 3 Engine</h2>
            <p className="text-gray-500">Our signature stack for industry dominance.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">📅</div>
              <h3 className="text-xl font-bold mb-4">Website Booking Agent</h3>
              <p className="text-gray-400 leading-relaxed">
                Turn your static site into a 24/7 sales floor. Our AI chat captures, 
                qualifies, and books leads while you sleep.
              </p>
            </div>
            
            <div className="glass p-8 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">🚀</div>
              <h3 className="text-xl font-bold mb-4">Social Media Automation</h3>
              <p className="text-gray-400 leading-relaxed">
                Consistent M/W/F posting across FB, IG, and LinkedIn. 
                AI-driven content that builds authority and trust for any brand.
              </p>
            </div>
            
            <div className="glass p-8 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">📞</div>
              <h3 className="text-xl font-bold mb-4">24/7 Phone Booking</h3>
              <p className="text-gray-400 leading-relaxed">
                Never miss a client call again. Our AI phone agents handle inquiries 
                and sync appointments directly to your calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit CTA */}
      <section id="audit" className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 to-amber-600"></div>
          
          {!isComplete ? (
            <>
              <h2 className="text-4xl font-black mb-6">Stop Leaving Money On The Table.</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Our autonomous lead engine scans for the biggest gaps in your current system. 
                Get a free "Big 3" audit delivered to your inbox in 2 minutes.
              </p>
              <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row max-w-xl mx-auto gap-3">
                <input 
                  type="url" 
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.your-roofing-site.com" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-amber-500 transition-all"
                  disabled={isScanning}
                />
                <button 
                  type="submit"
                  disabled={isScanning || !url}
                  className="btn-primary min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isScanning ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                      Scanning...
                    </span>
                  ) : 'Analyze'}
                </button>
              </form>
              {isScanning && (
                <div className="mt-6 text-amber-500 font-mono text-sm animate-pulse">
                  [SYSTEM] Analyzing SSL... Checking Booking Bot... Detecting Gaps...
                </div>
              )}
            </>
          ) : (
            <div className="py-10 animate-in fade-in zoom-in duration-500">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-4xl font-black mb-4">Analysis Complete!</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                We've found 3 critical revenue gaps on <span className="text-amber-400">{url}</span>. 
                Your full "Big 3" Audit is being sent to your inbox now.
              </p>
              <button onClick={() => setIsComplete(false)} className="text-gray-500 hover:text-white transition text-sm">
                Analyze another site
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-6 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">The Results</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 text-left">
              <div className="text-4xl font-black gold-text mb-2">+42%</div>
              <div className="text-xl font-bold mb-4">Booking Increase</div>
              <p className="text-gray-400">Average increase in booked calls after 30 days of Website Agent deployment.</p>
            </div>
            <div className="glass p-8 text-left">
              <div className="text-4xl font-black gold-text mb-2">24/7</div>
              <div className="text-xl font-bold mb-4">Lead Capture</div>
              <p className="text-gray-400">Never miss another lead. Our systems run while you sleep, every single day.</p>
            </div>
          </div>
          <button onClick={bookDemo} className="btn-primary mt-12 px-10 py-4">Scale My Business Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 text-center">
        <div className="flex justify-center gap-4 mb-6">
          <img src={logo} alt="ABN Logo" className="w-12 h-12" />
        </div>
        <p className="text-gray-300 font-medium mb-2">&copy; 2026 AtlasBizNow LLC. All rights reserved.</p>
        <p className="text-gray-500 text-sm">Built by AI for the High-Velocity Entrepreneur.</p>
      </footer>
    </div>
  )
}

export default App
