const { useState } = require("react");
const {useEffect, useRef} = require("react");

const DRIGHT = "right";
const DLEFT = "left";
const DUP = "up";
const DDOWN = "down";
const HEIGH = 10;
const WIDTH = 10;
const SNAKE = 1;
const FOOD = 2;
const EMPTY = 0;
const LEFT_ASCII = 37;
const UP_ASCII = 38;
const RIGHT_ASCII = 39;
const DOWN_ASCII = 40;
const BlankImg = "./blank.png";
const FoodImg = "./food.png";
const SnakeImg = "./snake.png";

export const SnakeGame = () => {
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DRIGHT);
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);

  const [board, setBoard] = useState(
    Array(HEIGH).fill(Array(WIDTH).fill(EMPTY))
  );


  const randomPosition = () => {
    // return a (x,y) in board 0 <= x,y <10
    return {
      x: Math.floor(Math.random() * WIDTH),
      y: Math.floor(Math.random() * WIDTH),
    };
  };

  const changeDirection = (e) => {
    // change Direction state by capturing key
    var { keyCode } = e;
    switch (keyCode) {
      case LEFT_ASCII:
        setDirection(DLEFT);
        break;
      case RIGHT_ASCII:
        setDirection(DRIGHT);
        break;
      case UP_ASCII:
        setDirection(DUP);
        break;
      case DOWN_ASCII:
        setDirection(DDOWN);
        break;
      default:
        break;
    }
  };

  document.addEventListener("keydown", changeDirection, false);

  const displaySnakeAndFood = () => {
    var tempboard = createBoard();
    // set value "snake" for cells of snake on board
    snake.forEach((ele) => {
      console.log(tempboard);
      tempboard[ele.x][ele.y] = SNAKE;
    });

    // set value "food" for a cell of food on board
    tempboard[food.x][food.y] = FOOD;

    setBoard(tempboard);
  };

  const moveSnake = () => {
    // "move snake" following current direction (state: direction) meaning
    // changing snake array by direction
    // "feed snake" when snake meet food, meaning add a ele to snake array
    // and set new food at random postion
    var temp = { x: null, y: null };
    var tempSnake = snake;
    switch (direction) {
      case DUP:
        temp.x = tempSnake[0].x;
        temp.y = tempSnake[0].y - 1;
        tempSnake.unshift(temp);
        tempSnake.pop();
        if (temp.x === food.x && temp.y - 1 === food.y) {
          tempSnake.unshift(food);
          setFood(randomPosition());
        }
        break;
      case DDOWN:
        temp.x = tempSnake[0].x;
        temp.y = tempSnake[0].y + 1;
        tempSnake.unshift(temp);
        tempSnake.pop();
        if (temp.x === food.x && temp.y + 1 === food.y) {
          tempSnake.unshift(food);
          setFood(randomPosition());
        }
        break;
      case DLEFT:
        temp.x = tempSnake[0].x - 1;
        temp.y = tempSnake[0].y;
        tempSnake.unshift(temp);
        tempSnake.pop();
        if (temp.x - 1 === food.x && temp.y === food.y) {
          tempSnake.unshift(food);
          setFood(randomPosition());
        }
        break;
      case DRIGHT:
        temp.x = tempSnake[0].x + 1;
        temp.y = tempSnake[0].y;
        tempSnake.unshift(temp);
        tempSnake.pop();
        if (temp.x + 1 === food.x && temp.y === food.y - 1) {
          tempSnake.unshift(food);
          setFood(randomPosition());
        }
        break;
      default:
        break;
    }
    setSnake(tempSnake);
    displaySnakeAndFood();
  };

  function useInterval(callBackFucntion, delay) {
    // execute callback function after 1 delay interval
    console.log(board);
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callBackFucntion;
    }, [callBackFucntion]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const renderBoard = () => {
    // return JSX code render board;
    return (
      <ul style={{ width: "500px", padding: "0px" }} class="img500">
        {board.map((row) => (
          <li>
            {row.map((ele) => {
              switch (ele) {
                case SNAKE:
                  return <img src={SnakeImg} alt=""/>;
                case FOOD:
                  return <img src={FoodImg} alt=""/>;
                default:
                  return <img src={BlankImg} alt=""/>;
              }
            })}
          </li>
        ))}
      </ul>
    );
  };

  useInterval(moveSnake, 100);

  return <div>{renderBoard}</div>;
};
