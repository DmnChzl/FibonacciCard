import { buildFibonacci, isLight, isDark } from '../index';

describe('utils', () => {
  it('buildFibonacci', () => {
    expect(buildFibonacci(0)).toHaveLength(0);
    expect(buildFibonacci(2)).toEqual([0, 1]);
    expect(buildFibonacci(10)).toHaveLength(10);
  });

  it('isLight', () => {
    expect(isLight('#CBD5E1')).toBeTruthy();
    expect(isLight('#64748B')).toBeFalsy();
  });

  it('isDark', () => {
    expect(isDark('#CBD5E1')).toBeFalsy();
    expect(isDark('#64748B')).toBeTruthy();
  });
});
