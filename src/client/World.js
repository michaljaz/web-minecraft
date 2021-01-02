// Generated by CoffeeScript 2.5.1
var World;

import pChunk from 'prismarine-chunk';

import vec3 from 'vec3';

import ndarray from "ndarray";

World = class World {
  constructor(noa) {
    var _this;
    _this = this;
    this.noa = noa;
    this.Chunk = pChunk("1.16.3");
    this.chunkStorage = {};
    this.chunkNeedsUpdate = {};
    this.noa.world.on('worldDataNeeded', function(id, data, x, y, z) {
      if (_this.chunkStorage[id] !== void 0) {
        if (_this.chunkNeedsUpdate[id]) {
          _this.noa.world.setChunkData(id, _this.chunkStorage[id]);
          _this.chunkNeedsUpdate[id] = false;
        }
      }
    });
  }

  loadChunk(chunk, x, z) {
    var bid, ch, i, ix, iy, iz, j, k, l, noaChunk, ref, y;
    ch = this.Chunk.fromJson(chunk);
    for (y = i = 0, ref = ch.sections.length - 1; (0 <= ref ? i <= ref : i >= ref); y = 0 <= ref ? ++i : --i) {
      noaChunk = new ndarray(new Uint16Array(16 * 16 * 16), [16, 16, 16]);
      if (ch.sections[y] !== null) {
// console.log x,i,z
        for (ix = j = 0; j <= 15; ix = ++j) {
          for (iy = k = 0; k <= 15; iy = ++k) {
            for (iz = l = 0; l <= 15; iz = ++l) {
              bid = ch.sections[y].getBlock(vec3(ix, iy, iz));
              if (bid === 0) {
                noaChunk.set(ix, iy, iz, 0);
              } else {
                noaChunk.set(ix, iy, iz, 1);
              }
            }
          }
        }
      }
      this.chunkStorage[`${x}|${y}|${z}|default`] = noaChunk;
      this.chunkNeedsUpdate[`${x}|${y}|${z}|default`] = true;
      this.noa.world.manuallyLoadChunk(x * 16, y * 16, z * 16);
    }
  }

};

export {
  World
};
