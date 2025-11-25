import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { receita } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{receita.nome}</Text>
        <Text style={styles.time}>⏱️ Tempo de Preparo: {receita.tempoDePreparo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>📝 Ingredientes:</Text>
        <Text style={styles.content}>{receita.ingredientes}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🍳 Modo de Preparo:</Text>
        <Text style={styles.content}>{receita.modoDePreparo}</Text>
      </View>

      <TouchableOpacity 
        style={styles.btnEdit} 
        onPress={() => navigation.navigate('Form', { receita: receita })}
      >
        <Text style={styles.btnEditText}>Editar esta Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50, backgroundColor: '#fff', flexGrow: 1 },
  header: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 15 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  time: { fontSize: 16, color: '#666', fontStyle: 'italic' },
  section: { marginBottom: 20 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#0d6efd', marginBottom: 8 },
  content: { fontSize: 16, color: '#444', lineHeight: 24, textAlign: 'justify' },
  btnEdit: { marginTop: 20, backgroundColor: '#ffc107', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnEditText: { fontWeight: 'bold', color: '#333', fontSize: 16 }
});