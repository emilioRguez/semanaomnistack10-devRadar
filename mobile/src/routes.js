import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// importar las paginas de app
import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(    // Routes es un componente
  createStackNavigator({
    // exportar las rutas
    Main: {
      screen: Main,  // cual componente va a ser reinderizado
      navigationOptions: {  // opciones especificas de aquella tela.
        title: 'DevRadar'
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github'
      },
    },
  }, {
    defaultNavigationOptions: {
      // aqui se aceptan todas las estilizaciones de CSS
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,   // para eliminar la opcion de back encima.
      headerStyle: {
        backgroundColor: '#7D40E7',

      },
    },
  })
);

export default Routes;


