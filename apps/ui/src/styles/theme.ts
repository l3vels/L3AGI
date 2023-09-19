//eslint-disable-next-line
import { DefaultTheme } from 'styled-components'
import defaultBgImage from 'assets/backgrounds/main-bg.jpg'
import defaultBgImageSecondary from 'assets/backgrounds/main_bg_secondary.jpeg'

const defaultTheme: DefaultTheme = {
  body: {
    backgroundImage: defaultBgImage,
    backgroundColor: 'radial-gradient(52.7% 52.7% at 50% 50%, #3e4ea9 0%, #111b52 100%)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(50px)',
    textColor: 'rgba(255, 255, 255)',
    backgroundImageSecondary: defaultBgImageSecondary,
    testVariableColor: 'var(--color-brand-blue)',
  },
}

const lightTheme: DefaultTheme = {
  body: {
    backgroundImage: defaultBgImage,
    backgroundColor: 'linear-gradient(330deg,hsl(272, 53%, 50%) 0%, hsl(226, 68%, 56%) 100%)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(50px);',
    textColor: 'rgba(255, 255, 255)',
    backgroundImageSecondary: defaultBgImageSecondary,
    testVariableColor: 'var(--color-highlight_blue)',
  },
}

export { defaultTheme, lightTheme }
