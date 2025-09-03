import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import WorkSpace from './components/WorkSpace'

const App = () => {
  return (
        <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path ='/workspace' element = {<WorkSpace/>}/>
         </Routes>
        </BrowserRouter>
      )
}

export default App