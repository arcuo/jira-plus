import { describe, test, expect } from 'vitest';
import { RGB, white, black } from './color';

describe('color', () => {
  test('textColor black', () => {
    const color = new RGB('rgb(255,196,0)');
    const textColor = color.textColor().toString();

    expect(textColor).toBe(black.toString());
  });

  test('textColor white', () => {
    const color = new RGB('rgb(101, 85, 192)');
    const textColor = color.textColor().toString();

    expect(textColor).toBe(white.toString());
  });

  test('convertion from string to RGB', () => {
    const hex = '#6555c0';
    const rgb = 'rgb(101, 85, 192)';

    expect(new RGB(hex).toString()).toBe(rgb);
    expect(new RGB(rgb).toString()).toBe(rgb);
  });

  test('convertion of random string', () => {
    expect(() => new RGB('randomString')).toThrowError();
  });
});
