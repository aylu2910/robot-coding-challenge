const fs = require("fs");
const Grid = require("./Grid");
const Robot = require("./Robot.js");

const PATH_FILENAME = `${__dirname}/resources/test-5.txt`;

const MAXIMUM_VALUE_COORDINATES = 50;
const MAXIMUM_VALUE_INSTRUCTIONS = 100;
const VALID_INSTRUCTIONS = ["R", "L", "F"];

const areValidCoordinates = (gridCoordenates) => {
  let x = gridCoordenates[0];
  let y = gridCoordenates[1];

  return (
    x > 0 &&
    x <= MAXIMUM_VALUE_COORDINATES &&
    y > 0 &&
    y <= MAXIMUM_VALUE_COORDINATES
  );
};

const areInstructionsInScope = (instructions) => instructions.length <= MAXIMUM_VALUE_INSTRUCTIONS;

const isValidInstruction = (instruction) => VALID_INSTRUCTIONS.includes(instruction);

const getGridCoordinates = (lines) => lines[0].split(" ");

const initGrid = (gridCoordenates) => {
  return new Grid(parseInt(gridCoordenates[0]), parseInt(gridCoordenates[1]));
};

const sanitazeLines = (lines) => (lines.length % 2 != 0 ? lines.pop() : lines);

const formatLinesPerRobot = (linesPerRobot) => {
  let linesArray = [];
  for (let i = 0; i < linesPerRobot.length; i = i + 2) {
    let instructions = linesPerRobot[i + 1];
    if (areInstructionsInScope(instructions)) {
      let auxArr = [];
      auxArr.push(linesPerRobot[i], instructions);
      linesArray.push(auxArr);
    }
  }
  return linesArray
};

function main() {
  fs.readFile(PATH_FILENAME, "utf-8", (err, data) => {
    let robotsOutput = [];
    if (err) throw err;
    let lines = data.split("\n");
    let gridCoordenates = getGridCoordinates(lines);
    if (areValidCoordinates(gridCoordenates)) {
      let grid = initGrid(gridCoordenates);
      lines.shift();
      let linesPerRobot = sanitazeLines(lines);
      let linesPerRobotArray = formatLinesPerRobot(linesPerRobot);
      linesPerRobotArray.forEach((line) => {
        let coords = line[0].split(" ");
        let robot = new Robot(grid, coords[0], coords[1], coords[2]);
        let instructions = line[1].toUpperCase();
        for (instruction of instructions) {
          if (isValidInstruction) {
            robot.move(instruction);
          }
        }
        let robotOutput = [
          robot.position.currentX,
          robot.position.currentY,
          robot.orientation,
        ];

        if (robot.lost) {
          robotOutput.push("LOST");
        }
        robotsOutput.push(robotOutput);
      });

      robotsOutput = robotsOutput.map((output) => output.join(" ")).join("\n");

      console.log(robotsOutput);
    }
  });
}

main();
