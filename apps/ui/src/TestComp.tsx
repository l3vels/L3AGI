import ReactDOM from 'react-dom'

import './TestComp.css'
import ChatWidget from 'ChatWidget'

const renderTestComp = async () => {
  const response = await fetch('https://dev.l3agi.com/manifest.json')
  // const response = await fetch('http://localhost:3000/dist/manifest.json')
  const manifest = await response.json()
  const hashedFilename = manifest['style.css'].file

  const linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.href = `https://dev.l3agi.com/${hashedFilename}`
  // linkElement.href = `http://localhost:3000/dist/${hashedFilename}`
  document.head.appendChild(linkElement)

  const divElement = document.createElement('div')
  divElement.id = 'test'
  document.body.appendChild(divElement)

  ReactDOM.render(<ChatWidget />, document.getElementById('test'))
}

renderTestComp()
