import { sum, getUniqueID } from './index';

describe('test sum function', () => {
    test('first operand should be a number', () => {
        expect(() => sum('num', 2)).toThrow('Operand 1 should be a number.');
    });

    test('second operand should be a number', () => {
        expect(() => sum(2, 'num')).toThrow('Operand 2 should be a number.');
    });

    test('sum function should return 3 for 1 + 2', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('operand should be a number', () => {
        expect(() => getUniqueID('num')).toThrow('The function argument should be a number!');
    });

    test('function generat random text', () => {
        expect(getUniqueID(-1)).toBe("");
    });

    // test('function generat random text', () => {
    //     expect(getUniqueID(1)).toBe(true);
    // });
});