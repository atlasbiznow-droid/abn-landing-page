import './App.css'
import logo from './assets/logo.png'

function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center m-4 max-w-[calc(100%-2rem)]">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ABN Logo" className="w-10 h-10" />
          <span className="text-xl font-bold gold-text">AtlasBizNow</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#services" className="hover:text-amber-400 transition">Services</a>
          <a href="#audit" className="hover:text-amber-400 transition">Free Audit</a>
          <a href="#results" className="hover:text-amber-400 transition">Results</a>
        </div>
        <button className="btn-primary text-sm">Book Demo</button>
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
            <button className="btn-primary px-10 py-4 text-lg">Get My Free Audit</button>
            <button className="glass px-10 py-4 text-lg font-semibold hover:bg-white/5 transition">See the System</button>
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
          <h2 className="text-4xl font-black mb-6">Stop Leaving Money On The Table.</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Our autonomous lead engine scans for the biggest gaps in your current system. 
            Get a free "Big 3" audit delivered to your inbox in 2 minutes.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="text" 
              placeholder="Your Business Website URL" 
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500"
            />
            <button className="btn-primary">Analyze</button>
          </div>
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
