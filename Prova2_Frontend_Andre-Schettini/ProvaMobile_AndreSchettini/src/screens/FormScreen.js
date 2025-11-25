import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function FormScreen({ route, navigation }) {
  const receitaEditar = route.params?.receita;
  const isEdicao = !!receitaEditar;

  const [nome, setNome] = useState(receitaEditar?.nome || '');
  const [ingredientes, setIngredientes] = useState(receitaEditar?.ingredientes || '');
  const [modoDePreparo, setModoDePreparo] = useState(receitaEditar?.modoDePreparo || '');
  const [tempoDePreparo, setTempoDePreparo] = useState(receitaEditar?.tempoDePreparo || '');
  
  const [erros, setErros] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: isEdicao ? 'Editar Receita' : 'Nova Receita' });
  }, [navigation, isEdicao]);

  const handleSalvar = async () => {
    setErros({}); 
    const dados = { nome, ingredientes, modoDePreparo, tempoDePreparo };

    try {
      if (isEdicao) {
        await api.put(`/${receitaEditar.id}`, dados);
        Alert.alert("Sucesso", "Receita atualizada com sucesso!");
      } else {
        await api.post('', dados);
        Alert.alert("Sucesso", "Receita cadastrada com sucesso!");
      }
      navigation.goBack(); 
    } catch (error) {
      // Usamos console.log para não gerar pop-up de erro na tela do Expo
      console.log("Log de Erro:", error);

      if (error.response?.status === 400 && error.response?.data) {
        // AQUI ESTÁ A MUDANÇA:
        // Apenas atualizamos o estado 'erros' para pintar os campos de vermelho.
        // Removemos o Alert.alert() daqui.
        setErros(error.response.data);
      } else if (error.response?.status === 404) {
        Alert.alert("Erro", "Registro não encontrado no servidor.");
      } else {
        // Erros genéricos (ex: servidor fora do ar) ainda mostram alerta
        Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome da Receita:</Text>
      <TextInput 
        style={[styles.input, erros.nome && styles.inputError]} 
        value={nome} 
        onChangeText={setNome} 
        placeholder="Ex: Bolo de Chocolate"
      />
      {erros.nome && <Text style={styles.erroText}>{erros.nome}</Text>}

      <Text style={styles.label}>Tempo de Preparo:</Text>
      <TextInput 
        style={[styles.input, erros.tempoDePreparo && styles.inputError]} 
        value={tempoDePreparo} 
        onChangeText={setTempoDePreparo} 
        placeholder="Ex: 40 minutos"
      />
      {erros.tempoDePreparo && <Text style={styles.erroText}>{erros.tempoDePreparo}</Text>}

      <Text style={styles.label}>Ingredientes:</Text>
      <TextInput 
        style={[styles.input, styles.area, erros.ingredientes && styles.inputError]} 
        value={ingredientes} 
        onChangeText={setIngredientes} 
        multiline={true} 
        numberOfLines={4}
        placeholder="Liste os ingredientes..."
      />
      {erros.ingredientes && <Text style={styles.erroText}>{erros.ingredientes}</Text>}

      <Text style={styles.label}>Modo de Preparo:</Text>
      <TextInput 
        style={[styles.input, styles.area, erros.modoDePreparo && styles.inputError]} 
        value={modoDePreparo} 
        onChangeText={setModoDePreparo} 
        multiline={true}
        numberOfLines={6}
        placeholder="Passo a passo..."
      />
      {erros.modoDePreparo && <Text style={styles.erroText}>{erros.modoDePreparo}</Text>}

      <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
        <Text style={styles.btnText}>Salvar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50 },
  label: { marginTop: 15, fontWeight: 'bold', color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 5, fontSize: 16 },
  inputError: { borderColor: '#dc3545', borderWidth: 2 },
  area: { textAlignVertical: 'top', minHeight: 100 },
  btn: { backgroundColor: '#0d6efd', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  erroText: { color: '#dc3545', fontSize: 14, marginTop: 4, fontWeight: '500' }
});