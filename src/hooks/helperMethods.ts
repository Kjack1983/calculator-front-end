import React from 'react';
import { Operands } from '../lib/types';
import { baseUrl } from '../shared/baseUrl';

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
 * @return {number | boolean} sum 
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
 * @return {number | boolean} sum 
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
 * @return {number | boolean} sum 
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