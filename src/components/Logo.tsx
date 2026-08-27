import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

const sizeMap = {
  sm: { icon: 24, text: 'text-lg' },
  md: { icon: 32, text: 'text-xl' },
  lg: { icon: 48, text: 'text-2xl' },
  xl: { icon: 64, text: 'text-4xl' },
};

/**
 * Logo Component
 * 
 * Centralized logo component for easy replacement across the application.
 * 
 * TO REPLACE LOGO:
 * 1. Add your logo image to: /public/logo.png
 * 2. If transparent PNG, set HAS_CUSTOM_LOGO to true below
 * 3. If you need different light/dark versions:
 *    - Add /public/logo-light.png and /public/logo-dark.png
 *    - Update the code to use variant prop
 * 
 * Current: Using icon fallback until custom logo is provided
 */
export function Logo({ size = 'md', showText = true, className = '', variant = 'light' }: LogoProps) {
  const { icon, text } = sizeMap[size];
  
  // Set this to true when you add your custom logo to /public/logo.png
  const HAS_CUSTOM_LOGO = false;
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {HAS_CUSTOM_LOGO ? (
        // Custom logo image
        <div className="relative" style={{ width: icon, height: icon }}>
          <Image
            src="/logo.png"
            alt="Great Delight Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      ) : (
        // Fallback icon (sparkles representing "Great Delight")
        <div 
          className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 p-2`}
          style={{ width: icon, height: icon }}
        >
          <Sparkles className="text-white" size={icon * 0.6} />
        </div>
      )}
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${text} ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            GREAT DELIGHT
          </span>
          <span className={`text-xs ${variant === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Fast Food Restaurant
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Logo Icon Only (for favicons, small spaces)
 */
export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  const HAS_CUSTOM_LOGO = false;
  
  if (HAS_CUSTOM_LOGO) {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <Image
          src="/logo.png"
          alt="Great Delight"
          fill
          className={`object-contain ${className}`}
          priority
        />
      </div>
    );
  }
  
  return (
    <div 
      className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 ${className}`}
      style={{ width: size, height: size }}
    >
      <Sparkles className="text-white" size={size * 0.6} />
    </div>
  );
}
