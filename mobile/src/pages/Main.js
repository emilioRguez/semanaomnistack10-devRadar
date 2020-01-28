import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'; // no necisito poner llaves porque es la exportacion patron del paquete
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';  // primero para pedir pemiso al usuario para acceder a su locilizacion y el segundo para acceder a la localizacion.
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect } from '../services/socket';


// la primera llave es para decir que es codigo JS y la segundo porque estoy importando un objeto

function Main({ navigation }) {   // Nosso componente
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState(''); // estado para almacenar los inputs

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,  // para utilizar el gps del celular si esta habilitado
        });
        const { latitude, longitude } =  coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  });

  function handleRegionChanged(region) {   // funcion q va a actualizar currentRegion cuando nos movamos por el mapa.
    console.log(region);
    setCurrentRegion(region);
  }

  // function setupWebsocket() {
  //   connect();
  // }

  async function loadDevs() {  // haacer una busqueda
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      }
    });

    setDevs(response.data.devs);
    setupWebsocket();
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView 
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion} 
        style={style.map}
      > 
        {devs.map(dev => (
          <Marker 
            key={dev._id}  // siempre tiene q estar en el primer elemento despues del map
            coordinate={{
              latitude: dev.location.coordinates[1], 
              longitude: dev.location.coordinates[0]
            }}
          >
            <Image 
              style={style.image} 
              source={{uri: dev.avatar_url}} 
            />

            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: dev.github_username });
            }}>
              <View style={style.callout}>
                <Text style={style.devName}>{dev.name}</Text>
                <Text style={style.devBio}>{dev.bio}</Text>
                <Text style={style.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
        </Marker>
      ))}      
    </MapView>

    <View style={style.searchForm}>
      <TextInput 
        style={style.searchInput} 
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words" // va a colocar la primera letra de cada palabra como mayuscula
        autoCorrect={false}
        value={techs}
        onChangeText={setTechs} // {text => setTechs(text)}
      />

      <TouchableOpacity onPress={loadDevs} style={style.loadButton}>
        <MaterialIcons name="my-location" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
    </>    
  );
}   

const style = StyleSheet.create({
  map: {
    flex: 1,    
  },

  image: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute', // para que flote por encima
    // bottom: 20,
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,  // solo para forzar que este encima del mapa
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,    // para dar el efecto redondeado
    paddingHorizontal: 20,
    fontSize: 16,
    // efecto de sombras
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,

  },
  //hacer que se mueva el text input hacia arriba cuando salga el teclado, importando Keyboard de react native.
  loadButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8e4dff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});

export default Main;