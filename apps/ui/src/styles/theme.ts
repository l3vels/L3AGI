//eslint-disable-next-line
import { DefaultTheme } from 'styled-components'
import defaultBgImage from 'assets/backgrounds/main-bg.jpg'
import defaultBgImageSecondary from 'assets/backgrounds/main_bg_secondary.jpeg'

const darkTheme: DefaultTheme = {
  body: {
    backgroundImage: defaultBgImage,
    backgroundColor:
      'linear-gradient(265.15deg, rgba(76, 166, 248, 1) -32.37%, rgba(33, 82, 243, 1) 100%)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(50px)',
    textColor: 'rgba(255, 255, 255)',
    backgroundImageSecondary: defaultBgImageSecondary,
  },
}

const lightTheme: DefaultTheme = {
  body: {
    backgroundImage: defaultBgImage,
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(50px);',
    textColor: 'rgba(255, 255, 255)',
    backgroundImageSecondary: defaultBgImageSecondary,
  },
}

export { lightTheme, darkTheme }
