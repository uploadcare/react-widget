import React from 'react'
import ToggleMounting from './components/ToggleMounting'
import Uploader from './components/Uploader'
import UploaderPanel from './components/UploaderPanel'

const App = () => (
  <React.Fragment>
    <h1>Demo of Uploadcare Widget in React app</h1>
    <ToggleMounting title='Demo'>
      <p>
        <label htmlFor='file'>Your file:</label>{' '}
        <Uploader
          id='file'
          name='file'
          onChange={(file) => {
            console.log('File changed: ', file)

            if (file) {
              file.progress(info => console.log('File progress: ', info.progress))
              file.done(info => console.log('File uploaded: ', info))
            }
          }}
          onUploadComplete={info => console.log('Upload completed:', info)} />
      </p>
      <p>
        <label htmlFor='file'>With a custom tab:</label>{' '}
        <Uploader
          id='file'
          name='file'
          data-tabs='file url favorite'
          onChange={(file) => {
            console.log('File changed: ', file)

            if (file) {
              file.progress(info => console.log('File progress: ', info.progress))
              file.done(info => console.log('File uploaded: ', info))
            }
          }}
          onUploadComplete={info => console.log('Upload completed:', info)} />
      </p>
      <p>
        <label htmlFor='images'>Your images:</label>{' '}
        <Uploader
          id='images'
          name='images'
          data-images-only
          data-multiple />
      </p>
      <p>
        <label htmlFor='images'>Predefined image:</label>{' '}
        <Uploader
          id='image'
          name='image'
          value='https://ucarecdn.com/e7e46bb5-685b-45bf-abc6-1dfbcfb10fec/example.jpg'
          data-images-only />
      </p>
      <hr />
      <div>
        <h2>Embedded panel</h2>
        <p>
          Learn more about panel
          in our <a href='https://uploadcare.com/docs/api_reference/javascript/dialog_panel/#open-panel'>docs</a>
        </p>
        <div style={{maxWidth: '800px'}}>
          <UploaderPanel
            tab='url'
            settings={{multiple: true}}
            onOpen={panel => console.log('Panel opened', panel)}
            onDone={files => {
              console.log('Files choosed', files)

              files.map(file => {
                console.log('File changed: ', file)

                if (file) {
                  file.progress(info => console.log('File progress: ', info.progress))
                  file.done(info => console.log('File uploaded: ', info))
                }
              })
            }} />
        </div>
      </div>
    </ToggleMounting>
  </React.Fragment>
)

export default App
