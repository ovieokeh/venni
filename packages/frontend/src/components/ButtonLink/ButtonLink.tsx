import React from 'react'
import { Button } from 'antd'
import { history } from 'src/utilities/history'
import { ButtonProps } from 'antd/lib/button'

interface ButtonLinkProps extends ButtonProps {
  url: string
  text: string
}

const ButtonLink: React.FC<ButtonLinkProps> = (props: ButtonLinkProps) => {
  const handleClick = () => history.push(props.url)

  return (
    <Button onClick={handleClick} {...props}>
      {props.text}
    </Button>
  )
}

export default ButtonLink
