import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SummaryRightPane from './SummaryRightPane.jsx';
import getComment from '../../util/getComment.js';
import TotalClicksRow from './TotalClicksRow.jsx';

class TotalClicksTable extends Component {
  constructor () {
    super();
    this.state = {
      showUserSummary: null,
      comment: ''
    };
  }

  displayUserSummary (id) {
    // show user's summary
    if (!this.state.showUserSummary || this.state.showUserSummary !== id) {
      this.setState({showUserSummary: id});
      this.upDateComment(id);
    } else {
      // if the selected user was selected again, close user's summary
      this.setState({showUserSummary: null});
    }
  }

  upDateComment (id) {
    getComment(this.props.summary.lecture[0].id, id, (data) => {
      const comment = data[0].comment;
      this.setState({comment: comment});
    });
  }

  render () {
    // pull out the users from the store and filter by audience
    let usersClicks;
    if (this.props.summary.users) {
      usersClicks = this.props.summary.users.filter(user => user.role === 'audience');
      return (
        <div className='col-md-5'>
          <div className='table-responsive audience-table '>
            <table className="usersClicks table">
            <tbody>
              <tr>
                <th>Audience</th>
                <th>Clicks</th>
              </tr>
              {
                usersClicks.map(user =>
                <TotalClicksRow
                  key={Math.random()}
                  userId={user.user_id}
                  displayUserSummary={this.displayUserSummary.bind(this)}
                  avatar={user.avatar}
                  name={user.name}
                  noOfClicks={user.no_of_clicks}
                />
                )
              }
            </tbody>
            </table>
          </div>
          {
            this.state.showUserSummary
            ? <SummaryRightPane
              userId={this.state.showUserSummary}
              comment = {this.state.comment}
              displayUserSummary={this.displayUserSummary.bind(this)}
              upDateComment = {this.upDateComment.bind(this)}
            /> : null
          }
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStatetoProps = ({ summary }) => {
  return {
    summary
  };
};

export default connect(mapStatetoProps)(TotalClicksTable);
