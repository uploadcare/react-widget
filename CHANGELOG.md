## [1.3.8](https://github.com/uploadcare/react-widget/compare/v1.3.7...v1.3.8) (2021-07-19)


### Bug Fixes

* reassign callbacks on widget reinitialization ([#268](https://github.com/uploadcare/react-widget/issues/268)) ([90ed6f2](https://github.com/uploadcare/react-widget/commit/90ed6f285d217704c69fae67e7bc1f0db78e3e5a))



## [1.3.7](https://github.com/uploadcare/react-widget/compare/v1.3.6...v1.3.7) (2021-03-31)


### Bug Fixes

* **build:** Add minified ESM builds ([#252](https://github.com/uploadcare/react-widget/issues/252)) ([c64e038](https://github.com/uploadcare/react-widget/commit/c64e038ed9e8f9088645b9da2948324bda5c1498))



## [1.3.6](https://github.com/uploadcare/react-widget/compare/v1.3.5...v1.3.6) (2021-03-31)


### Bug Fixes

* **types:** export file upload types ([#251](https://github.com/uploadcare/react-widget/issues/251)) ([dbc7a75](https://github.com/uploadcare/react-widget/commit/dbc7a757589250b7f106e86fe0a8a00324bd1eee))



## Unreleased

### Bug Fixes

* **types** Export types FileUpload and FilesUpload.
* **types** FileInfo type updated to account for null uuid and mime-type during validation callback
* **types** Fix the type of the fileColl attibute of the dialog api
* **types** Add and export the FileGroup type

## [1.3.5](https://github.com/uploadcare/react-widget/compare/v1.3.4...v1.3.5) (2021-02-26)


### Chore

* **deps:** update dependencies



## [1.3.4](https://github.com/uploadcare/react-widget/compare/v1.3.3...v1.3.4) (2021-01-20)


### Bug Fixes

* **custom-tabs:** fix using custom tabs at multiple instances ([#237](https://github.com/uploadcare/react-widget/issues/237)) ([3863f60](https://github.com/uploadcare/react-widget/commit/3863f60b2e1ea8e3b7db923cfd84f8108b27e70f))



## [1.3.3](https://github.com/uploadcare/react-widget/compare/v1.3.2...v1.3.3) (2020-11-25)


### Bug Fixes

* **types:** add crop to FileInfo ([#226](https://github.com/uploadcare/react-widget/issues/226)) ([1693eae](https://github.com/uploadcare/react-widget/commit/1693eae52dd2a9be868b35a512eb585d9aceffa5))
* **types:** fix preloader type ([#227](https://github.com/uploadcare/react-widget/issues/227)) ([23c3491](https://github.com/uploadcare/react-widget/commit/23c3491bbe671af293960d348035db307e5093a2))



## [1.3.2](https://github.com/uploadcare/react-widget/compare/v1.3.1...v1.3.2) (2020-08-27)


### Bug Fixes

* **locale:** make locale props dynamic ([#200](https://github.com/uploadcare/react-widget/issues/200)) ([28fcc09](https://github.com/uploadcare/react-widget/commit/28fcc090af7cf316967cbdbe737e5eda1afab8a4))
* **types:** improve `onFileSelect` callback typings ([#204](https://github.com/uploadcare/react-widget/issues/204)) ([c365c53](https://github.com/uploadcare/react-widget/commit/c365c53d083ea80baa69dea6e0bbe62a778b71d9))



## [1.3.1](https://github.com/uploadcare/react-widget/compare/v1.3.0...v1.3.1) (2020-08-17)


### Bug Fixes

* **uploader:** replace IE unsupported ChildNode.remove method ([#197](https://github.com/uploadcare/react-widget/issues/197)) ([6e2274c](https://github.com/uploadcare/react-widget/commit/6e2274c222a6d70ace0cb7dfe68be989fc049f41))



# [1.3.0](https://github.com/uploadcare/react-widget/compare/v1.2.7...v1.3.0) (2020-07-27)


### Features

* add onDialogClose onDialogOpen onTabChange callbacks ([#186](https://github.com/uploadcare/react-widget/issues/186)) ([6822c22](https://github.com/uploadcare/react-widget/commit/6822c2298df410169b0bbab71261784913e826e7))
* support tabsCss property ([#187](https://github.com/uploadcare/react-widget/issues/187)) ([158602b](https://github.com/uploadcare/react-widget/commit/158602b317f01bdc0bc012e1ef055cc83fef9a84))

### Bug Fixes

* **types:** add type for tabsCss prop ([#189](https://github.com/uploadcare/react-widget/issues/189)) ([3803d46](https://github.com/uploadcare/react-widget/commit/3803d46619c5030db849556d615b506fa831db56))



## [1.2.7](https://github.com/uploadcare/react-widget/compare/v1.2.6...v1.2.7) (2020-05-20)


### Bug Fixes

* use `annotate-pure-calls` instead of direct `#__pure` notations, mark module as side effect free ([#176](https://github.com/uploadcare/react-widget/issues/176)) ([2ebe6f5](https://github.com/uploadcare/react-widget/commit/2ebe6f52bf288c00f5c5e3ea6a29cb5be783081e))
* use another plugin for module replacement ([#175](https://github.com/uploadcare/react-widget/issues/175)) ([fc117e4](https://github.com/uploadcare/react-widget/commit/fc117e496a1ec9da7c8fade771c70ee2837a6a86))



## [1.2.6](https://github.com/uploadcare/react-widget/compare/v1.2.5...v1.2.6) (2020-04-29)


### Bug Fixes

* enable tree shaking with pure notation ([#164](https://github.com/uploadcare/react-widget/issues/164)) ([9b5d0da](https://github.com/uploadcare/react-widget/commit/9b5d0dab7f5741073593401eecaa7abc83717833))



## [1.2.5](https://github.com/uploadcare/react-widget/compare/v1.2.4...v1.2.5) (2020-02-19)


### Bug Fixes

* **deps:** update dependency react-fast-compare to v3 ([#139](https://github.com/uploadcare/react-widget/issues/139)) ([1186573](https://github.com/uploadcare/react-widget/commit/1186573c34bef4b57d0b47838b76df820922d586))



## [1.2.4](https://github.com/uploadcare/react-widget/compare/v1.2.3...v1.2.4) (2020-01-22)


### Bug Fixes

* **types:** allow null for `preloader` prop ([#114](https://github.com/uploadcare/react-widget/issues/114)) ([10a1517](https://github.com/uploadcare/react-widget/commit/10a151713647c36abb37f91a8fd6adff3a79dd81))



## [1.2.3](https://github.com/uploadcare/react-widget/compare/v1.2.2...v1.2.3) (2020-01-15)


### Bug Fixes

* don't prefix input name and id attributes with `data` ([#106](https://github.com/uploadcare/react-widget/issues/106)) ([ee6d2db](https://github.com/uploadcare/react-widget/commit/ee6d2db8733ddea0dfcb060f036f5d2aa7af9fbc))



## [1.2.2](https://github.com/uploadcare/react-widget/compare/v1.2.1...v1.2.2) (2020-01-09)


### Bug Fixes

* update uploadcare-widget to 3.8.2 ([#99](https://github.com/uploadcare/react-widget/issues/99)) ([88d9e83](https://github.com/uploadcare/react-widget/commit/88d9e832f804abcaecd055d4f32ee27fc9eccb91))
* **types:** add types for effects tab translations ([#96](https://github.com/uploadcare/react-widget/issues/96)) ([28ba5b7](https://github.com/uploadcare/react-widget/commit/28ba5b754abb67dec90aa78a33606d47a4f4540b))
* **types:** fix `strict-export-declare-modifiers` dtslint problem ([#92](https://github.com/uploadcare/react-widget/issues/92)) ([0d26981](https://github.com/uploadcare/react-widget/commit/0d26981180b902ef380180418488072c346584b5))



## [1.2.1](https://github.com/uploadcare/react-widget/compare/1.2.0...1.2.1) (2019-12-20)


### Bug Fixes

* **types:** add types for effects-tab ([#66](https://github.com/uploadcare/react-widget/issues/66)) ([17e04a0](https://github.com/uploadcare/react-widget/commit/17e04a09494180ee33a1f53c188055780569ab23))
* **types:** rewrite enums to regular types ([#68](https://github.com/uploadcare/react-widget/issues/68)) ([4b4cedb](https://github.com/uploadcare/react-widget/commit/4b4cedb320c44ab80b62177308de8dc933d66277))



# [1.2.0](https://github.com/uploadcare/react-widget/compare/1.0.3...1.2.0) (2019-11-21)


### Bug Fixes

* **types:** fixed path to *.d.ts files([#60](https://github.com/uploadcare/react-widget/issues/60)) ([a67f5eb](https://github.com/uploadcare/react-widget/commit/a67f5eb44a1558b76d7c7139bc39034baad62af8))


# [1.1.0](https://github.com/uploadcare/react-widget/compare/1.0.3...1.1.0) (2019-11-18)


### Features

* added type definitions for Typescript ([#55](https://github.com/uploadcare/react-widget/issues/55)) ([99aa82c](https://github.com/uploadcare/react-widget/commit/99aa82c2affa4f022bfc2f00ef0d478c96e6cd6b))

## [1.0.3](https://github.com/uploadcare/react-widget/compare/1.0.2...1.0.3) (2019-11-07)


### Features

* build locales from uploadcare-widget ([#52](https://github.com/uploadcare/react-widget/issues/52)) ([284c7a9](https://github.com/uploadcare/react-widget/commit/284c7a9dfc0febf8467b79bd3fc4c8525dadbecb))

## [1.0.2](https://github.com/uploadcare/react-widget/compare/1.0.1...1.0.2) (2019-09-25)


### Bug Fixes

* hide ssr warning about useLayoutEffect ([#46](https://github.com/uploadcare/react-widget/issues/46)) ([cfa48f9](https://github.com/uploadcare/react-widget/commit/cfa48f9))

## [1.0.1](https://github.com/uploadcare/react-widget/compare/1.0.0...1.0.1) (2019-09-20)


### Bug Fixes

* don't reiniting widget when callbacks change ([#43](https://github.com/uploadcare/react-widget/issues/43)) ([cac9960](https://github.com/uploadcare/react-widget/commit/cac9960))

# [1.0.0](https://github.com/uploadcare/react-widget/compare/1.0.0-2...1.0.0) (2019-09-10)

# [1.0.0-2](https://github.com/uploadcare/react-widget/compare/1.0.0-1...1.0.0-2) (2019-08-28)


### Features

* provide widget api with react refs ([#41](https://github.com/uploadcare/react-widget/issues/41)) ([311b6e4](https://github.com/uploadcare/react-widget/commit/311b6e4))

# [1.0.0-1](https://github.com/uploadcare/react-widget/compare/0.2.1...1.0.0-1) (2019-08-26)


### Bug Fixes

* **validators:** don’t rewrite validators with another object ([#38](https://github.com/uploadcare/react-widget/issues/38)) ([fbac259](https://github.com/uploadcare/react-widget/commit/fbac259))


### Features

* rename validator → validators ([#31](https://github.com/uploadcare/react-widget/issues/31)) ([bdfa29a](https://github.com/uploadcare/react-widget/commit/bdfa29a))


### BREAKING CHANGES

* * validator → validators

Co-Authored-By: Aleksandr Grenishin <nd0ut.me@gmail.com>

# [1.0.0-0](https://github.com/uploadcare/react-widget/compare/0.2.1...1.0.0-0) (2019-08-22)


### Features

* rename validator → validators ([#31](https://github.com/uploadcare/react-widget/issues/31)) ([bdfa29a](https://github.com/uploadcare/react-widget/commit/bdfa29a))


### BREAKING CHANGES

* * validator → validators

Co-Authored-By: Aleksandr Grenishin <nd0ut.me@gmail.com>

## [0.2.1](https://github.com/uploadcare/react-widget/compare/0.2.0...0.2.1) (2019-08-14)


### Bug Fixes

* **panel:** using function for right 'this' context in tab constructor ([#30](https://github.com/uploadcare/react-widget/issues/30)) ([91a6d20](https://github.com/uploadcare/react-widget/commit/91a6d20))

# [0.2.0](https://github.com/uploadcare/react-widget/compare/v0.2.0-0...v0.2.0) (2019-08-08)


### Bug Fixes

* add publishing files ([b974195](https://github.com/uploadcare/react-widget/commit/b974195))


### Features

* preloader prop ([#26](https://github.com/uploadcare/react-widget/issues/26)) ([8a974f2](https://github.com/uploadcare/react-widget/commit/8a974f2))

# Change Log
