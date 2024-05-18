# Conway's Game of Life

This is a NextJS project that is implementation of the game.

## Getting Started

Install dependencies:
```console
npm install
```

Run project:
```console
npm run dev
```



## POST /api/board

This request will create a new board (and replace the old one). an example request body should specify the size and live cell in this way:

```json
{
    "size":5,
    "liveCells":[
        {"x":0,"y":0},
        {"x":1,"y":1}, 
        {"x":2,"y":2}, 
        {"x":3,"y":3}, 
        {"x":3,"y":4},
        {"x":4,"y":4}
    ]
}
```

## GET /api/board

This route will retreive the current state of the board. If a generations parameter is passed in the request query (api/board?generations=2), thi API will retrive a simulation of the game x generations forward withoud changing the state.

## PUT /api/board

This route will progress one generation to the future and return the board.

## DELETE /api/board

This route will delete x number of generations from the game state and return mthe latest state after deletion. Request body should lok like this:

```json
{
    "steps": 1
}
```