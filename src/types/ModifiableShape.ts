import ModifiableDndOptions from '../components/modifiableKonvaShapes/ModifiableDndOptions';
import PointModifier from './PointModifier';

export interface ModifiableShape {
  modifiers?: PointModifier[];
  color?: string;
  dndOptions?: ModifiableDndOptions;
}

export interface ModifiableLinearShape extends ModifiableShape {
  strokeWidth?: number;
  closed?: boolean;
}
