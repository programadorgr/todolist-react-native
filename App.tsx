import React, {Fragment, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Task from './components/Tasks';

function App(): React.JSX.Element {
  const [task, setTask] = useState('');
  const [taskItems, settaskItems] = useState([]);
  
  const handleAddTask = () => {
    Keyboard.dismiss();
    settaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    settaskItems(itemsCopy);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksContainer}>
        <View>
          <Text style={styles.titleContainer}>📋 Today's tasks</Text>

          <View style={styles.item}>
            {taskItems.map((item, index) => {
              return (
                <Fragment key={index}>
                {
                  taskItems?.length ? <TouchableOpacity key={index} onPress={() => completeTask(index)}><Task key={index} text={item} /></TouchableOpacity> : null
                }
                </Fragment>
              )
            })}
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChange={event => setTask(event.nativeEvent.text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addContainer}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#E8EAED',
    backgroundColor: '#EEEEE0',
  },
  tasksContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  titleContainer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 30,
  },
  writeTaskContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 280,
  },
  addContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
