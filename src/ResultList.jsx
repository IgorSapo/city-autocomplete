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
      lastId: null
    };
    this.findFive = this.findFive.bind(this);
  }

  findFive(page) {
    console.log('Page ' + page);
    const term = this.props.term;
    console.log(term);
    let lastId = this.state.lastId;
    const fullResult = kladr.filter(item =>
      item['City'].toLowerCase().includes(term.toLowerCase())
    );

    if (fullResult.length === 0) {
      this.setState({
        items: [],
        lastId: null,
        hasMoreItems: false
      });
      console.log(7.11);
      // this.props.noMatch();
      // console.log(7.21);
      // this.setState({
      //   hasMoreItems: false
      // });
      return;
    }

    if (!lastId) {
      console.log(7);
      const result = fullResult.slice(0, 10);
      lastId = result[result.length - 1]['Id'];
      this.setState({
        items: result,
        lastId
      });
      console.log(this.state.hasMoreItems);
    } else {
      console.log(9);
      const removeIndex = fullResult.findIndex(item => item['Id'] === lastId);
      const shortenedResult = fullResult.splice(removeIndex + 1, 10);
      if (shortenedResult.length === 10) {
        this.setState(prevState => ({
          items: prevState.items.concat(shortenedResult),
          lastId: shortenedResult[shortenedResult.length - 1]['Id']
        }));
      } else {
        this.setState(prevState => ({
          items: prevState.items.concat(shortenedResult),
          lastId: null,
          hasMoreItems: false
        }));
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.term !== nextProps.term) {
      this.setState({
        items: [],
        hasMoreItems: true,
        lastId: null
      });
    }

    // this.findFive();
  }

  render() {
    if (this.props.term === '') {
      return null;
    } else {
      const loader = <div className="loader">Loading...</div>;
      return (
        <div style={{ height: 100, overflow: 'auto', fontSize: 40 }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.findFive}
            hasMore={this.state.hasMoreItems}
            loader={loader}
            threshold={50}
            useWindow={false}>
            {this.state.items.map(item =>
              <ResultItem
                key={item['Id']}
                city={item['City']}
                id={item['Id']}
              />
            )}
          </InfiniteScroll>
        </div>
      );
    }
  }
}

export default ResultList;
