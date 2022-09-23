import sum from './sum';

describe('Sum function', () => {
  describe('given two 5 and 2', () => {
    it('Should return the sum of 7', () => {
      expect(sum(5, 2)).toBe(7);
    });
  });
});
