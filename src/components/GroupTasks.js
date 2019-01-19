import React, { Component } from 'react';
import Completed from '../assets/images/Completed.svg';
import Incomplete from '../assets/images/Incomplete.svg';
import Locked from '../assets/images/Locked.svg';

class GroupTasks extends Component {
  constructor(props){
    super();
    this.state = {
      tasks: props.groups[props.match.params.name]
    };
  }

  render() {
    if(this.state.tasks) {
      let allTasks = Object.values(this.props.groups).flat();
      return (
        <div className='col-md-4'>
          <div className='row'>
            <div className='col-md-6'>
              <h3>{this.props.match.params.name}</h3>
            </div>
            <div className='col-md-6 text-right'>
              <span className='all-groups' onClick={() => {this.props.history.push('/')}}>ALL GROUPS</span>
            </div>
          </div>
        <div>
          {this.state.tasks.map(task => {
            let isLocked = task.completedAt ? false : allTasks.filter(t => task.dependencyIds.includes(t.id) && !t.completedAt).length > 0;
            return (
              <div key={task.id} id={task.id} onClick={this.completeTask.bind(this, isLocked)}
                   className="pl-0 rounded-0 border-left-0 border-right-0 list-group-item list-group-item-action flex-column align-items-start" >
                <div className="container d-flex h-100">
                  <div className="align-self-center text-center img-selector" >
                    {isLocked ? <img src={Locked} alt='' /> : <img src={task.completedAt ? Completed : Incomplete} alt='' />}
                  </div>
                  <div className='ml-3'>{task.task}</div>
                </div>
              </div>
            )}
          )}
        </div>
      </div>
      );
    } else {
      return (<p> Group '{this.props.match.params.name}' does not exist </p>);
    }
  }

  completeTask(isLocked, e) {
    if(isLocked) return;

    let task = this.state.tasks.find(t => t.id === parseInt(e.currentTarget.id))
    // where we would call the api to update our task in db
    task.completedAt = task.completedAt ? null : (new Date()).toUTCString();
    this.setState({tasks: this.state.tasks});
  }
}

export default GroupTasks;
