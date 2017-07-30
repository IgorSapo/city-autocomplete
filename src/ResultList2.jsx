import React from 'react';
import kladr from './kladr.json';
import InfiniteScroll from 'react-infinite-scroller';
import ResultItem from './ResultItem';

class ResultList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      hasMoreItems: true,
      lastId: null,
      message: ''
    };
    this.findFive = this.findFive.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  findFive(page) {
    console.log('Page ' + page);
    const term = this.props.term;
    console.log(term);
    let lastId = this.state.lastId;
    console.log('Booom Begining LastId is: ' + lastId);
    const fullResult = kladr.filter(item =>
      item['City'].toLowerCase().includes(term.toLowerCase())
    );

    if (fullResult.length === 0) {
      this.setState({
        items: [],
        lastId: null,
        hasMoreItems: false,
        message: 'Nothing found'
      });
      this.props.noMatch(true);
      console.log(7.11);
      return;
    }

    if (!lastId) {
      console.log(7);
      const result = fullResult.slice(0, 10);
      console.log(result);
      lastId = result[result.length - 1]['Id'];
      console.log('Initial LastId is: ' + lastId);
      if (
        result.length === 1 &&
        result[0]['City'].toLowerCase() === this.props.term.toLowerCase()
      ) {
        console.log('Only candidate');
        this.props.setOnlyCandidate(result[0]['City']);
      }
      this.setState({
        items: result,
        lastId,
        hasMoreItems: fullResult.length > 10
      });
    } else {
      console.log('9. Preexisting LastId is :');
      console.log(lastId);
      const removeIndex = fullResult.findIndex(item => item['Id'] === lastId);
      const shortenedResult = fullResult.splice(removeIndex + 1, 10);
      if (shortenedResult.length === 10) {
        this.setState(
          prevState => ({
            items: prevState.items.concat(shortenedResult),
            lastId: shortenedResult[shortenedResult.length - 1]['Id']
          }),
          () => console.log(this.state)
        );
      } else {
        this.setState(prevState => ({
          items: prevState.items.concat(shortenedResult),
          lastId: null,
          hasMoreItems: false
        }));
      }
    }
    this.props.noMatch(false);
  }

  handleClick(e) {
    this.props.chooseCity(e);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.term !== nextProps.term) {
      this.setState({
        items: [],
        hasMoreItems: true,
        lastId: null,
        message: ''
      });
    }
  }

  render() {
    const loader = <div className="loader">Loading...</div>;
    return (
      <div style={{ height: 100, overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.findFive}
          hasMore={this.state.hasMoreItems}
          loader={loader}
          threshold={50}
          useWindow={false}
          className="suggestion-list">
          {this.state.items.map(item =>
            <ResultItem
              key={item['Id']}
              city={item['City']}
              id={item['Id']}
              onClick={this.handleClick}
            />
          )}
        </InfiniteScroll>
        {this.state.message &&
          <div>
            {this.state.message}
          </div>}
      </div>
    );
  }
}

export default ResultList;
