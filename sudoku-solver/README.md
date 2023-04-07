# Sudoku Solver

## About

- This is being hosted at https://wesleyedwards.github.io/object-oriented-cs5700/

## How to run

- Install the node modules with `npm install`
- Run the app with `npm start`
- The app will be running on localhost. go to the indicated port in your browser.

## Tests

- Run the tests with `npm test`
- Test files exist alongside the files they are testing, and are named `*.test.ts`
- Tests are written using the vitest testing framework: https://vitest.dev/

## Warning

- This can solve all puzzles of any size, but it is VERY slow at solving the 25x25, 36x36 and most of the 16x16 puzzles.
- It can solve the following puzzles with only using the cell solutions (very quickly):
  - 16x16-0001
  - 16x16-0102
  - 25x25-0101
- If you want to make sure it actually solves it with brute force,
- It can easily solve all puzzles 9x9 or 4x4.

## Project Structure

- The cell solution algorithms are contained in the 'solving_classes folder
- The ui is build using react, and all components are contained in the 'ui_components' folder

## Patterns

- the Template pattern is used to create the different solving algorithms, and can be found in the 'Solver Template' file, it is called 'CellSolution'
- The implementation of the state pattern is defined in 'lib/StateManager.ts'
- The File Manager ('lib/FileAdapter.ts') uses the Adapter pattern.
