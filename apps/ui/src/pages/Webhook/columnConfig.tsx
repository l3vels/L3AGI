import Typography from '@l3-lib/ui-core/dist/Typography'
import Icon from '@l3-lib/ui-core/dist/Icon'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Badge from '@l3-lib/ui-core/dist/Badge'
import Alert from '@l3-lib/ui-core/dist/icons/Alert'

import Web from '@l3-lib/ui-core/dist/icons/Web'
import Link from '@l3-lib/ui-core/dist/icons/Link'
import Status from '@l3-lib/ui-core/dist/icons/Status'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import styled from 'styled-components'

export default () => {
  type RendererProps = {
    webhooks(data: string): string
    value: string
  }
  const TextCellRenderer = (props: RendererProps) => (
    <div>
      <Typography
        value={props.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='rgba(255, 255, 255, 1)'
      />
    </div>
  )

  const TypeCellRenderer = (props: RendererProps) => {
    const value = props.value === null && 'Account'
    return (
      <div>
        <Typography
          value={value}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      </div>
    )
  }

  const UrlCellRenderer = (props: RendererProps) => (
    <div
      style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}
    >
      <Icon iconType={Icon.type.SVG} icon={Web} iconLabel='my bolt svg icon' iconSize={20} />
      <Typography
        value={props.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='rgba(255, 255, 255, 1)'
      />
    </div>
  )

  const ErrorRateCellRenderer = (props: RendererProps) => {
    const value = props.value === null && '0%'
    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='rgba(255, 255, 255, 1)'
      />
    )
  }

  const StatusCellRenderer = (props: RendererProps) => {
    const value = props.value === null && (
      // <Tags
      //   label={
      //     <Typography
      //       value='Active'
      //       type={Typography.types.LABEL}
      //       size={Typography.sizes.xss}
      //       customColor='rgba(0, 0, 0, 0.7)'
      //     />
      //   }
      //   readOnly
      //   color={Tags.colors.gradient_green}
      // />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <Badge isDot={true} dot='positive' />
        <Typography
          value='Available'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </div>
    )
    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='rgba(255, 255, 255, 1)'
      />
    )
  }

  return [
    {
      headerName: 'URL',
      headerComponent: HeaderComponent,
      field: 'url',
      filter: 'agTextColumnFilter',
      cellRenderer: UrlCellRenderer,
      // sortable: true,
      minWidth: 200,
      width: 300,
      flex: 2,
      headerComponentParams: {
        icon: <Link />,
      },
    },
    {
      headerName: 'Type',
      headerComponent: HeaderComponent,
      field: 'game_id',
      filter: 'agTextColumnFilter',
      cellRenderer: TypeCellRenderer,
      minWidth: 150,
      width: 160,
      flex: 1,
      headerComponentParams: {
        icon: <TagsOutline />,
      },
    },
    {
      headerName: 'Description',
      headerComponent: HeaderComponent,
      field: 'description',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      minWidth: 200,
      width: 300,
      flex: 2,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
      },
    },
    {
      headerName: 'Error rate',
      headerComponent: HeaderComponent,
      field: 'transaction_id',
      filter: 'agTextColumnFilter',
      cellRenderer: ErrorRateCellRenderer,
      minWidth: 150,
      width: 160,
      flex: 1,
      headerComponentParams: {
        icon: <Alert size='17' />,
      },
    },
    {
      headerName: 'Status',
      headerComponent: HeaderComponent,
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: StatusCellRenderer,
      minWidth: 100,
      width: 115,
      flex: 1,

      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Status />
          </StyledOutlineIcon>
        ),
      },
    },
  ]
}

export const StyledOutlineIcon = styled.div`
  color: transparent;
  /* width: 40px; */
`
