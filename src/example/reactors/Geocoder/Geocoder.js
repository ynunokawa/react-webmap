// Copyright (c) 2016 Yusuke Nunokawa (https://ynunokawa.github.io)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import { FormGroup, InputGroup, FormControl, Button, Dropdown, MenuItem, Glyphicon } from 'react-bootstrap';

class Geocoder extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        text: '',
        suggestions: []
      }
      this._onSearch = this._onSearch.bind(this);
      this._onChangeText = this._onChangeText.bind(this);
      this._onClickSuggestion = this._onClickSuggestion.bind(this);
  }

  _onSearch (e) {
    this.search(this.state.text);
  }

  _onChangeText (e) {
    this.setState({ text: e.target.value });
    if (this.state.text.length > 2) {
      L.esri.Geocoding.suggest().text(this.state.text).run(function (err, response) {
        console.log(err, response.suggestions);
        this.setState({ suggestions: response.suggestions });
        /*L.esri.Geocoding.geocode({ magicKey: response.suggestions[0].magicKey }).text(response.suggestions[0].text).run(function (err, results, response) {
          console.log(results);
        }.bind(this));*/
      }.bind(this));
    }
  }

  _onClickSuggestion (e) {
    this.search(e.target.textContent);
  }

  search (text) {
    L.esri.Geocoding.geocode().text(text).run(function (err, results, response) {
      this.props.onSearch(results.results[0].bounds);
    }.bind(this));
  }

  render () {
    let suggestions;

    if (this.state.suggestions.length > 0) {
      const suggestionItems = this.state.suggestions.map(function (s, i) {
        return (
          <MenuItem onClick={this._onClickSuggestion} key={s.magicKey}>{s.text}</MenuItem>
        );
      }.bind(this));
      suggestions = (
        <Dropdown.Menu>
          {suggestionItems}
        </Dropdown.Menu>
      );
    }

    return (
      <FormGroup>
        <InputGroup onChange={this._onChangeText}>
          <FormControl type="text" placeholder={this.props.placeholder} />
          <InputGroup.Button>
            <Button onClick={this._onSearch}><Glyphicon glyph="search" /></Button>
          </InputGroup.Button>
        </InputGroup>
        <style type="text/css">{`
        .dropdown-menu {
            display: block;
            left: 15px;
        }
        `}</style>
        {suggestions}
      </FormGroup>
    );
  }
}

Geocoder.propTypes = {
  placeholder: React.PropTypes.string,
  onSearch: React.PropTypes.func
};

Geocoder.defaultProps = {
  placeholder: 'Search for places or addresses',
  onSearch: function () {}
};

Geocoder.displayName = 'Geocoder';

export default Geocoder;
