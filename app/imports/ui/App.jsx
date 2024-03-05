import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';

export const App = () => {
  const tasks = useTracker(() => {
    const fetchedTasks = TasksCollection.find({}).fetch();
    // Add createdAt field to each task object
    return fetchedTasks.map(task => ({ ...task, createdAt: new Date() }));
  });

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm/>

      <ul>
        { tasks.map(task => <Task key={ task._id } task={ task }/>) }
      </ul>
    </div>
  );
};



