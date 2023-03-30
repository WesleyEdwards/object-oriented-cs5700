import {
    Puzzle,
    SolveMethodTemplate,
    SudokuGrid,
  } from "../../solvers/SolverTemplate";
  import { BoxWidthMap } from "../helpers";
  import { getBox } from "../utils";
  
  export class SoleCandidate implements SolveMethodTemplate {
    private grid: SudokuGrid;
  
    constructor(grid: SudokuGrid) {
      this.grid = grid;
    }
  
    findAll(): SudokuGrid {
      while (this.findOne()) {
        this.findOne();
      }
      return this.grid;
    }
  
    findOne(): SudokuGrid | null {
      for (let row = 0; row < this.grid.length; row++) {
        for (let col = 0; col < this.grid.length; col++) {
          const cell = this.grid[row][col];
          if (cell.possibleValues.length === 1) {
            cell.assignedValue = cell.possibleValues[0];
            cell.possibleValues = [];
            return this.grid;
          }
        }
      }
      return null;
    }
  
    checkRow() {
      return;
    }
  
    checkCol() {
      return;
    }
  
    checkBox() {
      return;
    }
  }