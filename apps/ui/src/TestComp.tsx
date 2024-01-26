import ReactDOM from 'react-dom'

import './TestComp.css'
import ChatWidget from 'ChatWidget'

const renderTestComp = () => {
  const divElement = document.createElement('div')
  divElement.id = 'test'
  document.body.appendChild(divElement)

  const linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.type = 'text/css'
  linkElement.href = 'https://dev.l3agi.com/assets/style-cc379c0c.css'

  document.head.appendChild(linkElement)

  ReactDOM.render(<ChatWidget />, document.getElementById('test'))
}

renderTestComp()
