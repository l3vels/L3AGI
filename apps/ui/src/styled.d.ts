// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: {
      avatarDropDownColor: string
      backgroundColorPrimary: string
      backgroundColorSecondary: string
      boxShadow: string
      backdropFilter: string
      textColorPrimary: string
      textColorSecondary: string
      backgroundImage: string
      backgroundImageSecondary: string
      testVariableColor: string
      border: string
      secondaryBorder: string
      iconColor: string
      mainNavColor: string
      mainNavColorActive: string
      breadCrumbsColor: string
      breadCrumbsBg: string
      commandBorderColor: string
      placeHolderColor: string
      cardBgColor: string
      humanMessageBgColor: string
      replyBoxBgColor: string
      secondaryIconColor: string
      detailCardBackgroundColor: string
      toolkitCardBgColorPrimary: string
      toolkitCardBgColorSecondary: string
      toolkitCardBgColorTertiary: string
    }
    typography: {
      contentPrimary: string
      contentSecondary: string
      contentTertiary: string
      contentQuaternary: string
    }
    heading: {
      contentPrimary: string
      contentSecondary: string
      contentTertiary: string
    }
    button: {
      primary: string
      secondary: string
      tertiary: string
    }
  }
}
