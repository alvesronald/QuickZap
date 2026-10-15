import {
  buildFullNumber,
  buildWhatsAppUrls,
  isValidNumber,
  sanitizeDigits,
} from '../src/utils';

describe('sanitizeDigits', () => {
  it('removes spaces, dashes, parentheses, plus and letters', () => {
    expect(sanitizeDigits('+55 (11) 91234-5678 ab')).toBe('5511912345678');
  });
});

describe('buildFullNumber', () => {
  it('prefixes the dial code to a national number', () => {
    expect(buildFullNumber('55', '11 91234-5678')).toBe('5511912345678');
  });

  it('treats a leading + as already international', () => {
    expect(buildFullNumber('55', ' +1 415 555 2671')).toBe('14155552671');
  });

  it('removes leading trunk zeros', () => {
    expect(buildFullNumber('44', '07911 123456')).toBe('447911123456');
  });

  it('does not duplicate a dial code already typed', () => {
    expect(buildFullNumber('55', '5511912345678')).toBe('5511912345678');
  });

  it('keeps an area code equal to the dial code', () => {
    expect(buildFullNumber('55', '55 91234-5678')).toBe('5555912345678');
  });

  it('returns only the dial code for empty input', () => {
    expect(buildFullNumber('55', '')).toBe('55');
  });
});

describe('isValidNumber', () => {
  it.each([
    ['', false],
    ['1234567', false],
    ['12345678', true],
    ['123456789012345', true],
    ['1234567890123456', false],
  ])('%s -> %s', (value, expected) => {
    expect(isValidNumber(value)).toBe(expected);
  });
});

describe('buildWhatsAppUrls', () => {
  it('builds the app and web links', () => {
    expect(buildWhatsAppUrls('5511912345678')).toEqual({
      app: 'whatsapp://send?phone=5511912345678',
      web: 'https://wa.me/5511912345678',
    });
  });
});
