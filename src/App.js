import './firebase.js';
import "./App.css"
import * as React from 'react';
import LoginScreen from './screens/login-screen/LoginScreen';
import Home from './screens/home/Home';


function App() {

  const [user, setUser] = React.useState(null);
  
  React.useEffect(()=>{
    setUser(sessionStorage.getItem('uid'))
  },[])

  return (
    <div className='App'>
      {
        (user)?
          <Home />
        :
          <LoginScreen />
      }
    </div>
  );
}

export default App;
