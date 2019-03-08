import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

// Componente padrão para exibição do consumo de dados do módulo android-datausage do React Native
const DataUsageReport = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ resizeMode: 'contain', flex: 1, width: 50, height: 50 }} source={{ uri: `data:image/jpeg;base64,` + props.app.icon }} />
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>Nome do App: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.name}</Text>
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>Nome do Pacote: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.packageName}</Text>
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>Bytes recebidos: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.rx}</Text>
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>Bytes transmitidos: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.tx}</Text>
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>MB recebidos: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.rxMb}</Text>
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>MB transmitidos: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.txMb}</Text>
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>Total: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.total}</Text>
      </View>
      <View style={styles.linhaDemonstracao}>
        <Text style={styles.labelDemonstracao}>Total MB: </Text>
        <Text style={styles.dadosDemonstracao}>{props.app.totalMb}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    marginBottom: 16,
  },
  linhaDemonstracao: {
    flexDirection: 'row',
  },
  labelDemonstracao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dadosDemonstracao: {
    fontSize: 16,
  }
});

export default DataUsageReport