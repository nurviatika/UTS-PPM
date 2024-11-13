import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { updateTodo, getTodoById } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EditTodoScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const response = await getTodoById(id);
    setTitle(response.data.title);
    setDescription(response.data.description);
    setDate(response.data.date);
  };

  const handleUpdateTodo = async () => {
    await updateTodo(id, { title, description, date });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Icon and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Todo</Text>
      </View>

      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#FFFFFF"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]} 
        placeholder="Description"
        placeholderTextColor="#FFFFFF"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={5} 
      />
      <TextInput
        style={[styles.input, styles.dateInput]}
        placeholder="Deadline (Optional)"
        placeholderTextColor="#FFFFFF"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateTodo}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F79E89',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 200, 
    textAlignVertical: 'top',
  },
  dateInput: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#F79E89',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
