import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Users, Heart, Shield } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gentle-float" />
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gentle-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gentle-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Strategy for Systems That Actually Work
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            We are a collective of women-owned, queer-led consultants, designers, technologists, and facilitators.
          </p>
          
          <p className={`text-lg md:text-xl text-blue-700 font-semibold mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            We help people transform the structures they are in and build the ones they need.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a
              href="/services"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Explore Our Services
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#what-we-offer"
              className="group inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <div className="animate-gentle-float">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              Learn More
            </a>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className={`pt-16 border-t border-gray-200 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-sm text-gray-500 mb-6">Trusted by organizations building inclusive, equitable systems</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-200 hover:scale-105 transition-transform">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-800">Women-Owned</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-purple-200 hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-gray-800">Queer-Led</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-green-200 hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-800">ADA Focused</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}