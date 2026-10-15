export const MIN_DIGITS = 8;
export const MAX_DIGITS = 15;
// A national number is at least this long, so digits left after the dial code
// must reach it for the input to be treated as already international.
const MIN_NATIONAL_LENGTH = 10;

export function sanitizeDigits(input: string): string {
  return input.replace(/\D/g, '');
}

export function buildFullNumber(dialCode: string, input: string): string {
  const digits = sanitizeDigits(input);
  if (input.trim().startsWith('+')) {
    return digits;
  }
  const national = digits.replace(/^0+/, '');
  const alreadyInternational =
    national.startsWith(dialCode) &&
    national.length - dialCode.length >= MIN_NATIONAL_LENGTH;
  return alreadyInternational ? national : `${dialCode}${national}`;
}

export function isValidNumber(digits: string): boolean {
  return (
    /^\d+$/.test(digits) &&
    digits.length >= MIN_DIGITS &&
    digits.length <= MAX_DIGITS
  );
}

export function buildWhatsAppUrls(digits: string): {
  app: string;
  web: string;
} {
  return {
    app: `whatsapp://send?phone=${digits}`,
    web: `https://wa.me/${digits}`,
  };
}
