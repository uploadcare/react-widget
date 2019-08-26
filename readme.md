# File Uploader for React

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=react-widget">
  <img align="right" width="64" height="64"
    src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
    alt="">
</a>

This is a React component made to integrate [Uploadcare Widget][uc-feature-widget]
into your React app easily; convenient props management and lazy loading
are bundled.

The component allows users to upload files from their devices, social media,
cloud storage, and more. All that without any backend code that’s usually
required to handle uploads.

**[Read Uploadcare + React Integration Guide][react-guide]**

**Note**, this library comes untranspiled. It means, if you want to support
IE11, make sure you transpile `node_modules`. [Learn more][es6-debate]

[![Build Status][build-img]][build-link]
[![NPM version][npm-img]][npm-link]

* [Install](#install)
* [Usage](#usage)
* [Configuration](#configuration)
  * [Component configuration](#component-configuration)
  * [Widget configuration](#widget-configuration)
* [Demos](#demos)
* [Security issues](#security-issues)
* [Feedback](#feedback)

## Install

```
npm i @uploadcare/react-widget
```

## Usage

```jsx
import { Widget } from "@uploadcare/react-widget";

<Widget publicKey="YOUR_PUBLIC_KEY" />;
```

Basic usage example: [Sandbox][sandbox-props]

To use the component, you should have an **API key** from Uploadcare.

Uploadcare account is free and gives access to serverless file uploads,
transformations, CDN delivery, and APIs. After [sign up][uc-sign-up], you land
on the Dashboard where you manage projects. Projects are identified by their
*public keys*: replace `YOUR_PUBLIC_KEY` with your project’s Public API Key
and you are all set.

You can refer to our [integration guide][react-guide] for more details.

## Configuration

### Component configuration

#### `value: string`

Set a [file UUID][uc-docs-files]/[group UUID][uc-docs-groups]
or a [CDN URL][delivery-docs] as a value.

```jsx
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1' />
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1~12' />
```

#### `onChange: (fileInfo: FileInfo) => void`

Provides you with the ability to do something after a file is uploaded and ready.

[Example][sandbox-on-change]

#### `onFileSelect: (fileInfo: FileInfo) => void`

Provides you with the ability to do something after a new file is selected.

The `FileInfo` object is described [here][api-refs-props].

[Example][sandbox-on-file-select]

#### `customTabs: {[string]: CustomTabConstructor}`

Add [custom tabs][custom-tabs-docs] to a widget.

Note that we added fifth argument to the custom tab constructor - `uploadcare`
object. Widget is loaded lazily so you shouldn’t import `uploadcare-widget`
directly:

```jsx
function myTab(container, button, dialogApi, settings, name, uploadcare) {
  ...
}

<Widget customTabs={{ tabname: myTab }} />
```

Remember that you have to enable custom tab the same way as default ones to make
it work, using the `tabs` prop:

```jsx
<Widget customTabs={{ tabname: myTab }} tabs='tabname' />
```

[Example][sandbox-custom-tab]

#### `validators: Validator[]`

```jsx
const fileTypeLimit = (tps) => {
  cosnt types = tps.split(' ')
  return function(fileInfo) {
    if (fileInfo.name === null) {
      return
    }
    const extension = fileInfo.name.split('.').pop()

    if (!types.include(extension)) {
      throw new Error('fileType')
    }
  }
}

const validators = [fileTypeLimit('mp3 avi mp4')];

<Widget validators={validators} />
```

The `Validator` type is described [here][api-refs-validation].

[Example][sandbox-validators]

## Widget configuration

Uploadcare Widget can be deeply customized to suit your UX/UI. You can define
allowed upload sources, implement file validation, and more.

All the options defined in the [widget options docs][widget-options-docs] are
also supported in the component as props (use the **camelCase** notation, you
can find it under “Object key” in the referenced article).

Use the live [Uploadcare Widget Configurator][uc-widget-configure] as a starting
point and consider checking out the docs on
[widget configuration][uc-docs-widget-config].

## Demos

- [Gatsby][sandbox-gatsby]: Basic usage example with Gatsby

## Security issues

If you think you ran into something in Uploadcare libraries which might have
security implications, please hit us up at [bugbounty@uploadcare.com][uc-email-bounty]
or Hackerone.

We’ll contact you personally in a short time to fix an issue through co-op and
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
[react-guide]: https://uploadcare.com/docs/guides/react/?utm_source=github&utm_campaign=react-widget
[custom-tabs-docs]: https://uploadcare.com/docs/api_reference/javascript/custom_tabs/?utm_source=github&utm_campaign=react-widget

[api-refs-props]: https://uploadcare.com/docs/api_reference/rest/accessing_files/#properties?utm_source=github&utm_campaign=react-widget
[api-refs-validation]: https://uploadcare.com/docs/file_uploads/widget/moderation/

[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
[uc-widget-configure]: https://uploadcare.com/widget/configure/?utm_source=github&utm_campaign=react-widget
[uc-feature-widget]: https://uploadcare.com/features/widget/?utm_source=github&utm_campaign=react-widget
[uc-docs-widget-config]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=react-widget
[uc-docs-widget-js-api]: https://uploadcare.com/docs/api_reference/javascript/?utm_source=github&utm_campaign=react-widget
[uc-sign-up]: https://uploadcare.com/accounts/signup/
[uc-docs-groups]: https://uploadcare.com/docs/delivery/group_api/#groups
[uc-docs-files]: https://uploadcare.com/docs/concepts/#uploads

[sandbox-simple-demo]: https://codesandbox.io/s/uploadcarereact-widget-7xpqp
[sandbox-props]: https://codesandbox.io/s/uploadcarereact-widget-props-example-oqk0v
[sandbox-on-change]: https://codesandbox.io/s/uploadcarereact-widget-onchange-example-o376j
[sandbox-on-file-select]: https://codesandbox.io/s/uploadcarereact-widget-onfileselect-example-4kwyx
[sandbox-custom-tab]: https://codesandbox.io/s/4xz0k
[sandbox-validators]: https://codesandbox.io/s/vxnjb
[sandbox-gatsby]: https://codesandbox.io/s/23pqs
