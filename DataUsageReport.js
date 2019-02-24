import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// Componente padrão para exibição do consumo de dados do módulo android-datausage do React Native
const DataUsageReport = (props) => {
  return (
    <View style={styles.container}>
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