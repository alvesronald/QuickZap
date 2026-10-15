import { COUNTRIES, DEFAULT_COUNTRY, filterCountries } from '../src/data';

describe('countries', () => {
  it('has unique ISO codes and digit-only dial codes', () => {
    const isos = COUNTRIES.map(country => country.iso);
    expect(new Set(isos).size).toBe(isos.length);
    COUNTRIES.forEach(country => {
      expect(country.iso).toMatch(/^[A-Z]{2}$/);
      expect(country.dialCode).toMatch(/^\d+$/);
    });
  });

  it('defaults to Brazil +55', () => {
    expect(DEFAULT_COUNTRY).toEqual({ iso: 'BR', dialCode: '55' });
  });
});

describe('filterCountries', () => {
  const list = [
    { iso: 'BR', dialCode: '55' },
    { iso: 'US', dialCode: '1' },
    { iso: 'PT', dialCode: '351' },
  ];
  const names: Record<string, string> = {
    BR: 'Brazil',
    US: 'United States',
    PT: 'Portugal',
  };
  const nameOf = (country: { iso: string }) => names[country.iso];

  it('returns everything for an empty query', () => {
    expect(filterCountries(list, '  ', nameOf)).toBe(list);
  });

  it('matches by name, case-insensitively', () => {
    expect(filterCountries(list, 'brAZ', nameOf)).toEqual([list[0]]);
  });

  it('matches by ISO code', () => {
    expect(filterCountries(list, 'us', nameOf)).toEqual([list[1]]);
  });

  it('matches by dial code with or without +', () => {
    expect(filterCountries(list, '+35', nameOf)).toEqual([list[2]]);
    expect(filterCountries(list, '55', nameOf)).toEqual([list[0]]);
  });
});
