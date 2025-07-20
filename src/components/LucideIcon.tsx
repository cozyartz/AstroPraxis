import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const LucideIcon: React.FC<LucideIconProps> = ({ 
  name, 
  size = 24, 
  className = "", 
  strokeWidth = 2 
}) => {
  // Convert kebab-case to PascalCase for Lucide icon names
  const iconName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[iconName];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" (${iconName}) not found in Lucide icons`);
    // Fallback to a default icon
    return <LucideIcons.AlertCircle size={size} className={className} strokeWidth={strokeWidth} />;
  }
  
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};

export default LucideIcon;
