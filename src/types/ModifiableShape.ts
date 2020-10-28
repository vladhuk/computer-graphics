import PointModifier from './PointModifier';

export interface ModifiableShape {
  modifiers?: PointModifier[];
  color?: string;
}

export interface ModifiableLinearShape extends ModifiableShape {
  strokeWidth?: number;
  closed?: boolean;
}
