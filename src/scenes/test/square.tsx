import {makeScene2D} from '@motion-canvas/2d';
import {Line} from '@motion-canvas/2d/lib/components';
import { waitFor } from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  view.add(
    <>
      <Line points={[[0, 0], [100, 0]]} stroke="#ffffff" lineWidth={3} />
      <Line points={[[100, 0], [100, 100]]} stroke="#ffffff" lineWidth={3} />
      <Line points={[[100, 100], [0, 100]]} stroke="#ffffff" lineWidth={3} />
      <Line points={[[0, 100], [0, 0]]} stroke="#ffffff" lineWidth={3} />
    </>
  );

  yield* waitFor(2);
});
