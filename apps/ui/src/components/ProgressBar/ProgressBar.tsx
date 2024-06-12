import LinearProgress from '@mui/material/LinearProgress'

const ProgressBar = ({ value }: { value: number }) => {
  return <LinearProgress style={{ width: '100%' }} variant='determinate' value={value} />
}

export default ProgressBar
