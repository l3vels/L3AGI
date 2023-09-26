import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './styles.css'
import { AgGridReact } from 'ag-grid-react'
import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useContext,
  useLayoutEffect,
} from 'react'

// import { useTranslation } from 'react-i18next'

// import useDataGrid from './useDataGrid'
// import { AddRowButton } from './AddRowButton'

// import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

import processDataFromClipboard from './helpers/processDataFromClipboard'
import styled from 'styled-components'
import { LayoutContext } from 'contexts'
import { useLocation } from 'react-router-dom'
import includes from 'lodash/includes'
import { GridReadyEvent } from 'ag-grid-community'

interface IProps {
  data: any
  columnConfig: any
  groupPanel?: boolean
  ref?: any
  contextMenu?: any
  noBorder?: boolean
  headerHeight?: number
  isResourceHub?: boolean
  onSelectionChanged?: () => void
  onGridReady?: (params: GridReadyEvent<any>) => void
  maxHeight?: number | null
}

const DataGrid = forwardRef(
  (
    {
      data,
      columnConfig,
      groupPanel,
      contextMenu,
      noBorder = false,
      headerHeight,
      isResourceHub,
      onSelectionChanged,
      onGridReady,
      maxHeight = null,
    }: IProps,
    ref,
  ) => {
    const [
      showGroupPanel,
      //  setShowGroupPanel
    ] = useState(false)
    // const cellEditFn = useUpdateCacheThenServerProperty()
    const { pathname } = useLocation()

    const hrefParts = window.location.href.split('/')
    const path = hrefParts[hrefParts.length - 1]
    const [elementHeights, setElementHeight] = useState(0)
    const { expand } = useContext(LayoutContext)

    const [main_header_sum, set_main_header_sum] = useState(0)
    const [main_footer_sum, set_main_footer_sum] = useState(0)
    const [inner_navigation_sum, set_inner_navigation_sum] = useState(0)
    const [inner_header_sum, set_inner_header_sum] = useState(0)
    const [header_group_sum, set_header_group] = useState(0)
    const [components_wrapper, set_components_wrapper] = useState(0)

    const [active, setActive] = useState<string[]>([])

    const hideNavbar = includes(active, 'collection')
    const isResources = includes(active, 'resources')

    const gridRef: any = useRef({})
    const [cellBeingEdited, setCellBeingEdited] = useState(false)
    const [prevNode, setPrevNode] = useState({
      guid: null,
      colId: null,
    })

    useEffect(() => {
      if (gridRef.current.api) {
        gridRef.current.api.refreshToolPanel()
      }
    }, [showGroupPanel])

    const defaultColDef = useMemo(
      () => ({
        sortable: true,
        enableRowGroup: true,
        wrapText: true,
        autoHeight: true,
      }),
      [],
    )

    const onCellClicked = (e: any) => {
      setPrevNode({
        colId: e.column.colId,
        guid: e.data.guid,
      })

      if (e.column.colId === prevNode.colId && e.data.guid === prevNode.guid) {
        setCellBeingEdited(true)
        return
      }

      if (!cellBeingEdited) {
        setCellBeingEdited(true)
      } else {
        gridRef.current.api.stopEditing()
        setCellBeingEdited(false)
      }
    }

    const defaultContextMenu = (params: any) => {
      const result = [...params.defaultItems]

      return result
    }

    useEffect(() => {
      const pathArr = pathname ? pathname.split('/') : []
      setActive(pathArr)
    }, [pathname])

    useLayoutEffect(() => {
      const main_header = document.getElementById('main_header')
      if (main_header) set_main_header_sum(main_header.getBoundingClientRect().height)

      const header_group = document.getElementById('header_group')
      if (header_group) set_header_group(header_group.getBoundingClientRect().height)

      const main_footer = document.getElementById('main_footer')
      if (main_footer) set_main_footer_sum(main_footer.getBoundingClientRect().height)

      const inner_navigation = document.getElementById('inner_navigation')
      if (inner_navigation && !hideNavbar)
        set_inner_navigation_sum(inner_navigation.getBoundingClientRect().height)
      else {
        set_inner_navigation_sum(20)
      }

      const inner_header = document.getElementById('inner_header')
      if (inner_header) set_inner_header_sum(inner_header.getBoundingClientRect().height)

      const element = document.getElementById('components_wrapper')

      if (element) {
        const computedStyle = window.getComputedStyle(element)

        const paddingTop = parseInt(computedStyle.paddingTop, 10)
        const paddingBottom = parseInt(computedStyle.paddingBottom, 10)

        const sum = paddingTop + paddingBottom + 60

        set_components_wrapper(sum)
      }
    }, [hideNavbar, location.pathname, expand])

    useEffect(() => {
      const sum =
        main_header_sum +
        main_footer_sum +
        inner_navigation_sum +
        inner_header_sum +
        header_group_sum +
        components_wrapper
      setElementHeight(sum)
    }, [
      inner_header_sum,
      inner_navigation_sum,
      main_footer_sum,
      main_header_sum,
      header_group_sum,
      components_wrapper,
    ])

    //do not delete this code
    // const handleAddRow = useCallback(async () => {
    //   const res = gridRef.current.api.getLastDisplayedRow()
    //   console.log(res)
    //   // gridRef.current.api.setFocusedCell(res, 'name')
    //   gridRef.current.api.startEditingCell({
    //     rowIndex: res,
    //     colKey: 'name',
    //     // set to 'top', 'bottom' or undefined
    //     // rowPinned: true,
    //     // key: key,
    //     // charPress: char,
    //   })
    // }, [])

    // const sideBar = useMemo(
    //   () => ({
    //     toolPanels: [
    //       {
    //         id: 'columns',
    //         labelDefault: 'Columns',
    //         labelKey: 'columns',
    //         iconKey: 'columns',
    //         toolPanel: 'agColumnsToolPanel',
    //         toolPanelParams: {
    //           suppressRowGroups: true,
    //           suppressValues: true,
    //           suppressPivots: true,
    //           suppressPivotMode: true,
    //           suppressColumnFilter: true,
    //           suppressColumnSelectAll: true,
    //           suppressColumnExpandAll: true,
    //         },
    //       },
    //     ],
    //     defaultToolPanel: 'false',
    //   }),
    //   [],
    // )

    const popupParent = useMemo(() => document.querySelector('body'), [])

    useImperativeHandle(ref, () => ({
      getSelectedRows() {
        const selectedRowData = gridRef.current.api.getSelectedRows()
        const mappedItems = selectedRowData.map((item: any) => item)

        return mappedItems
      },

      getAllData() {
        const allData: any = []

        gridRef.current.api.forEachNode((node: any) => {
          // console.log('nodessssssssss', node)
          const item = node.data
          const index = node.rowIndex

          allData.push({ item: item, index: index })
        })

        // console.log('allData', allData)
        return allData
      },

      refreshFilter() {
        gridRef.current.api.setFilterModel(null)
      },
    }))

    return (
      <StyledDiv
        className={noBorder ? `ag-theme-alpine no-border` : `ag-theme-alpine`}
        headerHeight={headerHeight}
        elementHeights={elementHeights}
        maxHeight={maxHeight}
        // isResourceHub={isResourceHub}
      >
        <AgGridReact
          ref={gridRef as any}
          deltaRowDataMode
          rowData={[...data]}
          columnDefs={columnConfig}
          enableRangeSelection={true}
          enableFillHandle={true}
          defaultColDef={defaultColDef}
          getRowId={(params: any) => params.data?.id}
          rowSelection='multiple'
          suppressRowClickSelection={true}
          singleClickEdit={true}
          onSelectionChanged={onSelectionChanged}
          onGridReady={async params => {
            const gridApi = params.api
            gridApi.sizeColumnsToFit()
            window.onresize = () => {
              gridApi.sizeColumnsToFit()
            }
            params.api.sizeColumnsToFit()

            const localHiddenData = localStorage.getItem('hideColumn')
            if (localHiddenData) {
              const JsonLocalData = await JSON.parse(localHiddenData)
              Object.entries(JsonLocalData[`${path}`]).forEach(function (key) {
                params.columnApi.setColumnVisible(key[0], key[1])
              })
            }

            if (onGridReady) onGridReady(params)
          }}
          // fillOperation={(params: any) => {
          //   cellEditFn({
          //     field: params.column.colDef.field,
          //     newValue: params.initialValues[0],
          //     params: params.rowNode,
          //   })
          //   return params.initialValues[0]
          // }}
          onCellClicked={onCellClicked}
          // domLayout={'autoHeight'}
          rowGroupPanelShow={groupPanel ? 'always' : 'never'}
          suppressDragLeaveHidesColumns={true}
          suppressMakeColumnVisibleAfterUnGroup={true}
          suppressRowGroupHidesColumns={true}
          processDataFromClipboard={params => processDataFromClipboard(params, gridRef)}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          getRowClass={params => {
            if (params?.data?.type) {
              return 'add-row-edit-button'
            }
            return 'ag-row'
          }}
          // sideBar={sideBar}
          onColumnVisible={(p: any) => {
            const value = p.visible
            const name = p.column.colId

            const prevLocalData = localStorage.getItem('hideColumn')
            let hiddenData = {}
            if (prevLocalData) {
              const jsonPrevData = JSON.parse(prevLocalData)
              hiddenData = { ...jsonPrevData, [path]: { ...jsonPrevData[path], [name]: value } }
            } else {
              hiddenData = { [path]: { [name]: value } }
            }
            localStorage.setItem(`hideColumn`, JSON.stringify(hiddenData))
          }}
          popupParent={popupParent}
          getContextMenuItems={contextMenu ? contextMenu : defaultContextMenu}
          stopEditingWhenGridLosesFocus={true}
        />
      </StyledDiv>
    )
  },
)

export default DataGrid

const StyledDiv = styled.div<{ headerHeight?: number; elementHeights?: number; maxHeight: number }>`
  height: ${p =>
    p.elementHeights ? `calc(100vh - ${p.elementHeights}px) ` : 'calc(100vh - 175px)'};
  // height: ${p => (p.elementHeights ? `100vh - ${p.elementHeights}` : '100vh')};
  max-height: ${p => p.maxHeight && `${p.maxHeight}px`};
  width: 100%;
`
