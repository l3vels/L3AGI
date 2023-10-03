//eslint-disable-next-line
import { DefaultTheme } from 'styled-components'
import defaultBgImage from 'assets/backgrounds/main-bg.jpg'
import defaultBgImageSecondary from 'assets/backgrounds/main_bg_secondary.jpeg'

const darkTheme: DefaultTheme = {
  body: {
    backgroundImage: defaultBgImage,
    backgroundColorPrimary:
      'linear-gradient(265.15deg, rgba(76, 166, 248, 1) -32.37%, rgba(33, 82, 243, 1) 100%)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backgroundColorSecondary: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(100px)',
    textColorPrimary: 'rgba(255, 255, 255)',
    textColorSecondary: 'rgba(255,255,255, 0.8)',
    border: 'none',
    backgroundImageSecondary: defaultBgImageSecondary,
    testVariableColor: 'var(--color-brand-blue)',
    iconColor: 'rgb(255, 255, 255)',
    mainNavColorActive: 'var(--content-content-primary, #FFF)',
    mainNavColor: 'var(--content-content-tertiary, rgba(255, 255, 255, 0.6))',
    breadCrumbsColor: 'rgba(255, 255, 255, 0.80)',
    breadCrumbsBg: 'rgba(255, 255, 255, 0.1)',
    commandBorderColor: ' 1px solid var(--basic-foreground-white-2, rgba(255, 255, 255, 0.2))',
    placeHolderColor: 'rgba(255, 255, 255, 0.4)',
    cardBgColor: 'rgba(0, 0, 0, 0.2)',
    secondaryBorder: 'none',
    humanMessageBgColor: 'var(--basic-foreground-white-1, rgba(255, 255, 255, 0.1))',
    replyBoxBgColor: 'rgba(0, 0, 0, 0.4)',
    secondaryIconColor: 'rgb(255, 255, 255)',
    avatarDropDownColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.10) 100%), linear-gradient(225deg, rgba(76, 166, 248, 0.10) 0%, rgba(33, 82, 243, 0.10) 100%);',
  },
  typography: {
    contentPrimary: 'var(--color-primitive-white)',
    contentSecondary: 'var(--color-transparent-white-08)',
    contentTertiary: 'var(--color-transparent-white-06',
    contentQuaternary: 'var(--color-transparent-white-04)',
  },
  heading: {
    contentPrimary: 'var(--color-snow_white)',
    contentSecondary: 'var(--color-transparent-white-09)',
    contentTertiary: 'var(--color-transparent-white-04)',
  },
  button: {
    primary: 'PRIMARY',
    secondary: 'SECONDARY',
    tertiary: 'TERTIARY',
  },
}

const lightTheme: DefaultTheme = {
  body: {
    backgroundImage: defaultBgImage,
    backgroundColorPrimary: 'rgb(253,252,250)',
    backgroundColorSecondary: 'rgb(255, 255, 255)',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(50px);',
    textColorPrimary: 'rgb(59, 59, 59)',
    textColorSecondary: 'rgb(110,110,110)',
    border: '1px solid #acacad',
    backgroundImageSecondary: defaultBgImageSecondary,
    testVariableColor: 'var(--color-highlight_blue)',
    iconColor: 'rgb(187,187,187)',
    mainNavColorActive: 'rgb(80,80,80)',
    mainNavColor: 'rgb(193,193,193)',
    breadCrumbsColor: 'rgb(91,91,91)',
    breadCrumbsBg: 'rgb(217,217,217)',
    commandBorderColor: '1px solid rgb(126,126,126)',
    placeHolderColor: 'rgb(187,187,187)',
    cardBgColor: 'rgb(255,255,255)',
    secondaryBorder: '1px solid lightGray',
    humanMessageBgColor: 'rgb(240,240,240)',
    replyBoxBgColor: 'rgb(194,194,194)',
    secondaryIconColor: 'rgb(255, 255, 255)',
    avatarDropDownColor: 'rgb(255, 255, 255)',
  },
  typography: {
    contentPrimary: 'rgb(0,0,0)',
    contentSecondary: 'rgb(110,110,110)',
    contentTertiary: 'rgb(172,172, 173)',
    contentQuaternary: 'rgb(189,189,189)',
  },
  heading: {
    contentPrimary: 'rgb(0,0,0)',
    contentSecondary: 'rgb(49,49,49)',
    contentTertiary: 'rgb(172,172, 173)',
  },
  button: {
    primary: 'PRIMARY',
    secondary: 'SECONDARY',
    tertiary: 'SECONDARY',
  },
}

export { lightTheme, darkTheme }
