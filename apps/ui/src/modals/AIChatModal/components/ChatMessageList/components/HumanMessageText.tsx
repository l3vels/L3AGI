import React from 'react'
import styled from 'styled-components'

const HumanMessageText = ({ textArray }: { textArray: any }) => {
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
                <StyledMentionText>@{mention}</StyledMentionText>
              </React.Fragment>
            )
          }
        }
        return (
          <React.Fragment key={index}>
            {word} {/* Add a space before each word */}
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
`

const StyledMentionText = styled.div`
  color: #fff;
  background: #4ca6f8;
  margin: 0 5px;
`
