import React from 'react';
import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function ServicesShowcase() {
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to transform your systems and amplify your impact through equity-centered practices
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.article
                key={service.label}
                variants={itemVariants}
                className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Floating particles */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-4 h-4 bg-blue-200 rounded-full opacity-0 group-hover:opacity-60"
                    animate={{ 
                      y: [0, -10, 0],
                      x: [0, 5, 0] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.2 
                    }}
                  />
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
                <motion.div 
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-gray-100 group-hover:border-t-blue-100 transition-colors duration-300`} />
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.a
            href="/services"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Services</span>
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}