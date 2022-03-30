import type { Emitter } from 'mitt';
import mitt from 'mitt';

type Events = {
  resize: {
    detail: {
      width: number;
      height: number;
    };
  };
  openPanel: string;
};

export const emitter: Emitter<Events> = mitt<Events>();
