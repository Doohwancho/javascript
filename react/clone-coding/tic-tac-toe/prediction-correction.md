https://reactjs.org/tutorial/tutorial.html

# A. final product: tic tac toe

https://codepen.io/gaearon/pen/gWWZgR?editors=0010
```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext //toggle T/F
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

```

![[Pasted image 20220802201523.png]]



## A.1. 분석

### A.1.1. square
```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```
#### A.1.1.1. html tag를 return 하네?

##### A.1.1.1.1. 리엑트는 컴포넌트 기반이라는데, 이걸보고 그러는 것 같다.

#### A.1.1.2. props로 받네?
##### A.1.1.2.1. 부모로부터 받는 파라미터는 항상 props로 통일하나 봄

#### A.1.1.3. props.onClick 콜백이 있네?
##### A.1.1.3.1. Game -> Board -> Square 물려받음
```javascript
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
```
Game에서 마지막 return문에 저렇게 되어있다.


## A.2. Board

```javascript
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

#### A.2.1.1. class가 React.Component를 상속받네?

##### A.2.1.1.1. 맞음


#### A.2.1.2. class안 함수에 public, return type 등이 없네?


##### A.2.1.2.1. ans - game 클래스 안의 함수도 같음

Game클래스 안에
handleClick(), jumpTo(), render()
다 function, void, 등등 없음.

없을만도 한게, 타입을 반환하는게 아니라,
항상 void이거나, return html tag니까.




#### A.2.1.3. `<Square />`을 리턴하네?
저건 아마 A.1.1에 저 함수를 콜백으로 주는건가?

##### A.2.1.3.1. ans - 맞음

#### A.2.1.4. 여기서 this는 Board class를 가르키는 거겠지?

##### A.2.1.4.1. ans - 맞음

#### A.2.1.5. this.props.squares[i]; 여기서 this.props가 뭐지?
이 클래서는 파라미터로 받는 props가 없잖아?

this.props가 틱택토 9개의 사각형 가지고있어야 하는데,
그게 어딨어?
##### A.2.1.5.1. ans - Game클래스에서부터 공유되는
아마 React.Component에서 내려받은 객체인 듯?



#### A.2.1.6. this.props.onClick(i) 얜 어떻게 나오게 된거지?

##### A.2.1.6.1. ans - Game에서 받아온 놈
onClick={i => this.handleClick(i)}

```javascript
handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext //toggle T/F
    });
  }
```


## A.3. Game
```javascript
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
```

#### A.3.1.1. 얘도 React.Component를 상속받네?
리엑트에서는 모든 class가 React.Component를 상속받는건가?

##### A.3.1.1.1. ? - yet

#### A.3.1.2. 생성자 파라미터로 props를 받네? 
##### A.3.1.2.1. props는 React.Component에서 공유되는 객체인가보다.


#### A.3.1.3. this.state
this.state.history.squares에 게임 판 9개 집어넣는건가?

##### A.3.1.3.1. ans
맨 처음에 null로 9개 채워서 초기화만 해 두고,
handleClick(i) 이벤트 발동할 때,
유저가 클릭하면
this.setState()로 정보 변경하는 것



#### A.3.1.4. slice()

##### A.3.1.4.1. ans
slice() 메소드는 begin부터 end 전까지의 복사본을 새로운 배열 객체로 반환한다. 즉, 원본 배열은 수정되지 않는다.

##### A.3.1.4.2. 왜 굳이 얘를 쓸까? -> 불변 변수
[[불변 변수|immutable variable]] 용
[[순수 함수]]용

##### A.3.1.4.3. 왜 굳이 얘를 쓸까? -> detecting changes
state안 객체를 직접 참조로 call by reference로 값 바꾸면,
리엑트가 값 바뀐지 모름.
그러면 상태관리가 안됨

##### A.3.1.4.4. know when to re-render()
해당 array 값이 하나만 바뀌면 재 랜더링 해야하나? 아니면 값 전체 바뀌면 재 랜더링 해야하나?
애매하잖아.

애초에 [[순수 함수]]로 만들면 심플하게 값이 바뀔 때마다 re-rendering 하면 되는데.



#### A.3.1.5. handleClick(i)
```javascript
handleClick(i)
```

얘 혹시 react.Component에서 상속받은 애 아냐?
render()랑 같이?

##### A.3.1.5.1. 아니다.
얘가 뭘하는지는, 이미 설명함


#### A.3.1.6. squares[i]는 어디서 나온거야?
this.state.history.squares도 안했으면서

##### A.3.1.6.1. ans - const squares = current.squares.slice();
여기서 나옴


#### A.3.1.7. const moves ?
```javascript
const moves = history.map((step, move) => {
  const desc = move ?
	'Go to move #' + move :
	'Go to game start';
  return (
	<li key={move}>
	  <button onClick={() => this.jumpTo(move)}>{desc}</button>
	</li>
  );

...

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>        </div>
      </div>

```

왜 step, move 파라미터가 2개야?

아니
```javascript
this.setState({
  history: history.concat([
	{
	  squares: squares
	}
  ]),
```

얘를 .map()으로 도는거 아냐?

##### A.3.1.7.1. ans
![[Pasted image 20220802221452.png]]

1.2.3.4 얘네들이 history 배열안에 저장되어있음

step = history array element
move = current history array element index

저 버튼 클릭했을 때, jumpTo(idx) 로 보내는 것

const moves는 저 JSX그대로 아래 return JSX에 {moves}에 박힘






## A.4. calculateWinner
```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

#### A.4.1.1. const lines 배열 왜저래?
```javascript
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
```
```javascript
	[0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
```

이건 오른쪽으로 순차+1
아래쪽으로 순차+1 인건 알겠는데,

```javascript
    [0, 4, 8],
    [2, 4, 6]
```

얜 뭐야?

##### A.4.1.1.1. ans - 대각선임

#### A.4.1.2. return squares[a]; 로 승자가 누군지 어떻게 알지?

##### A.4.1.2.1. ans - 승자가 o,x중에 하나로 나옴
![[Pasted image 20220802204610.png]]



## A.5. 초기 세팅
```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
```

1. root DOM
2. Game inside root DOM
3. Game.render()에 return Board(squares, onClick) 넘김
	1. onClick={i => this.handleClick(i)}
4. Board
5. Square