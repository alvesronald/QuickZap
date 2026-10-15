import { act, renderHook } from '@testing-library/react-native';
import { Linking } from 'react-native';
import { useWhatsAppChat } from '../src/hooks';

const openURL = jest.spyOn(Linking, 'openURL');

describe('useWhatsAppChat', () => {
  beforeEach(() => {
    openURL.mockReset();
    openURL.mockResolvedValue(undefined);
  });

  it('defaults to Brazil with an empty number', async () => {
    const { result } = await renderHook(() => useWhatsAppChat());
    expect(result.current.country.iso).toBe('BR');
    expect(result.current.number).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('flags an invalid number without opening WhatsApp', async () => {
    const { result } = await renderHook(() => useWhatsAppChat());
    await act(async () => {
      await result.current.submit();
    });
    expect(result.current.error).toBe('invalid');
    expect(openURL).not.toHaveBeenCalled();
  });

  it('opens the app link for a valid number', async () => {
    const { result } = await renderHook(() => useWhatsAppChat());
    await act(async () => {
      result.current.setNumber('11 91234-5678');
    });
    await act(async () => {
      await result.current.submit();
    });
    expect(openURL).toHaveBeenCalledWith('whatsapp://send?phone=5511912345678');
    expect(result.current.error).toBeNull();
    expect(result.current.isOpening).toBe(false);
  });

  it('uses the selected country', async () => {
    const { result } = await renderHook(() => useWhatsAppChat());
    await act(async () => {
      result.current.setCountry({ iso: 'US', dialCode: '1' });
      result.current.setNumber('(415) 555-2671');
    });
    await act(async () => {
      await result.current.submit();
    });
    expect(openURL).toHaveBeenCalledWith('whatsapp://send?phone=14155552671');
  });

  it('falls back to wa.me when the app link fails', async () => {
    openURL.mockRejectedValueOnce(new Error('no app'));
    const { result } = await renderHook(() => useWhatsAppChat());
    await act(async () => {
      result.current.setNumber('11912345678');
    });
    await act(async () => {
      await result.current.submit();
    });
    expect(openURL).toHaveBeenLastCalledWith('https://wa.me/5511912345678');
    expect(result.current.error).toBeNull();
  });

  it('reports cannotOpen when both links fail', async () => {
    openURL.mockRejectedValue(new Error('fail'));
    const { result } = await renderHook(() => useWhatsAppChat());
    await act(async () => {
      result.current.setNumber('11912345678');
    });
    await act(async () => {
      await result.current.submit();
    });
    expect(result.current.error).toBe('cannotOpen');
  });

  it('clears the error when editing number or country', async () => {
    const { result } = await renderHook(() => useWhatsAppChat());
    await act(async () => {
      await result.current.submit();
    });
    expect(result.current.error).toBe('invalid');
    await act(async () => {
      result.current.setNumber('1');
    });
    expect(result.current.error).toBeNull();
    await act(async () => {
      await result.current.submit();
    });
    await act(async () => {
      result.current.setCountry({ iso: 'PT', dialCode: '351' });
    });
    expect(result.current.error).toBeNull();
  });

  it('ignores a second submit while opening', async () => {
    let resolve: () => void = () => {};
    openURL.mockImplementation(() => new Promise<void>(r => (resolve = r)));
    const { result } = await renderHook(() => useWhatsAppChat());
    await act(async () => {
      result.current.setNumber('11912345678');
    });
    let first: Promise<void> = Promise.resolve();
    await act(async () => {
      first = result.current.submit();
      await result.current.submit();
    });
    expect(openURL).toHaveBeenCalledTimes(1);
    expect(result.current.isOpening).toBe(true);
    await act(async () => {
      resolve();
      await first;
    });
    expect(result.current.isOpening).toBe(false);
  });
});
