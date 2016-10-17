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
import { Thumbnail } from 'react-bootstrap';

class ItemThumbnail extends React.Component {
  constructor (props) {
      super(props);
      this._onClickThumbnail = this._onClickThumbnail.bind(this);
      this._onMouseoverThumbnail = this._onMouseoverThumbnail.bind(this);
      this._onMouseoutThumbnail = this._onMouseoutThumbnail.bind(this);
  }

  _onClickThumbnail () {
    const coordinates = [this.props.feature.geometry.coordinates[1], this.props.feature.geometry.coordinates[0]];
    this.props.onClickThumbnail(coordinates, 15);
  }

  _onMouseoverThumbnail () {
    const feature = this.props.feature;
    this.props.onMouseoverThumbnail(feature);
  }

  _onMouseoutThumbnail () {
    this.props.onMouseoutThumbnail(null);
  }

  render () {
    const feature = this.props.feature;
    const layoutFields = this.props.layoutFields;
    let imageUrl = feature.properties[layoutFields.image];
    const name = feature.properties[layoutFields.name];
    const description = feature.properties[layoutFields.description];

    if (layoutFields.imageUrlPrefix !== undefined && layoutFields.imageUrlPrefix !== '') {
      imageUrl = layoutFields.imageUrlPrefix + imageUrl;
    }

    return (
      <Thumbnail
        src={imageUrl}
        onClick={this._onClickThumbnail}
        onMouseOver={this._onMouseoverThumbnail}
        onMouseOut={this._onMouseoutThumbnail}
        className="react-webmap-item-thumbnail"
      >
        <h3>{name}</h3>
        <p>{description}</p>
      </Thumbnail>
    );
  }
}

ItemThumbnail.propTypes = {
  feature: React.PropTypes.any,
  layoutFields: React.PropTypes.object,
  onClickThumbnail: React.PropTypes.func,
  onMouseoverThumbnail: React.PropTypes.func,
  onMouseoutThumbnail: React.PropTypes.func
};

ItemThumbnail.displayName = 'ItemThumbnail';

export default ItemThumbnail;
