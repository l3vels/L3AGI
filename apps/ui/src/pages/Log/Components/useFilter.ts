import { useForm } from 'react-hook-form'
import { object, array, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = object().shape({
  socialLinks: array().of(
    object().shape({
      value: string().required('Enter social your social url'),
    }),
  ),
})

const query = {
  start_date: '01/01/2022',
  end_date: '01/01/2024',
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  api_endpoint: '/graphql',
  source: ['Dashboard', 'API'],
  status: '',
  ip_address: '',
  error_type: '',
  error_code: '',
  search_text: '',
  // id: '',
  // method: '',
  // endpoint: '',
  // body: '',
  // params: '',
  // request_date: '',

  // status: '',

  // response: '',
  // env: '',
  // changes: '',
  // is_gql: '',
  // gql_type: '',
  // gql_variables: '',
  // gql_source: '',
  // gql_name: '',
  // source_type: '',
  // ip: '',

  // error_type: '',
  // error_code: '',

  // error_message: '',
  // request_type: '',
  // query_params: '',
  // created_on: '',
  // player_id: '',
  // game_id: '',
  // collection_id: '',
  // contract_id: '',
  // asset_id: '',
  page: 1,
  limit: 10,
}

const useFilter = () => {
  const form = useForm({
    defaultValues: query,
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onClick = () => {
    console.log('watch::', form.getValues())
  }

  // const { fields, append } = useFieldArray({
  //   name: 'socialLinks',
  //   control,
  // })

  return {
    control: form.control,
    onClick,
    form,
  }
}

export default useFilter
