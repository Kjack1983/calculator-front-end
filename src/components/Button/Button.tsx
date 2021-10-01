import React, { FunctionComponent } from 'react'

import styled, { css } from 'styled-components'

interface ButtonProps {
  color?: 'red' | 'green' | 'dark'
  isLarge?: boolean
  onClick?: () => void
}

const colorToCss = (color: ButtonProps['color']) => {
  switch (color) {
    case 'red':
      return css`
        background-color: #752323;
        color: #fff;

        &:hover,
        &:focus {
          background-color: #511616;
        }
      `
    case 'green':
      return css`
        background-color: #044424;
        color: #f7a313;

        &:hover,
        &:focus {
          background-color: #022d18;
        }
      `
    case 'dark':
      return css`
        background-color: #053c5b;
        color: #f7a313;

        &:hover,
        &:focus {
          background-color: #042d44;
        }
      `
  }

  return css`
    background-color: #05324c;
    color: #fff;

    &:hover,
    &:focus {
      background-color: #032538;
    }
  `
}

export const StyledButton = styled.button<ButtonProps>`
  font-family: inherit;
  font-size: inherit;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  transition: background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
  ${({ color }) => colorToCss(color)}
  ${({ isLarge }) =>
    isLarge &&
    css`
      grid-column-end: span 2;
    `}

  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  &:focus {
    outline: 0;
  }

  :after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.3s, opacity 1s;
  }

  :active:after {
    transform: scale(0, 0);
    opacity: 0.2;
    transition: 0s;
  }
`

export const Button: FunctionComponent<ButtonProps> = ({ 
  children, 
  color, 
  isLarge, 
  onClick 
}) => {
  return (
    <StyledButton color={color} isLarge={isLarge} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button
