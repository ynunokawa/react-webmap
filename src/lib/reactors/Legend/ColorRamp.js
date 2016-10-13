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

class ColorRamp extends React.Component {
  constructor (props) {
      super(props);
  }

  getColor (colorArray) {
    return 'rgb(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ')'
  }

  getOpacity (opacity) {
    return String(opacity / 255);
  }

  render () {
    const colorInfo = this.props.colorInfo;
    const stops = colorInfo.stops;
    let minValue;
    let maxValue;
    stops.forEach(function (stop, i) {
      if (i === 0) {
        minValue = stop.value;
      }
      if (i === stops.length - 1) {
        maxValue = stop.value;
      }
    });
    const range = maxValue - minValue;
    const linearGradientId = colorInfo.field + '_' + colorInfo.type;
    const Stops = stops.map(function (stop, i) {
      const offset = (stop.value - minValue) / range;
      const stopColor = this.getColor(stop.color);
      const stopOpacity = this.getOpacity(stop.color[3]);
      return (
        <stop offset={offset} stopColor={stopColor} stopOpacity={stopOpacity} key={colorInfo.field + "-legend-stop" + i}></stop>
      );
    }.bind(this));

    const ColorRampLabels = stops.map(function (stop, i) {
      if (stop.label === null) {
        return (
          <div className="react-webmap-legend-colorramp-label" key={colorInfo.field + "-legend-label" + i}>&nbsp;</div>
        );
      } else {
        return (
          <div className="react-webmap-legend-colorramp-label" key={colorInfo.field + "-legend-label" + i}>{stop.label}</div>
        );
      }
    });

    return (
      <table>
        <tbody>
          <tr>
            <td width="34">
              <div className="react-webmap-legend-colorramp-borderless">
                <div className="react-webmap-legend-colorramp">
                  <svg overflow="hidden" width="24" height="120">
                    <defs>
                      <linearGradient id={linearGradientId} gradientUnits="userSpaceOnUse" x1="0.00000000" y1="0.00000000" x2="0.00000000" y2="120.00000000">
                        {Stops}
                      </linearGradient>
                    </defs>
                      <rect fill={"url(#" + linearGradientId + ")"} stroke="none" strokeOpacity="0" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" x="0" y="0" width="24" height="120" ry="0" rx="0" fillRule="evenodd"></rect>
                      <rect fill="rgb(255, 255, 255)" fillOpacity="0.19999999999999996" stroke="none" strokeOpacity="0" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" x="0" y="0" width="24" height="120" ry="0" rx="0" fillRule="evenodd"></rect>
                  </svg>
                </div>
                <div className="react-webmap-legend-colorramp-tick react-webmap-legend-colorramp-tick-first" style={{ top: '0%' }}>&nbsp;</div>
                <div className="react-webmap-legend-colorramp-tick" style={{ top: '50%' }}>&nbsp;</div>
                <div className="react-webmap-legend-colorramp-tick react-webmap-legend-colorramp-tick-last" style={{ top: '100%' }}>&nbsp;</div>
              </div>
            </td>
            <td>
              <div className="react-webmap-legend-colorramp-labels" style={{ height: '150px' }}>
                {ColorRampLabels}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

ColorRamp.propTypes = {
  colorInfo: React.PropTypes.object
};

ColorRamp.displayName = 'ColorRamp';

export default ColorRamp;
