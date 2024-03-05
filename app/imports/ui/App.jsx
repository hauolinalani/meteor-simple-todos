import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  });
};

const deleteTask = ({ _id }) => {
  TasksCollection.remove(_id);
};

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = hideCompleted ? { isChecked: { $ne: true } } : {};

  const tasks = useTracker(() => {
    const fetchedTasks = TasksCollection.find(hideCompletedFilter).fetch();
    // Add createdAt field to each task object
    return fetchedTasks.map(task => ({ ...task, createdAt: new Date() }));
  });

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do List
              {pendingTasksTitle}
            </h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? 'Show All' : 'Hide Completed'}
          </button>
        </div>

        <ul className="tasks">
          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};







