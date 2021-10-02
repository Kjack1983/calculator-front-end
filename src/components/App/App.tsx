import React, { useState } from "react";
import styled from "styled-components";
import Display from "../Display/Display";
import Pad from "../Pad/Pad";
import { Digit, Operator } from "../../utils/interfaces";
import * as operations from "../../helpers/helperMethods";

const CalcStyledApp = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 17px;
    width: 100%;
    border: 2px solid rgb(0, 63, 255);
	max-width: 500px;
`;

export const App: React.FC = (): JSX.Element => {
    // Calculator's states
    const [memoize, setMemoize] = useState<number>(0);
    const [finalResult, setFinalResult] = useState<number>(0);
    const [pendingOperand, setPendingOperand] = useState<boolean>(true);
    const [pendingOperator, setPendingOperator] = useState<Operator>();
    const [display, setDisplay] = useState<string>("0");

    const calculate = async (
        rightOperand: number,
        pendingOperator: Operator
    ): Promise<any> => {
        let newResult = finalResult;

        switch (pendingOperator) {
            case "+":
                let sum = await operations.addition({
					leftOperand: newResult,
					rightOperand: rightOperand
				});

                if (!sum) {
                    return false;
                }

                newResult = sum;
                break;
            case "-":
                let subtraction = await operations.subtraction({
					leftOperand: newResult,
					rightOperand: rightOperand
				});

                if (!subtraction) {
                    return false;
                }

                newResult = subtraction;
                break;
            case "×":
                let multiplication = await operations.multiplication({
					leftOperand: newResult,
					rightOperand: rightOperand
				});

                if (!multiplication) {
                    return false;
                }

                newResult = multiplication;
                break;
            case "÷":
                if (rightOperand === 0) {
                    return false;
                }

                let division = await operations.division({
					leftOperand: newResult,
					rightOperand: rightOperand
				});

                if (!division) {
                    return false;
                }

                newResult = division;
        }

        setFinalResult(newResult);
        setDisplay(String(newResult).slice(0, 12));

        return true;
    };

    /**
	 * Pad buttons handlers
	 * 
	 * @return {void}
	 */
    const onDigitButtonClick = (digit: Digit): void => {
        let newDisplay = display;

        if ((display === "0" && digit === 0) || display.length > 12) {
            return;
        }

        if (pendingOperand) {
            newDisplay = "";
            setPendingOperand(false);
        }

        if (display !== "0") {
            newDisplay = newDisplay + digit.toString();
        } else {
            newDisplay = digit.toString();
        }

        setDisplay(newDisplay);
    };

    /**
     * Point handling.
	 * 
	 * @return {void}
     */
    const onDotButtonClick = ():void => {
        let newDisplay = display;

        if (pendingOperand) {
            newDisplay = "0";
        }

        if (!newDisplay.includes(".")) {
            newDisplay = newDisplay + ".";
        }

        setDisplay(newDisplay);
        setPendingOperand(false);
    };

	/**
	 * Operator handling buttons. 
	 * 
	 * @param {string }operator
	 * @return {void}
	 */
    const onOperatorButtonClick = (operator: Operator):void => {
		console.log('operator :>> ', operator);
		const operand = Number(display);

        if (typeof pendingOperator !== "undefined" && !pendingOperand) {
            if (!calculate(operand, pendingOperator)) {
                return;
            }
        } else {
            setFinalResult(operand);
        }

        setPendingOperator(operator);
        setPendingOperand(true);
    };

	/**
	 * Sign handling buttons.
	 * 
	 * @return {void}
	 */
    const onChangeSignButtonClick = ():void => {
        const value = Number(display);

        if (value > 0) {
            setDisplay("-" + display);
        } else if (value < 0) {
            setDisplay(display.slice(1));
        }
    };

	/**
	 * onEqualButtonClick handling
	 * 
	 * @return {void}
	 */
    const onEqualButtonClick = () => {
        const operand = Number(display);

        if (typeof pendingOperator !== "undefined" && !pendingOperand) {
            if (!calculate(operand, pendingOperator)) {
                return;
            }

            setPendingOperator(undefined);
        } else {
            setDisplay(operand.toString());
        }

        setFinalResult(operand);
        setPendingOperand(true);
    };

	/**
	 * Clear all buttons handling
	 * 
	 * @return {void}
	 */
    const onClearAllButtonClick = ():void => {
        setMemoize(0);
        setFinalResult(0);
        setPendingOperator(undefined);
        setDisplay("0");
        setPendingOperand(true);
    };

    const clearEntryButtonClick = () => {
        setDisplay("0");
        setPendingOperand(true);
    };

    const memoryRecallButtonClick = () => {
        setDisplay(String(memoize));
        setPendingOperand(true);
    };

    const clearMemoryButtonClick = () => {
        setMemoize(0);
        setPendingOperand(true);
    };

    const memoryPlusButtonClick = () => {
        setMemoize(memoize + Number(display));
        setPendingOperand(true);
    };

    const memoryMinusButtonClick = () => {
        setMemoize(memoize - Number(display));
        setPendingOperand(true);
    };

    return (
        <CalcStyledApp>
            <Display
                value={display}
                hasMemory={memoize !== 0}
                expression={
                    typeof pendingOperator !== "undefined"
                        ? `${finalResult}${pendingOperator}${
                              pendingOperand ? "" : display
                          }`
                        : ""
                }
            />
            <Pad
                onDigitButtonClick={onDigitButtonClick}
                onDotButtonClick={onDotButtonClick}
                onOperatorButtonClick={onOperatorButtonClick}
                onChangeSignButtonClick={onChangeSignButtonClick}
                onEqualButtonClick={onEqualButtonClick}
                onClearAllButtonClick={onClearAllButtonClick}
                clearEntryButtonClick={clearEntryButtonClick}
                memoryRecallButtonClick={memoryRecallButtonClick}
                clearMemoryButtonClick={clearMemoryButtonClick}
                memoryPlusButtonClick={memoryPlusButtonClick}
                memoryMinusButtonClick={memoryMinusButtonClick}
            />
        </CalcStyledApp>
    );
};

export default  React.memo(App);
