var GameData = [
{
  cells: [[1,4],[2,4],[3,1],[3,2],[3,3],[3,4],[4,3],[4,4],[4,5],[4,6],[5,3],[6,3]],
  flowers: [[1,4],[3,1],[4,6],[6,3]],
  boxes: [[3,3],[3,4],[4,5],[5,3]],
  person: [4,4]
},
{
  cells: [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[2,6],[2,7],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,5],[4,6],[4,7],[5,5],[6,5],[6,6],[7,3],[7,4],[7,5],[7,6]],
  flowers: [[7,3],[7,4],[7,5]],
  boxes: [[2,2],[2,3],[3,2]],
  person: [1,1]
},
{
  cells: [[1,3],[1,4],[2,1],[2,2],[2,3],[2,4],[2,5],[3,1],[3,3],[3,4],[3,5],[4,1],[4,3],[5,1],[5,3],[5,4],[5,5],[6,1],[6,2],[6,3],[6,4],[6,5],[7,2],[7,3],[7,4],[7,5],[8,2],[8,3]],
  flowers: [[2,4],[2,5],[3,4],[3,5]],
  boxes: [[2,2],[4,3],[6,4],[7,3]],
  person: [2,3]
},
{
  cells: [[1,2],[1,5],[1,6],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,4],[4,5],[4,6]],
  flowers: [[1,5],[1,6],[2,6],[3,6],[4,6]],
  boxes: [[2,2],[2,3],[2,5],[3,4],[3,6]],
  person: [1,2]
},
{
  cells: [[1,4],[1,5],[1,6],[2,1],[2,2],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,2],[4,5],[4,6],[5,2],[5,3],[5,4],[5,6],[6,4],[6,5],[6,6]],
  flowers: [[1,4],[1,5],[1,6]],
  boxes: [[2,5],[3,2],[5,6]],
  person: [2,1]
},
{
  cells: [[1,2],[1,3],[1,4],[1,5],[1,6],[2,2],[2,6],[2,7],[2,8],[2,9],[3,2],[3,3],[3,4],[3,5],[3,7],[3,9],[4,1],[4,2],[4,4],[4,5],[4,6],[4,7],[4,9],[5,1],[5,3],[5,4],[5,5],[5,6],[5,7],[5,9],[6,1],[6,3],[6,4],[6,5],[6,6],[6,8],[6,9],[7,1],[7,3],[7,5],[7,6],[7,7],[7,8],[8,1],[8,2],[8,3],[8,4],[8,8],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],[10,8],[10,9],[11,8],[11,9]],
  flowers: [[2,6],[4,2],[5,5],[6,8],[8,4]],
  boxes: [[4,4],[4,6],[5,5],[6,4],[6,6]],
  person: [11,8]
},
{
  cells: [[1,6],[2,6],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,1],[5,2],[5,3],[5,5],[5,6],[6,3],[6,6],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[8,1],[8,2],[8,3],[8,4]],
  flowers: [[1,6],[2,6],[3,6],[4,6],[5,6]],
  boxes: [[3,3],[4,4],[4,5],[5,3],[7,3]],
  person: [8,1]
},
{
  cells: [[1,3],[1,4],[2,2],[2,3],[2,4],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4],[5,1],[5,3],[5,4],[6,1],[6,3],[6,4],[6,5],[7,1],[7,2],[7,3],[7,4],[7,5],[8,3]],
  flowers: [[1,3],[1,4],[2,2],[2,3],[2,4]],
  boxes: [[3,3],[4,2],[4,4],[5,3],[6,4]],
  person: [8,3]
},
{
  cells: [[1,6],[1,7],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,1],[3,2],[3,3],[3,6],[3,7],[4,2],[4,4],[4,5],[4,6],[4,7],[5,2],[5,4],[5,5],[5,6],[5,7],[6,1],[6,2],[6,4],[6,5],[6,6],[7,1],[7,2],[7,3],[7,6],[7,7],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[9,6],[9,7]],
  flowers: [[4,4],[4,5],[5,4],[5,5],[6,4],[6,5]],
  boxes: [[2,3],[2,6],[5,2],[5,6],[8,3],[8,6]],
  person: [8,7]
},
{
  cells: [[1,3],[1,4],[2,3],[2,4],[3,1],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4],[4,5],[5,1],[5,2],[5,3],[5,4],[5,5],[6,1],[6,2],[6,3]],
  flowers: [[3,4],[4,3],[4,4],[5,3],[5,4]],
  boxes: [[2,4],[3,2],[3,3],[4,2],[5,2]],
  person: [1,3]
},
{
  cells: [[1,2],[1,3],[2,1],[2,2],[2,3],[2,4],[3,1],[3,2],[3,3],[3,4],[4,3],[4,4],[5,3],[5,4],[6,3],[7,3],[7,4],[8,1],[8,2],[8,3],[8,4],[9,1],[9,2],[9,3],[9,4],[10,1],[10,2],[10,3]],
  flowers: [[4,3],[5,3],[6,3],[7,3]],
  boxes: [[2,2],[3,3],[8,2],[9,3]],
  person: [8,4]
},
{
  cells: [[1,2],[1,3],[2,2],[2,3],[3,1],[3,2],[3,3],[3,4],[3,5],[4,1],[4,2],[4,3],[4,4],[4,5],[5,1],[5,2],[5,3],[5,4],[5,5],[6,3],[6,4]],
  flowers: [[3,3],[4,2],[4,4],[5,3]],
  boxes: [[3,2],[4,3],[4,4],[5,4]],
  person: [5,1]
},
{
  cells: [[1,5],[1,6],[2,3],[2,4],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,3],[5,4],[5,5],[5,6],[6,5],[6,6]],
  flowers: [[3,1],[4,1],[4,2],[5,3]],
  boxes: [[3,4],[4,3],[4,5],[5,5]],
  person: [3,6]
},
{
  cells: [[1,1],[1,2],[1,3],[1,4],[1,5],[2,1],[2,2],[2,3],[2,4],[2,5],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4],[4,5],[5,1],[5,2],[5,3],[5,4],[5,5],[6,1],[6,2],[6,4],[6,5]],
  flowers: [[3,2],[3,3],[3,4],[4,2],[4,3],[4,4]],
  boxes: [[2,2],[2,3],[2,4],[4,3],[5,2],[5,4]],
  person: [1,3]
},
]
var a = {
  cells: [[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,]],
  flowers: [[,],[,],[,],[,],[,]],
  boxes: [[,],[,],[,],[,],[,]],
  person: [,]
}