import { useEffect, useRef, useState } from 'react' //

import Typography from 'share-ui/components/typography/Typography'

import SortIcon from 'assets/svgComponents/SortIcon.svg'
import styled from 'styled-components'

import MenuOutline from 'share-ui/components/Icon/Icons/components/MenuOutline'
import TypographyPrimary from 'components/Typography/Primary'

const HeaderComponent = (props: any) => {
  const { icon, displayName, noText } = props

  const [ascSort, setAscSort] = useState(false)
  const [descSort, setDescSort] = useState(false)
  const [noSort, setNoSort] = useState(false)
  const refButton = useRef(null)

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current!)
  }

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? true : false)
    setDescSort(props.column.isSortDescending() ? true : false)
    setNoSort(!props.column.isSortAscending() && !props.column.isSortDescending() ? true : false)
  }

  const onSortRequested = (order: 'asc' | 'desc' | null, event: any) => {
    props.setSort(order, event.shiftKey)
  }

  const sortHandler = (event: any) => {
    if (noSort === true) {
      onSortRequested('asc', event)
    } else if (ascSort === true) {
      onSortRequested('desc', event)
    } else if (descSort === true) {
      onSortRequested(null, event)
    }
  }

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged)
    onSortChanged()
  }, [])

  //   let menu = null
  //   if (props.enableMenu) {
  const menu = (
    <StyledMenuContent onClick={() => onMenuClicked()}>
      <StyledMenuIcon>
        <MenuOutline />
      </StyledMenuIcon>
    </StyledMenuContent>
  )
  //   }

  //   let sort = null
  //   if (props.enableSorting) {
  let sortState: any
  if (noSort) {
    sortState = 'noSort'
  } else if (ascSort) {
    sortState = 'ascSort'
  } else if (descSort) {
    sortState = 'descSort'
  }
  const sort = (
    <StyledSortIcon sort={sortState}>
      <SortIcon />
    </StyledSortIcon>
  )
  //   }

  return (
    <StyledMainWrapper ref={refButton}>
      <StyledHeadingWrapper onClick={(event: any) => sortHandler(event)}>
        {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
        {!noText && (
          <TypographyPrimary
            value={displayName}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        )}
        {sort}
      </StyledHeadingWrapper>
      {menu}
    </StyledMainWrapper>
  )
}

export default HeaderComponent

const StyledMenuIcon = styled.div`
  /* display: none; */
  opacity: 0;
  width: 30px;
  color: #fff;
`
const StyledMainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* gap: 5px; */
  background-color: transparent;
  &:hover {
    ${StyledMenuIcon} {
      /* display: block; */
      opacity: 1;
    }
  }
`

const StyledHeadingWrapper = styled.div`
  /* float: left;
  margin: 0 0 0 3px; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  gap: 5px;
`

const StyledMenuContent = styled.div`
  /* float: left; */
  /* margin-left: auto; */
  justify-self: flex-end;
  /* margin: 0 0 0 3px; */
`
const StyledSortIcon = styled.div<{ sort?: string }>`
  opacity: ${p => (p.sort === 'noSort' ? '0' : '1')};
  transform: ${p => p.sort === 'ascSort' && 'rotate(180deg)'};
`
const StyledIconWrapper = styled.div`
  width: 25px;
  min-width: 25px;

  color: #fff;
`
