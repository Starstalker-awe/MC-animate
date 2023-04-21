import { makeScene2D } from "@motion-canvas/2d";
import { Grid } from "@motion-canvas/2d/lib/components";
import { waitFor } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  view.add(<Grid 
    width={1500}
    height={700}
    stroke={"#ffffff"}
    spacing={10}
  />)

  yield* waitFor(5)
});