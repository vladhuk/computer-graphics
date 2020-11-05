import { KonvaEventObject } from 'konva/types/Node';
import Coord from '../../../types/Coord';
import PointModifier from '../../../types/PointModifier';
import { applyModifiers } from '../modifiableKonvaShapes.service';

export type DragAction = (point: Coord) => void;

interface IModifiableDndOptions {
  draggable?: boolean;
  onDragStart?: DragAction;
  onDragEnd?: DragAction;
  onDragMove?: DragAction;
  modifiers?: PointModifier[];
}

export default class ModifiableDndOptions {
  private draggable: boolean;
  private onDragStart?: DragAction;
  private onDragEnd?: DragAction;
  private onDragMove?: DragAction;
  private modifiers: PointModifier[];

  constructor(options: IModifiableDndOptions) {
    this.draggable = options.draggable === undefined ? true : options.draggable;
    this.onDragStart = options.onDragStart;
    this.onDragEnd = options.onDragEnd;
    this.onDragMove = options.onDragMove;
    this.modifiers = options.modifiers || [];
  }

  getDraggable(): boolean {
    return this.draggable;
  }

  getOnDragStart(): (event: KonvaEventObject<DragEvent>) => void {
    return (event) => this.onDragAction(event, this.onDragStart);
  }

  getOnDragEnd(): (event: KonvaEventObject<DragEvent>) => void {
    return (event) => this.onDragAction(event, this.onDragEnd);
  }

  getOnDragMove(): (event: KonvaEventObject<DragEvent>) => void {
    return (event) => this.onDragAction(event, this.onDragMove);
  }

  private onDragAction(
    event: KonvaEventObject<DragEvent>,
    onDragAction?: DragAction
  ): void {
    if (!onDragAction) {
      return;
    }
    const point = applyModifiers(
      ModifiableDndOptions.getPointFromEvent(event),
      this.modifiers
    );
    onDragAction(point);
  }

  static getPointFromEvent(event: KonvaEventObject<DragEvent>): Coord {
    return {
      x: event.target.x(),
      y: event.target.y(),
    };
  }
}
