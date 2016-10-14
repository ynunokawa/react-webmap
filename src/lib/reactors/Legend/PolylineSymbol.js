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

class PolylineSymbol extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <div className="react-webmap-legend-row">
        <div className="react-webmap-legend-cell react-webmap-legend-symbol">
          <svg overflow="hidden" width="30" height="30">
            <defs></defs>
            <path fill="none" fillOpacity="0" stroke={this.props.color} strokeOpacity={this.props.opacity} strokeWidth={this.props.width} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" d="M-15 0L 15 0" strokeDasharray={this.props.dasharray} transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)"></path>
          </svg>
        </div>
        <div className="react-webmap-legend-cell react-webmap-legend-label">
          {this.props.label}
        </div>
      </div>
    );
  }
}

PolylineSymbol.propTypes = {
  color: React.PropTypes.string,
  opacity: React.PropTypes.string,
  width: React.PropTypes.string,
  dasharray: React.PropTypes.string,
  label: React.PropTypes.string
};

PolylineSymbol.displayName = 'PolylineSymbol';

export default PolylineSymbol;
