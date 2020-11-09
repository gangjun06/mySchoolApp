import {
  createStore,
  applyMiddleware,
  Store,
  combineReducers,
  compose
} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import { reducers } from './reducer'
import AsyncStorage from '@react-native-community/async-storage'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

// @ts-ignore
const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'My School App'
  })
  .use(reactotronRedux())
  .useReactNative()
  .connect()

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  reducers,
  // @ts-ignore
  compose(reactotron.createEnhancer(), applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(saga)

export type RootState = ReturnType<typeof reducers>
