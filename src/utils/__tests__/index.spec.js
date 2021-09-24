import { genFibonacci, isLight, isDark, knuthShuffle } from '../index';

describe('utils', () => {
  it('genFibonacci', () => {
    expect(genFibonacci(0)).toHaveLength(0);
    expect(genFibonacci(2)).toEqual([0, 1]);
    expect(genFibonacci(10)).toHaveLength(10);
  });

  it('isLight', () => {
    expect(isLight('#CBD5E1')).toBeTruthy();
    expect(isLight('#64748B')).toBeFalsy();
  });

  it('isDark', () => {
    expect(isDark('#CBD5E1')).toBeFalsy();
    expect(isDark('#64748B')).toBeTruthy();
  });

  it('knuthShuffle', () => {
    const shuffledArray = knuthShuffle(['One', 'Two', 'Three']);

    expect(shuffledArray).toHaveLength(3);
    expect(shuffledArray).toContain('One');
    expect(shuffledArray).toContain('Two');
    expect(shuffledArray).toContain('Three');
  });
});
