import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Object.defineProperty(window.localStorage, 'clear', jest.fn())
// Object.defineProperty(window.location, 'reload', jest.fn())

configure({ adapter: new Adapter() })
window.localStorage.clear = jest.fn()
window.location.reload = jest.fn()
window.localStorage.getItem = jest.fn(() => false)
