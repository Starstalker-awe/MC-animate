import { CameraView } from '@ksassnowski/motion-canvas-camera';

import { makeScene2D } from '@motion-canvas/2d';
import { Circle, Grid, Line, Txt, Rect } from '@motion-canvas/2d/lib/components';
import { Reference, beginSlide, createRef } from '@motion-canvas/core/lib/utils';
import { all, sequence, waitFor } from '@motion-canvas/core/lib/flow';
import { tween, map, easeInOutCubic } from '@motion-canvas/core/lib/tweening';
import { Vector2 } from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
  const camera = createRef<CameraView>();
  view.add(<CameraView ref={camera} width={"100%"} height={"100%"} />)

  const [COUNT, padding, dotsize, COUNT2] = [14, 210, 20, 8]

  const dotrefs: Reference<Circle>[] = Array.from({ length: COUNT + 1 }, () => createRef<Circle>());
  const linerefs: Reference<Line>[] = Array.from({ length: COUNT }, () => createRef<Line>());
  const lnumrefs: Reference<Txt>[] = Array.from({ length: COUNT }, () => createRef<Txt>());
  const grid: Reference<Grid> = createRef<Grid>();

  const center = {x: 0, y: 0};

  const BB = {
    x: view.size().x - (padding * 2),
    y: view.size().y - (padding * 2)
  }

  const start = {x: -((BB.x / COUNT) * (COUNT / 2)), y: BB.y / 2}

  // Create starting dot at center
  camera().add(
    <Circle 
      ref={dotrefs[0]}
      width={dotsize}
      height={dotsize}
      fill="#bbbbbb"
    />
  );

  // Create 11 more dots to be tweened out
  camera().add(<>{...Array.from({ length: COUNT }, (_, i) => (
    <Circle
      ref={dotrefs[i + 1]}
      width={dotsize}
      height={dotsize}
      fill="#bbbbbb"
      opacity={0}
      x={start.x + ((BB.x / COUNT) * i)}
      y={start.y}
    />
  ))}</>);


  // Move center dot to bottom left corner
  yield* tween(1, val => {
    dotrefs[0]().position.x(map(center.x, start.x, easeInOutCubic(val)))
    dotrefs[0]().position.y(map(center.y, start.y, easeInOutCubic(val)))
  });

  // Move dots across
  yield* sequence(
    0.25,
    ...dotrefs.slice(1).map((dot, i, a) => {
      const current = a[i]().position.x();
      return all(
        dot().position.x(current, 0).to(current + (BB.x / COUNT), 0.5),
        dot().opacity(1, 0.25)
      )
    })
  );

  // Change first three to red
  yield* all(...dotrefs.slice(0, 3).map(dot => dot().fill("#ff0000", 1)));


  camera().add(
    <Grid
      ref={grid}
      width={BB.x}
      height={BB.y}
      spacing={{x: BB.x / COUNT, y: BB.y / COUNT2}}
      stroke={"#ffffff"}
      opacity={0}
    />
  );
  yield* grid().opacity(1, 1);

  yield* beginSlide("")

  

  yield* sequence(
    0.5,
    ...dotrefs.slice(0, 3).map(dot => all(
      dot().position.y(dot().position.y(), 0),
    ))
  )
  // Calculate average growth
})