import React from 'react'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type TextArray = string[]

const HumanMessageText = ({ textArray }: { textArray: TextArray }) => {
  const mentionRegex = /@\[(.*?)\]\((.*?)__(.*?)\)__mention__/

  return (
    <StyledTextWrapper>
      {textArray?.map((word: string, index: number) => {
        if (word.match(mentionRegex)) {
          const mentionMatch = word.match(mentionRegex)
          if (mentionMatch) {
            const mention = mentionMatch[1]
            return (
              <React.Fragment key={index}>
                <StyledMentionText>
                  <TypographyPrimary
                    value={`@${mention}`}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.sm}
                  />
                </StyledMentionText>
              </React.Fragment>
            )
          }
        }
        return (
          <React.Fragment key={index}>
            <TypographyPrimary
              value={`${word} `}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </React.Fragment>
        )
      })}
    </StyledTextWrapper>
  )
}

export default HumanMessageText

const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  & > * {
    margin-right: 3px;
  }
`

const StyledMentionText = styled.div`
  color: #fff;
  background: #4ca6f8;
  margin: 0 5px;
`
