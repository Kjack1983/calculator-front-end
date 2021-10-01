import React, { useState } from "react";
import styled from "styled-components";
import Display from "../Display/Display";
import Pad from "../Pad/Pad";
import { Digit, Operator} from "../../lib/types";
import * as operations from '../../hooks/helperMethods';

const StyledApp = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
	width: 100%;
	border: 2px solid rgb(0, 63, 255);
    max-width: 600px;
`;

export const App: React.FC = (): JSX.Element => {
    // Calculator's states
    const [memory, setMemory] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);
    const [pendingOperator, setPendingOperator] = useState<Operator>();
    const [display, setDisplay] = useState<string>("0");

    const calculate = async(rightOperand: number, pendingOperator: Operator): Promise<any> => {
        let newResult = result;

		let myOperands = {
			leftOperand: newResult, 
			rightOperand: rightOperand
		}

		switch (pendingOperator) {
            case "+":
				let sum = await operations.addition(myOperands);

				if(!sum) {
					return false;
				}

                newResult = sum;
                break;
            case "-":
				let subtraction = await operations.subtraction(myOperands);

				if(!subtraction) {
					return false;
				}

                newResult = subtraction;
                break;
            case "×":
				let multiplication = await operations.multiplication(myOperands);

				if(!multiplication) {
					return false;
				}

				newResult = multiplication;
                break;
            case "÷":
                if (rightOperand === 0) {
                    return false;
				}
				
				let division = await operations.division(myOperands);

				if(!division) {
					return false;
				}

                newResult = division	;
        }

        setResult(newResult);
        setDisplay(String(newResult).slice(0, 12));

        return true;
    };

    // Pad buttons handlers
    const onDigitButtonClick = (digit: Digit):void => {
        let newDisplay = display;

        if ((display === "0" && digit === 0) || display.length > 12) {
            return;
        }

        if (waitingForOperand) {
            newDisplay = "";
            setWaitingForOperand(false);
        }

        if (display !== "0") {
            newDisplay = newDisplay + digit.toString();
        } else {
            newDisplay = digit.toString();
        }

        setDisplay(newDisplay);
    };

    const onPointButtonClick = () => {
        let newDisplay = display;

        if (waitingForOperand) {
            newDisplay = "0";
        }

        if (newDisplay.indexOf(".") === -1) {
            newDisplay = newDisplay + ".";
        }

        setDisplay(newDisplay);
        setWaitingForOperand(false);
    };

    const onOperatorButtonClick = (operator: Operator) => {
        const operand = Number(display);

        if (typeof pendingOperator !== "undefined" && !waitingForOperand) {
            if (!calculate(operand, pendingOperator)) {
                return;
            }
        } else {
            setResult(operand);
        }

        setPendingOperator(operator);
        setWaitingForOperand(true);
    };

    const onChangeSignButtonClick = () => {
        const value = Number(display);

        if (value > 0) {
            setDisplay("-" + display);
        } else if (value < 0) {
            setDisplay(display.slice(1));
        }
    };

    const onEqualButtonClick = () => {
        const operand = Number(display);

        if (typeof pendingOperator !== "undefined" && !waitingForOperand) {
            if (!calculate(operand, pendingOperator)) {
                return;
            }

            setPendingOperator(undefined);
        } else {
            setDisplay(operand.toString());
        }

        setResult(operand);
        setWaitingForOperand(true);
    };

    const onAllClearButtonClick = () => {
        setMemory(0);
        setResult(0);
        setPendingOperator(undefined);
        setDisplay("0");
        setWaitingForOperand(true);
    };

    const onClearEntryButtonClick = () => {
        setDisplay("0");
        setWaitingForOperand(true);
    };

    const onMemoryRecallButtonClick = () => {
        setDisplay(memory.toString());
        setWaitingForOperand(true);
    };

    const onMemoryClearButtonClick = () => {
        setMemory(0);
        setWaitingForOperand(true);
    };

    const onMemoryPlusButtonClick = () => {
        setMemory(memory + Number(display));
        setWaitingForOperand(true);
    };

    const onMemoryMinusButtonClick = () => {
        setMemory(memory - Number(display));
        setWaitingForOperand(true);
    };

    return (
        <StyledApp>
            <Display
                value={display}
                hasMemory={memory !== 0}
                expression={
                    typeof pendingOperator !== "undefined"
                        ? `${result}${pendingOperator}${
                              waitingForOperand ? "" : display
                          }`
                        : ""
                }
            />
            <Pad
                onDigitButtonClick={onDigitButtonClick}
                onPointButtonClick={onPointButtonClick}
                onOperatorButtonClick={onOperatorButtonClick}
                onChangeSignButtonClick={onChangeSignButtonClick}
                onEqualButtonClick={onEqualButtonClick}
                onAllClearButtonClick={onAllClearButtonClick}
                onClearEntryButtonClick={onClearEntryButtonClick}
                onMemoryRecallButtonClick={onMemoryRecallButtonClick}
                onMemoryClearButtonClick={onMemoryClearButtonClick}
                onMemoryPlusButtonClick={onMemoryPlusButtonClick}
                onMemoryMinusButtonClick={onMemoryMinusButtonClick}
            />
        </StyledApp>
    );
};

export default App;
