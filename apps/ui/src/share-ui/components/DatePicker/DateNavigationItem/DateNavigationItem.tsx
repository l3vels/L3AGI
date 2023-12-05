import React from 'react'

import IconButton from '../../../components/IconButton/IconButton'
import { DropdownChevronLeft, DropdownChevronRight } from 'share-ui/components/Icon/Icons'

interface DateNavigationItemProps {
  kind: 'prev' | 'next'
  onClick?: () => void
}
const DateNavigationItem = ({ kind, onClick }: DateNavigationItemProps) => {
  return (
    <div>
      <IconButton
        size={IconButton.sizes?.XS}
        onClick={() => onClick && onClick()}
        icon={kind === 'prev' ? DropdownChevronLeft : DropdownChevronRight}
      />
    </div>
  )
}

export default DateNavigationItem
