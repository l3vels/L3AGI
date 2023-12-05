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
      teamChatCardSelectedColor: string
      componentsWrapperBg: string
      componentsSecondaryWrapperBg: string
      textareaBorder: string
      textAreaBgColor: string
      tertiaryIconColor: string
      dropdownBgColor: string
      dataLoaderCardBorder: string
      textColorTertiary: string
      tableBackgroundColor: string
      sliderBackgroundColor: string
      dropdownSecondaryBgColor: string
      commandMenuBackgroundColor: string
      warningToastTextColor: string
      sessionDropdownBorder: string
      tagColor: string
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
      primary: ButtonStyleProps
      secondary: ButtonStyleProps
      tertiary: ButtonStyleProps
    }
    textFiled: {
      primary: {
        color: string
        bgColor: string
        borderColor: string
        activeBoxShadow: string
        activeBorderColor: string
        activeBgColor: string
        errorBorderColor: string
        errorColor: string
      }
    }
    tabs: {
      color: string
      hoverBgColor: string
      activeColor: string
      activeBgColor: string
      borderColor: string
    }
  }
}

type ButtonStyleProps = {
  color: string
  bgColor: string
  hoverBgColor: string
  pressedBgColor: string
  pressedBorderColor: string
}
