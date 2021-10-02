import React from "react";
import styled, { css } from "styled-components";
import { ButtonProps } from "../../utils/interfaces";

const colorDisplay = (color: ButtonProps["color"]) => {
    switch (color) {
        case "red":
            return css`
                background-color: #752323;
                color: #fff;

                &:hover,
                &:focus {
                    background-color: #511616;
                }
            `;
        case "green":
            return css`
                background-color: #041d2b;
                color: #f2b046;

                &:hover,
                &:focus {
                    background-color: #03151e;
                }
            `;
        case "dark":
            return css`
                background-color: #053c5b;
                color: #f7a313;

                &:hover,
                &:focus {
                    background-color: #042d44;
                }
            `;
    }

    return css`
        background-color: #05324c;
        color: #fff;

        &:hover,
        &:focus {
            background-color: #032538;
        }
    `;
};

export const ButtonStyled = styled.button<ButtonProps>`
    font-family: inherit;
    font-size: inherit;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0;
    padding-top: 1em;
    padding-bottom: 1em;
    transition: background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
    ${({ color }) => colorDisplay(color)}
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
        content: "";
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
`;

export const Button: React.FC<ButtonProps> = ({
    children,
    color,
    isLarge,
    onClick,
}) => {
    return (
        <ButtonStyled color={color} isLarge={isLarge} onClick={onClick}>
            {children}
        </ButtonStyled>
    );
};

export default Button;
