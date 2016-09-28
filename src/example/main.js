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
import ReactDOM from 'react-dom';
import document from 'global/document';

import Mediator from './Mediator';

import { isReactDOMSupported } from '../lib/utils/react-utils';

let mapid = '55e02e777274468c90745fde6641faf4';
const urlParams = location.hash.substring(1).split('&');
urlParams.forEach(function (urlParam) {
  var param = urlParam.split('=');
  if(param[0] === 'mapid') {
    mapid = param[1]
  }
});

const listGroupsLayerIndex = 2;
const listGroupsLayoutFields = {
  type: '種別',
  typeValues: ['認可保育所', '認証保育所（A型）', '認証保育所（B型）'],
  name: '施設名',
  label: '定員',
  sort: '定員'
};

const appContents = (
  <main>
    <Mediator 
      mapid={mapid} 
      listGroupsLayerIndex={listGroupsLayerIndex} 
      listGroupsLayoutFields={listGroupsLayoutFields} 
    />
  </main>
);

// Cannot render to body anymore: react is throwing warnings.
// Adding new element instead.
const el = document.createElement('div');
const render = isReactDOMSupported() ? ReactDOM.render : React.render;
document.body.appendChild(el);
render(appContents, el);
