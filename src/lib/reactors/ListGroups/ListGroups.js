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
import Switch from 'react-bootstrap-switch';
import ListGroupItems from './ListGroupItems';

class ListGroups extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        filter: this.props.filter
      }
      this._onClickList = this._onClickList.bind(this);
      this.onFilter = this.onFilter.bind(this);
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
          const coordinates = [l.feature.geometry.coordinates[1], l.feature.geometry.coordinates[0]];
          this.props.onClickList(coordinates, 17);
        }
      }.bind(this));
    }
  }

  onFilter (elm, state) {
    console.log(state);
    this.setState({ filter: state });
  }

  componentWillReceiveProps (nextProps) {
    this.render();
  }

  render () {
    const layer = this.props.layer;
    const layoutFields = this.props.layoutFields;
    const bounds = this.props.mapState.bounds;
    const filter = this.state.filter;

    let filterSwitch;

    if (this.props.switch === true) {
      filterSwitch = (
        <Col xs={12}>
        <style type="text/css">{`
        .bootstrap-switch {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        `}</style>
        <Switch
          defaultValue={this.props.filter}
          onChange={this.onFilter}
          onText={"Filtered"}
          offText={"Unfiltered"}
        />
      </Col>
      );
    }

    const listGroups = layoutFields.typeValues.map(function (t, i) {
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
            if (filter) {
              if (bounds.contains(l._latlng)) {
                features.push(l.feature);
              }
            } else {
              features.push(l.feature);
            }
          }
        });
      }
      features = features.sort(function (a, b) {
        return b.properties[layoutFields.sort] - a.properties[layoutFields.sort];
      });

      return (
        <Col xs={12} sm={6} md={4} key={t}>
          <ListGroupItems
            typeValue={t}
            features={features}
            layer={lyr}
            layoutFields={this.props.layoutFields}
            onClickList={this.props.onClickList}
          />
        </Col>
      );
    }.bind(this));

    return (
        <Grid>
          <Row>
            {filterSwitch}
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
  mapState: React.PropTypes.object,
  filter: React.PropTypes.bool,
  switch: React.PropTypes.bool,
  onClickList: React.PropTypes.func
};

ListGroups.defaultProps = {
  switch: true,
  onClickList: function () {}
};

ListGroups.displayName = 'ListGroups';

export default ListGroups;
