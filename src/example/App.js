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
import Mediator from './Mediator';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';
import MapView from './mapview/MapView';
import HomeButton from './reactors/HomeButton/HomeButton';
import Geocoder from './reactors/Geocoder/Geocoder';
import Bookmarks from './reactors/Bookmarks/Bookmarks';
import LayerList from './reactors/LayerList/LayerList';
import ListGroups from './reactors/ListGroups/ListGroups';
import Showcase from './reactors/Showcase/Showcase';

class App extends Mediator {
  constructor (props) {
      super(props);
  }

  readyComponents () {
    const listGroupsLayerIndex = 2;
    const listGroupsLayoutFields = {
      type: '種別',
      typeValues: ['認可保育所', '認証保育所（A型）', '認証保育所（B型）'],
      name: '施設名',
      label: '定員',
      sort: '定員'
    };
    const showcaseLayerIndex = 4;
    const showcaseLayoutFields = {
      name: '場所名',
      description: '説明',
      image: '画像',
      imageUrlPrefix: 'https://muxlab.github.io/map-effects-100/data/img/',
      sort: 'NO_'
    }

    this.setState({
      listGroups: {
        layer: this.state.webmap.layers[listGroupsLayerIndex],
        layoutFields: listGroupsLayoutFields
      },
      showcase: {
        layer: this.state.webmap.layers[showcaseLayerIndex],
        layoutFields: showcaseLayoutFields
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.isLoaded.webmap === true && prevState.isLoaded.webmap === false) {
      console.log('react-webmap: ready components!');
      this.readyComponents();
    }
  }

  render () {
    return (
      <div>
        <a href="https://github.com/ynunokawa/react-webmap"><img style={{position: 'absolute', top: 0, right: 0, border: 0, zIndex: 99999}} src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></img></a>
        <style type="text/css">{`
        .fixed-nav {
            position: fixed;
            width: 100%;
            z-index: 99998;
        }
        @media (min-height: 737px) {
          .fixed-container {
              position: fixed;
              width: 100%;
              background: #fff;
              z-index: 99997;
              box-shadow: 0px 6px 20px 0 rgba(0,0,0,0.15);
          }
          .container {
              width: 100%;
          }
          .offset-top2 {
              margin-top: 430px;
          }
        }
        .row {
            margin-bottom: 20px;
        }
        .offset-top1 {
            margin-top: 50px;
        }
        `}</style>
        <Navbar className="fixed-nav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React WebMap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#mapview">MapView</NavItem>
              <NavDropdown eventKey={2} title="Reactors" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1} href="#homebutton">HomeButton</MenuItem>
                <MenuItem eventKey={2.2} href="#bookmarks">Bookmarks</MenuItem>
                <MenuItem eventKey={2.3} href="#geocoder">Geocoder</MenuItem>
                <MenuItem eventKey={2.3} href="#layerlist">LayerList</MenuItem>
                <MenuItem eventKey={2.3} href="#listgroups">ListGroups</MenuItem>
                <MenuItem eventKey={2.3} href="#showcase">Showcase</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid className="fixed-container">
          <Row className="offset-top1">
            <Col xs={12} md={12}>
              <h2 id="mapview">MapView</h2>
              <p>MapView is <code>&lt;div&gt;</code> for rendering a <code>L.map</code>. It just creates view and give states and events of a map to Mediator.</p>
              <h3><code>&lt;MapView /&gt;</code></h3>
              <MapView height={"200px"} />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="offset-top2">
            <Col xs={12} md={12}>
              <h2 id="reactors">Reactors</h2>
              <p>Reactors are collection of React components for workging with a map. They receive a data of <code>L.map</code> via Mediator and render with it.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <h3 id="homebutton"><code>&lt;HomeButton /&gt;</code></h3>
              <HomeButton
                center={this.state.initialCenter}
                zoom={this.state.initialZoom}
                onGetHome={this.setView}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <h3 id="bookmarks"><code>&lt;Bookmarks /&gt;</code></h3>
              <Bookmarks
                bookmarks={this.state.bookmarks}
                onClickBookmark={this.fitBounds}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <h3 id="geocoder"><code>&lt;Geocoder /&gt;</code></h3>
              <Geocoder
                onSearch={this.fitBounds}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <h3 id="layerlist"><code>&lt;LayerList /&gt;</code></h3>
              <LayerList
                map={this.state.map}
                layers={this.state.layers}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <h3 id="listgroups"><code>&lt;ListGroups /&gt;</code></h3>
              <ListGroups
                layer={this.state.listGroups.layer}
                layoutFields={this.state.listGroups.layoutFields}
                mapState={this.state.mapState}
                filter={true}
                onClickList={this.setView}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <h3 id="showcase"><code>&lt;Showcase /&gt;</code></h3>
              <Showcase
                layer={this.state.showcase.layer}
                layoutFields={this.state.showcase.layoutFields}
                mapState={this.state.mapState}
                onClickThumbnail={this.setView} 
                onMouseoverThumbnail={this.highlightFeature} 
                onMouseoutThumbnail={this.highlightFeature}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;
