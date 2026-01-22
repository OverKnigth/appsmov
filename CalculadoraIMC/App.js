import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [estatura, setestatura] = useState("");
  const [peso, setpeso] = useState("");
  const [imc, setimc] = useState("");
  const [resultImc, setresultImc] = useState("");
  const [resultado, setresultado] = useState("");
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CALCULADORA IMC</Text>
      <Text>Estatura: </Text>
      <TextInput style={styles.input} placeholder='Ingresa tu estatura en Centimetros'
      onChangeText={(txt) => {
        let est = parseInt(txt) / 100;
        setestatura(est);
      }}
      />
      <Text>Peso: </Text>
      <TextInput style={styles.input} placeholder='Ingresa tu peso en Kilogramos'
      onChangeText={(txt) => {
        let ps = parseInt(txt);
        setpeso(ps);
      }}
      />
      <Button title='Calcular' onPress={() => {
        let calculo = peso / (estatura*estatura);
        setimc(calculo.toFixed(2));
        setresultImc("Su IMC es: " + imc);
        if(imc < 18.5){
          setresultado("Su peso es inferior al normal");
        } 
        if(imc >= 18.5 && imc < 25.0){
          setresultado("Su peso es normal");
        } else if(imc >= 25.0 && imc < 30.0){
          setresultado("Su peso es superior al normal");
        } else if(imc >= 30.0){
          setresultado("Tiene obesidad");
        }
      }}/>
      <Text>{resultImc}</Text>
      <Text>{resultado}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10
  },
  input:{
    borderWidth: 1,
    padding: 10,
    marginVertical: 10
  },
  title:{
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});
