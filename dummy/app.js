import React from 'react'
import { createRoot } from 'react-dom/client'

import DynamicLocales from './dynamic-locales'
import Callbacks from './dialog-callbacks'
import Panel from './default-panel'
import WidgetWithEffects from './widget-with-effects'
import PanelWithEffects from './panel-with-effects'
import PanelMetadata from './panel-metadata'
import WidgetMetadata from './widget-metadata'
import Crop from './crop'

const Example = ({ text, component: Component }) => (
  <div>
    <h2>{text}</h2>

    <br />
    <br />

    <Component />

    <hr />
  </div>
)

const examples = [
  {
    text: 'Dynamic locales',
    component: DynamicLocales
  },
  {
    text: 'New callbacks',
    component: Callbacks
  },
  {
    text: 'default panel example',
    component: Panel
  },
  {
    text: 'crop',
    component: Crop
  },
  {
    text: 'Widget with effects',
    component: WidgetWithEffects
  },
  {
    text: 'Panel with effects',
    component: PanelWithEffects
  },
  {
    text: 'Panel with metadata',
    component: PanelMetadata
  },
  {
    text: 'Widget with metadata',
    component: WidgetMetadata
  }
]

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {examples.map((props, key) => (
      <Example key={key} {...props} />
    ))}
  </React.StrictMode>
)
