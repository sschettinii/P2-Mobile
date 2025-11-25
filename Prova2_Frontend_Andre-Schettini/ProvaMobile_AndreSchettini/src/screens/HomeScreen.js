import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);

  const carregarReceitas = async () => {
    setLoading(true);
    try {
      const response = await api.get('', {
        params: {
          termo: busca || '' 
        }
      });
      setReceitas(response.data);
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista. Verifique a conexão com o Backend.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    carregarReceitas();
  }, [busca]));

  const deletar = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta receita?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Excluir", 
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/${id}`);
            Alert.alert("Sucesso", "Receita removida!");
            carregarReceitas(); 
          } catch (error) {
            console.error("Erro ao deletar:", error);
            Alert.alert("Erro", "Não foi possível excluir o registro.");
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Pesquisar receita..."
        value={busca}
        onChangeText={setBusca}
      />
      
      <TouchableOpacity style={styles.btnNew} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.btnText}>+ Nova Receita</Text>
      </TouchableOpacity>

      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <FlatList
          data={receitas}
          keyExtractor={item => String(item.id)}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma receita encontrada.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('Details', { receita: item })}
              activeOpacity={0.7}
            >
              <View style={{flex: 1}}>
                <Text style={styles.titulo}>{item.nome}</Text>
                <Text style={styles.tempo}>⏱️ {item.tempoDePreparo}</Text>
              </View>
              
              <View style={styles.actions}>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Form', { receita: item })} 
                  style={styles.actionBtn}
                >
                   <Text style={{color:'blue', fontWeight:'bold'}}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => deletar(item.id)} 
                  style={styles.actionBtn}
                >
                   <Text style={{color:'red', fontWeight:'bold'}}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ccc' },
  btnNew: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  titulo: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  tempo: { color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
  actions: { flexDirection: 'column', gap: 15, borderLeftWidth: 1, borderLeftColor: '#eee', paddingLeft: 10 },
  actionBtn: { padding: 5 }
});