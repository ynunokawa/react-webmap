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
import { Grid, Row, Col } from 'react-bootstrap';
import ItemThumbnail from './ItemThumbnail';

class Showcase extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    const layer = this.props.layer;
    const layoutFields = this.props.layoutFields;
    const bounds = this.props.mapState.bounds;

    let features = [];
    let lyr = null;

    if (layer.layer !== undefined) {
      Object.keys(layer.layer._layers).map(function (k) {
        if (layer.layer._layers[k]._cache !== undefined) {
          lyr = layer.layer._layers[k];
        }
      });
      if (lyr !== null) {
        lyr.eachFeature(function (l) {
          if (bounds.contains(l._latlng)) {
            features.push(l.feature);
          }
        });
      }
      features = features.sort(function (a, b) {
        return b.properties[layoutFields.sort] - a.properties[layoutFields.sort];
      });
    }

    const ItemThumbnails = features.map(function (f, i) {
      return (
        <Col xs={12} sm={6} md={4} key={f.properties[layoutFields.name] + i}>
          <ItemThumbnail
            feature={features[i]} 
            layoutFields={layoutFields} 
            onClickThumbnail={this.props.onClickThumbnail} 
            onMouseoverThumbnail={this.props.onMouseoverThumbnail}
            onMouseoutThumbnail={this.props.onMouseoutThumbnail}
          />
        </Col>
      );
    }.bind(this));

    return (
      <Grid>
        <Row>
          <style type="text/css">{`
            .react-webmap-item-thumbnail {
                padding: 0;
                overflow: hidden;
            }
            .react-webmap-item-thumbnail > img {
                border-radius: 4px 4px 0 0;
                cursor: pointer;
                transition: opacity 0.3s;
            }
            .react-webmap-item-thumbnail > img:hover {
                opacity: 0.8
            }
            .react-webmap-item-thumbnail > div.caption {
                margin-left: 5px;
            }
            `}</style>
          {ItemThumbnails}
        </Row>
      </Grid>
    );
  }
}

Showcase.propTypes = {
  layer: React.PropTypes.object,
  layoutFields: React.PropTypes.object,
  mapState: React.PropTypes.object,
  onClickThumbnail: React.PropTypes.func,
  onMouseoverThumbnail: React.PropTypes.func,
  onMouseoutThumbnail: React.PropTypes.func
};

Showcase.displayName = 'Showcase';

export default Showcase;
