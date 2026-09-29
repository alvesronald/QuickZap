import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ZapIconProps {
  size?: number;
  color?: string;
}

export function ZapIcon({ size = 48, color = '#eab308' }: ZapIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        fill={color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
