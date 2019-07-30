# React Widget

[![Build Status][build-img]][build-link]
[![NPM version][npm-img]][npm-link]

React component for [uploadcare widget](https://uploadcare.com/docs/file_uploads/widget/)

**This library comes untranspiled**

Want to support IE11 → make sure you transpile node_modules.

## Install

```
npm i @uploadcare/react-widget
```

## Usage

```jsx
import { Widget } from "@uploadcare/react-widget";

<Widget publicKey="demopublickey" />;
```

## Available props

All the props except for the listed below are passed down to the widget. See [widget documentation](https://uploadcare.com/docs/file_uploads/widget/options/#options) for the details.

### `value`: `string`

Set a file/group UUID or a [CDN link](https://uploadcare.com/docs/delivery/) as a value.

```jsx
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1' />
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1~12' />
<Widget value={null} />
```

### `onFileSelect`: `(fileInfo: FileInfo) => void`

### `onChange`: `(fileInfo: FileInfo) => void`

`FileInfo` object is described [here](https://uploadcare.com/docs/api_reference/rest/accessing_files/#properties)

### `customTabs`: `{[string]: CustomTabConstructor}`

Set a [custom tabs](https://uploadcare.com/docs/api_reference/javascript/custom_tabs/) for a widget.

Note that we're added fifth argument to the custom tab constructor - `uploadcare` object. Widget is loaded lazily so you shouldn't import `uploadcare-widget` directly.

```jsx
function myTab(container, button, dialogApi, settings, name, uploadcare) {
  ...
}

<Widget customTabs={{ 'custom_tab: myTab }} />
```

### `validator`

## Examples

- [Sandbox Demo](https://codesandbox.io/s/uploadcarereact-widget-7xpqp)
- [Props](https://codesandbox.io/s/uploadcarereact-widget-props-example-oqk0v)
- [onChange](https://codesandbox.io/s/uploadcarereact-widget-onchange-example-o376j)
- [Gatsby](https://codesandbox.io/s/gatsby-starter-default-jr6nq)

[build-img]: https://api.travis-ci.com/uploadcare/react-widget.svg?branch=master
[build-link]: https://travis-ci.com/uploadcare/react-widget
[npm-img]: https://img.shields.io/npm/v/@uploadcare/react-widget.svg
[npm-link]: https://www.npmjs.com/package/@uploadcare/react-widget
