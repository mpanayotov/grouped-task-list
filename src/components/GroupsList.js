import React, { Component } from 'react';
import Arrow from '../assets/images/Group.svg';

class GroupsList extends Component {
  render() {
    return (
      <div className='col-md-4'>
        <h3> Things To Do </h3>
        <div>
          {Object.keys(this.props.groups).map(groupName =>
            <div key={groupName} onClick={() => {this.props.history.push(`/${groupName}`)}}
                 className="pl-0 rounded-0 border-left-0 border-right-0 list-group-item list-group-item-action flex-column align-items-start">
              <div className="container d-flex h-100">
                <div className="align-self-center">
                  <img src={Arrow} alt=''/>
                </div>
                <div className='ml-3'>
                  <div>
                    <h5>Task Group: {groupName}</h5>
                  </div>
                  <div>
                    {this.props.groups[groupName].filter(task => task.completedAt).length} OF {this.props.groups[groupName].length} TASKS COMPLETE
                  </div> 
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GroupsList;
