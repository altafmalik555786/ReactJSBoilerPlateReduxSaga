import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

export interface ButtonProps {
  id?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isFullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  className?: any
  children?: ReactNode
  style?:
    | 'solid'
    | 'dark-transparent'
    | 'light-transparent'
    | 'gray-transparent'
    | 'transparent'
  color?:
    | 'primary'
    | 'yellow'
    | 'orange'
    | 'gray'
    | 'red'
    | 'green'
    | 'blue'
    | 'pink'
    | 'black'
    | 'Purple'
    | 'peach'
    | 'white'
}

interface Props {
  height: string
  padding: string
  background: string
  isSolid?: boolean
  baseColor?: string
  isGray?: boolean
  isTransparent?: boolean
  isLight?: boolean
  backgroundHoverColor?: string
  backgroundActiveColor?: string
  isFullWidth?: boolean
  className?: any
}

interface IconProps {
  noText?: boolean
}

const Button = styled.button<Props>`
  background: ${(p) => p.background};
  color: ${(p) =>
    p.isLight
      ? p.baseColor
      : p.isGray
      ? '#4E5156'
      : p.isTransparent
      ? '#121212'
      : '#fff'};
  border-radius: 5px;
  border: 1px solid
    ${(p) =>
      (p.isSolid || p.isLight) && !p.isGray
        ? 'transparent'
        : p.isGray
        ? '#E8E8E8'
        : p.isTransparent
        ? '#E8E8E8'
        : p.baseColor};
  height: ${(p) => p.height};
  width: ${(p) => p.isFullWidth && '100%'};
  padding-left: ${(p) => p.padding};
  padding-right: ${(p) => p.padding};
  outline-width: 0;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${(p) =>
      p.isSolid && !p.isGray
        ? css`linear-gradient(0deg, rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.17)), ${p.baseColor}`
        : p.isGray
        ? css` linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), #F7F7F8`
        : p.backgroundHoverColor};

    border: ${(p) => p.isTransparent && css`1px solid #4e5156`};
  }
  &:hover {
    border: ${(p) => p.isTransparent && css`1px solid #4e5156`};
  }
  &:focus {
    background: ${(p) =>
      p.isSolid
        ? css`linear-gradient(0deg, rgba(0, 0, 0, 0.17), rgba(0, 0, 0, 0.25)), ${p.baseColor}`
        : p.isGray
        ? css` linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), #F7F7F8`
        : p.backgroundActiveColor};
  }
  &:disabled {
    cursor: not-allowed;
  }
`
const Icon = styled.span<IconProps>`
  margin-right: ${(p) => (p.noText ? '' : '8px')};
`

const buttonHeight = (size: string) => {
  const sizeHeights = {
    sm: '32',
    md: '38',
    lg: '44',
  }
  return `${sizeHeights[size]}px`
}
const buttonPadding = (size: string) => {
  const sizePaddings = {
    sm: '15',
    md: '20',
    lg: '25',
  }
  return `${sizePaddings[size]}px`
}
const buttonBackground = (color: string) => {
  const colors = {
    primary: '#7F4EAD',
    yellow: '#F1AA3E',
    orange: '#FF8536',
    red: '#F44343',
    green: '#2AC155',
    blue: '#2D6CCA',
    gray: '#F7F7F8',
    pink: '#E15E83',
    peach: '#F58069',
    Purple: '#672480',
    white: '#fff',
    black: '#4E5156',
  }
  return colors[color]
}

const ButtonComponent: React.FC<ButtonProps> = ({
  className = '',
  type = 'button',
  children,
  size = 'md',
  isFullWidth = false,
  disabled = false,
  color = 'primary',
  style = 'solid',
  icon,
  ...props
}) => {
  const backgroundColor = 'transparent'
  const backgroundHoverColor = 'transparent'
  const backgroundActiveColor = 'transparent'

  return (
    <Button
      {...props}
      type={type}
      className={className}
      isFullWidth={isFullWidth}
      isGray={color === 'gray'}
      isLight={style === 'light-transparent'}
      isTransparent={style === 'transparent'}
      isSolid={style === 'solid'}
      height={buttonHeight(size)}
      padding={buttonPadding(size)}
      background={backgroundColor}
      baseColor={buttonBackground(color)}
      backgroundHoverColor={backgroundHoverColor}
      backgroundActiveColor={backgroundActiveColor}
      disabled={disabled}
    >
      {icon && <Icon noText={!children}>{icon}</Icon>}
      <span>{children}</span>
    </Button>
  )
}

export default ButtonComponent
