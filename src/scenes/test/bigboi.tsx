import { makeScene2D } from '@motion-canvas/2d';
import { Circle, Line, Txt } from '@motion-canvas/2d/lib/components';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all, sequence } from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  const DOTS_COUNT = 12;
  const DOT_PADDING = 60;
  const DOT_SIZE = 20;
  const LINE_PADDING = 50;
  const LINE_NUM_PADDING = 20;

  const center = {x: 0, y: 0};

  const grayDot = (
    <Circle
      x={center.x}
      y={center.y}
      width={DOT_SIZE}
      fill='#bbbbbb'
    />
  );
  const dots = Array.from({ length: DOTS_COUNT }, (_, i) => (
    <Circle
      x={center.x - DOT_PADDING * (DOTS_COUNT / 2 - 0.5 - i)}
      y={center.y + DOT_PADDING / 2}
      width={DOT_SIZE}
      fill='#bbbbbb'
    />
  ));

  const verticalLines = Array.from({ length: DOTS_COUNT }, (_, i) => {
    const x = dots[i].position.x();
    return (
      <Line
        points={[[x, center.y - LINE_PADDING], [x, center.y - DOT_PADDING / 2]]}
        stroke='#ffffff'
        lineWidth={2}
      />
    );
  });

  const lineNumbers = Array.from({ length: DOTS_COUNT }, (_, i) => {
    const x = dots[i].position.x();
    return (
      <Txt
        text={`${i + 1}`}
        x={x - LINE_NUM_PADDING}
        y={center.y - LINE_PADDING - LINE_NUM_PADDING}
        fill='#ffffff'
        fontSize={20}
        fontFamily={"sans-serif"}
      />
    );
  });

  

  const dotRefs = dots.map(() => createRef<Circle>());
  view.add(grayDot);
  yield* all(
    grayDot.position.y(center.y + DOT_PADDING / 2, 1),
    sequence(
      0.1,
      function*(){
        yield* dots.map((dot, i) => [
          view.add(
            <Circle
              ref={dotRefs[i]}
              x={dot.position.x()}
              y={dot.position.y()}
              width={DOT_SIZE}
              fill='#bbbbbb'
            />,
          ),
          dotRefs[i]().position.x(dot.position.x() + DOT_PADDING, 1),
        ]).flat()
      }()
    ),
    all(...verticalLines.map((line, i) => line.opacity(1, 1 + i * 0.1))),
    all(...lineNumbers.map((number, i) => number.opacity(1, 1 + (i * 0.1)))),
  );
});
