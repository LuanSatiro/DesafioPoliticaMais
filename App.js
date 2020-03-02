import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Component } from 'react';

let moedas = [2, 5, 10, 20, 50, 100];
let memo = {};
memo[0] = { val: 0, moedas: Array(moedas.length).fill(0) };
function getMin(total) {
  let best = { val: Infinity, moedas: Array(moedas.length).fill(0) };
  for (let [idx, moeda] of moedas.entries()) {
    if (total - moeda < 0) {
      continue;
    }
    if (memo[total - moeda] === undefined) {
      memo[total - moeda] = getMin(total - moeda);
    }
    if (best.val > memo[total - moeda].val + 1) {
      best = { val: memo[total - moeda].val + 1, moedas: Array(moedas.length) };
      for (let i = 0; i < moedas.length; ++i) {
        best.moedas[i] = memo[total - moeda].moedas[i];
      }
      best.moedas[idx]++;
    }
  }

  return best;
}

export default class App extends Component {
  constructor(){
    super()
    this.state = {saque:0, cem_reais:null,cinquenta_reais:null,vinte_reais:null,dez_reais:null, 
      cinco_reais:null,dois_reais:null, resultText:null}
      this.sacar = this.sacar.bind(this)
    

  }

  sacar(){
    const best = getMin(this.state.saque)
    let cem= this.state
    cem.cem_reais = best.moedas[5]
    this.setState(cem)
    let cinquenta = this.state
    cinquenta.cinquenta_reais = best.moedas[4]
    this.setState(cinquenta)
    let vinte = this.state
    vinte.vinte_reais = best.moedas[3]
    this.setState(vinte)
    let dez = this.state
    dez.dez_reais = best.moedas[2]
    this.setState(cinco)
    let cinco = this.state
    cinco.cinco_reais = best.moedas[1]
    this.setState(cinco)
    let dois = this.state
    dois.dois_reais = best.moedas[0]
    this.setState(dois)
    if(best.moedas[0] == 0 & best.moedas[1] == 0 & best.moedas[2] == 0 & best.moedas[3] == 0
      & best.moedas[4] == 0 & best.moedas[5] == 0){
          this.state.resultText = "Notas Indisponíveis para este valor de saque, por gentileza, insira outro valor"
    }else{
          this.state.resultText = ""
   }
  
    
  }


  render() {
    return (

    <View style={styles.background}>
      <View style={styles.containers1}>
        <Image style={styles.brandImage}source={require('./public/native.png')}/>
        <Text style={styles.brandText} >Banco React</Text>
      </View>
      <View style={styles.containers}>
        <Text style={styles.titleText} >Caixa eletronico virtual</Text>
        <Text style={styles.descriptionText} >Estão disponiveis para saque, notas de 100, 50, 20, 10, 5 e 2 reais</Text>
        <TextInput placeholder="Insira o valor" keyboardType="numeric" style={styles.input} onChangeText={(saque)=>{this.setState ({saque}) }} />
        <TouchableOpacity style={styles.Button} onPress={this.sacar}><Text style={styles.ButtonText} >Sacar</Text></TouchableOpacity>
        <View style={styles.notas}>
          <Text style={styles.TitleNotas} >Verifique abaixo suas notas.</Text>
          <Text style={styles.Cem} >{this.state.cem_reais} nota(s) de cem</Text>
          <Text style={styles.Cinquenta} >{this.state.cinquenta_reais} nota(s) de cinquenta</Text>
          <Text style={styles.Vinte} >{this.state.vinte_reais} nota(s) de vinte</Text>
          <Text style={styles.Dez} >{this.state.dez_reais} nota(s) de dez</Text>
          <Text style={styles.Cinco} >{this.state.cinco_reais} nota(s) de cinco</Text>
          <Text style={styles.Dois} >{this.state.dois_reais} nota(s) de dois</Text>
        </View>
          <Text style={styles.ResultText} >{this.state.resultText} </Text>
      </View>
    </View>

    );
  }
};

const styles = StyleSheet.create({
  ResultText:{
      fontSize:20,
      textAlign:'center',
      width:'85%',
  },
   TitleNotas:{
      alignItems:'center',
      textAlign:'center',

   },
  
    notas:{
      marginTop:'5%',
      flexDirection:'column',
      
    },
    background:{
     
      height:'100%',
      width:'100%',
    },
    containers1:{
      flexDirection:'row',

      backgroundColor:'#D3DDFB',
      width:'100%',
      height:'10%',
    },

    containers:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#D3DDFB',
      width:'80%',
      marginTop:'30%',
      marginLeft:'10%',
    },
    input:{
      height:40,
      textAlign:'center',
      width:'50%',
      fontSize:20,
      backgroundColor:'#FFFFFF',
      marginBottom:'5%',
      marginTop:'5%',
    },
    Button:{
      backgroundColor:'#87A4FA',
      textAlign:'center',
      width:'50%',
      height:'10%',

    },   
    ButtonText:{
      textAlign:'center',
      marginTop:'5%',
    },
    titleText:{
      textAlign:'center',
      marginTop:'50%',
      fontSize:30,
    },
    descriptionText:{
      textAlign:'center',
      width:'70%',
    
    },
    brandImage:{
    
      marginTop:'5%',
      marginLeft:'5%',
      width:'10%',
      height:'50%',
    },
    brandText:{
      flex:1,
      marginTop:'6%',
      width:'70%',
      fontSize:20,
      marginLeft:'20%',
    
    },

});

