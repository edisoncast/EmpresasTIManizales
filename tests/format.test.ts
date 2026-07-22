import { describe, it, expect } from 'vitest';
import { decadeLabel } from '../src/lib/format';

describe('decadeLabel', () => {
  it('agrupa un año en su década completa', () => {
    expect(decadeLabel(1991)).toBe('1990–1999');
    expect(decadeLabel(1999)).toBe('1990–1999');
    expect(decadeLabel(2000)).toBe('2000–2009');
    expect(decadeLabel(2009)).toBe('2000–2009');
    expect(decadeLabel(2010)).toBe('2010–2019');
    expect(decadeLabel(2019)).toBe('2010–2019');
  });

  it('recorta la década en curso al año máximo con datos', () => {
    expect(decadeLabel(2020, 2026)).toBe('2020–2026');
    expect(decadeLabel(2026, 2026)).toBe('2020–2026');
  });

  it('no recorta décadas ya cerradas aunque se pase maxYear', () => {
    expect(decadeLabel(2013, 2026)).toBe('2010–2019');
    expect(decadeLabel(1996, 2026)).toBe('1990–1999');
  });

  it('ignora maxYear si cierra la década de forma natural', () => {
    expect(decadeLabel(2012, 2019)).toBe('2010–2019');
  });

  it('devuelve vacío para valores no numéricos', () => {
    expect(decadeLabel(Number.NaN)).toBe('');
  });
});
