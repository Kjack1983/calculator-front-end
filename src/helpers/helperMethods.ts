import React, {useState} from 'react';
import { Operator, Operands } from '../utils/interfaces';
import { baseUrl } from '../shared/baseUrl';


export const useCalcOperations = () => {
	const [memory, setMemory] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);
    const [pendingOperator, setPendingOperator] = useState<Operator>();
	const [display, setDisplay] = useState<string>("0");
	
	return [
		memory, setMemory, result, setResult,
		waitingForOperand, setWaitingForOperand,
		pendingOperator, setPendingOperator,
		display, setDisplay
	]
}

/**
 * Addition calc operation.
 * 
 * @param {number} leftOperand
 * @param {number} rightOperand
 * @return {number | boolean} sum 
 */
export const addition = async(operands: Operands):Promise<any> => {
	let { leftOperand, rightOperand } = operands;

	try {
		let response =  await fetch(`${baseUrl}api/sum/${leftOperand}/${rightOperand}`);

		if(response.ok) {
			let { sum } = await response.json();
			return sum;
		} else {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}

	} catch (error) {
		console.log('%c%s', 'color: #00a3cc', 'ERROR:', error.message);
		return false;
	}
}

/**
 * Substraction calc operation.
 * 
 * @param {number} leftOperand
 * @param {number} rightOperand
 * @return {number | boolean} substraction 
 */
export const subtraction = async(operands: Operands):Promise<any> => {
	let { leftOperand, rightOperand } = operands;

	try {
		let response =  await fetch(`${baseUrl}api/sub/${leftOperand}/${rightOperand}`);

		if(response.ok) {
			let { subtraction } = await response.json();
			return subtraction;
		} else {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}

	} catch (error) {
		console.log('%c%s', 'color: #00a3cc', 'ERROR:', error.message);
		return false;
	}
}


/**
 * Multiplication calc operation.
 * 
 * @param {number} leftOperand
 * @param {number} rightOperand
 * @return {number | boolean} multiplication 
 */
export const multiplication = async(operands: Operands):Promise<any> => {
	let { leftOperand, rightOperand } = operands;

	try {
		let response =  await fetch(`${baseUrl}api/mul/${leftOperand}/${rightOperand}`);

		if(response.ok) {
			let { multiplication } = await response.json();
			return multiplication;
		} else {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}

	} catch (error) {
		console.log('%c%s', 'color: #00a3cc', 'ERROR:', error.message);
		return false;
	}
}

/**
 * Division calc operation.
 * 
 * @param {number} leftOperand
 * @param {number} rightOperand
 * @return {number | boolean} division 
 */
export const division = async(operands: Operands):Promise<any> => {
	let { leftOperand, rightOperand } = operands;

	try {
		let response =  await fetch(`${baseUrl}api/div/${leftOperand}/${rightOperand}`);

		if(response.ok) {
			let { division } = await response.json();
			return division;
		} else {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}

	} catch (error) {
		console.log('%c%s', 'color: #00a3cc', 'ERROR:', error.message);
		return false;
	}
}