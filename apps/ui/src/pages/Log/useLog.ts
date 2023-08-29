import React from 'react'
import { useParams } from 'react-router-dom'
import { useLogsService, useLogByIdLazy } from 'services'
import useFilter from './Components/useFilter'

const useLog = () => {
  const params = useParams()
  const { data: log, getLogById } = useLogByIdLazy()
  const filter = useFilter()

  // console.log('filter.form.getValues()::', filter.form.getValues())
  // console.log('data::', log)

  const query = filter.form.getValues()
  // console.log('query', query)

  React.useEffect(() => {
    getLogById({
      variables: {
        id: params.id,
      },
    })
  }, [params.id])

  const { data, error, loading } = useLogsService({
    ...query,
  })

  // console.log('data::', data)

  return { log_list: data, filter, log }
}

export default useLog
