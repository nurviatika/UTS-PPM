import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getTodos } from '../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTodos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TO DO LIST</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('Filter button pressed')}
        >
          <Ionicons name="filter-outline" size={24} color="#F79E89" />
        </TouchableOpacity>
      </View>

      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>LIST OF TODO</Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            onPress={() => navigation.navigate('DetailTodo', { id: item.id })}
          >
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
            {item.date && <Text style={styles.todoDeadline}>{item.date}</Text>}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Ionicons name="add-circle" size={24} color="#FFF" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F79E89',
  },
  filterButton: {
    padding: 8,
  },
  subHeaderContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 21,
    fontWeight: '600',
    fontWeight: 'bold',
    color: '#db7d67',
    textAlign: 'center',
  },
  todoItem: {
    backgroundColor: '#F79E89',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  todoTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  todoDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  todoDeadline: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 46,
    right: 20,
    backgroundColor: '#F79E89',
    borderRadius: 60,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
