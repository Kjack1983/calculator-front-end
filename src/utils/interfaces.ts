export interface PadProps {
    onDigitButtonClick: (digit: Digit) => void;
    onDotButtonClick: () => void;
    onOperatorButtonClick: (operator: Operator) => void;
    onChangeSignButtonClick: () => void;
    onEqualButtonClick: () => void;
    onClearAllButtonClick: () => void;
    clearEntryButtonClick: () => void;
    memoryRecallButtonClick: () => void;
    clearMemoryButtonClick: () => void;
    memoryPlusButtonClick: () => void;
    memoryMinusButtonClick: () => void;
}

export interface returnMappedValues {
	display: string;
	pendingOperand: boolean;
	digit: Digit;
	setPendingOperand: (type:boolean) => void;
	setDisplay: (type:string) => void;
}

export interface DisplayProps {
    hasMemory: boolean;
    expression: string;
    value: string;
}

export interface ButtonProps {
	color?: 'red' | 'green' | 'dark'
	isLarge?: boolean
	onClick?: () => void
}
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Operator = '+' | '-' | '×' | '÷'
export interface Operands {
	leftOperand: number;
	rightOperand: number;
}
