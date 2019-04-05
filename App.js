/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { NetInfo, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

/** Android Datausage React Native module */
import { NativeModules } from 'react-native';

import DataUsageReport from './DataUsageReport'

const Loading = () => <ActivityIndicator size="large" color="#00ff00" />

NetInfo.getConnectionInfo().then((connectionInfo) => {
  console.log('-----------------')
  console.log(connectionInfo)
  console.log('-----------------')

  console.log(
    'Initial, type: ' +
      connectionInfo.type +
      ', effectiveType: ' +
      connectionInfo.effectiveType,
  );
});
function handleFirstConnectivityChange(connectionInfo) {
  console.log(
    'First change, type: ' +
      connectionInfo.type +
      ', effectiveType: ' +
      connectionInfo.effectiveType,
  );
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange,
  );
}
NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);


export default class App extends Component {

  state = {
    datausage: [],
    loadingVisible: true,
    loading: <Loading />
  }

  componentDidMount() {
    console.log('montei')
  }

  getDataUsageByApp = () => {
    if (NativeModules.DataUsageModule) {
      this.setState({ loading: <Loading />})
      // Get data usage of specific list of installed apps in current device
      // Example: get data usage for Facebook, YouTube, WhatsApp and Google Chrome.
      // Parameters "startDate" and "endDate" are optional (works only with Android 6.0 or later)
      NativeModules.DataUsageModule.getDataUsageByApp({
        "packages": ["com.facebook.katana", "com.google.android.youtube", "com.whatsapp", "com.android.chrome"],
        // "startDate": new Date(2019, 1, 1, 0, 0, 0, 0).getTime(), // 1495422000000 = Mon May 22 2017 00:00:00
        // "endDate": new Date().getTime()
      },
        (err, jsonArrayStr) => {
          if (!err) {
            var apps = JSON.parse(jsonArrayStr);
            console.log(apps);
            return this.setState({ datausage: apps, loading: null });
          }
        });
    }
  }

  // Botão - Uso Geral
  listDataUsageByApps = () => {
    this.setState({ loading: <Loading />})
    if (NativeModules.DataUsageModule) {
      console.log('Rodando...')
      // Get data usage of all installed apps in current device
      // Parameters "startDate" and "endDate" are optional (works only with Android 6.0 or later). Declare empty object {} for no date filter.
      NativeModules.DataUsageModule.listDataUsageByApps({
        // "startDate": new Date(2019, 1, 1, 0, 0, 0, 0).getTime(), // 1495422000000 = Mon May 22 2017 00:00:00
        // "endDate": new Date().getTime()
      },
        (err, jsonArrayStr) => {
          if (!err) {
            var apps = JSON.parse(jsonArrayStr);
            return this.setState({ datausage: apps, loading: null })
          }
          else {
            console.log('Deu ruim')
            console.log(err)
          }
        })
    }
  }

  requestPermissions = () => {
    if (NativeModules.DataUsageModule) {
      // Check if app has permission to access data usage by apps
      // This way will not ask for permissions (check only)
      // If you pass "requestPermission": "true", then app will ask for permissions.
      NativeModules.DataUsageModule.requestPermissions({ "requestPermission": "false" }, (err, result) => {
        var permissionObj = JSON.parse(result);
        if (!permissionObj.permissions) {
          Alert.alert('Give Permission',
            'You need to enable data usage access for this app. Please, enable it on the next screen.',
            [
              { text: 'Cancel', style: 'cancel', onPress: () => Actions.pop() },
              { text: 'Give permission', onPress: () => this.requestPermissions() }
            ],
            { cancelable: false });
        }
      });
    }
  }

  // Exibo o consumo de alguns apps ao iniciar o aplicativo como exemplo
  async componentDidMount() {
    await this.getDataUsageByApp()
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.titulo}>Demonstração do Módulo de Uso de Dados no Android para React Native</Text>

        <View style={styles.containerBotoes}>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => this.getDataUsageByApp()}>
            <Text style={styles.textoBotao}>Uso de Alguns Apps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao2}
            onPress={() => this.listDataUsageByApps()}>
            <Text style={styles.textoBotao}>Uso Geral</Text>
          </TouchableOpacity>

        </View>

        <View>
          {this.state.loading}
        </View>

        <FlatList
          style={styles.scrollView}
          data={this.state.datausage}
          keyExtractor={app => app.packageName}
          renderItem={({ item }) => <DataUsageReport app={item}></DataUsageReport>}>
        </FlatList>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerBotoes: {
    flexDirection: 'row',
  },
  scrollView: {
    marginTop: 16,
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  botao: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 100,
  },
  botao2: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
