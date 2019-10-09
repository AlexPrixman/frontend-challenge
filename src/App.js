import React from 'react';
import './App.css';

let keyword;

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { repositories: [] };
    }


    render() {
        return(
            <div className="container">
                <div>
                  <form>
                  <input type="text" className="searchBox"  ref={(input) => { this.searchBox = input; }}/>
                  <button onClick={this.onClick}>Go!</button>
                  </form>
                  <div className="foundRepo">{this.props.name}</div>
                  <div>Enter a keyword</div>
                </div>
                <div>
                  <h2>Repositorios</h2>
                  <ul>
                  { this.state.repositories.map( ( item, index ) => (
                      <li key={ index}>
                          { item.name }
                      </li>
                  )) }
                  </ul>
                </div>
            </div>
            );
    }

    onClick(e) {

        keyword = this.searchBox.value;
        let api = 'https://api.github.com/search/repositories?sort=stars&order=desc&q=' + keyword;
        console.log(keyword);
        fetch(api)
            .then(blob => blob.json())
            .then(response => {
                this.setState({ repositories: response.items });
            });
        e.preventDefault();

    }
}

export default SearchBox;
