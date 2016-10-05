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
import { Treemap } from 'react-vis';

class TreemapChart extends React.Component {
  constructor (props) {
      super(props);
      this.layer = null
      this._onMouseoverChart = this._onMouseoverChart.bind(this);
      this._onMouseoutChart = this._onMouseoutChart.bind(this);
  }

  _onMouseoverChart (e) {
    if (e.target.children.length === 1) {
      const name = e.target.children[0].textContent;
      const layer = this.layer;
      const fields = this.props.fields;
      let feature = null;
      layer.eachFeature(function (l) {
        if (l.feature.properties[fields.name] === name) {
          feature = l.feature;
        }
      });
      this.props.onMouseoverChart(feature);
    }
  }

  _onMouseoutChart () {
    this.props.onMouseoutChart(null);
  }

  render () {
    const layer = this.props.layer;
    const fields = this.props.fields;
    const height = this.props.height;
    const width = this.props.width;

    let features = [];
    let lyr = null;

    if (layer.layer !== undefined) {
      Object.keys(layer.layer._layers).map(function (k) {
        if (layer.layer._layers[k]._cache !== undefined) {
          lyr = layer.layer._layers[k];
          this.layer = lyr;
        }
      }.bind(this));
      if (lyr !== null) {
        lyr.eachFeature(function (l) {
          features.push(l.feature);
        });
      }
      features = features.sort(function (a, b) {
        return b.properties[fields.quantity] - a.properties[fields.quantity];
      });
    }

    const children = features.map(function (f, i) {
      const ratio = f.properties[fields.quantity] / features[0].properties[fields.quantity];
      return {
        title: f.properties[fields.name],
        size: f.properties[fields.quantity] / 100,
        color: (1 - ratio) * 10,
      }
    });

    const data = {
      title: fields.quantity,
      opacity: 1,
      children: children
    }

    return (
      <div onMouseOver={this._onMouseoverChart} onMouseOut={this._onMouseoutChart}>
      <Treemap
        title={layer.title}
        width={width}
        height={height}
        data={data}
      />
      </div>
    );
  }
}

TreemapChart.propTypes = {
  layer: React.PropTypes.object,
  fields: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  onMouseoverChart: React.PropTypes.func,
  onMouseoutChart: React.PropTypes.func
};

TreemapChart.defaultProps = {
  onMouseoverChart: function () {},
  onMouseoutChart: function () {}
};

TreemapChart.displayName = 'TreemapChart';

export default TreemapChart;
