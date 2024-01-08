/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import cx from 'classnames'
import { components } from 'react-select'
import { ChildrenContent } from '../ChildrenContent/ChildrenContent'
import Typography from 'share-ui/components/typography/Typography'
import { useTheme } from 'styled-components'

const SingleValue = props => {
  const theme = useTheme()

  const { Renderer, data, children } = props

  const value = Renderer ? (
    <Renderer {...data} />
  ) : (
    <ChildrenContent data={data}>{children}</ChildrenContent>
  )
  return (
    <components.SingleValue {...props} className={cx('dropdown-wrapper__single-value--reset')}>
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size='medium'
        customColor={theme.typography.contentPrimary}
      />
    </components.SingleValue>
  )
}

export default SingleValue
