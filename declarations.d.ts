declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-pulse' {
  interface PulseProps {
    color: string; 
    diameter: number;
    duration: number;
    speed: number;
    numPulses: number; 
  }
  
  const content: React.FC<PulseProps>;
  export default content;
}