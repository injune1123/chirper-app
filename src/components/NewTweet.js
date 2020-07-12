import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',

    }
  }

  handleChange = (e) => {
    const text =  e.target.value
    this.setState(()=>({
      text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state

    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))

    this.setState(()=>({
      text: ''
    }))
  }

  render () {
    const { text } = this.state

    {/* todo: Redirect to home view if submitted*/}

    const tweetLeft = 280 - text.length
    return (
      <div>
        <h3>Compose new Tweet </h3>
        <form onSubmit = {this.handleSubmit}>
          <textarea
            placeholder="what's happening?"
            value = {text}
            onChange = {this.handleChange}
            maxLength = {280}
          />
          {tweetLeft <= 100 && (
            <div>{tweetLeft}</div>
          )}
          <button type='sumbit' disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)
