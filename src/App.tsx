import React, { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('idle') // idle, scanning, gated, complete
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)

  const startScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return
    setStep('scanning')
    
    // Step 2: Build tension
    setTimeout(() => {
      setStep('gated')
    }, 4500)
  }

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return
    
    // Wire to Google Sheets Webhook (Sheet + Telegram via Apps Script)
    console.log('Attempting to sync lead:', { url, email });
    try {
      await fetch('https://script.google.com/macros/s/AKfycbzCsoAf1asl2Fw1oxT5Edptt8kBntvOrbH8jA3tqBGGhfF8YfnkBw_eWqSKIgwI0S2S/exec', {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName: 'Web Prospect', url, email })
      });
      console.log('Lead synced successfully');
    } catch (err) {
      console.error('Lead capture sync failed:', err);
    }
    
    setStep('complete')
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const bookDemo = () => {
    window.open('https://www.atlasbiznow.com', '_blank');
  }

  const callAgent = () => {
    setIsVoiceModalOpen(true);
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
        <button onClick={bookDemo} className="btn-primary text-sm">Experience the Web Booking Agent</button>
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

      {/* Audit CTA - The Multi-Step Funnel */}
      <section id="audit" className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 to-amber-600"></div>
          
          {step === 'idle' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-4xl font-black mb-6">Stop Leaving Money On The Table.</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Our autonomous engine scans for the biggest gaps in your current system. 
                Get a "Big 3" audit for your site in 2 minutes.
              </p>
              <form onSubmit={startScan} className="flex flex-col md:flex-row max-w-xl mx-auto gap-3">
                <input 
                  type="url" 
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.atlasbiznow.com" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-amber-500 transition-all"
                />
                <button type="submit" className="btn-primary min-w-[140px]">Analyze</button>
              </form>
            </div>
          )}

          {step === 'scanning' && (
            <div className="py-10 animate-pulse">
              <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="text-2xl font-mono gold-text mb-4">AI ENGINE ACTIVE</h2>
              <div className="text-gray-500 font-mono text-sm space-y-2">
                <p>[SYSTEM] Scanned SSL Certificates...</p>
                <p>[SYSTEM] Detecting Booking Gaps...</p>
                <p>[SYSTEM] Analyzing Content Velocity...</p>
              </div>
            </div>
          )}

          {step === 'gated' && (
            <div className="animate-in slide-in-from-bottom-10 duration-700">
              <div className="text-amber-500 text-sm font-bold mb-2 uppercase tracking-widest">Analysis Found 3 Gaps</div>
              <h2 className="text-4xl font-black mb-6">Where should we send your report?</h2>
              <p className="text-gray-400 mb-8 text-lg">
                We've identified critical revenue leaks on <span className="text-white italic">{url}</span>. 
                Enter your email to receive the full "Big 3" Audit.
              </p>
              <form onSubmit={submitEmail} className="flex flex-col md:flex-row max-w-xl mx-auto gap-3">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-amber-500 transition-all"
                />
                <button type="submit" className="btn-primary min-w-[140px]">Send My Audit</button>
              </form>
            </div>
          )}

          {step === 'complete' && (
            <div className="py-10 animate-in fade-in zoom-in duration-500">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-4xl font-black mb-4">Audit Dispatched!</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Check your inbox at <span className="text-amber-400">{email}</span>. 
                Our AI agents are compiling the final data and delivering it now.
              </p>
              <button onClick={() => setStep('idle')} className="text-gray-500 hover:text-white transition text-sm">
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
          <button onClick={callAgent} className="btn-primary mt-12 px-10 py-4">Experience the Voice Agent</button>
        </div>
      </section>

      {/* Voice Agent Modal */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsVoiceModalOpen(false)}></div>
          <div className="relative glass p-10 max-w-lg w-full text-center animate-in zoom-in-95 duration-300 border border-amber-500/30 rounded-2xl shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)]">
            <button 
              onClick={() => setIsVoiceModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              📞
            </div>
            <h3 className="text-3xl font-black mb-4 gold-text">Experience the AI</h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Call our AI Booking Agent right now at <br/>
              <span className="text-2xl font-bold text-white mt-2 block tracking-wider">952-592-8527</span>
              <br/> to hear it in action.
            </p>
            <a 
              href="tel:952-592-8527" 
              className="btn-primary w-full py-4 text-lg inline-block"
            >
              Call Now
            </a>
          </div>
        </div>
      )}

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
