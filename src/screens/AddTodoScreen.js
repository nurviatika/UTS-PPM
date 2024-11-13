import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addTodo } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddTodoScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigation = useNavigation();

  const handleAddTodo = async () => {
    await addTodo({
      title,
      description,
      status: 'in-progress',
      date,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Todo</Text>
      </View>

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
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline (Optional)"
        placeholderTextColor="#FFFFFF"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
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
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
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
