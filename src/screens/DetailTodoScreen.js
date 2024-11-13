import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getTodoById, deleteTodo } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetailTodoScreen() {
  const [todo, setTodo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await getTodoById(id);
      setTodo(response.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
      Alert.alert("Error", "Failed to fetch the todo item");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting todo:", error);
      Alert.alert("Error", "Failed to delete the todo item");
    }
  };

  return (
    <View style={styles.container}>
      {todo && (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Detail Todo</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditTodo', { id })}>
                <Ionicons name="create" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>{todo.title}</Text>
            <Text style={styles.description}>{todo.description}</Text>

            <View style={styles.dateContainer}>
              <Ionicons name="time" size={22} color="#FFFFFF" />
              <Text style={styles.date}>Deadline {todo.date}</Text>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="trash" size={24} color="#FFFFFF" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Are you sure you want to delete this todo?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.deleteButtonModal]} onPress={() => { setModalVisible(false); handleDelete(); }}>
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F79E89',
  },
  scrollContent: {
    padding: 20,
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 13,
  },
  description: {
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d97e68',
    padding: 12,
    borderRadius: 9,
    justifyContent: 'center',
    marginTop: 20,
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    marginRight: 10,
  },
  deleteButtonModal: {
    backgroundColor: '#d97e68',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
