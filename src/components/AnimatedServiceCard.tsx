// === 4. components/AnimatedServiceCard.tsx ===
import { motion } from 'framer-motion';
import type { FC } from 'react';

interface Props {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

const AnimatedServiceCard: FC<Props> = ({ icon, title, desc, href }) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="block bg-gray-900 border border-indigo-700 rounded-xl p-6 shadow-md hover:shadow-xl transition text-left"
  >
    <div className="flex items-center gap-3 mb-3">
      <i className={`${icon} text-2xl text-indigo-400`} aria-hidden="true"></i>
      <h3 className="text-lg font-semibold text-white group-hover:text-white">{title}</h3>
    </div>
    <p className="text-sm text-gray-300 group-hover:text-gray-100">{desc}</p>
  </motion.a>
);

export default AnimatedServiceCard;
