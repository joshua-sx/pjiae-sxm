
import type { Config } from "tailwindcss";

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
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1400px',
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px',
			}
		},
		extend: {
			/* === SPACING SCALE === */
			spacing: {
				'0.5': '0.125rem',  /* 2px */
				'1': '0.25rem',     /* 4px */
				'1.5': '0.375rem',  /* 6px */
				'2': '0.5rem',      /* 8px */
				'2.5': '0.625rem',  /* 10px */
				'3': '0.75rem',     /* 12px */
				'3.5': '0.875rem',  /* 14px */
				'4': '1rem',        /* 16px */
				'5': '1.25rem',     /* 20px */
				'6': '1.5rem',      /* 24px */
				'7': '1.75rem',     /* 28px */
				'8': '2rem',        /* 32px */
				'9': '2.25rem',     /* 36px */
				'10': '2.5rem',     /* 40px */
				'11': '2.75rem',    /* 44px */
				'12': '3rem',       /* 48px */
				'14': '3.5rem',     /* 56px */
				'16': '4rem',       /* 64px */
				'20': '5rem',       /* 80px */
				'24': '6rem',       /* 96px */
				'28': '7rem',       /* 112px */
				'32': '8rem',       /* 128px */
				'36': '9rem',       /* 144px */
				'40': '10rem',      /* 160px */
				'44': '11rem',      /* 176px */
				'48': '12rem',      /* 192px */
				'52': '13rem',      /* 208px */
				'56': '14rem',      /* 224px */
				'60': '15rem',      /* 240px */
				'64': '16rem',      /* 256px */
				'72': '18rem',      /* 288px */
				'80': '20rem',      /* 320px */
				'96': '24rem',      /* 384px */
			},
			
			/* === TYPOGRAPHY === */
			fontSize: {
				// Base heading sizes (desktop default)
				'h1': ['2.5rem', { lineHeight: '3rem' }],
				'h2': ['1.75rem', { lineHeight: '2.25rem' }],
				'h3': ['1.5rem', { lineHeight: '2rem' }],
				// Responsive variants if needed
				'h1-sm': ['1.5rem', { lineHeight: '2rem' }],   // mobile
				'h1-md': ['2rem',   { lineHeight: '2.5rem' }], // tablet
				'h2-sm': ['1.25rem',{ lineHeight: '1.75rem' }],
				'h2-md': ['1.5rem', { lineHeight: '2rem' }],
				'h3-sm': ['1.125rem', { lineHeight: '1.5rem' }],
				'h3-md': ['1.25rem', { lineHeight: '1.75rem' }],
			},
			
			/* === COLOR PALETTE === */
			colors: {
				// Primary brand colors
				primary: 'var(--color-primary, #0A66C2)',
				'primary-foreground': '#FFFFFF',
				'primary-light': 'var(--color-primary-light, #34A9FF)',
				'primary-dark': 'var(--color-primary-dark, #094D92)',
				
				// UI semantic colors
				heading: 'var(--color-primary, #0A66C2)',
				subheading: '#374151',
				success: 'var(--color-success, #4CAF50)',
				warning: 'var(--color-warning, #FF9800)',
				danger: 'var(--color-danger, #F44336)',
				info: 'var(--color-info, #34A9FF)',
				
				// System UI colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
					DEFAULT: 'hsl(var(--sidebar-background, 0 0% 100%))',
					foreground: 'hsl(var(--sidebar-foreground, 240 10% 3.9%))',
					primary: 'hsl(var(--sidebar-primary, 240 5.9% 10%))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground, 0 0% 98%))',
					accent: 'hsl(var(--sidebar-accent, 240 4.8% 95.9%))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground, 240 5.9% 10%))',
					border: 'hsl(var(--sidebar-border, 240 5.9% 90%))',
					ring: 'hsl(var(--sidebar-ring, 240 5.9% 10%))'
				},
				// PJIAE Colors - Consolidated
				pjiae: {
					lightblue: 'var(--color-primary-light, #34A9FF)',
					lightgray: 'var(--color-gray-light, #F2F7FB)',
					darkblue: 'var(--color-primary-dark, #094D92)',
					warning: 'var(--color-warning, #FF9800)',
					success: 'var(--color-success, #4CAF50)',
					danger: 'var(--color-danger, #F44336)',
				}
			},
			
			/* === BORDER RADIUS === */
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			
			/* === ANIMATIONS === */
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
