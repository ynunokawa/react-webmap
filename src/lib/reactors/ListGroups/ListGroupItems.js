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
import { ListGroup, ListGroupItem, Badge, utils } from 'react-bootstrap';

class ListGroupItems extends React.Component {
  constructor (props) {
      super(props);
      this._onClickList = this._onClickList.bind(this);
  }

  _onClickList (e) {
    const layoutFields = this.props.layoutFields;
    const layer = this.props.layer;
    if (layer !== null) {
      layer.eachFeature(function (l) {
        if (e.target.title === l.feature.properties[layoutFields.name]) {
          const coordinates = [l.feature.geometry.coordinates[1], l.feature.geometry.coordinates[0]];
          this.props.onClickList(coordinates, 17);
        }
      }.bind(this));
    }
  }

  render () {
    utils.bootstrapUtils.addStyle(ListGroupItem, 'custom');
    utils.bootstrapUtils.addStyle(Badge, 'custom');

    const layoutFields = this.props.layoutFields;
    const typeValue = this.props.typeValue;

    const listGroupHeader = (
      <ListGroupItem bsStyle="custom">{typeValue}</ListGroupItem>
    );

    const listGroupItems = this.props.features.map(function (f, index) {
      return (
        <ListGroupItem title={f.properties[layoutFields.name]} onClick={this._onClickList} href="#" key={f.properties[layoutFields.name] + "-" + index}>
          {f.properties[layoutFields.name]}
          <Badge>{f.properties[layoutFields.label]}</Badge>
        </ListGroupItem>
      );
    }.bind(this));

    return (
      <ListGroup>
        {listGroupHeader}
        {listGroupItems}
      </ListGroup>
    );
  }
}

ListGroupItems.propTypes = {
  typeValue: React.PropTypes.string,
  features: React.PropTypes.array,
  layer: React.PropTypes.object,
  layoutFields: React.PropTypes.object,
  onClickList: React.PropTypes.func
};

ListGroupItems.defaultProps = {
  onClickList: function () {}
};

ListGroupItems.displayName = 'ListGroupItems';

export default ListGroupItems;
