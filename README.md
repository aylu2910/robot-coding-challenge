
## The Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to move
according to instructions provided from Earth. You are to write a program that determines each
sequence of robot positions and reports the final position of the robot. A robot position consists
of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation
(N, S, E, W for north, south, east, and west). A robot instruction is a string of the letters "L",
"R", and "F" which represent, respectively, the instructions:

- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current orientation and
  maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).
There is also a possibility that additional command types may be required in the future and
provision should be made for this.

Since the grid is rectangular and bounded (... yes Mars is a strange planet), a robot that moves
"off" an edge of the grid is lost forever. However, lost robots leave a robot "scent" that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to move
"off" the world from a grid point from which a robot has been previously lost is simply ignored by
the current robot.

## The Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0. The remaining input consists of a sequence of robot positions
and instructions (two lines per robot). A position consists of two integers specifying the initial
coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line.

A robot instruction is a string of the letters "L", "R", and "F" on one line. Each robot is
processed sequentially, i.e., finishes executing the robot instructions before the next robot
begins execution. The maximum value for any coordinate is 50. All instruction strings will be less
than 100 characters in length.

## The Output

For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word "LOST"
should be printed after the position and orientation.

### Sample Input

The input is a text file:

```text
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

### Sample Output

```text
1 1 E
3 3 N LOST
2 3 S
```

## Assumptions
If there are no two lines in the input per robot, the analysis will be done until the last pair of lines that meet the criteria.

If the input received for the rectangular world(_grid_) is not valid, the program will finish and do not log anything.

In case an instruction is not valid, it will be skipped and the program will continue processing.

## Explanation of the solution

The folling classes were created:


- Robot

  - Description: it abstract the Robot object, which has some limited actions to perform and attributes.

    Attributes: 

      It receives a __grid__ (this is needed in order to analyze the context of the robot), __position__ (coordinates (x,y)), __orientation__ (N, S, E, W) and also, as other attribute, a __lost__ boolean value.

    Methods:

      rotateLeft, rotateRight, moveForward and move(general method which receives an instruction).

- Grid

  - Description: it abstract the Grid object, which has some limited actions to perform and attributes.

    Attributes: 

      It receives a __width__ (related to x coordinate), __height__ (related to x coordinate),and also, as other attribute, __scentsRegistered__ array that keeps the track of scents.

    Methods:

      registerScent, isScented and positionExists.

Then, in main.js is where the .txt file is read and analyzed with some validations.

## Testing

Unfortunately, I did not have enough time to build some tests. However, I did have time to test some cases manually, the files used can be found inside resources folder.


## Improvements
If I had more time to work on the problem I would have added:

- more validation and sanitization of inputs.
- unit tests.
- documentation with more details, such as diagrams and any tool/resource that could be used for better comprehension and understanding of the problem and its solution.
- refactoring with asynchronous approach in order to work with the file once it is processed(format: do this, then... for example). This would have allow to divide the code into smaller pieces and then just execute some functions in __main()__  (kind of divide and conquer concept).
- more refactoring in general.
