import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { history } from 'src/cores/history'

export interface ButtonLinkProps extends ButtonProps {
  url: string
  text: string
}

const ButtonLink: React.FC<ButtonLinkProps> = (props: ButtonLinkProps) => {
  const handleClick = (): void => history.push(props.url)

  return (
    <Button onClick={handleClick} {...props}>
      {props.text}
    </Button>
  )
}

export default ButtonLink
