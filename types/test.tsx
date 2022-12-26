import { CustomTabConstructor, FileInfo, Panel, PanelAPI, Widget, WidgetAPI } from '@uploadcare/react-widget';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

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

<Widget
  publicKey='demopublickey'
  crop='200x300'
  effects='blur,sharp' />;

<Widget
  publicKey='demopublickey'
  crop='200x300'
  effects={['blur', 'sharp']} />;

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
  onChange={e => {
    e.uuid;
    e.cdnUrl;
    e.isStored;
  }}
  clearable />;

<Widget
  publicKey='demopublickey'
  onFileSelect={e => {
    // @ts-expect-error
    e.error;

    if (e) {
      'files' in e && e.files()[0].done(console.log);
      e.promise().always(console.log);
    }
  }}
  clearable
  multiple />;

const Preloader = () => <div />;

<Widget
  publicKey='demopublickey'
  // @ts-expect-error
  preloader={Preloader}/>;

<Widget
  publicKey='demopublickey'
  preloader={<Preloader />}/>;

<Widget
  publicKey='demopublickey'
  preloader='Hello world'/>;

<Widget
  publicKey='demopublickey'
  preloader={null}/>;

const widgetApi = React.useRef<WidgetAPI>(null);

<Widget ref={widgetApi} publicKey='demopublickey' />;

const TabButtonIcon = ({ node, children }: { node: Element, children: React.ReactElement }): React.ReactPortal => {
  return createPortal(
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
  const root = createRoot(container[0]);
  root.render(
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
          onClick={() => {
            dialog.addFiles([
              uploadcare.fileFrom(
                "url",
                "https://source.unsplash.com/random/800x600/",
                settings
              )
            ]);

            dialog.addFiles('object', [new Blob(['test'])]);
          }
          }
        >
          {"Load ✨"}
        </button>
      </div>
    </>
  );
};

<Widget
  previewStep
  publicKey="demopublickey"
  tabs="file unsplash"
  customTabs={{ unsplash: UnsplashCreator }}
/>;

<Widget
  publicKey='demopublickey'
  tabs="facebook"
  tabsCss=".source-facebook { background: #1877F2; }"
/>;

<Widget
  publicKey="demopublickey"
  onDialogOpen={dialog => {
    dialog.switchTab("dinamic");
  }}
  onDialogClose={e => {
    // @ts-expect-error
    e.error;

    if (e) {
      'files' in e && e.files()[0].done(console.log);
      e.promise().always(console.log);
    }
  }}
  onTabChange={tab => console.log(tab)}
/>;

const panelApi = React.useRef<PanelAPI>(null);

<Panel
  ref={panelApi}
  publicKey="demopublickey"
  onTabChange={tab => console.log(tab)}
  tabs="facebook"
  tabsCss=".source-facebook { background: #1877F2; }"
  customTabs={{ unsplash: UnsplashCreator }}
  validators={validators}
  crop='200x300'
  onChange={(files) => {
    Promise.allSettled(files).then((results) =>
      console.log('onChange', results)
    );
  }}
  metadata={{ foo: 'bar' }}
  metadataCallback={() => ({ foo: 'bar' })}
/>;
