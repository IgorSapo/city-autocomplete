import React from 'react';

const list = [
  { id: 0, fruit: 'apple' },
  { id: 1, fruit: 'banana' },
  { id: 2, fruit: 'orange' },
  { id: 3, fruit: 'mango' }
];

class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      term: '',
      noMatch: false
    };
    this.noMatch = this.noMatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  noMatch(value) {
    this.setState({ noMatch: value }); // 1. продолжение рекурсии -> 2.
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  render() {
    return (
      <div>
        <p>Список: apple, banana, orange, mango</p>
        <p>
          Цель - при вводе фразы не из списка вариантов показывать ошибку ввода
        </p>
        <p>
          Если раскомментировать содержимое Select.noMatch, а затем ввести в
          поле фразу не из списка возможных вариантов, страница уходит в
          циклический рекурсивный вызов
        </p>
        <p>
          Я, конечно, могу при ошибочном вводе сбрасывать значение
          Select.state.term. Но тогда значение этого поля при таком ошибочном
          вводе будет очищаться, а мне надо сохранять ошибочное значение в
          строке
        </p>

        <input
          type="text"
          value={this.state.term}
          onChange={this.handleChange}
        />
        {this.state.noMatch && <div>No match found. Try something else</div>}
        <Suggestions term={this.state.term} noMatch={this.noMatch} />
      </div>
    );
  }
}

class Suggestions extends React.Component {
  constructor() {
    super();
    this.updateStateWithServerData = this.updateStateWithServerData.bind(this);
    this.state = {
      items: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.term !== nextProps.term) {
      this.setState({ items: [] }, () => this.updateStateWithServerData());
    }
  }

  updateStateWithServerData() {
    const fullResult = list.filter(item =>
      item['fruit'].toLowerCase().includes(this.props.term.toLowerCase())
    );
    if (fullResult.length === 0) {
      this.props.noMatch(true);
    } else {
      this.setState({ items: fullResult });
      this.props.noMatch(false);
    }
  }

  render() {
    if (this.props.term === '') {
      return null;
    }
    return (
      <div>
        {this.state.items.map(item =>
          <div key={item.id}>
            {item.fruit}
          </div>
        )}
      </div>
    );
  }
}

export default Select;
