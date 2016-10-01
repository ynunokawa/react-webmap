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
import LayerItem from './LayerItem';

class LayerList extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    const map = this.props.map;
    const layers = this.props.layers;
    const headerText = this.props.headerText;

    const layerList = layers.map(function (l, i) {
      let opacity = 1;
      let pane;
      if (i == 0) {
        pane = document.getElementsByClassName('leaflet-tile-pane')[0];
      } else {
        pane = document.getElementsByClassName('leaflet-esri-webmap-layer' + (i - 1) + '-pane')[0];
      }
      if (pane.style.opacity !== undefined && pane.style.opacity !== null && pane.style.opacity !== '') {
        opacity = Number(pane.style.opacity);
      }
      return (
        <LayerItem
          name={l.title}
          layer={l}
          pane={pane}
          initialOpacity={opacity}
          map={map}
          key={l.title + i}
        />
      );
    }.bind(this));

    return (
      <ListGroup>
        <ListGroupItem active>{headerText}</ListGroupItem>
        <style type="text/css">{`
        .checkbox {
            margin-top: 0;
            margin-bottom: 0;
            display: inline-block;
            width: 80%;
        }
        .rc-slider {
            display: inline-block;
            width: 20%;
        }
        .list-group-item.active {
            z-index: 0;
        }
        `}</style>
        {layerList}
      </ListGroup>
    );
  }
}

LayerList.propTypes = {
  map: React.PropTypes.any.isRequired,
  layers: React.PropTypes.array,
  headerText: React.PropTypes.string
};

LayerList.defaultProps = {
  layers: [],
  headerText: 'Layer List'
};

LayerList.displayName = 'LayerList';

export default LayerList;
