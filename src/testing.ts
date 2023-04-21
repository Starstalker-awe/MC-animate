import {makeProject} from '@motion-canvas/core';

import gridTest from './scenes/test/gridTest?scene'
import bigboi from './scenes/test/bigboi?scene';
import square from './scenes/test/square?scene';
import topleftcenter from './scenes/test/topleftcenter?scene';

export default makeProject({
  scenes: [topleftcenter, gridTest, bigboi, square],
});
