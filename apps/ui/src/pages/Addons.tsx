import styled from 'styled-components'
import Modal from 'react-modal'
import { useState } from 'react'

import concept_map from '../assets/images/concept_map.jpg'
import flow_chart from '../assets/images/flow_chart.jpg'
import mind_map from '../assets/images/mind_map.jpg'
import scamper from '../assets/images/scamper.jpg'

const addonsData = [
  { name: 'concept map', description: 'concept map', img: concept_map },
  { name: 'flow chart', description: 'flow chart', img: flow_chart },
  { name: 'mind map', description: 'mind map', img: mind_map },
  { name: 's.c.a.m.p.e.r', description: 's.c.a.m.p.e.r', img: scamper },
]

const modalData: any = {
  step_one: {
    header_description: 'First X Free Per Person',
    input_title:
      'Maximum number of NFTs someone can mint for free. Subject to Max NFTs Per Person and Max NFTs Per Transaction limits.',
    button_value: 'Add',
  },
  step_two: {
    header_description: 'Max NFTs Per Transaction',
    input_title:
      'Maximum number of NFTs someone can mint in one go. Helps prevent botting and give everyone a fair chance to mint.',
    button_value: 'Enable',
  },
}

const Addons = ({ setOpenAddonsModal }: any) => {
  const [showModal, setShowModal] = useState(false)
  const [modalScreens, setModalScreen] = useState('step_one')

  const onHandleModalClick = () => {
    setShowModal(prevValue => !prevValue)
    setModalScreen('step_one')
  }

  return (
    <>
      <StyledContainer>
        <StyledModalBody>
          {addonsData.map(item => (
            <div>
              <StyledCard onClick={onHandleModalClick}>
                <img src={item.img} alt='background' />
                {item.name}
              </StyledCard>
              <div>{item.name}</div>
            </div>
          ))}
        </StyledModalBody>
      </StyledContainer>

      <Modal
        isOpen={showModal}
        style={{
          overlay: {
            position: 'fixed',
            zIndex: 1020,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            background: 'white',
            width: '35rem',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid #ccc',
            borderRadius: '0.3rem',
          },
        }}
      >
        <StyledModalContainer>
          <StyledModalHeader>
            <h4>{modalData[modalScreens].header_description}</h4>
            <StyledCloseButton onClick={onHandleModalClick}>x</StyledCloseButton>
          </StyledModalHeader>
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 12 }}>{modalData[modalScreens].input_title}</p>
            <input style={{ marginTop: 5 }} placeholder='value' />
          </div>

          <StyledButton
            onClick={
              modalScreens === 'step_one' ? () => setModalScreen('step_two') : onHandleModalClick
            }
          >
            {modalData[modalScreens].button_value}
          </StyledButton>
        </StyledModalContainer>
      </Modal>
    </>
  )
}

export default Addons

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`

const StyledCard = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid darkgray;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`

const StyledModalBody = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
`

const StyledCloseButton = styled.div`

  font-size 25px;
    border: 1px solid indigo;
    text-align: center;
    padding: 0px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 18px;
    justify-self: end;
    cursor: pointer;
`

export const StyledModalContainer = styled.div`
  display: grid;
`

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledButton = styled.button`
  box-sizing: border-box;
  text-align: center;
  width: 120px;
  height: 34px;
  background: radial-gradient(52.7% 52.7% at 50% 50%, #3e4ea9 0%, #111b52 100%);
  border-radius: 8px;
  margin-top: 20px;
  justify-self: end;
  color: #ffffff;
`
