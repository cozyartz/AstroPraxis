import React, { useEffect, useState } from 'react';
import { MessageCircle, ArrowRight, Eye, MapPin, Globe, Handshake } from 'lucide-react';

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full opacity-30 animate-gentle-float" />
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-white rounded-full opacity-20 animate-gentle-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full opacity-40 animate-subtle-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Let's Build Something Better
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-6 leading-relaxed max-w-4xl mx-auto">
            Reach out to explore a collaboration, or tell us what is not working yet.
          </p>
          
          <p className="text-lg text-white font-semibold mb-12">
            We will meet you with care and possibility.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <a
            href="https://queerlyqualified.formaloo.me/ejys27"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1"
          >
            <MessageCircle className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            Start the Conversation
            <div className="ml-3 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          <div className="flex items-center gap-4 text-blue-200">
            <div className="w-px h-8 bg-blue-300"></div>
            <span className="text-sm font-medium">or</span>
            <div className="w-px h-8 bg-blue-300"></div>
          </div>

          <a
            href="/services"
            className="group inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            View Our Services
          </a>
        </div>

        {/* Contact Info Card */}
        <div className={`mt-16 inline-block transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
            <p className="text-white font-bold text-xl mb-6 animate-gradient bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Ready to get started?
            </p>
            
            <p className="text-blue-100 mb-8 text-lg">
              Based in Battle Creek, Michigan, serving organizations nationwide
            </p>
            
            <div className="flex justify-center items-center gap-8 text-base text-blue-100">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:scale-105 hover:bg-white/15 transition-all duration-300">
                <MapPin className="w-6 h-6" />
                <span className="font-semibold">Michigan</span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:scale-105 hover:bg-white/15 transition-all duration-300">
                <Globe className="w-6 h-6" />
                <span className="font-semibold">Remote-First</span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:scale-105 hover:bg-white/15 transition-all duration-300">
                <Handshake className="w-6 h-6" />
                <span className="font-semibold">Collaborative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}