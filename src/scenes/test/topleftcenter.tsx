import { makeScene2D } from "@motion-canvas/2d";
import { Circle, Rect } from "@motion-canvas/2d/lib/components";
import { waitFor } from "@motion-canvas/core/lib/flow";
import { createRef } from "@motion-canvas/core/lib/utils";

export default makeScene2D(function* (global) {
  const view = createRef<Rect>()

  global.add(
    <Rect 
      ref={view}
      width={"100%"}
      height={"100%"}
      offset={[1, 1]}
    />
  )

  view().add(<Circle 
    width={50}
    height={50}
    fill={"white"}
    position={[(1920 / 3) * 2, (1080 / 3) * 2]}
    zIndex={999}
  />)

  yield* waitFor(3);
})