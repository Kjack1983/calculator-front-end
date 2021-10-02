import React from "react";
import styled from "styled-components";
import { DisplayProps } from '../../utils/interfaces';

const IndicatorListStyled = styled.div`
    font-size: 0.75em;
    line-height: 1;
    opacity: 0.4;
    text-align: right;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25em;
    min-height: 1em;
`;

const ExpressionStyled = styled.span`
    margin-left: auto;
`;

const ScreenStyle = styled.div`
    font-size: 2.5em;
    min-height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
`;

const DisplayStyled = styled.div`
    background-color: #095a89;
    color: #fff;
    padding: 1.5em 1em;
`;

export const Screen: React.FC<DisplayProps> = ({
    value,
    hasMemory,
    expression,
}) => {
    return (
        <DisplayStyled>
            <IndicatorListStyled>
                {hasMemory && <span>M</span>}

                <ExpressionStyled>{expression}</ExpressionStyled>
            </IndicatorListStyled>

            <ScreenStyle>{value}</ScreenStyle>
        </DisplayStyled>
    );
};

export default Screen;
