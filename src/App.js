import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import history from './_helpers/history'
import 'antd/dist/antd.css';
import 'react-table-v6/react-table.css'

function App() {
  return (
    <Router history={history} >
    <Switch>
      {routes.map(
        (route, index) => (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            component={route.layout(route.component)} />
        )
      )}
      
      {/* <Redirect from="/" to="/" /> */}
    </Switch>
  </Router>
  );
}

export default App;
