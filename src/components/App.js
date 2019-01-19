import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GroupsList from './GroupsList';
import GroupTasks from './GroupTasks';
import { tasks } from '../tasks';
import '../assets/css/App.css';

class App extends Component {
  constructor(){
    super();
    this.state = { groups: this.groupTasksByGroupName(tasks) };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={props => <GroupsList {...props} groups={this.state.groups} />} />
          <Route path='/:name' render={props => <GroupTasks {...props} groups={this.state.groups} />} />
        </Switch>
      </BrowserRouter>
    );
  }

  groupTasksByGroupName(tasks) {
    let groups = {};
    let groupNames = [...new Set(tasks.map(task => task.group_name))];
  
    groupNames.forEach(group_name => {
      groups[group_name] = tasks.filter(t => t.group_name === group_name)
    });
  
    return groups;
  }
}

export default App;
