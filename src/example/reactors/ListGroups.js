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
import { Grid, Row, Col, ListGroup, ListGroupItem, Badge, utils } from 'react-bootstrap';

class ListGroups extends React.Component {
  constructor (props) {
      super(props);
      this._onClickList = this._onClickList.bind(this);
  }

  _onClickList (e) {
    console.log(e.target.title);
    const layoutFields = this.props.layoutFields;
    const layer = this.props.layer;
    let lyr = null;
    Object.keys(layer.layer._layers).map(function (k) {
      if (layer.layer._layers[k]._cache !== undefined) {
        lyr = layer.layer._layers[k];
      }
    });
    if (lyr !== null) {
      lyr.eachFeature(function (l) {
        if (e.target.title === l.feature.properties[layoutFields.name]) {
          console.log(l);
          this.props.onClickList(l.feature.geometry.coordinates.reverse(), 17);
        }
      }.bind(this));
    }
  }

  componentWillReceiveProps (nextProps) {
    this.render();
  }

  render () {
    utils.bootstrapUtils.addStyle(ListGroupItem, 'custom');
    utils.bootstrapUtils.addStyle(Badge, 'custom');
    
    const layer = this.props.layer;
    const layoutFields = this.props.layoutFields;

    const listGroups = layoutFields.typeValues.map(function (t, i) {
      const listGroupHeader = (
        <ListGroupItem bsStyle="custom">{t}</ListGroupItem>
      );

      let features = [];
      let lyr = null;

      Object.keys(layer.layer._layers).map(function (k) {
        if (layer.layer._layers[k]._cache !== undefined) {
          lyr = layer.layer._layers[k];
        }
      });
      if (lyr !== null) {
        lyr.eachFeature(function (l) {
          if (l.feature.properties[layoutFields.type] === t) {
            features.push(l.feature);
          }
        });
      }
      features = features.sort(function (a, b) {
        return b.properties[layoutFields.sort] - a.properties[layoutFields.sort];
      });
      
      const listGroupItems = features.map(function (f, index) {
        return (
          <ListGroupItem title={f.properties[layoutFields.name]} onClick={this._onClickList} href="#" key={f.properties[layoutFields.name] + "-" + index}>
            {f.properties[layoutFields.name]}
            <Badge>{f.properties[layoutFields.label]}</Badge>
          </ListGroupItem>
        );
      }.bind(this));

      return (
        <Col xs={12} sm={6} md={4} key={t}>
          <ListGroup>
            {listGroupHeader}
            {listGroupItems}
          </ListGroup>
        </Col>
      );
    }.bind(this));

    return (
        <Grid>
          <Row>
            <style type="text/css">{`
            .list-group-item-custom {
                background-color: #f5646a;
                color: #fff !important;
                border-color: #f5646a;
                font-weight: bold;
            }
            .list-group-item-custom:hover {
                background-color: #f5646a !important;
                opacity: 0.8;
            }
            .list-group-item {
                font-size: 0.9em;
            }
            .badge {
                background-color: #f5646a;
                color: #fff;
            }
            `}</style>
            {listGroups}
          </Row>
        </Grid>
    );
  }
}

ListGroups.propTypes = {
  layer: React.PropTypes.object,
  layoutFields: React.PropTypes.object,
  onClickList: React.PropTypes.func
};

ListGroups.defaultProps = {
  onClickList: function () {}
};

ListGroups.displayName = 'ListGroups';

export default ListGroups;
