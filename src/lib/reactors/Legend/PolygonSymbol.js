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

class PolygonSymbol extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <div className="react-webmap-legend-row">
        <div className="react-webmap-legend-cell react-webmap-legend-symbol">
          <svg overflow="hidden" width="23" height="23">
            <defs></defs>
            <g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,11.50000000,11.50000000)">
              <path fill={this.props.color} fillOpacity={this.props.opacity} stroke={this.props.outlineColor} strokeOpacity={this.props.outlineOpacity} strokeWidth={this.props.outlineWidth} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" d="M-10-10L 10 0L 10 10L-10 10L-10-10Z" fillRule="evenodd" strokeDasharray={this.props.outlineDasharray}></path>
            </g>
          </svg>
        </div>
        <div className="react-webmap-legend-cell react-webmap-legend-label">
          {this.props.label}
        </div>
      </div>
    );
  }
}

PolygonSymbol.propTypes = {
  color: React.PropTypes.string,
  opacity: React.PropTypes.string,
  outlineColor: React.PropTypes.string,
  outlineOpacity: React.PropTypes.string,
  outlineWidth: React.PropTypes.string,
  outlineDasharray: React.PropTypes.string,
  label: React.PropTypes.string
};

PolygonSymbol.displayName = 'PolygonSymbol';

export default PolygonSymbol;
