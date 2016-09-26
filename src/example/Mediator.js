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
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import MapView from './mapview/MapView';
import HomeButton from './reactors/HomeButton';

class Mediator extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        map: {},
        center: [],
        zoom: 5,
        bounds: {},
        initialCenter: [],
        initialZoom: 5,
        title: '',
        layers: [],
        bookmarks: [],
        portalItem: {}
      };
  }

  _initMapEventListeners () {
    const map = this.state.map;
    map.on('moveend', this._onMapMoveend, this);
  }

  _onMapMoveend (e) {
    const map = this.state.map;
    this.setState({
      center: map.getCenter(),
      zoom: map.getZoom(),
      bounds: map.getBounds()
    });
  }

  _initWebMap (map, mapid) {
    const webmap = L.esri.webMap(mapid, { map: map });
    webmap.on('load', function () {
      this.setState({
        map: map,
        center: map.getCenter(),
        zoom: map.getZoom(),
        bounds: map.getBounds(),
        title: webmap.title,
        layers: webmap.layers,
        bookmarks: webmap.bookmarks,
        portalItem: webmap.portalItem
      });
      this._initMapEventListeners();
      this.setView = this.setView.bind(this);
    }.bind(this));
    webmap.on('metadataLoad', function () {
      setTimeout(function () {
        this.setState({
          initialCenter: [map.getCenter().lat, map.getCenter().lng],
          initialZoom: map.getZoom()
        });
      }.bind(this), 500);
    }.bind(this));
  }
  
  setView (center, zoom) {
    const map = this.state.map;
    map.setView(center, zoom);
  }

  componentDidMount () {
    const map = L.map('react-esri-map', { center: [35, 139], zoom: 5 });
    this._initWebMap(map, this.props.mapid);
  }

  componentWillReceiveProps (nextProps) {
    const map = this.state.map;
    map.eachLayer(function (l) {
      map.removeLayer(l);
    });
    this._initWebMap(map, nextProps.mapid);
  }

  render () {
    return (
      <div>
        <a href="https://github.com/ynunokawa/react-webmap"><img style={{position: 'absolute', top: 0, right: 0, border: 0, zIndex: 99999}} src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></img></a>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React WebMap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">A</NavItem>
              <NavItem eventKey={2} href="#">B</NavItem>
              <NavItem eventKey={3} href="#">C</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <MapView />
            </Col>
            <Col xs={12} md={4}>
              <HomeButton center={this.state.initialCenter} zoom={this.state.initialZoom} onGetHome={this.setView} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Mediator.propTypes = {
  mapid: React.PropTypes.string
};

Mediator.defaultProps = {
  mapid: '55e02e777274468c90745fde6641faf4'
};

Mediator.displayName = 'Mediator';

export default Mediator;
