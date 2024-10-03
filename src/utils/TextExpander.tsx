import { useState } from 'react'
import styled from 'styled-components'
const Btn = styled.button`
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #f5c518;
  padding: 4px 8px;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(245, 197, 24, 0.7);
    transform: scale(1.05);
  }
`

function TextExpander({ children }: { children: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 160).join(' ') + '...'
  return children.length > 160 ? (
    <span>
      {displayText}{' '}
      <Btn onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show less' : 'Show more'}
      </Btn>
    </span>
  ) : (
    <span>{children}</span>
  )
}

export default TextExpander
