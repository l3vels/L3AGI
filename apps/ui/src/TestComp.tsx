import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import ReactDOM from 'react-dom'

import './TestComp.css'
import ChatWidget from 'ChatWidget'

const renderTestComp = () => {
  ReactDOM.render(<ChatWidget />, document.getElementById('test'))
}

renderTestComp()
