import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Status Colors
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))'
				},
				// Duesly Color Palette - Blue Based
				duesly: {
					50: '#eff6ff',   // blue-50
					100: '#dbeafe',  // blue-100
					200: '#bfdbfe',  // blue-200
					300: '#93c5fd',  // blue-300
					400: '#60a5fa',  // blue-400
					500: '#3b82f6',  // blue-500
					600: '#2563eb',  // blue-600 - Main brand color
					700: '#1d4ed8',  // blue-700 - Hover states
					800: '#1e40af',  // blue-800
					900: '#1e3a8a',  // blue-900
				},
				// Gray Scale for Text and UI
				gray: {
					50: '#f9fafb',   // gray-50
					100: '#f3f4f6',  // gray-100
					200: '#e5e7eb',  // gray-200
					300: '#d1d5db',  // gray-300
					400: '#9ca3af',  // gray-400
					500: '#6b7280',  // gray-500
					600: '#4b5563',  // gray-600
					700: '#374151',  // gray-700
					800: '#1f2937',  // gray-800
					900: '#111827',  // gray-900
				},
				// Status Colors - Extended Palette
				green: {
					50: '#f0fdf4',   // green-50
					100: '#dcfce7',  // green-100
					500: '#22c55e',  // green-500
					600: '#16a34a',  // green-600 - Success states
				},
				red: {
					50: '#fef2f2',   // red-50
					100: '#fee2e2',  // red-100
					500: '#ef4444',  // red-500
					600: '#dc2626',  // red-600 - Error states
				},
				yellow: {
					50: '#fffbeb',   // yellow-50
					100: '#fef3c7',  // yellow-100
					500: '#eab308',  // yellow-500
					600: '#ca8a04',  // yellow-600 - Warning states
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
