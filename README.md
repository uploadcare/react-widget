# File Uploader for React

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=react-widget">
  <img align="right" width="56" height="56"
    src="https://ucarecdn.com/1cc871de-5d82-442d-b4d6-aa2e35966879/-/resize/112x112/-/quality/lightest/logocircle2x.png"
    alt="">
</a>

This React component helps you integrate [Uploadcare Widget][uc-feature-widget]
into your React app natively; props management and lazy loading are bundled.

The component allows users to upload files from any file system and device, social media, 
cloud storage, and more. Best-in-class for image upload.
All that without any backend code that’s usually required to handle uploads.

#### [Read Uploadcare + React Integration Guide][react-guide]

[![Build Status][build-img]][build-link]
[![NPM version][npm-img]][npm-link]

* [Install](#install)
* [Usage](#usage)
* [Available bundles](#available-bundles)
* [Configuration](#configuration)
  * [`Widget` component configuration](#widget-component-configuration)
  * [`Panel` component configuration](#panel-component-configuration)
  * [Widget configuration](#widget-configuration)
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

or

```jsx
import { Panel } from "@uploadcare/react-widget";

<Panel publicKey="YOUR_PUBLIC_KEY" />;
```

* [Basic usage example on CodeSandbox][sandbox-props]
* [Gatsby basic usage example on CodeSandbox][sandbox-gatsby]

To use this component, get an **API key** from your Uploadcare project.

Uploadcare account provides services for file uploads, transformations, CDN
delivery, as well as APIs. After [signing up][uc-sign-up], you'll see Dashboard
where you can manage projects. Each Project is identified by its *public key*.
Replace `YOUR_PUBLIC_KEY` with your project’s Public API Key and you are all
set.

You can refer to our [integration guide][react-guide] for more details.

## Available bundles
By default, npm and other package managers import the full (all locales) CommonJS or ESM bundle.

To reduce your bundle size, you can also import one of the following:
* The english-only bundle (saves ~27% in bundle size) as `@uploadcare/react-widget/en`
* The minified all-locales bundle (saves ~44% in bundle size) as `@uploadcare/react-widget/min`
* The minified english-only bundle (saves ~60% in bundle size) as `@uploadcare/react-widget/en-min`

## Configuration

### `Widget` component configuration

#### `value: string[] | string | JQuery.Deferred | JQuery.Deferred[]`

Set an array of [file UUID][uc-docs-files]/[group UUID][uc-docs-groups]/[CDN URL][delivery-docs]/[File Instance][uc-docs-widget-api-file-instance]/[Group Instance][uc-docs-widget-api-group-instance]
as a value.

```jsx
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1' />
<Widget value='9dd2f080-cc52-442d-aa06-1d9eec7f40d1~12' />
<Widget value={[
  '9dd2f080-cc52-442d-aa06-1d9eec7f40d1',
  'https://ucarecdn.com/fdfe4e67-f747-4993-91f5-be21d6d3c1a6/',
  '9ef9af26-7356-4428-b69c-1b920f947989~2'
]} />
```

<br>

#### `onChange: (fileInfo: FileInfo) => void`

Set a function to be called after **a file is uploaded and ready**.

* [FileInfo object description][api-refs-props]
* [Example][sandbox-on-change]

<br>

#### `onFileSelect: (fileInfo: FileInfo | FilesInfo | null) => void`

Set a function to be called after **a new file is selected**.

* [FileInfo object description][api-refs-props]
* [FilesInfo object description][multi-type-desc]
* [Example][sandbox-on-file-select]

<br>

#### `onDialogOpen: (dialog: DialogApi) => void`

Set a function to be called after **dialog is opened**.

* [DialogApi object description][api-refs-dialog]

<br>

#### `onDialogClose: (objs: FileInfo | FilesInfo | null) => void`

Set a function to be called after **dialog is closed**.

* [FileInfo object description][api-refs-props]
* [FilesInfo object description][multi-type-desc]

<br>

#### `onTabChange: (tabName: string) => void`

Set a function to be called after **tab is changed**.

<br>

#### `metadata: (metadata: Record<string, string>)`

The option can be used to set metadata object associated with the uploaded file.

Note that metadata supports `string` values only, any non-string value will be converted to `string`, including `boolean`, `number`, `null` and `undefined`.

**WARNING**: If this option is specified, option `metadataCallback` will be overridden (without merging).
This is opposite from the uploadcare-widget's behavior.

See [Metadata docs][uc-docs-metadata] for details.

<br>

#### `metadataCallback: () => Record<string, string>`

Defines the function that specifies the actual metadata object a file uploader should use to associate with the uploaded file. It's helpful in the case of dynamic metadata object.

Note that metadata supports `string` values only, any non-string value will be converted to `string`, including `boolean`, `number`, `null` and `undefined`.

See [Metadata docs][uc-docs-metadata] for details.

<br>

#### `customTabs: {[key: string]: CustomTabConstructor}`

Add **custom tabs** for a widget.

```jsx
function myTab(container, button, dialogApi, settings, name, uploadcare) {
  ...
}

<Widget customTabs={{ tabname: myTab }} />
```

Since custom tabs are global internally, any local property change will affect all the widget instances.
So we're highly recommend not to redefine tab constructors and not to have different constructors under the same name.

Note that we added the fifth argument to the custom tab constructor — an
`uploadcare` object. The widget is lazily-loaded, so you don’t have to import
`uploadcare-widget` separately for your custom tab.

Remember that you also need to include your custom tab in the `tabs` prop to
make it work:

```jsx
<Widget customTabs={{ tabname: myTab }} tabs='tabname' />
```

* [Custom tabs docs][custom-tabs-docs]
* [Example][sandbox-custom-tab]

<br>

#### Add [Image Editor][uc-docs-image-editor]

1. Install `uploadcare-widget-tab-effects` package

```bash
npm i uploadcare-widget-tab-effects
```

2. Import one of the bundles:

  * `uploadcare-widget-tab-effects/react` for all-locales bundle
  * `uploadcare-widget-tab-effects/react-en` for english-only bundle

```js
import effects from 'uploadcare-widget-tab-effects/react'
// or
// import effects from 'uploadcare-widget-tab-effects/react-en'
```

3. Pass the `effects` object to the `customTabs` prop:

```jsx
<Widget previewStep customTabs={{ preview: effects }} />
```

<br>

#### `validators: Validator[]`

Set **validators** for a widget. Validator is a JavaScript function that
receives a `fileInfo` object for each uploaded file and throws an exception if
that file doesn't meet validation requirements.

```jsx
const fileTypeLimit = (allowedFileTypes: string) => {
  const types = allowedFileTypes.split(' ')

  return function(fileInfo: FileInfo) {
    if (fileInfo.name === null) {
      return
    }
    const extension = fileInfo.name.split('.').pop()

    if (extension && !types.includes(extension)) {
      throw new Error('fileType')
    }
  }
}

const validators = [fileTypeLimit('mp3 avi mp4')];

<Widget validators={validators} />
```

* [Validator object description][api-refs-validation]
* [FileInfo object description][api-refs-props]
* [Example][sandbox-validators]

<br>

#### `preloader: ComponentType`

Set a custom **preloader**. A preloader component shows up when the widget
is being loaded.

<br>

#### `ref: widgetApiRef`

Define a reference object to address the Widget API wrapper. Use it to access
these methods: `value`, `openDialog`, `reloadInfo` and `getInput`.

1. `value()` is the alias for [`widget.value()`][uc-docs-widget-single-file-value]
2. `openDialog()` is the alias for [`widget.openDialog()`][uc-docs-widget-open-dialog]
3. `reloadIngo()` is the alias for [`widget.reloadInfo()`][uc-docs-widget-reload-info]
4. `getInput()` returns widget's input element instance.

Example:

```jsx
const Example = () => {
 const widgetApi = useRef();
 return (
   <>
     <button onClick={() => widgetApi.current.openDialog()}>
       Click me
     </button>
     <Widget ref={widgetApi} publicKey=“demopublickey” />
   </>
 );
};
```

* [Widget API reference][uc-docs-widget-js-api]
* [Example][sandbox-ref]

<br>

#### `tabsCss: string`

Optional. Define a custom CSS for tabs opened in iframes (e.g., Facebook,
Instagram, etc.). It can be a CSS string or an absolute URL to a CSS file.

```jsx
// Via URL
<Widget tabs="facebook" tabsCss="https://site.com/styles/uc.tabs.css"/>

// Via plain CSS
<Widget tabs="facebook" tabsCss=".source-facebook { background: #1877F2; }"/>
```

Note that all iframe tabs are opened via HTTPS, so linked CSS files should also
be available over HTTPS.

* [Widget styling docs][uc-docs-widget-styling]

<br>

### `Panel` component configuration

#### `value: string[] | string | JQuery.Deferred | JQuery.Deferred[]`

Set an array of [file UUID][uc-docs-files]/[group UUID][uc-docs-groups]/[CDN URL][delivery-docs]/[File Instance][uc-docs-widget-api-file-instance]/[Group Instance][uc-docs-widget-api-group-instance]
as a value.

```jsx
<Panel value={[
  '9dd2f080-cc52-442d-aa06-1d9eec7f40d1',
  'https://ucarecdn.com/fdfe4e67-f747-4993-91f5-be21d6d3c1a6/',
  '9ef9af26-7356-4428-b69c-1b920f947989~2'
]} />
```

<br>

#### `onChange: (fileInstanceList: FileInstance[]) => void`

Set a function to be called whenever **files state changes**.

* [FileInstance object description][api-refs-file-instance]
<!-- TODO: * [Example][sandbox-on-change] -->

<br>

#### `onProgress: (uploadInfoList: UploadInfo[]) => void`

Set a function to be called whenever **progress state changes**.

* [UploadInfo object description][api-refs-upload-info]
<!-- TODO: * [Example][sandbox-on-change] -->

<br>

#### `ref: panelApiRef`

Define a reference object to address the Dialog API wrapper.

[Dialog API reference][api-refs-dialog]
<!-- TODO: * [Example][sandbox-ref] -->

```typescript
interface DialogApi {
  addFiles(type: string, files: any[]): void;
  addFiles(files: Array<JQuery.Deferred<FileInfo>>): void;
  switchTab(tab: string): void;
  getFileColl(): CollectionOfPromises<FileInfo>;
  hideTab(tab: string): void;
  showTab(tab: string): void;
  isTabVisible(tab: string): boolean;
  onTabVisibility(callback: OnTabVisibilityCallback): void;
}
```

<br>

#### Those methods works exactly the same way as in `Widget` component:

* [`onTabChange`](#ontabchange-tabname-string--void)
* [`customTabs`](#customtabs-key-string-customtabconstructor)
* [`validators`](#validators-validator)
* [`preloader`](#preloader-componenttype)
* [`tabsCss`](#tabscss-string)

#### Those methods aren't supported in `Panel` component:

* [`onFileSelect`](#onfileselect-fileinfo-fileinfo--filesinfo--null--void)
* [`onDialogOpen`](#ondialogopen-dialog-dialogapi--void)
* [`onDialogClose`](#ondialogclose-objs-fileinfo--filesinfo--null--void)


### Widget configuration

Uploadcare Widget can be deeply customized to suit your UX/UI. You can define
allowed upload sources, implement file validation, and more.

All the options defined in the [widget options docs][widget-options-docs] are
also supported in the component as props (use the **camelCase** notation, you
can find it under “Object key” in the referenced article).

Use the live [Uploadcare Widget Configurator][uc-widget-configure] as a starting
point and consider checking out the docs on [widget configuration][uc-docs-widget-config].

## Security issues

If you ran into something in Uploadcare libraries that might have security
implications, please hit us up at [bugbounty@uploadcare.com][uc-email-bounty] or
Hackerone.

We’ll contact you shortly to fix and issue prior to any public disclosure.

## Feedback

We want to hear your issue reports and feature requests at
[hello@uploadcare.com][uc-email-hello].


[es6-debate]: https://gist.github.com/Rich-Harris/51e1bf24e7c093469ef7a0983bad94cb
[build-img]: https://github.com/uploadcare/react-widget/actions/workflows/checks.yml/badge.svg
[build-link]: https://github.com/uploadcare/react-widget/actions/workflows/checks.yml
[npm-img]: https://img.shields.io/npm/v/@uploadcare/react-widget.svg
[npm-link]: https://www.npmjs.com/package/@uploadcare/react-widget
[widget-options-docs]: https://uploadcare.com/docs/file_uploads/widget/options/#options?utm_source=github&utm_campaign=react-widget
[delivery-docs]: https://uploadcare.com/docs/delivery/?utm_source=github&utm_campaign=react-widget
[react-guide]: https://uploadcare.com/docs/guides/react/?utm_source=github&utm_campaign=react-widget
[custom-tabs-docs]: https://uploadcare.com/docs/api_reference/javascript/custom_tabs/?utm_source=github&utm_campaign=react-widget

[api-refs-upload-info]: https://uploadcare.com/docs/file-uploader-api/files-uploads/#upload-info
[api-refs-file-instance]: https://uploadcare.com/docs/file-uploader-api/files-uploads/#file-new-instance
[api-refs-props]: https://uploadcare.com/docs/api_reference/rest/accessing_files/#properties?utm_source=github&utm_campaign=react-widget
[api-refs-dialog]: https://uploadcare.com/docs/file_uploader_api/dialog_panel/#dialog-api?utm_source=github&utm_campaign=react-widget
[api-refs-validation]: https://uploadcare.com/docs/file_uploads/widget/moderation/?utm_source=github&utm_campaign=react-widget
[multi-type-desc]: https://github.com/uploadcare/react-widget/blob/cbcbb8772052d489c9c1003ca9f91cb857bf1120/types/index.d.ts#L317-L320

[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
[uc-widget-configure]: https://uploadcare.com/widget/configure/?utm_source=github&utm_campaign=react-widget
[uc-feature-widget]: https://uploadcare.com/features/widget/?utm_source=github&utm_campaign=react-widget
[uc-docs-widget-config]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=react-widget
[uc-docs-widget-js-api]: https://uploadcare.com/docs/api_reference/javascript/?utm_source=github&utm_campaign=react-widget
[uc-docs-widget-styling]: https://uploadcare.com/docs/file_uploader_api/tabs_styling/?utm_source=github&utm_campaign=react-widget
[uc-sign-up]: https://uploadcare.com/accounts/signup/
[uc-docs-groups]: https://uploadcare.com/docs/delivery/group_api/#groups
[uc-docs-widget-api-group-instance]: https://uploadcare.com/docs/file-uploader-api/file-groups/#new-instance
[uc-docs-widget-api-file-instance]: https://uploadcare.com/docs/file-uploader-api/files-uploads/#file-new-instance
[uc-docs-files]: https://uploadcare.com/docs/concepts/#uploads
[uc-docs-widget-single-file-value]: https://uploadcare.com/docs/file-uploader-api/widget/#single-file-value
[uc-docs-widget-open-dialog]: https://uploadcare.com/docs/file-uploader-api/widget/#widget-open-dialog
[uc-docs-widget-reload-info]: https://uploadcare.com/docs/file-uploader-api/widget/#widget-reload-info
[uc-docs-metadata]: https://uploadcare.com/docs/file-metadata/
[uc-docs-image-editor]: https://uploadcare.com/docs/uploads/image-editor/

[sandbox-simple-demo]: https://codesandbox.io/s/uploadcarereact-widget-7xpqp
[sandbox-props]: https://codesandbox.io/s/uploadcarereact-widget-props-example-oqk0v
[sandbox-on-change]: https://codesandbox.io/s/uploadcarereact-widget-onchange-example-o376j
[sandbox-on-file-select]: https://codesandbox.io/s/uploadcarereact-widget-onfileselect-example-4kwyx
[sandbox-custom-tab]: https://codesandbox.io/s/4xz0k
[sandbox-validators]: https://codesandbox.io/s/vxnjb
[sandbox-ref]: https://codesandbox.io/s/keu2y
[sandbox-gatsby]: https://codesandbox.io/s/23pqs
