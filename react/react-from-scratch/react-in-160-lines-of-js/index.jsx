import Gooact, { render, Component } from './gooact';

class Title extends Component {
    componentDidMount() {
        console.log('title');
        console.log(document.getElementById('title'));
    }

    render() {
        return (
            <h1 id="title">{this.props.children}</h1>
        );
    }
}

class TodoItem extends Component {
    render() {
      return <li className="todo__item">
        <span>{this.props.text} - </span>
        <a href="#" onClick={this.props.onClick}>X</a>
      </li>;
    }
  }
  
  class Todo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        items: [],
      };
      this.handleAdd('Goal #1');
      this.handleAdd('Goal #2');
      this.handleAdd('Goal #3');
    }
    
    handleInput(e) {
      this.setState({
         input: e.target.value,
         items: this.state.items,
      });
    }
    
    handleAdd(text) {
      const newItems = [].concat(this.state.items);
      newItems.push({
        id: Math.random(),
        text,
      });
      this.setState({
        input: '',
        items: newItems,
      });
    }
    
    handleRemove(index) {
      const newItems = [].concat(this.state.items);
      newItems.splice(index, 1);
      this.setState({
        input: this.state.input,
        items: newItems,
      });
    }
    
    render() {
      return <div className="todo">
        <ul className="todo__items">
          {this.state.items.map((item, index) => <TodoItem
            key={item.id}
            text={item.text}
            onClick={e => this.handleRemove(index)}
          />)}
        </ul>
        <input type="text" onInput={e => this.handleInput(e)} value={this.state.input}/>
        <button onClick={e => this.handleAdd(this.state.input)}>Add</button>
      </div>;
    }
  }

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.onIncrease = this.onIncrease.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
    }

    componentDidMount() {
        console.log('app');
    }

    onIncrease() {
        this.setState({counter: this.state.counter + 1});
    }

    onDecrease() {
        this.setState({counter: this.state.counter - 1});
    }

    render() {
        const {counter} = this.state;
        return (
            <div>
                <Title>Hello Gooact!!!!</Title>
                <p>
                    <button onClick={this.onDecrease}>-</button>
                    {' '}Counter: {counter}{' '}
                    <button onClick={this.onIncrease}>+</button>
                </p>

                <br />
                <br />
                <br />
                
                <Title>Todo!!!</Title>
                <Todo />
            </div>
        );
    }
}

render(<App/>, document.getElementById('root'));
