import TypographyPrimary from 'components/Typography/Primary'
import {
  StyledForm,
  StyledInnerFormWrapper,
  StyledTextFieldWrapper,
  StyledWrapper,
} from '../SubnetsStyles'
import TypographySecondary from 'components/Typography/Secondary'
import SDKs from '../SDKs'
import ProgressBar from 'pages/Pods/ProsgressBar'
import Typography from 'share-ui/components/typography/Typography'
import { ButtonPrimary } from 'components/Button/Button'
import TextField from 'share-ui/components/TextField/TextField'

const ApiKeysPanel = () => {
  return (
    <StyledWrapper>
      <StyledForm>
        <StyledInnerFormWrapper style={{ width: '30%' }}>
          <TypographyPrimary
            style={{ fontWeight: 500 }}
            value={`Application keys`}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
          <TypographySecondary
            value={`Your App ID and API key are used to identify your application when making requests with the Apideck Unify endpoints, as described in our documentation.`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledInnerFormWrapper>

        <StyledInnerFormWrapper style={{ width: '70%', paddingTop: '20px' }}>
          <StyledTextFieldWrapper>
            <TypographyPrimary
              value={`App ID`}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
            <TextField
              value={'5d6bb880-954e-4a8e-a353-89875fff1dee'}
              placeholder={''}
              onChange={() => {}}
              disabled
            />
          </StyledTextFieldWrapper>
          <StyledTextFieldWrapper>
            <TypographyPrimary
              value={`APY key`}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
            <TextField
              value={'value template for api key value template for api key'}
              placeholder={''}
              onChange={() => {}}
              type='password'
              disabled
            />
          </StyledTextFieldWrapper>

          <div style={{ marginLeft: 'auto', fontWeight: 500 }}>
            <ButtonPrimary>Regenerate Key</ButtonPrimary>
          </div>
        </StyledInnerFormWrapper>
      </StyledForm>

      <StyledForm>
        <StyledInnerFormWrapper style={{ width: '30%' }}>
          <TypographyPrimary
            style={{ fontWeight: 500 }}
            value={`Account Usage`}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
          <TypographySecondary
            value={`Our free developer plan includes a total of 2,500 API calls & Webhook events for Unify, Vault, and Proxy.`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
          <TypographySecondary
            value={`You can monitor API calls & Webhook events through the logs.`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
          <TypographySecondary
            value={`Reach out to sales if you are ready to upgrade.`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledInnerFormWrapper>

        <StyledInnerFormWrapper style={{ width: '70%' }}>
          <StyledTextFieldWrapper>
            <TypographyPrimary
              value={`Free`}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <TypographySecondary
              value={`Usage: 0 / 2,500`}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />

            <ProgressBar value={0} />
          </StyledTextFieldWrapper>
        </StyledInnerFormWrapper>
      </StyledForm>

      <SDKs />
    </StyledWrapper>
  )
}

export default ApiKeysPanel
