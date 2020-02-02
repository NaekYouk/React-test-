import React from 'react';
import './App.css';
import { Item } from './Item';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false,
      minComments: 0
    };
  }

  // const url = "https://www.reddit.com/r/reactjs.json?limit=100"

  componentDidMount() {
    this.getItems()
  }

  getItems = () => {
    this.setState({
      isLoading: true
    });
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      .then(responce => responce.json())
      .then(({ data }) => this.setState({
        items: data.children,
        isLoading: false
      }))
  }

  updateAutoRefresh = () => {
    this.setState(state => ({
      enableAutoRefresh: !state.enableAutoRefresh
    }), () => {
      this.state.enableAutoRefresh ?
        this.autoRefresh = setInterval(this.getItems, 3000) :
        clearInterval(this.autoRefresh)
    })
  }

  updateMinComments = (event) => {
    this.setState({
      minComments: Number(event.target.value)
    })
  }


  getItemsByComments = (items, minComments) => items.filter(a => a.data.num_comments >= minComments).sort((a, b) => b.data.num_comments - a.data.num_comments)

  render() {
    const { items, isLoading, enableAutoRefresh, minComments } = this.state;
    const itemsBycomments = this.getItemsByComments(items, minComments)
    const maxComments = Math.max.apply(Math, items.map(item => item.data.num_comments)) + 10
    return (
      <div>
        <h1 className="h1Header">Top commented</h1>
        <div className="content">
          <input type="range" value={minComments}
            onChange={this.updateMinComments}
            min={0}
            max={maxComments}
            style={{ width: "90%", margin: "0 auto", display: "block" }}
          />
          <p>Current filter: {minComments}</p>
          <button className="buttonRefresh" type="button" onClick={this.updateAutoRefresh}>
            {enableAutoRefresh ? 'stop ' : 'start '}auto-refresh
          </button>
          <div className="wrapper">
            {isLoading ? 
              <p>...Loading</p> 
              : itemsBycomments.length > 0 ? 
                itemsBycomments.map(item => <Item key={item.data.id} data={item.data} />)
                : <p>No results found matching your criteria</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
