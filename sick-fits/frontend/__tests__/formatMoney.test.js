import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
    
    it('works with fractional dollars', () => {
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(10)).toEqual('$0.10');
        expect(formatMoney(40)).toEqual('$0.40');
        expect(formatMoney(9)).toEqual('$0.09');
    });

    it('works with whole dollars', () => {
        expect(formatMoney(100)).toEqual('$1');
        expect(formatMoney(200)).toEqual('$2');
        expect(formatMoney(1000)).toEqual('$10');
        expect(formatMoney(10000)).toEqual('$100');
        expect(formatMoney(4000000)).toEqual('$40,000');
    });

    it('works with fractional dollars and cents', () => {
        expect(formatMoney(101)).toEqual('$1.01');
        expect(formatMoney(1010)).toEqual('$10.10');
        expect(formatMoney(401)).toEqual('$4.01');
        expect(formatMoney(10009)).toEqual('$100.09');
        expect(formatMoney(4000001)).toEqual('$40,000.01');
    });

});