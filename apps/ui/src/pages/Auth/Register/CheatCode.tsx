import { useForm, SubmitHandler } from 'react-hook-form'
import TextField from 'share-ui/components/TextField/TextField'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { StyledCenterFormContainer, StyledFormContainer } from 'styles/globalStyle.css'
import Heading from 'share-ui/components/Heading/Heading'
import { useEffect } from 'react'
import HeadingTertiary from 'components/Heading/Tertiary'
import HeadingPrimary from 'components/Heading/Primary'

type commandInputs = {
  command_first: string
  command_second: string
}

export const CheatCode = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm<commandInputs>({
    defaultValues: {
      command_first: '',
      command_second: '',
    },
  })

  // useEffect(() => {
  //   watch((value, { name, type }) => console.log(value, name, type))
  // }, [watch])

  return (
    <StyledCenterFormContainer>
      <HeadingTertiary
        value={t('cheat-code')}
        type={Heading.types?.h1}
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <StyledMainContainer>
          <StyledInputContainer>
            <TextField
              placeholder='?'
              size={TextField.sizes?.LARGE}
              className='cheat_code__input'

              // name='command_first'
              // {...register('command_first')}
              // name='command_first'
              // ref={register}
              // {...register('command_first', { required: true })}
            />
          </StyledInputContainer>
          <HeadingPrimary
            value={'+'}
            type={Heading.types?.h1}
            style={{ fontSize: 52, lineHeight: 'normal' }}
          />
          <StyledInputContainer>
            <TextField
              placeholder='?'
              size={TextField.sizes?.LARGE}
              className='cheat_code__input'
              name='command_second'

              // {...register('command_second', { required: true })}
            />
          </StyledInputContainer>
          {/* <TextField  label='Game name' size={'Large'} title={'large'} /> */}
        </StyledMainContainer>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default CheatCode

const StyledInputContainer = styled.div`
  width: 118px;
  height: 122px;
`

const StyledMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cheat_code__input {
    padding: 8px 15px !important;
    height: 122px !important;
    font-size: 52px !important;
    text-align: center;
  }
`
