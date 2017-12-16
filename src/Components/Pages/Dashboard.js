import React, { Component } from 'react';
import UpcomingJobs from './Widgets/UpcomingJobs';
import TodoList from './Widgets/TodoList';
import Employees from './Widgets/Employees';
import PriorityList from './Widgets/PriorityList';
import Tools from './Widgets/Tools';
import Shopping from './Widgets/ShoppingWidget';
import Links from './Widgets/Links';

class Dashboard extends Component {

  render() {
    return (
    	<div className="dashboard">
       	<div className="column widget-column first-column">
       		<PriorityList url={this.props.url} />
       		<UpcomingJobs />
       		<Shopping />
       	</div>
       	<div className="column widget-column second-column">
       		<TodoList />
       		<Employees />
       	</div>
       	<div className="column widget-column third-column">
       		<Tools />
       		<Links />
       		<UpcomingJobs />
       	</div>
      </div>
    );
  }
}

export default Dashboard;
