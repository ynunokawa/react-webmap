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

class Mediator extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        isLoaded: {
          webmap: false,
          metadata: false
        },
        webmap: {},
        map: {},
        mapState: {
          center: [],
          zoom: 5,
          bounds: {}
        },
        initialCenter: [],
        initialZoom: 5,
        title: '',
        layers: [],
        bookmarks: [],
        portalItem: {},
        listGroups: {
          layer: {},
          layoutFields: {
            type: '',
            typeValues: [],
            name: '',
            label: '',
            sort: ''
          }
        },
        showcase: {
          layer: {},
          layoutFields: {
            name: '',
            description: '',
            image: '',
            imageUrlPrefix: '',
            sort: ''
          }
        },
        treemapChart: {
          layer: {},
          fields: {
            name: '',
            quantity: ''
          }
        }
      };
      this.highlight = null;
      this.highlightIcon = L.vectorIcon({
        className: 'react-webmap-highlight-icon',
        svgHeight: 12,
        svgWidth: 12,
        type: 'circle',
        shape: {
          r: '6',
          cx: '6',
          cy: '6'
        },
        style: {
          fill: '#ff6664',
          strokeWidth: 0
        }
      });
      this.highlightStyle = {
        className: 'react-webmap-highlight-style',
        color: '#fff',
        weight: 4,
        opacity: 0.6,
        fillOpacity: 0.7,
        fillColor: '#fff'
      };
  }

  _initMapEventListeners () {
    const map = this.state.map;
    map.on('moveend', this._onMapMoveend, this);
  }

  _onMapMoveend (e) {
    const map = this.state.map;
    this.setState({
      mapState: {
        center: map.getCenter(),
        zoom: map.getZoom(),
        bounds: map.getBounds()
      }
    });
  }

  _initWebMap (map, mapid) {
    const webmap = L.esri.webMap(mapid, { map: map });
    webmap.on('load', function () {
      this.setState({
        isLoaded: {
          webmap: true
        },
        webmap: webmap,
        map: map,
        mapState: {
          center: map.getCenter(),
          zoom: map.getZoom(),
          bounds: map.getBounds()
        },
        title: webmap.title,
        layers: webmap.layers,
        bookmarks: webmap.bookmarks,
        portalItem: webmap.portalItem
      });
      map.createPane('highlight');
      map.getPane('highlight').style.zIndex = 650;
      this._initMapEventListeners();
      this.setView = this.setView.bind(this);
      this.fitBounds = this.fitBounds.bind(this);
      this.highlightFeature = this.highlightFeature.bind(this);
    }.bind(this));
    webmap.on('metadataLoad', function () {
      setTimeout(function () {
        this.setState({
          isLoaded: {
            metadata: true
          },
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

  fitBounds (bounds) {
    const map = this.state.map;
    map.fitBounds(bounds);
  }

  highlightFeature (feature) {
    const map = this.state.map;
    const prevHighlight = this.highlight;
    const highlightIcon = this.highlightIcon;
    const highlightStyle = this.highlightStyle;

    if (prevHighlight !== null) {
      map.removeLayer(prevHighlight);
    }

    if (feature !== null) {
      const highlight = L.geoJson(feature, {
        pane: 'highlight',
        onEachFeature: function (feature, layer) {
          if (feature.geometry.type === 'Point') {
            layer.setIcon(highlightIcon);
          } else {
            layer.setStyle(highlightStyle);
          }
        }
      });
      map.addLayer(highlight);
      this.highlight = highlight;
    }
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
}

Mediator.propTypes = {
  mapid: React.PropTypes.string
};

Mediator.defaultProps = {
  mapid: '55e02e777274468c90745fde6641faf4'
};

Mediator.displayName = 'Mediator';

export default Mediator;
