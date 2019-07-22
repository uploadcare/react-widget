# React Widget

React component for [uploadcare widget](https://uploadcare.com/docs/file_uploads/widget/)

**This library comes untranspiled**

Want to support IE11 → make sure you transpile node_modules.

## Install

```
npm i @uploadcare/react-widget
```

## Usage

```jsx
import { Widget } from '@uploadcare/widget'

<Widget publicKey='demopublickey' />
```

## API

* `value`

Set a file/group UUID or a [CDN link](https://uploadcare.com/docs/delivery/) as a value.

```
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1' />
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1~12' />
<Widget value={null} />
```

* `onFileSelect`
* `onChange`
* `customTabs`

Set a [custom tabs](https://uploadcare.com/docs/api_reference/javascript/custom_tabs/) for a widget.

Note that we're added fifth argument to the custom tab constructor - `uploadcare` object. 

```
function myTab(container, button, dialogApi, settings, name, uploadcare) {
  ...
}

<Widget customTabs={{ 'custom_tab: myTab }} />
```

* `validator`

All the other props are passed down to the widget. See [widget documentation](https://uploadcare.com/docs/file_uploads/widget/options/#options) for the details.

## Examples

- [Sandbox Demo](https://codesandbox.io/s/uploadcarereact-widget-7xpqp)
- [Props](https://codesandbox.io/s/uploadcarereact-widget-props-example-oqk0v)
- [onChange](https://codesandbox.io/s/uploadcarereact-widget-onchange-example-o376j)
- [Gatsby](https://codesandbox.io/s/gatsby-starter-default-jr6nq)