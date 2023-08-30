import * as React from 'react'
import { SVGProps } from 'react'

const InventoryIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={28} height={28} fill='none' {...props}>
    <path
      fill='#fff'
      fillOpacity={0.8}
      d='M25.51 12.473V20.1c0 .04-.024.078-.06.095l-11.19 5.11V12.943l9.899-4.484a.104.104 0 0 0 .003-.188l-9.511-4.727a.104.104 0 0 0-.09 0L4.304 8.36a.104.104 0 0 0 .002.19l9.433 4.273v12.44l-11.143-5.07a.104.104 0 0 1-.06-.094v-7.513L.057 11.363a.104.104 0 0 1-.03-.164l2.965-3.205L14.522 3l10.577 4.994 2.874 3.202a.104.104 0 0 1-.034.164l-2.429 1.113Z'
    />
  </svg>
)
export default InventoryIconSvg
