# Conway's Game of Life

This an implementation of the game, using NextJS as the backend.

## Getting Started

1. Clone the repositiory

2. Install dependencies:
```console
npm install
```

3. Run project:
```console
npm run dev
```

## POST /api/board

This request will create a new board (and replace the old one). The request body should specify the size and live cell in this way:

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

This route will retreive the current (latest) state of the board. If a ```generations``` parameter is passed in the request query (```api/board?generations=<number of generations back>```), this API will retrive a simulation of the game x generations forward withoud changing the state.

## PUT /api/board

This route will progress one generation to the future and return the latest board.

## DELETE /api/board

This route will delete x number of generations from the game state and return mthe latest state after deletion. Request body should lok like this:

```json
{
    "steps": 1
}
```