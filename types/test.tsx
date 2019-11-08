import * as React from 'react';
import {FileInfo, Widget} from '@uploadcare/react-widget';

<Widget publicKey='demopublickey' />;

const fileTypeLimit = (allowedFileTypes: string) => {
  const types = allowedFileTypes.split(' ')

  return function(fileInfo: FileInfo) {
    if (fileInfo.filename === null) {
      return
    }
    const extension = fileInfo.filename.split('.').pop()

    if (extension && !types.includes(extension)) {
      throw new Error('fileType')
    }
  }
}

const validators = [fileTypeLimit('mp3 avi mp4')];

<Widget
  publicKey='demopublickey'
  validators={validators} />;
