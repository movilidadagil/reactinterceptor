import React from 'react'
import server from './server/'

const STORE_REFRESH_TOKEN = 'refreshToken'
const STORE_AUTH_TOKEN = 'accessToken'

const getRefTokenFromStore = () => {
  return localStorage.getItem(STORE_REFRESH_TOKEN) || ''
}

const getAuthTokenFromStore = () => {
  return sessionStorage.getItem(STORE_AUTH_TOKEN) || ''
}

const setRefTokenInStore = (data) => {
  localStorage.setItem(STORE_REFRESH_TOKEN, data)
}

const setAuthTokenInStore = (data) => {
  sessionStorage.setItem(STORE_AUTH_TOKEN, data)
}

const deleteRefTokenFromStore = () => {
  localStorage.removeItem(STORE_REFRESH_TOKEN)
}

const deleteAuthTokenFromStore = () => {
  sessionStorage.removeItem(STORE_AUTH_TOKEN)
}

function App() {
  
  const [status, setStatus] = React.useState('')
  const [authToken, setAuthToken] = React.useState(getAuthTokenFromStore())
  const [refToken, setRefToken] = React.useState(getRefTokenFromStore())

  React.useEffect(() => {
    
    document.title = `${process.env.REACT_APP_NAME} v${process.env.REACT_APP_VERSION}`
    
    setStatus('Ready')

  }, [])
  
  const deleteToken = () => {

    setAuthToken('')
    
    deleteAuthTokenFromStore()

    setStatus('Delete AuthToken')

  }

  const clearTokens = () => {

    setAuthToken('')
    setRefToken('')
    
    deleteAuthTokenFromStore()
    deleteRefTokenFromStore()
    
    setStatus('Clear All Tokens')

  }

  const logoutUser = () => {
    server.logout(authToken).then(response => {
      console.log(response)

    }).then(response => {
     
      localStorage.clear()
      setStatus('Logout successful')
    }).catch(error => {

      setStatus('Logout failed ' + JSON.stringify(error))

    })
  }
  const loginUser = () => {

    setStatus('Signing in...')
    
    server.login({
      username: '',
      password: '',
      phonenumber:''
    }).then(response => {

      console.log(response.data)

      const {refreshToken, accessToken} = response.data

      setRefToken(refreshToken)
      setAuthToken(accessToken)

      setRefTokenInStore(refreshToken)
      setAuthTokenInStore(accessToken)

      setStatus('Login successful')

    }).catch(error => {

      setStatus('Login failed ' + JSON.stringify(error))

    })

  }

  const refreshToken = () => {

    setStatus('Refreshing tokens...')
    
    server.refresh({
      refreshToken: refreshToken,
    }).then(response => {

      const {refreshToken, accessToken} = response.data

      setRefToken(refreshToken)
      setAuthToken(accessToken)

      setRefTokenInStore(refreshToken)
      setAuthTokenInStore(accessToken)

      setStatus('Refresh successful')

    }).catch(error => {

      setStatus('Refresh failed ' + JSON.stringify(error))

    })

  }

  const getData = () => {
    
    setStatus("Get data...")

    server.getData({ token: authToken }).then(response => {

      const refreshToken = getRefTokenFromStore()
      const accessToken = getAuthTokenFromStore()

      setRefToken(refreshToken)
      setAuthToken(accessToken)

      setStatus("GetData result: " + JSON.stringify(response.data))

    }).catch(error => {

      const refreshToken = getRefTokenFromStore()
      const accessToken = getAuthTokenFromStore()

      setRefToken(refreshToken)
      setAuthToken(accessToken)

      setStatus("GetData failed " + JSON.stringify(error))

    })

  }
  
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Axios Intercept Sample</h4>
      <div style={styles.panel}>
        <button onClick={loginUser} style={styles.button}>Login</button>
        <button onClick={logoutUser} style={styles.button}>Logout</button>
        <button onClick={refreshToken} style={styles.button}>Refresh</button>
        <button onClick={getData} style={styles.button}>Get Data</button>
        <button onClick={deleteToken} style={styles.button}>Delete Token</button>
        <button onClick={clearTokens} style={styles.button}>Clear All Tokens</button>
        <button onClick={() => setStatus('')} style={styles.button}>Clear Result</button>
      </div>
      <div style={styles.panel}>
        <h4 style={styles.title}>Session Variables</h4>
        <p>
          RefreshToken: <span style={styles.hilite}>{ refToken }</span><br />
          AuthToken: <span style={styles.hilite}>{ authToken }</span>
        </p>
      </div>
      <div style={styles.panel}>
        <h4 style={styles.title}>Result</h4>
        <p>
          { status }
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 15,
  },
  button: {
    display: 'inline-block',
    border: 0,
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  panel: {
    marginBottom: 15,
    paddingTop: 15,
  },
  title: {
    borderBottom: '1px dotted #999',
    fontSize: '1.4em',
    marginBottom: 8,
    paddingBottom: 2,
    display: 'inline-block',
  },
  hilite: {
    color: 'magenta'
  }
}

export default App;
