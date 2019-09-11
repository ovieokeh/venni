import React from 'react'
import { Button } from 'antd'
import { history } from 'src/index'

interface ButtonLinkProps {
  href: string
  text: string
  size?: 'small' | 'large' | 'default'
  type?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'link' | 'default'
  shape?: 'circle' | 'round' | 'circle-outline'
  icon?: string
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  size,
  text,
  type,
  shape,
  icon
}: ButtonLinkProps) => {
  const handleClick = () => history.push(href)

  return (
    <Button
      onClick={handleClick}
      size={size}
      type={type}
      shape={shape}
      icon={icon}
    >
      {text}
    </Button>
  )
}

export default ButtonLink
