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

class PointSymbol extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    let Symbol;
    const pxSize = this.props.size * 4 / 3;
    const svgSize = String(this.props.size * 2 + Number(this.props.outlineWidth));
    const transform = 'matrix(1.00000000,0.00000000,0.00000000,1.00000000,' + (Number(svgSize) / 2) + ',' + (Number(svgSize) / 2) + ')';
    const r = String(pxSize / 2);
    switch (this.props.type) {
      case 'esriSMSCircle':
        Symbol = (
          <circle fill={this.props.color} fillOpacity={this.props.opacity} stroke={this.props.outlineColor} strokeOpacity={this.props.outlineOpacity} strokeWidth={this.props.outlineWidth} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" cx="0" cy="0" r={r} fillRule="evenodd" strokeDasharray={this.props.outlineDasharray} transform={transform}></circle>
        );
        break;
      case 'esriSMSSquare':
        const squarePath = 'M-' + r + ' ' + r + 'L-' + r + '-' + r + 'L ' + r + '-' + r + 'L ' + r + ' ' + r + 'L-' + r + ' ' + r + 'Z';
        Symbol = (
          <path fill={this.props.color} fillOpacity={this.props.opacity} stroke={this.props.outlineColor} strokeOpacity={this.props.outlineOpacity} strokeWidth={this.props.outlineWidth} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" d={squarePath} fillRule="evenodd" strokeDasharray={this.props.outlineDasharray} transform={transform}></path>
        );
        break;
      case 'esriSMSDiamond':
        const diamondPath = 'M-' + r + ' 0L 0-' + r + 'L ' + r + ' 0L 0 ' + r + 'L-' + r + ' 0Z';
        Symbol = (
          <path fill={this.props.color} fillOpacity={this.props.opacity} stroke={this.props.outlineColor} strokeOpacity={this.props.outlineOpacity} strokeWidth={this.props.outlineWidth} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" d={diamondPath} fillRule="evenodd" strokeDasharray={this.props.outlineDasharray} transform={transform}></path>
        );
        break;
      case 'esriSMSCross':
        const crossPath = 'M-' + r + ' 0L ' + r + ' 0M 0-' + r + 'L 0 ' + r + '';
        Symbol = (
          <path fill="none" fillOpacity="0" stroke={this.props.outlineColor} strokeOpacity={this.props.outlineOpacity} strokeWidth={this.props.outlineWidth} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" d={crossPath} strokeDasharray={this.props.outlineDasharray} transform={transform}></path>
        );
        break;
      case 'esriSMSX':
        const xPath = 'M-' + r + ' ' + r + 'L ' + r + '-' + r + 'M-' + r + '-' + r + 'L ' + r + ' ' + r + '';
        Symbol = (
          <path fill="none" fillOpacity="0" stroke={this.props.outlineColor} strokeOpacity={this.props.outlineOpacity} strokeWidth={this.props.outlineWidth} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" d={xPath} strokeDasharray={this.props.outlineDasharray} transform={transform}></path>
        );
        break;
      default:
        Symbol = null;
    }

    return (
      <div className="react-webmap-legend-row">
        <div className="react-webmap-legend-cell react-webmap-legend-symbol">
          <svg overflow="hidden" width={svgSize} height={svgSize}>
            <defs></defs>
            {Symbol}
          </svg>
        </div>
        <div className="react-webmap-legend-cell react-webmap-legend-label">
          {this.props.label}
        </div>
      </div>
    );
  }
}

PointSymbol.propTypes = {
  size: React.PropTypes.number,
  opacity: React.PropTypes.string,
  color: React.PropTypes.string,
  type: React.PropTypes.string,
  outlineColor: React.PropTypes.string,
  outlineOpacity: React.PropTypes.string,
  outlineWidth: React.PropTypes.string,
  outlineDasharray: React.PropTypes.string,
  label: React.PropTypes.string
};

PointSymbol.displayName = 'PointSymbol';

export default PointSymbol;
