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

class PointPictureSymbol extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <div className="react-webmap-legend-row">
        <div className="react-webmap-legend-cell react-webmap-legend-symbol">
          <svg overflow="hidden" width={this.props.width} height={this.props.height}>
            <defs></defs>
            <image fillOpacity="0" stroke="none" strokeOpacity="0" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" x="-19" y="-19" width={this.props.width} height={this.props.height} preserveAspectRatio="none" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={this.props.imageData} transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,19.00000000,19.00000000)"></image>
          </svg>
        </div>
        <div className="react-webmap-legend-cell react-webmap-legend-label">
          {this.props.label}
        </div>
      </div>
    );
  }
}

PointPictureSymbol.propTypes = {
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  imageData: React.PropTypes.string,
  label: React.PropTypes.string
};

PointPictureSymbol.displayName = 'PointPictureSymbol';

export default PointPictureSymbol;
