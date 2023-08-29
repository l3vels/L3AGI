const userNamesById = { 1: 'John' }

const DynamicUserBreadcrumb = ({ match }: any) => <span>{userNamesById[match.params.userId]}</span>

const CustomPropsBreadcrumb = ({ someProp }) => <span>{someProp}</span>

const routes = [
  { path: '/users/:userId', breadcrumb: DynamicUserBreadcrumb },
  { path: '/example', breadcrumb: 'Custom Example' },
  {
    path: '/custom-props',
    breadcrumb: CustomPropsBreadcrumb,
    props: { someProp: 'Hi' },
  },
]
