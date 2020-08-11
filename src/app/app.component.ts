import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-sudoku';
  //  grid = new Array(9).fill(0).map(() => new Array(9).fill(null));
   grid = 
  [
    [5,3,null,null,7,null,null,null,null],
    [6,null,null,1,9,5,null,null,null],
    [null,9,8,null,null,null,null,6,null],
    [8,null,null,null,6,null,null,null,3],
    [4,null,null,8,null,3,null,null,1],
    [7,null,null,null,2,null,null,null,6],
    [null,6,null,null,null,null,2,8,null],
    [null,null,null,4,1,9,null,null,5],
    [null,null,null,null,8,null,null,7,9]
  ];


  solved:boolean = false;

constructor(){
  
}

solve(): boolean{
  let location = [0,0];
  if(!this.getEmptyCell(this.grid,location)){
    this.solved = true;
    return true;
  } 
  
    let row = location[0];
    let col = location[1];
    for(let num = 1; num <= 9 ; num ++){
      if(this.validInRow(this.grid,row,num) &&
      this.validInCol(this.grid,col,num)  &&
      this.validInBox(this.grid,row - row % 3 , col - col % 3 , num)){
        this.grid[row][col] = num;
        if(this.solve()){
          return true;this.solved = true;
        } 
        this.grid[row][col] = null;
      }

  }
  return false;
  
}

getEmptyCell(grid:any[][],cell:any[]):boolean{
  for(let row = 0; row < grid.length; row++){
    for(let col = 0; col < grid[row].length; col ++){
        if(!grid[row][col]){
          cell[0] = row;
          cell[1] = col;
          return true;
        }

    }
  }
  return false;
}



validInRow(grid:any[][],row:number,value:number){
  for(let i = 0; i < grid.length; i++){
    if(grid[row][i] == value) return false;
  }
  return true;
}

validInCol(grid:any[][],col:number,value:number){
  for(let i = 0; i < grid.length; i++){
    if(grid[i][col] == value) return false;
  }
  return true;
}

validInBox(grid:any[][],startRow:number,startCol:number,value:number){
  for(let row = 0; row < 3; row++){
    for(let col = 0 ; col < 3 ; col++){
      if(grid[row+ startRow][col+startCol] == value) return false;
    }
  }
  return true;
}



updateValue(event:any,rowIndex:number,colIndex:number){
  this.grid = this.grid.map((row,rIndex)=>{
    return row.map((col,cIndex)=>{
        if(cIndex == colIndex && rIndex == rowIndex){
          return Number(event);
        }
        return col;
    });
  })
}


resetGrid(){
  this.grid = new Array(9).fill(0).map(() => new Array(9).fill(null));
  this.solved = false;
}
}
