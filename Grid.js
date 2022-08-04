function isBetween(x, min, max) {
  return x >= min && x <= max;
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.scentsRegistered = [];
  }

  registerScent = function (position) {
    this.scentsRegistered.push(
      position.currentX.toString() + position.currentY.toString()
    );
  };

  isScented = function (position) {
    return this.scentsRegistered.includes(
      position.currentX.toString() + position.currentY.toString()
    );
  };

  // check if position exits within grid ranges
  positionExists = function (position) {
    return (
      isBetween(position.currentX, 0, this.width) &&
      isBetween(position.currentY, 0, this.height)
    );
  };
}

module.exports = Grid;
