import styled from 'styled-components'

const StyledAppContainer = styled.div<{ backgroundImage?: string }>`
  background-image: url(${p =>
    p.backgroundImage ? p.backgroundImage : p.theme.body.backgroundImage});
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto 1fr;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
`

const StyledMainLayout = styled.div<{ showMenu?: boolean }>`
  display: grid;
  grid-template-columns: ${p => (p.showMenu ? 'auto' : 'minmax(397px, auto)')} 1fr;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  width: 100%;
  height: 100%;
`

const StyledMainSectionCopy = styled.div`
  background: rgba(255, 255, 255, 0.1);
  overflow: auto;
  height: 100vh;
  min-height: 100vh;
  overflow: auto;
  section {
    padding: 10px 24px;
  }
`
const StyledMainSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  overflow: auto;
  height: 100vh;
  min-height: 100vh;
  overflow: auto;
  /* section {
    padding: 10px 24px;
  } */
`

const StyledMainWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const StyledAdminLayoutEdit = styled(StyledMainLayout)`
  grid-template-columns: 1fr;
  gap: unset;
  overflow: scroll;
`

const StyledPublicRouteWrapper = styled.div`
  background-image: url(${p => p.theme.body.backgroundImageSecondary});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`

const StyledPublicRouteWrapperLayer = styled.div`
  dispay: grid;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  display: grid;
`

export {
  StyledAppContainer,
  StyledMainLayout,
  StyledMainSection,
  StyledMainWrapper,
  StyledAdminLayoutEdit,
  StyledPublicRouteWrapper,
  StyledPublicRouteWrapperLayer,
  StyledMainSectionCopy,
}
