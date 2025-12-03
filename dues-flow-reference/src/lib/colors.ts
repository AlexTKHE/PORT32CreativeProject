// Color Palette based on #148F32 (Primary Green)
// This creates a sophisticated, professional color system

export const colors = {
  // Primary Colors
  primary: {
    50: '#f0f9f0',   // Very light green tint
    100: '#dcf2dc',  // Light green background
    200: '#b8e4b8',  // Light green borders
    300: '#8dd18d',  // Medium light green
    400: '#5cbd5c',  // Medium green
    500: '#148F32',  // Primary green (base)
    600: '#0f6b26',  // Darker green for hover states
    700: '#0a4f1c',  // Even darker for active states
    800: '#063312',  // Very dark green
    900: '#031a09',  // Darkest green
  },
  
  // Neutral Colors (complementary to green)
  neutral: {
    50: '#fafbfa',   // Very light grey-green
    100: '#f5f6f5',  // Light grey-green
    200: '#e6e8e6',  // Light grey borders
    300: '#d1d4d1',  // Medium light grey
    400: '#a8aca8',  // Medium grey
    500: '#7a7e7a',  // Medium dark grey
    600: '#5a5e5a',  // Dark grey
    700: '#3e4a3d',  // Dark grey-green (current navbar)
    800: '#2d352c',  // Very dark grey-green
    900: '#1a1f1a',  // Darkest grey-green
  },
  
  // Accent Colors
  accent: {
    success: '#148F32',    // Same as primary
    warning: '#f59e0b',    // Amber for warnings
    error: '#dc2626',      // Red for errors
    info: '#3b82f6',       // Blue for info
  },
  
  // Background Colors
  background: {
    primary: '#ffffff',     // White
    secondary: '#f8faf8',   // Very light green tint
    tertiary: '#f0f9f0',   // Light green background
    dark: '#1a1f1a',       // Dark background
  },
  
  // Text Colors
  text: {
    primary: '#1a1f1a',    // Dark text
    secondary: '#5a5e5a',  // Medium grey text
    tertiary: '#7a7e7a',   // Light grey text
    inverse: '#ffffff',     // White text
    accent: '#148F32',     // Green accent text
  }
};

// Tailwind CSS classes for easy use
export const colorClasses = {
  // Primary button styles
  primaryButton: 'bg-[#148F32] hover:bg-[#0f6b26] text-white',
  secondaryButton: 'bg-[#f0f9f0] hover:bg-[#dcf2dc] text-[#148F32] border border-[#148F32]',
  
  // Background styles
  primaryBg: 'bg-[#148F32]',
  secondaryBg: 'bg-[#f8faf8]',
  tertiaryBg: 'bg-[#f0f9f0]',
  
  // Text styles
  primaryText: 'text-[#1a1f1a]',
  secondaryText: 'text-[#5a5e5a]',
  accentText: 'text-[#148F32]',
  inverseText: 'text-white',
  
  // Border styles
  primaryBorder: 'border-[#148F32]',
  secondaryBorder: 'border-[#e6e8e6]',
  
  // Focus styles
  primaryFocus: 'focus:border-[#148F32] focus:ring-[#148F32]',
}; 