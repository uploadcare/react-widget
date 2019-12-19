import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Widget, CustomTabConstructor, FileInfo, WidgetAPI } from '@uploadcare/react-widget';

<Widget publicKey='demopublickey' />;

<Widget
  publicKey='demopublickey'
  locale='de' />;

<Widget
  publicKey='demopublickey'
  crop='disabled' />;

<Widget
  publicKey='demopublickey'
  crop='200x300' />;

const fileTypeLimit = (allowedFileTypes: string) => {
  const types = allowedFileTypes.split(' ');

  return (fileInfo: FileInfo) => {
    if (fileInfo.name === null) {
      return;
    }
    const extension = fileInfo.name.split('.').pop();

    if (extension && !types.includes(extension)) {
      throw new Error(`${extension} is not allowed to upload`);
    }
  };
};

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

const widgetApi = React.useRef<WidgetAPI>(null);

<Widget ref={widgetApi} publicKey='demopublickey' />;

const TabButtonIcon = ({ node, children }: { node: Element, children: React.ReactElement }): React.ReactPortal => {
  return ReactDOM.createPortal(
    <svg style={{ display: "none" }}>{children}</svg>,
    node
  );
};

const UnsplashCreator: CustomTabConstructor = (
  container,
  button,
  dialog,
  settings,
  name,
  uploadcare
) => {
  const buttonNode = button[0];

  buttonNode.title = "Unsplash";

  ReactDOM.render(
    <>
      <TabButtonIcon node={buttonNode}>
        <symbol
          id={`uploadcare--icon-unsplash`}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
          />
        </symbol>
      </TabButtonIcon>
      <div>
        Random photo from unsplash:
        <br />
        <button
          onClick={() =>
            dialog.addFiles([
              uploadcare.fileFrom(
                "url",
                "https://source.unsplash.com/random/800x600/",
                settings
              )
            ])
          }
        >
          {"Load ✨"}
        </button>
      </div>
    </>,
    container[0]
  );
};

<Widget
  previewStep
  publicKey="demopublickey"
  tabs="file unsplash"
  customTabs={{ unsplash: UnsplashCreator }}
/>;
