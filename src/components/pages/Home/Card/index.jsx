import React from 'react'
import { StCard } from './styled'

const Card = ({url, name}) => {
  return (
    <StCard>
        <img src={url} alt={name} />
        {name}
    </StCard>
  )
}

export default Card