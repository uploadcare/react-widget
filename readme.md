# File Uploader for React

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-tinymce">
  <img align="right" width="64" height="64"
    src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
    alt="">
</a>

This is a React component made to easily integrate
[Uploadcare Widget][uc-feature-widget] into your React app; convenient props
management and lazy loading are bundled.

The component allows users to upload media from their devices, social media,
cloud storage, and more. All that without any backend code that's usually
required to handle uploads.

**Note: This library comes untranspiled**. It means, if you want to support
IE11, make sure you transpile `node_modules`. → [Read More][es6-debate] ←

[![Build Status][build-img]][build-link]
[![NPM version][npm-img]][npm-link]

* [Demo & Examples](#demo-and-examples)
* [Install](#install)
* [Usage](#usage)
* [Configuration](#configuration)
  * [Component configuration](#component-configuration)
  * [Widget configuration](#widget-configuration)
* [Security issues](#security-issues)
* [Feedback](#feedback)

## Demo and Examples

- [Sandbox Demo](https://codesandbox.io/s/uploadcarereact-widget-7xpqp)
- [Props](https://codesandbox.io/s/uploadcarereact-widget-props-example-oqk0v)
- [onChange](https://codesandbox.io/s/uploadcarereact-widget-onchange-example-o376j)
- [Gatsby](https://codesandbox.io/s/gatsby-starter-default-jr6nq)

## Install

```
npm i @uploadcare/react-widget
```

## Usage

```jsx
import { Widget } from "@uploadcare/react-widget";

<Widget publicKey="demopublickey" />;
```

## Configuration

### Component configuration

#### `value`: `string`

Set a file/group UUID or a [CDN URL][delivery-docs] as a value.

```jsx
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1' />
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1~12' />
<Widget value={null} />
```

#### `onFileSelect`: `(fileInfo: FileInfo) => void`

#### `onChange`: `(fileInfo: FileInfo) => void`

Set callbacks for the respective events. The `FileInfo` object is 
described [here][api-refs-props].

#### `customTabs`: `{[string]: CustomTabConstructor}`

Set [custom tabs][custom-tabs-docs] for a widget.

Note that we added fifth argument to the custom tab constructor -
`uploadcare` object. Widget is loaded lazily so you shouldn't import
`uploadcare-widget` directly:

```jsx
function myTab(container, button, dialogApi, settings, name, uploadcare) {
  ...
}

<Widget customTabs={{ 'custom_tab: myTab }} />
```

#### `validator`

*The section is W.I.P.*

## Widget configuration

Uploadcare Widget can be deeply customized to suit your UX/UI. You can define
allowed upload sources, implement file validation, and more.

All the options defined in the [widget options docs][widget-options-docs] are
also supported in the component as props.

Use our live [widget sandbox][uc-widget-configure] as a starting point and consider
checking out the docs on [widget configuration][uc-docs-widget-config] and its
[JavaScript API][uc-docs-widget-js-api].

## Security issues

If you think you ran into something in Uploadcare libraries which might have
security implications, please hit us up at [bugbounty@uploadcare.com][uc-email-bounty]
or Hackerone.

We'll contact you personally in a short time to fix an issue through co-op and
prior to any public disclosure.

## Feedback

Issues and PRs are welcome. You can provide your feedback or drop us a support
request at [hello@uploadcare.com][uc-email-hello].


[es6-debate]: https://gist.github.com/Rich-Harris/51e1bf24e7c093469ef7a0983bad94cb
[build-img]: https://api.travis-ci.com/uploadcare/react-widget.svg?branch=master
[build-link]: https://travis-ci.com/uploadcare/react-widget
[npm-img]: https://img.shields.io/npm/v/@uploadcare/react-widget.svg
[npm-link]: https://www.npmjs.com/package/@uploadcare/react-widget
[widget-options-docs]: https://uploadcare.com/docs/file_uploads/widget/options/#options?utm_source=github&utm_campaign=react-widget
[delivery-docs]: https://uploadcare.com/docs/delivery/?utm_source=github&utm_campaign=react-widget
[custom-tabs-docs]: https://uploadcare.com/docs/api_reference/javascript/custom_tabs/?utm_source=github&utm_campaign=react-widget
[api-refs-props]: https://uploadcare.com/docs/api_reference/rest/accessing_files/#properties?utm_source=github&utm_campaign=react-widget
[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
[uc-widget-configure]: https://uploadcare.com/widget/configure/?utm_source=github&utm_campaign=react-widget
[uc-feature-widget]: https://uploadcare.com/features/widget/?utm_source=github&utm_campaign=react-widget
[uc-docs-widget-config]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=react-widget
[uc-docs-widget-js-api]: https://uploadcare.com/docs/api_reference/javascript/?utm_source=github&utm_campaign=react-widget