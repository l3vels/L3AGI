// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    body: {
      backgroundColor: string
      boxShadow: string
      backdropFilter: string
      textColor: string
      backgroundImage: string
      backgroundImageSecondary: string
      testVariableColor: string
    }
  }
}
