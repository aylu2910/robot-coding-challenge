const ORIENTATIONS = ["N", "E", "S", "W"];

// link orientation to a specific position for better tracking
const ORIENTATIONS_POSITIONS = {};
for (i = 0; i < ORIENTATIONS.length; i++) {
  ORIENTATIONS_POSITIONS[ORIENTATIONS[i]] = i;
}

const NORTH_POSITION = ORIENTATIONS_POSITIONS["N"];
const WEST_POSITION = ORIENTATIONS_POSITIONS["W"];

const isNorth = (position) => position === NORTH_POSITION;
const isWest = (position) => position === WEST_POSITION;

class Robot {
  constructor(grid, x = 0, y = 0, orientation) {
    this.grid = grid;
    this.position = {
      currentX: x,
      currentY: y,
    };

    this.orientation = orientation;
    this.lost = false;
  }

  rotateLeft = function () {
    let currentPosition = ORIENTATIONS_POSITIONS[this.orientation];
    let rotateDirection = currentPosition - 1;

    if (isNorth(currentPosition)) {
      rotateDirection = WEST_POSITION;
    }

    this.orientation = ORIENTATIONS[rotateDirection];
  };

  rotateRight = function () {
    let currentPosition = ORIENTATIONS.indexOf(this.orientation);
    let rotateDirection = currentPosition + 1;

    if (isWest(currentPosition)) {
      rotateDirection = NORTH_POSITION;
    }

    this.orientation = ORIENTATIONS[rotateDirection];
  };

  moveForward() {
    var oldPosition = {
      currentX: this.position.currentX,
      currentY: this.position.currentY,
    };
    switch (this.orientation) {
      case "N":
        this.position.currentY++;
        break;
      case "E":
        this.position.currentX++;
        break;
      case "S":
        this.position.currentY--;
        break;
      case "W":
        this.position.currentX--;
        break;
      default:
        break;
    }

    // check if new position is within grid
    if (!this.grid.positionExists(this.position)) {
      // set position to before moving off grid
      this.position = oldPosition;

      if (!this.grid.isScented(this.position)) {
        this.grid.registerScent(this.position);
        this.lost = true;
        return false;
      }
    }
    return true;
  }

  move(instruction) {
    switch (instruction) {
      case "L":
        this.rotateLeft();
        break;

      case "R":
        this.rotateRight();
         break;

      case "F":
        return this.moveForward();
    }
  }
}

module.exports = Robot;
