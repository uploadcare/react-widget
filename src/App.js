import React from 'react'
import Uploader from './components/Uploader'

const App = () => (
  <div>
    <h1>Try Uploadcare</h1>
    <p>
      <label htmlFor='file'>Your file:</label>
      <Uploader id='file' name='file' onChange={(value) => console.log('value: ', value)} />
    </p>
    <p>
      <label htmlFor='images'>Your images:</label>
      <Uploader id='images' name='file' data-images-only data-multiple data-crop='free' />
    </p>
  </div>
)

export default App
