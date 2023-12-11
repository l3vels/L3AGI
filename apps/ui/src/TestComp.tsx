import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import ReactDOM from 'react-dom'

const renderTestComp = () => {
  ReactDOM.render(
    <AvatarGenerator name={'Embedded from chat'} size={50} />,
    document.getElementById('test'),
  )
}

renderTestComp()
