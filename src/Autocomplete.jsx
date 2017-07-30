import React from 'react';
import DebounceInput from 'react-debounce-input';
import ResultList from './ResultList2';
// import { debounce } from 'throttle-debounce';
import debounce from 'lodash.debounce';
import SearchInput from './SearchInput';
import { v4 } from 'uuid';

// function debounce(fn, delay) {
//   var timer = null;
//   return function() {
//     var context = this,
//       args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(function() {
//       fn.apply(context, args);
//     }, delay);
//   };
// }

class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      term: '',
      inputContent: '',
      noMatch: false,
      showDefault: false,
      blurError: false,
      onlyCandidate: '',
      lastReqId: null,
      reqSent: false,
      reqTimeout: false
    };
    this.handleChange = this.handleChange.bind(this);
    // this.delayed = debounce(this.handleChange.bind(this), 500);
    // this.mag = this.mag.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.noMatch = this.noMatch.bind(this);
    this.chooseCity = this.chooseCity.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setOnlyCandidate = this.setOnlyCandidate.bind(this);
    this.requestServer = this.requestServer.bind(this);
  }

  // handleChange(e) {
  //   console.log(e.target);
  //   console.log(this.state);
  //   this.setState({
  //     term: e.target.value,
  //     blurError: false,
  //     showDefault: true,
  //     onlyCandidate: ''
  //   });
  // }

  // mag(e) {
  //   console.log('Mag');
  //   e.persist();
  //   console.log(e.target);
  //   this.setState(
  //     {
  //       inputContent: e.target.value
  //     },
  //     () => this.delayed(e)
  //   );
  // }
  requestServer(id) {
    return new Promise((res, rej) => {
      setTimeout(() => res({ id, resValue: id }), 4000);
    });
  }

  handleChange(e) {
    this.setState({
      term: e.target.value,
      inputContent: e.target.value,
      blurError: false,
      showDefault: true,
      onlyCandidate: ''
    });
    // console.log(this.textInput);
  }

  handleClick(e) {
    // e.preventDefault();
    this.setState({
      blurError: false,
      showDefault: true
    });
  }

  noMatch(value) {
    this.setState({ noMatch: value });
  }

  chooseCity(e) {
    e.preventDefault();
    this.setState(
      {
        term: e.target.textContent,
        inputContent: e.target.textContent,
        showDefault: false
      },
      () => {
        console.log(this.textInput);
        this.textInput.blur();
      }
    );
  }

  handleBlur() {
    console.log('Blur event');
    if (this.state.noMatch) {
      this.setState({
        blurError: true,
        showDefault: false
      });
    } else if (this.state.onlyCandidate !== '') {
      this.setState(prevState => ({
        term: prevState.onlyCandidate,
        inputContent: prevState.onlyCandidate,
        noMatch: false,
        showDefault: false,
        blurError: false,
        onlyCandidate: ''
      }));
    } else if (!this.state.noMatch && !this.state.blurError) {
      console.log('Term is: ' + this.state.term);
      this.setState({
        // term: '',
        noMatch: false,
        showDefault: false,
        blurError: false,
        onlyCandidate: ''
      });
    }
  }

  setOnlyCandidate(value) {
    this.setState({
      onlyCandidate: value
    });
  }

  render() {
    return (
      <div>
        <SearchInput />
        <input
          onChange={this.handleChange}
          onClick={
            this.state.term.length === 0 || this.state.noMatch
              ? this.handleClick
              : null
          }
          value={this.state.inputContent}
          placeholder={'Enter or choose from the list'}
          onBlur={this.handleBlur}
          className={this.state.blurError ? 'error-bnm-input' : ''}
          ref={input => {
            this.textInput = input;
          }}
        />
        {this.state.blurError &&
          <div className="error-bnm-text">Выберите значение из списка</div>}
        {this.state.reqSent && <div className="search-spinner" />}
        {this.state.reqTimeout && <span>request timeout</span>}
        {this.state.showDefault &&
          <ResultList
            term={this.state.term}
            noMatch={this.noMatch}
            chooseCity={this.chooseCity}
            setOnlyCandidate={this.setOnlyCandidate}
          />}
      </div>
    );
  }
}

export default Autocomplete;
