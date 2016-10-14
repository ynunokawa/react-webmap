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
import PolygonSymbol from './PolygonSymbol';
import ColorRamp from './ColorRamp';

class PolygonLegend extends React.Component {
  constructor (props) {
      super(props);
      this.layer = null;
  }

  getColor (colorArray) {
    return 'rgb(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ')'
  }

  getOpacity (opacity) {
    return String(opacity / 255);
  }

  getDasharray (dashStyle) {
    let dasharray;
    switch (dashStyle) {
      case 'esriSLSDot':
        dasharray = '1, 3';
        break;
      case 'esriSLSDash':
        dasharray = '6, 4.5';
        break;
      case 'esriSLSDashDot':
        dasharray = '8, 6, 2, 6';
        break;
      case 'esriSLSDashDotDot':
        dasharray = '32, 12, 4, 12, 4, 12';
        break;
      default:
        dasharray = 'none';
    }
    return dasharray;
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.layer.layer !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  render () {
    Object.keys(this.props.layer.layer._layers).map(function (k) {
      if (this.props.layer.layer._layers[k]._cache !== undefined) {
        this.layer = this.props.layer.layer._layers[k];
      }
    }.bind(this));
    
    const title = this.props.layer.title;
    const renderer = this.layer.options.drawingInfo.renderer;

    let LegendContents;
    let FieldName = null;

    switch (renderer.type) {
      case 'classBreaks':
        FieldName = (<h5>{renderer.field}</h5>);
        if (renderer.visualVariables !== undefined && renderer.visualVariables.length > 0) {
          renderer.visualVariables.forEach(function (v, i) {
            if (v.type === 'colorInfo') {
              LegendContents = (
                <ColorRamp colorInfo={v} />
              );
            }
          });
        } else {
          LegendContents = renderer.classBreakInfos.map(function (info, i) {
            const style = {
              color: this.getColor(info.symbol.color),
              opacity: this.getOpacity(info.symbol.color[3]),
              outline: {
                color: this.getColor(info.symbol.outline.color),
                opacity: this.getOpacity(info.symbol.outline.color[3]),
                width: String(info.symbol.outline.width),
                dasharray: this.getDasharray(info.symbol.outline.style)
              }
            };
            const label = info.label;
            return (
              <PolygonSymbol color={style.color} opacity={style.opacity} outlineColor={style.outline.color} outlineOpacity={style.outline.opacity} outlineWidth={style.outline.width} outlineDasharray={style.outline.dasharray} label={label} key={title + renderer.field + i} />
            );
          }.bind(this));
        }
        break;
      case 'uniqueValue':
        FieldName = (<h5>{renderer.field}</h5>);
        if (renderer.visualVariables !== undefined && renderer.visualVariables.length > 0) {
          renderer.visualVariables.forEach(function (v, i) {
            if (v.type === 'colorInfo') {
              LegendContents = (
                <ColorRamp colorInfo={v} />
              );
            }
          });
        } else {
          LegendContents = renderer.uniqueValueInfos.map(function (info, i) {
            const style = {
              color: this.getColor(info.symbol.color),
              opacity: this.getOpacity(info.symbol.color[3]),
              outline: {
                color: this.getColor(info.symbol.outline.color),
                opacity: this.getOpacity(info.symbol.outline.color[3]),
                width: String(info.symbol.outline.width),
                dasharray: this.getDasharray(info.symbol.outline.style)
              }
            };
            const label = info.label;
            return (
              <PolygonSymbol color={style.color} opacity={style.opacity} outlineColor={style.outline.color} outlineOpacity={style.outline.opacity} outlineWidth={style.outline.width} outlineDasharray={style.outline.dasharray} label={label}  key={title + renderer.field + i} />
            );
          }.bind(this));
        }
        break;
      default:
        const style = {
          color: this.getColor(renderer.symbol.color),
          opacity: this.getOpacity(renderer.symbol.color[3]),
          outline: {
            color: this.getColor(renderer.symbol.outline.color),
            opacity: this.getOpacity(renderer.symbol.outline.color[3]),
            width: String(renderer.symbol.outline.width),
            dasharray: this.getDasharray(renderer.symbol.outline.style)
          }
        };
        const label = renderer.label;
        LegendContents = (
          <PolygonSymbol color={style.color} opacity={style.opacity} outlineColor={style.outline.color} outlineOpacity={style.outline.opacity} outlineWidth={style.outline.width} outlineDasharray={style.outline.dasharray} label={label} />
        );
    }

    return (
      <div>
        <h5 className="react-webmap-legend-title">{title}</h5>
        {FieldName}
        {LegendContents}
      </div>
    );
  }
}

PolygonLegend.propTypes = {
  layer: React.PropTypes.object
};

PolygonLegend.displayName = 'PolygonLegend';

export default PolygonLegend;
