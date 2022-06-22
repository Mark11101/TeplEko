import React from 'react';
import { Path } from 'react-native-svg';

import { colors } from '../../../styles/variables.styles'

interface Props {
  dialRadius: number; // px
  strokeWidth: number;  
  startAngle: number; // degrees°
  endAngle: number; 
}

const TimeLine: React.FC<Props> = (props) => {
  const {
    dialRadius,
    strokeWidth,
    startAngle,
    endAngle,
  } = props;
  
  const polarToCartesian = (
    angle: number,
    arcRadius: number,
    strokeWidth: number,
  ): { 
    x: number; 
    y: number;
  } => {
    
    const r = arcRadius;
    const hC = arcRadius + strokeWidth / 2;
    const a = ((angle - 90) * Math.PI) / 180;
  
    const x = hC + r * Math.cos(a);
    const y = hC + r * Math.sin(a);
  
    return { x, y };
  }
  
  const arcRadius = dialRadius + strokeWidth / 2;
  const startCoords = polarToCartesian(startAngle, arcRadius, strokeWidth);
  const endCoords = polarToCartesian(endAngle, arcRadius, strokeWidth);

  const startCoordsX = (endAngle - startAngle === 360) ? startCoords.x + 0.5 : startCoords.x;

  return (
    <Path
      stroke={colors.primary}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap='round'
      d={`M${startCoordsX} ${startCoords.y} 
        A ${arcRadius} ${arcRadius} 
        1 ${(endAngle - startAngle) > 180 ? 1 : 0}  
        1 ${endCoords.x} ${endCoords.y}`}
    />
  )
}

export default TimeLine
