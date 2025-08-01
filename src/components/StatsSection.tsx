import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  {
    number: 5,
    suffix: '+',
    label: 'Years of Impact',
    description: 'Transforming organizations nationwide',
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: 100,
    suffix: '%',
    label: 'Equity-Centered',
    description: 'Every solution designed for inclusion',
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: 50,
    suffix: '+',
    label: 'Organizations Served',
    description: 'From startups to enterprises',
    color: 'from-pink-500 to-pink-600'
  },
  {
    number: 0,
    suffix: '',
    label: 'Infinite Possibilities',
    description: 'When systems work for everyone',
    color: 'from-green-500 to-green-600',
    isInfinity: true
  }
];

function AnimatedNumber({ 
  target, 
  suffix = '', 
  isInfinity = false, 
  inView 
}: { 
  target: number; 
  suffix?: string; 
  isInfinity?: boolean; 
  inView: boolean; 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || isInfinity) return;

    const increment = target / 50;
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [target, inView, isInfinity]);

  if (isInfinity) {
    return (
      <motion.span
        className="text-6xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent"
        animate={inView ? { 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        ∞
      </motion.span>
    );
  }

  return (
    <span className="text-6xl font-bold">
      {Math.floor(count)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Impact by the Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measuring success through meaningful transformation and lasting change
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div 
                className="relative inline-block mb-4"
                whileHover={{ scale: 1.05 }}
              >
                {/* Glowing background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                
                {/* Content container */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 group-hover:border-gray-300 transition-all duration-300">
                  <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    <AnimatedNumber 
                      target={stat.number} 
                      suffix={stat.suffix} 
                      isInfinity={stat.isInfinity}
                      inView={inView}
                    />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-sm text-gray-600">
                    {stat.description}
                  </p>

                  {/* Decorative elements */}
                  <motion.div 
                    className={`absolute top-2 right-2 w-3 h-3 bg-gradient-to-r ${stat.color} rounded-full opacity-60`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-block bg-white rounded-2xl px-8 py-4 shadow-lg border border-gray-200">
            <p className="text-gray-700 font-medium">
              Ready to add your organization to these numbers?
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center mt-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              whileHover={{ x: 5 }}
            >
              Let's start the conversation
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}