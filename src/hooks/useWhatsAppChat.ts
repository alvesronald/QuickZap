import { useCallback, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { DEFAULT_COUNTRY, type Country } from '../data';
import { buildFullNumber, buildWhatsAppUrls, isValidNumber } from '../utils';

export type ChatError = 'invalid' | 'cannotOpen';

export function useWhatsAppChat() {
  const [country, setCountryState] = useState<Country>(DEFAULT_COUNTRY);
  const [number, setNumberState] = useState('');
  const [error, setError] = useState<ChatError | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const openingRef = useRef(false);

  const setCountry = useCallback((next: Country) => {
    setCountryState(next);
    setError(null);
  }, []);

  const setNumber = useCallback((next: string) => {
    setNumberState(next);
    setError(null);
  }, []);

  const submit = useCallback(async () => {
    if (openingRef.current) {
      return;
    }
    const digits = buildFullNumber(country.dialCode, number);
    if (!isValidNumber(digits)) {
      setError('invalid');
      return;
    }
    openingRef.current = true;
    setIsOpening(true);
    setError(null);
    const { app, web } = buildWhatsAppUrls(digits);
    try {
      await Linking.openURL(app);
    } catch {
      try {
        await Linking.openURL(web);
      } catch {
        setError('cannotOpen');
      }
    } finally {
      openingRef.current = false;
      setIsOpening(false);
    }
  }, [country, number]);

  return { country, setCountry, number, setNumber, error, isOpening, submit };
}
