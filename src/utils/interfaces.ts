export interface PadProps {
    onDigitButtonClick: (digit: Digit) => void;
    onPointButtonClick: () => void;
    onOperatorButtonClick: (operator: Operator) => void;
    onChangeSignButtonClick: () => void;
    onEqualButtonClick: () => void;
    onAllClearButtonClick: () => void;
    onClearEntryButtonClick: () => void;
    onMemoryRecallButtonClick: () => void;
    onMemoryClearButtonClick: () => void;
    onMemoryPlusButtonClick: () => void;
    onMemoryMinusButtonClick: () => void;
}
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Operator = '+' | '-' | '×' | '÷'
export interface Operands {
	leftOperand: number;
	rightOperand: number;
}
