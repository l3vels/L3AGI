// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: {
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
      iconColor: string
      mainNavColor: string
      mainNavColorActive: string
      breadCrumbsColor: string
      breadCrumbsBg: string
      commandBorderColor: string
      placeHolderColor: string
      cardBgColor: string
    }
  }
}
