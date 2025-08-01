import React, { useEffect, useState } from 'react';
import { ArrowRight, Settings, Users, Brain, GraduationCap, Plane, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Settings,
    label: 'Systems Strategy',
    desc: 'Organizational systems design and optimization that creates lasting change and measurable impact.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    label: 'Equity Consulting',
    desc: 'Inclusive practices, accessibility audits, and bias mitigation strategies for equitable outcomes.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Brain,
    label: 'AI Development',
    desc: 'Custom artificial intelligence solutions, implementation strategies, and ethical AI frameworks.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: GraduationCap,
    label: 'Instructional Design',
    desc: 'Learning systems, curriculum development, and educational technology for effective knowledge transfer.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Plane,
    label: 'Aerial Intelligence',
    desc: 'Professional drone services, spatial analysis, and innovative aerial data collection solutions.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Lightbulb,
    label: 'Narrative & Media',
    desc: 'Strategic storytelling, content creation, and media solutions that amplify your mission.',
    color: 'from-teal-500 to-teal-600'
  },
];

export default function ServicesShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="what-we-offer" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 79px, rgb(59 130 246) 79px, rgb(59 130 246) 81px, transparent 81px), linear-gradient(rgb(59 130 246) 0.5px, transparent 0.5px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to transform your systems and amplify your impact through equity-centered practices
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.label}
                className={`group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-200 rounded-full opacity-0 group-hover:opacity-60 animate-gentle-float" />
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {service.label}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-gray-100 group-hover:border-t-blue-100 transition-colors duration-300" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <a
            href="/services"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Explore All Services</span>
            <div className="ml-2 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}