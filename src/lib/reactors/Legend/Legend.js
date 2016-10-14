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
import PointLegend from './PointLegend';
import PolylineLegend from './PolylineLegend';
import PolygonLegend from './PolygonLegend';

class Legend extends React.Component {
  constructor (props) {
      super(props);
      this.layer = null;
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.layer.layer !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  render () {
    if (this.props.layer.layer !== undefined) {
      if (this.props.layer.layer._cache !== undefined) {
        this.layer = this.props.layer.layer;
      } else {
        Object.keys(this.props.layer.layer._layers).map(function (k) {
          if (this.props.layer.layer._layers[k]._cache !== undefined) {
            this.layer = this.props.layer.layer._layers[k];
          }
        }.bind(this));
      }
      
      const renderer = this.layer.options.drawingInfo.renderer;
      let symbol;

      switch (renderer.type) {
        case 'classBreaks':
          symbol = renderer.classBreakInfos[0].symbol;
          break;
        case 'uniqueValue':
          symbol = renderer.uniqueValueInfos[0].symbol;
          break;
        default:
          symbol = renderer.symbol;
      }

      if (symbol.type === 'esriSMS' || symbol.type === 'esriPMS') {
        return (
          <PointLegend layer={this.props.layer} />
        );
      } else if (symbol.type === 'esriSLS') {
        return (
          <PolylineLegend layer={this.props.layer} />
        );
      } else if (symbol.type === 'esriSFS') {
        return (
          <PolygonLegend layer={this.props.layer} />
        );
      }
    } else {
      return false;
    }
  }
}

Legend.propTypes = {
  layer: React.PropTypes.object
};

Legend.displayName = 'Legend';

export default Legend;
