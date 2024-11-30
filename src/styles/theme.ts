export const colors = {
  primary: {
    light: '#3B82F6',  // blue-500
    dark: '#60A5FA',   // blue-400
  },
  secondary: {
    light: '#06B6D4',  // cyan-500
    dark: '#22D3EE',   // cyan-400
  },
  background: {
    light: '#FFFFFF',  // white
    dark: '#0F172A',   // chat-dark-navy
  },
  surface: {
    light: '#F3F4F6',  // gray-100
    dark: '#1E293B',   // chat-darker
  },
  text: {
    primary: {
      light: '#111827', // gray-900
      dark: '#F9FAFB',  // gray-50
    },
    secondary: {
      light: '#6B7280', // gray-500
      dark: '#9CA3AF',  // gray-400
    }
  },
  border: {
    light: '#E5E7EB',  // gray-200
    dark: '#374151',   // gray-700
  },
  success: {
    light: '#10B981',  // emerald-500
    dark: '#34D399',   // emerald-400
  },
  error: {
    light: '#EF4444',  // red-500
    dark: '#F87171',   // red-400
  },
  warning: {
    light: '#F59E0B',  // amber-500
    dark: '#FBBF24',   // amber-400
  }
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const typography = {
  fontFamily: {
    sans: ['Lexend', 'system-ui', 'sans-serif'],
    display: ['Lexend', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
};