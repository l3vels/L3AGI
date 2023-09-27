import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'

import { Command } from 'cmdk'
import { get, groupBy, has, slice } from 'lodash'
import { darkTheme, lightTheme } from 'styles/theme'
import StarVector from 'assets/svgComponents/StarVector'
import StarsVector from 'assets/svgComponents/StartsVector'
import { enterIcon } from 'assets/icons'

import Typography from '@l3-lib/ui-core/dist/Typography'

import About from '@l3-lib/ui-core/dist/icons/About'
import API from '@l3-lib/ui-core/dist/icons/API'
import Doc from '@l3-lib/ui-core/dist/icons/Doc'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import Teams from '@l3-lib/ui-core/dist/icons/Teams'
import Players from '@l3-lib/ui-core/dist/icons/Players'
import Contracts from '@l3-lib/ui-core/dist/icons/Contracts'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Logs from '@l3-lib/ui-core/dist/icons/Logs'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'
import HomeIconSvg from 'assets/svgComponents/HomeIconSvg'

import {
  StyledCommandInput,
  StyledCommandItem,
  StyledCommandList,
  StyledCommandWrapper,
  StyledCommandDialog,
  StyledCommandItemHeader,
  StyledSvgContainer,
  StyleEnterGroup,
} from './CommandMenuStyles'
import { ApiVersionEnum } from 'modals/AIChatModal/types'

import { defaultData } from './defaultData'

import CommandItemName from './components/ItemName'
import { ThemeProvider } from 'styled-components'
import CommandItem from './components/CommandItem'

const CommandMenu = ({ open, setCmdkOpen, theme, toggleTheme }: any) => {
  const { openModal, closeModal } = useModal()
  const componentRef = useRef<HTMLDivElement>(null)

  // const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<any>([])
  const [game_id, set_game_id] = useState<string>('')

  const [modal_options, set_modal_options] = useState({ modal_name: '', modal_title: '' })

  const page = pages[pages.length - 1]
  const location = useLocation()
  const navigate = useNavigate()

  const filter_routes = 'developers'

  const path_id = location.pathname.includes(filter_routes) ? '' : location.pathname.split('/')[2]

  const onHandleSelect = async (item: any) => {
    if (item.option === 'open-chat') {
      await navigate(item.url)
      // closeModal('spotlight-modal')
      setCmdkOpen(false)
    }
    if (item.option === 'theme') {
      if (theme === 'dark' && item.name === 'Dark') {
        setCmdkOpen(false)
        return
      }
      if (theme === 'light' && item.name === 'Light') {
        setCmdkOpen(false)
        return
      }

      toggleTheme()
      setCmdkOpen(false)
      return
    }
    if (item.option === 'open-modal') {
      openModal({ name: item.modal_name, data: { game_id: path_id, ...item.modalData } })
      setCmdkOpen(false)
    }

    if (item.option === 'show-games') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'games'])
      return
    }
    if (item.option === 'show-assets') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'assets'])
      return
    }
    if (item.option === 'show-collections') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'collections'])
      return
    }
    if (item.option === 'show-agents') {
      setSearch('')

      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'collections'])
      return
    }
    if (item.option === 'separate-link') {
      window.open(item.url)
      return
    } else {
      await navigate(item.url)
      // closeModal('spotlight-modal')
      setCmdkOpen(false)
    }
    // return openModal({ name: item.modal_name, data: { game_id: path_id } })
  }

  const onCreateOptionBasedOnOption = (game_id: any) => {
    openModal({ name: modal_options.modal_name, data: { game_id } })
    set_game_id(game_id)
  }

  const onCreateOptionBasedOnCollection = (collection_data: any) => {
    const { id } = collection_data
    openModal({ name: 'create-asset-modal', data: { collection_id: id } })
    navigate(`/collection/${id}/assets`)
    // closeModal('spotlight-modal')
    setCmdkOpen(false)
  }

  useEffect(() => {
    // Function to handle outside click
    const handleClickOutside = (event: any) => {
      if (componentRef.current) {
        setCmdkOpen(false)
        //       // Clicked outside the component
        console.log('Clicked outside the component')
        //     }
      }
    }

    // Add event listener to document on component mount
    document.addEventListener('click', handleClickOutside)

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
  //       // Clicked outside the component
  //       console.log('Clicked outside the component')
  //     }
  //   }

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') {
  //       // Pressed the Escape key
  //       console.log('Pressed the Escape key')
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutside)
  //   document.addEventListener('keydown', handleKeyDown)

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside)
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])

  const groupedItems = groupBy(defaultData(path_id), data => {
    return get(data, 'group_name', 'other_data')
  })

  return (
    <StyledCommandDialog open={open} className='cmdk_root' ref={componentRef}>
      <StyledCommandWrapper
        className='cmdk_wrapper'
        onKeyDown={e => {
          // Escape goes to previous page
          // Backspace goes to previous page when search is empty
          if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
            e.preventDefault()
            setPages((pages: any) => pages.slice(0, -1))
          }
          if (pages.length === 0 && e.key === 'Escape') {
            setCmdkOpen(false)
          }
        }}
        filter={(value, search) => {
          if (value.includes(search)) return 1
          return 0
        }}
      >
        {/* <TextField /> */}
        <StyledCommandInput
          value={search}
          onValueChange={setSearch}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder='Search, create or ask anything'
        />
        <StyledCommandList>
          {!page && (
            <>
              {has(groupedItems, 'go_to') && (
                <Command.Group>
                  {/* <StyledCommandItemHeader>
                    <StyledSvgContainer type='go_to'>
                      <StarVector />
                    </StyledSvgContainer>
                    <h2>Go To</h2>
                  </StyledCommandItemHeader> */}
                  {search ? (
                    <>
                      {groupedItems?.go_to.map((item, index) => (
                        <div key={item.id}>
                          <CommandItem
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Go To'}
                            itemIcon={item.icon}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems.go_to, 1, 11)?.map((item, index) => (
                        <>
                          <CommandItem
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Go To'}
                            itemIcon={item.icon}
                          />
                        </>
                      ))}
                    </>
                  )}
                </Command.Group>
              )}

              {has(groupedItems, 'create') && (
                <Command.Group>
                  {/* <StyledCommandItemHeader marginTop={32}>
                    <StyledSvgContainer type='create'>
                      <StarVector />
                    </StyledSvgContainer>
                    <h2>Create</h2>
                  </StyledCommandItemHeader> */}
                  {search ? (
                    <>
                      {groupedItems?.create.map((item, index) => (
                        <>
                          <CommandItem
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Create'}
                            itemIcon={item.icon}
                          />
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems.create, 0, 6)?.map((item, index) => (
                        <>
                          <CommandItem
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Create'}
                            itemIcon={item.icon}
                          />
                        </>
                      ))}
                    </>
                  )}
                </Command.Group>
              )}

              {has(groupedItems, 'chat') && (
                <Command.Group>
                  <>
                    {groupedItems?.['chat'].map((item, index) => (
                      <>
                        <CommandItem
                          index={index}
                          name={item.name}
                          handleSelect={() => onHandleSelect(item)}
                          groupName={'chat'}
                          itemIcon={item.icon}
                        />
                      </>
                    ))}
                  </>
                </Command.Group>
              )}
            </>
          )}

          {page === 'agents' && (
            <Command.Group>
              <StyledCommandItemHeader marginTop={32}>
                <StyledSvgContainer type='games'>
                  <Games />
                </StyledSvgContainer>
                <h2>Games</h2>
              </StyledCommandItemHeader>
            </Command.Group>
          )}
          {page === 'games' && (
            <Command.Group>
              <StyledCommandItemHeader marginTop={32}>
                <StyledSvgContainer type='games'>
                  <Games />
                </StyledSvgContainer>
                <h2>Games</h2>
              </StyledCommandItemHeader>
            </Command.Group>
          )}

          {page === 'collections' && (
            <Command.Group>
              <StyledCommandItemHeader marginTop={32}>
                <StyledSvgContainer type='games'>
                  <Games />
                </StyledSvgContainer>
                <h2>Collections</h2>
              </StyledCommandItemHeader>
            </Command.Group>
          )}

          {page === 'assets' && (
            <Command.Group>
              <StyledCommandItemHeader marginTop={32}>
                <StyledSvgContainer type='games'>
                  <Games />
                </StyledSvgContainer>
                <h2>Assets</h2>
              </StyledCommandItemHeader>
            </Command.Group>
          )}
        </StyledCommandList>
      </StyledCommandWrapper>
    </StyledCommandDialog>
  )
}

export default CommandMenu
