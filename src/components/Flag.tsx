import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as flags from 'country-flag-icons/string/3x2';

interface FlagProps {
  iso: string;
  width?: number;
}

const ASPECT_RATIO = 3 / 2;
const svgByIso: Record<string, string> = flags;

export function Flag({ iso, width = 28 }: FlagProps) {
  const xml = svgByIso[iso.toUpperCase()];
  const height = Math.round(width / ASPECT_RATIO);

  return (
    <View style={[styles.frame, { width, height }]}>
      {xml ? <SvgXml xml={xml} width={width} height={height} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { borderRadius: 3, overflow: 'hidden' },
});
