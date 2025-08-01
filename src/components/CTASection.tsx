import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Eye, MapPin, Globe, Handshake } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full opacity-30"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-6 h-6 bg-white rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full opacity-40"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Let's Build Something Better
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-6 leading-relaxed max-w-4xl mx-auto">
            Reach out to explore a collaboration, or tell us what is not working yet.
          </p>
          
          <p className="text-lg text-white font-semibold mb-12">
            We will meet you with care and possibility.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.a
            href="https://queerlyqualified.formaloo.me/ejys27"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            Start the Conversation
            <motion.div
              className="ml-3"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.a>

          <div className="flex items-center gap-4 text-blue-200">
            <div className="w-px h-8 bg-blue-300"></div>
            <span className="text-sm font-medium">or</span>
            <div className="w-px h-8 bg-blue-300"></div>
          </div>

          <motion.a
            href="/services"
            className="group inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            View Our Services
          </motion.a>
        </motion.div>

        {/* Contact Info Card */}
        <motion.div 
          className="mt-16 inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
            <motion.p 
              className="text-white font-bold text-xl mb-6"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                background: 'linear-gradient(90deg, #fff, #e0f2fe, #fff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ready to get started?
            </motion.p>
            
            <p className="text-blue-100 mb-8 text-lg">
              Based in Battle Creek, Michigan, serving organizations nationwide
            </p>
            
            <div className="flex justify-center items-center gap-8 text-base text-blue-100">
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <MapPin className="w-6 h-6" />
                <span className="font-semibold">Michigan</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                transition={{ delay: 0.1 }}
              >
                <Globe className="w-6 h-6" />
                <span className="font-semibold">Remote-First</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                transition={{ delay: 0.2 }}
              >
                <Handshake className="w-6 h-6" />
                <span className="font-semibold">Collaborative</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}