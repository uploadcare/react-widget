import * as React from 'react';
import {FileInfo, Widget, WidgetAPI} from '@uploadcare/react-widget'
import {useRef} from 'react';

<Widget publicKey='demopublickey' />;

const fileTypeLimit = (allowedFileTypes: string) => {
  const types = allowedFileTypes.split(' ')

  return function(fileInfo: FileInfo) {
    if (fileInfo.filename === null) {
      return
    }
    const extension = fileInfo.filename.split('.').pop()

    if (extension && !types.includes(extension)) {
      throw new Error(`${extension} is not allowed to upload`)
    }
  }
}

const validators = [fileTypeLimit('mp3 avi mp4')];

<Widget
  publicKey='demopublickey'
  validators={validators} />;

<Widget
  publicKey='demopublickey'
  onChange={console.log}
  clearable />;

<Widget
  publicKey='demopublickey'
  onFileSelect={console.log}
  clearable
  multiple />;

const Preloader = () => <div />;

<Widget
  publicKey='demopublickey'
  preloader={Preloader}/>;

const widgetApi = useRef<WidgetAPI>(null);

<Widget ref={widgetApi} publicKey='demopublickey' />
