import { useState } from 'react'

export const usePlugins = () => {
  const activePlugins = JSON.parse(localStorage.getItem('activePlugins') || '[]')
  const [actives, setActives] = useState(activePlugins)

  const pluginClickHandler = (pluginName: string) => {
    const activePlugins = JSON.parse(localStorage.getItem('activePlugins') || '[]')

    if (activePlugins?.includes(pluginName)) {
      const filteredPlugins = activePlugins.filter((plugin: string) => plugin !== pluginName)
      localStorage.setItem('activePlugins', JSON.stringify(filteredPlugins))
      setActives(filteredPlugins)
    } else {
      activePlugins.push(pluginName)
      localStorage.setItem('activePlugins', JSON.stringify(activePlugins))
      setActives(activePlugins)
    }
  }

  return {
    pluginClickHandler,
    activePlugins: actives,
  }
}
