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
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend, Crosshair, makeWidthFlexible } from 'react-vis';

class BarChart extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        series: [],
        crosshairValues: []
      };
      this.FlexibleXYPlot = makeWidthFlexible(XYPlot);
      this.layer = null
      this._nearestXHandler = this._nearestXHandler.bind(this);
      this._legendClickHandler = this._legendClickHandler.bind(this);
      this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);
      this._formatCrosshairTitle = this._formatCrosshairTitle.bind(this);
      this._formatCrosshairItems = this._formatCrosshairItems.bind(this);
  }

  _nearestXHandler (value, {index}) {
    const {series} = this.state;
    this.setState({
      crosshairValues: series.map(s => s.data[index])
    });

    const layer = this.layer;
    const fields = this.props.fields;
    const nameField = this.props.nameField;
    let feature = null;
    layer.eachFeature(function (l) {
      if (l.feature.properties[nameField] === value.x) {
        feature = l.feature;
      }
    });
    this.props.onMouseoverChart(feature);
  }

  _mouseLeaveHandler () {
    this.setState({crosshairValues: []});
    this.props.onMouseoutChart(null);
  }

  _formatCrosshairTitle (values) {
    const {nameField} = this.props;
    return {
      title: nameField,
      value: values[0].x
    };
  }

  _formatCrosshairItems (values) {
    const {series} = this.state;
    return values.map((v, i) => {
      return {
        title: series[i].title,
        value: v.y
      };
    });
  }

  _legendClickHandler (item, i) {
    const {series} = this.state;
    series[i].disabled = !series[i].disabled;
    this.setState({series});
  }

  componentWillReceiveProps (nextProps) {
    const layer = nextProps.layer;
    const fields = nextProps.fields;
    const nameField = nextProps.nameField;
    const denominator = nextProps.denominator || 1;
    let features = [];
    let lyr = null;

    if (layer.layer !== undefined) {
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
          return a.properties[fields[0]] - b.properties[fields[0]];
        });
      }

      const series = fields.map(function (f, i) {
        const data = features.map(function (feature, index) {
          return { x: feature.properties[nameField], y: feature.properties[f] / denominator };
        });
        return {
          title: f,
          disabled: false,
          data: data
        }
      });
      this.setState({ series: series });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.layer.layer !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  render () {
    const FlexibleXYPlot = this.FlexibleXYPlot;
    const {series, crosshairValues} = this.state;
    const {legendWidth, height, nameField, quantityLabel} = this.props;

    return (
      <div>
        <div className="react-webmap-barchart-legend">
          <DiscreteColorLegend
            onItemClick={this._legendClickHandler}
            width={legendWidth}
            items={series}
          />
        </div>
        <div className="react-webmap-barchart">
          <FlexibleXYPlot
            xType="ordinal"
            animation={true}
            onMouseLeave={this._mouseLeaveHandler}
            height={height}>
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis title={quantityLabel} />
            {series.map(function (s, i) {
              return (
                <VerticalBarSeries 
                  data={s.data} 
                  onNearestX={this._nearestXHandler} 
                  key={s.title + i} 
                  {...(s.disabled ? {opacity: 0.2} : null)}
                />
              );
            }.bind(this))}
            <Crosshair
              itemsFormat={this._formatCrosshairItems}
              titleFormat={this._formatCrosshairTitle}
              values={crosshairValues}/>
          </FlexibleXYPlot>
        </div>
      </div>
    );
  }
}

BarChart.propTypes = {
  layer: React.PropTypes.object,
  fields: React.PropTypes.array,
  nameField: React.PropTypes.string,
  quantityLabel: React.PropTypes.string,
  denominator: React.PropTypes.number,
  legendWidth: React.PropTypes.number,
  height: React.PropTypes.number,
  onMouseoverChart: React.PropTypes.func,
  onMouseoutChart: React.PropTypes.func
};

BarChart.displayName = 'BarChart';

export default BarChart;
