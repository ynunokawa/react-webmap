# React WebMap Framework

WORK IN PROGRESS..

This framework combine two libraries as [Leaflet.js](http://leafletjs.com/) and [React](https://facebook.github.io/react/).
It think how web mapping library like Leaflet.js coexist with concepts of React.

It does not use Shadow DOM for rendering a map and configuring layers because `L.map` do all these for mapping. But it is low reusability to define states of a map and configure layers in Leaflet.js.. Therefore, it uses [ArcGIS Web Map](https://developers.arcgis.com/web-map-specification/) to put full information for mapping data out. It is able to initialize a structure just with web map id.

![](img/conceptual-diagram.png)

See [the live demo](https://ynunokawa.github.io/react-webmap/).
