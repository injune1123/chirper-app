import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { handleInitialData } from '../actions/shared';

import Dashboard from './Dashboard';
import TweetPage from './TweetPage';
import NewTweet from './NewTweet';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router>
        <div>
          <LoadingBar/>
          <Nav/>
          {this.props.loading === true?
          null:
            <div>
              <Route path='/' exact component={Dashboard}/>
              <Route path='/tweet/:id' component={TweetPage}/>
              <Route path='/new' component={NewTweet}/>
            </div>

        }
        </div>
      </Router>
    )
  };
}

function mapStateToProps ({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
