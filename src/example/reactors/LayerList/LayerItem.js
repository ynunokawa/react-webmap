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
import { ListGroup, ListGroupItem, Checkbox, Glyphicon } from 'react-bootstrap';
import Rcslider from 'rc-slider';

class LayerItem extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        opacity: 1
      }
      this._onChangeVisibility = this._onChangeVisibility.bind(this);
      this._onChangeOpacity = this._onChangeOpacity.bind(this);
  }

  _onChangeVisibility (e) {
    const checked = e.target.checked;
    const layer = this.props.layer.layer;
    const map = this.props.map;
    if (checked === true) {
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  }

  _onChangeOpacity (value) {
    const pane = this.props.pane;
    pane.style.opacity = value;
  }

  componentWillMount () {
    this.setState({ opacity: this.props.initialOpacity });
  }

  render () {
    const name = this.props.name;
    const opacity = this.state.opacity;
    const layer = this.props.layer;
    const map = this.props.map;

    if (map.hasLayer(layer.layer)) {
      return (
        <ListGroupItem>
          <Checkbox onChange={this._onChangeVisibility} defaultChecked>
            {name}
          </Checkbox>
          <Rcslider min={0} max={1} step={0.01} defaultValue={opacity} onChange={this._onChangeOpacity} />
        </ListGroupItem>
      );
    } else {
      return (
        <ListGroupItem>
          <Checkbox onChange={this._onChangeVisibility}>
            {name}
          </Checkbox>
          <Rcslider min={0} max={1} step={0.01} defaultValue={opacity} onChange={this._onChangeOpacity} />
        </ListGroupItem>
      );
    }
  }
}

LayerItem.propTypes = {
  name: React.PropTypes.string,
  layer: React.PropTypes.object,
  pane: React.PropTypes.object,
  initialOpacity: React.PropTypes.number,
  map: React.PropTypes.any.isRequired
};

LayerItem.displayName = 'LayerItem';

export default LayerItem;
