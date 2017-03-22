import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import store from '../store.jsx';

import LogoutButton from './LogoutButton';
import Navbar from './Navbar';
import PresThumbs from './PresThumbs';
import PulseBox from './PulseBox';
import QuestionBox from './QuestionBox';
import Slides from './Slides';
import SummaryView from './SummaryView';
import Sidebar from './Sidebar';
import TitleBar from './TitleBar';

import rd3 from 'rd3';
const LineChart = rd3.LineChart;
import timeDiffToMinutes from '../util/timeDiffToMinutes';

import $ from 'jquery';

class PresenterView extends Component {
  constructor (props) {
    super(props);
    const startTime = new Date();
    this.date = new Date();
    this.state = {
      audience: 8,
      startTime: startTime,
      lineData: [{
        values: [{x: 0, y: 0}],
        strokeWidth: 2
      }],
      domain: {
        x: [0, 10],
        y: [0, 8]
      },
      questions: {
        1: {votes: 2,
          questionText: 'This question has two upvotes.',
          upvoted: false,
          demo: true
        }
      },
      toggleTitleBox: false,
      title: 'Tutorial Presentation'
    };
    // mock pulse code
    setInterval(() => {
      if (Math.random() > 0.5 && this.state.lineData[0].values[this.state.lineData[0].values.length - 1].y !== 0) {
        const xMin = this.state.lineData[0].values.length < 10 ? 0 : this.state.lineData[0].values.length - 10;
        const xMax = this.state.lineData[0].values.length < 10 ? 10 : this.state.lineData[0].values.length;
        this.setState({
          lineData: [Object.assign(this.state.lineData[0], {
            values: this.state.lineData[0].values.concat([{x: this.state.lineData[0].values[this.state.lineData[0].values.length - 1].x + 1,
              y: this.state.lineData[0].values[this.state.lineData[0].values.length - 1].y - 1}]),
            strokeWidth: 2
          })],
          domain: {
            x: [xMin, xMax],
            y: [0, 8]
          }
        });
      } else if (this.state.lineData[0].values[this.state.lineData[0].values.length - 1].y !== 8) {
        const xMin = this.state.lineData[0].values.length < 10 ? 0 : this.state.lineData[0].values.length - 10;
        const xMax = this.state.lineData[0].values.length < 10 ? 10 : this.state.lineData[0].values.length;
        this.setState({
          lineData: [Object.assign(this.state.lineData[0], {
            values: this.state.lineData[0].values.concat([{x: this.state.lineData[0].values[this.state.lineData[0].values.length - 1].x + 1,
              y: this.state.lineData[0].values[this.state.lineData[0].values.length - 1].y + 1}]),
            strokeWidth: 2
          })],
          domain: { x: [xMin, xMax], y: [0, 8] }
        });
      }
    }, 1500);

    // end mock pulse code
  }

  componentDidMount () {
    // start clock code
    const startTime = this.state.startTime;
    let seconds = 0;
    let minutes = 0;
    function runClock () {
      const today = new Date();
      const h = today.getHours();
      let m = today.getMinutes();
      m = checkTime(m);
      seconds = checkSeconds(seconds);
      $('.clock').empty().append(`<div class="col-md-12" id="clock"><span id="hours">${h}</span>
        : <span id="minutes">${m}</span>`);
      $('.duration').empty().text(`00:${checkTime(minutes)}:${checkTime(seconds)}`);
    }
    function checkTime (i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }
    function checkSeconds (s) {
      if (++s < 60) {
        return s;
      } else {
        minutes++;
        return 0;
      }
    }
    runClock();
    this.clockInterval = setInterval(runClock, 1000);

    // handles enter key being pressed while join input field is selected
    $('#topic').keypress((e) => {
      if (e.which === 13) {
        $('#setTopic').click();
        return false;
      }
    });
    $('#questionInput').keypress((e) => {
      if (e.which === 13) {
        $('#submitQuestion').click();
        return false;
      }
    });
    $('#timerToggle').on('click', () => { $('.timer').fadeToggle(); });
    $('#pulseToggle').on('click', () => { $('#PulseBox').fadeToggle(); });
  }

  componentWillUnmount () {
    clearInterval(this.clockInterval);
    // end clock code
  }
  // Question Code
  handleQuestion () {
    this.setState({
      questions: Object.assign(this.state.questions,
        {
          [(Object.keys(this.state.questions).length + 1).toString()]: {
            votes: 0,
            questionText: $('#questionInput').val(),
            upvoted: false
          }
        })
    });
    $('#questionInput').val($(this).attr('placeholder'));
  }

  handleUpvoteDownvote (questionId) {
    this.setState({
      questions: Object.assign(this.state.questions,
        {
          [questionId]: Object.assign(this.state.questions[questionId],
            {
              upvoted: !this.state.questions[questionId].upvoted,
              votes: this.state.questions[questionId].upvoted
              ? this.state.questions[questionId].votes - 1
              : this.state.questions[questionId].votes + 1,
              questionText: this.state.questions[questionId].demo
              ? this.state.questions[questionId].upvoted
                ? 'This question has two upvotes'
                : 'You are one of three to upvote this question'
              : this.state.questions[questionId].questionText
            })
        })
    });
  }

  toggleQuestions () {
    $('#QuestionBoxPresenter').fadeToggle();
  }
  // end Question Code

  // Thumbs Code
  handleThumbsTopic () {
    const number1 = Math.ceil(Math.random() * this.state.audience);
    let number2 = Math.ceil(Math.random() * (this.state.audience - number1));
    let number3 = Math.ceil(Math.random() * (this.state.audience - number1 - number2));
    number2 = number2 >= 0 ? number2 : 0;
    number3 = number3 >= 0 ? number3 : 0;
    const numbers = [number1, number2, number3];
    const random1 = numbers[Math.round(Math.random() * 2)];
    numbers.splice(numbers.indexOf(random1), 1);
    const random2 = numbers[Math.round(Math.random())];
    numbers.splice(numbers.indexOf(random2), 1);
    const random3 = numbers[0];
    $('#topicTitle').text($('#topic').val());
    $('#topic').val($(this).attr('placeholder'));
    $('#thumbs-up').text(random1);
    $('#thumbs-down').text(random2);
    $('#thumbs-side').text(random3);
  }

  toggleThumbs () {
    $('#PresThumbs').fadeToggle();
  }
  // end Thumbs Code

  render () {
    const currTime = new Date();
    const timeDiff = timeDiffToMinutes(this.state.startTime, currTime);
    const xMin = 0;
    const xMax = 10;
    return (
      <div className='presenter-view-container'>
        <Navbar/>
        <div className = 'tutorial-view-container'>
          <div className="row">
            <div className="col-md-8">
              <div id='PulseBox' title="This is a graph of how many audience members 'do not understand' what you're saying right now.
              It will flash red if that number goes over 75% of your audience" className = "pulse-box">
                <span id="GraphTitle">Pulse
                  <hr/>
                  <LineChart
                    className = 'pulsedata-linechart'
                    data={this.state.lineData}
                    width='100%'
                    height='20%'
                    viewBoxObject={{
                      x: 0,
                      y: 0,
                      width: 1200,
                      height: 280
                    }}
                    circleRadius = {0}
                    domain={
                      this.state.domain
                    }
                    gridHorizontal={true}
                    gridVertical={true}
                  />
                </span>
              </div>

              <div id='QuestionBoxPresenter' style={{width: '45%'}}
              title="Questions are visible to you and your audience">
                <div id="QuestionBox">
                  <h2>Questions</h2>
                  <hr/>
                  <input className='form-control presenter-input'
                  key={1} type="text" id="questionInput"
                  placeholder="Try posing a question here"></input>
                  <button onClick = {this.handleQuestion.bind(this)}
                  className='btn submit-btn' key={2}
                  id="submitQuestion">Submit</button>
                  {Object.keys(this.state.questions).map((questionId, i) =>
                    (
                      <div className='question' onClick={() => this.handleUpvoteDownvote(questionId)}>
                        <div className='voteContainer'>
                          <img src={this.state.questions[questionId].upvoted ? '../img/arrows_up-green.svg' : '../img/arrows_up.svg'} className='upvoteDownvote'/>
                          <div className='questionVotes'>{this.state.questions[questionId].votes.toString()}</div>
                          </div>
                        <span className='questionText'>{this.state.questions[questionId].questionText}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div id='PresThumbs' style={{width: '45%'}}
              title="Thumbs give a broad feel for familiarity for the topic you set">
                <h2 id='topicTitle' title="">Thumbs</h2>
                <input className='form-control presenter-input'
                placeholder="try setting a thumbs topic here"
                id='topic' type='text' name='topic' />
                <button className='btn submit-btn' id='setTopic' onClick={() => this.handleThumbsTopic()}>Set Topic</button>
                <hr />
                <div className='thumbs-list'>
                  <ul>
                    <li>
                      <p id="thumbs-up">0</p>
                      <img src='../img/1-thumb.png' alt='thumbs-up'/>
                    </li>
                    <li>
                      <p id="thumbs-side">0</p>
                      <img src='../img/2-thumb.png' alt='thumbs-side'/>
                    </li>
                    <li>
                      <p id="thumbs-down">0</p>
                      <img src='../img/3-thumb.png' alt='thumbs-down'/>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="col-md-4" style={{'paddingRight': '3vw'}}>

              <div id="Sidebar" style={{'marginTop': '2vh'}}>
                <div>
                  <div className='lecture-title'>
                    <h1><span>{this.state.newTitle || 'Tutorial Presentation'} </span>
                    </h1>
                  </div>
                  <hr/>
                  <div className='sidebar-header'>
                    <h2>SHARE CODE</h2>
                    <p title="Your audience will use this code to join your lecture">6ChAr$</p>
                  </div>
                  <hr/>
                  <div className='timer'>
                    <div className='clock'></div>
                    <div className='sidebar-header'>
                      <h2>DURATION</h2>
                      <p className="duration"></p>
                    </div>
                    <hr/>
                  </div>
                </div>

                <div className='row tools-row allow-guest'>
                  <span title="Permit unauthenticated users to view your lecture">Permit Guests<input type="checkbox" id='guestsToggle'></input></span>
                </div>

                <hr/>

                <div className='row tools-row '>
                  <div className='offset-md-1'>
                    <a target="_blank" href="https://docs.google.com/a/hackreactor.com/presentation/d/1gOaqBF6E_391ooiVkc5u83KIzYzz7l1mrLqtRXjWIvg/present"><button title="open up a separate tab with your slide deck"className='btn tool-btn btn'><span>Projector</span><i className="fa fa-desktop"></i></button></a>
                    <button id='timerToggle' title="show/hide the timer and clock" className='tool-btn btn'><span>Timer</span><i className="fa fa-clock-o"></i></button>
                  </div>
                </div>

                <div className='row tools-row '>
                  <button id='questionToggle' title="show/hide the question box for you and your audience" onClick={this.toggleQuestions} className='tool-btn btn'><span>Question</span><i className="fa fa-question-circle-o"></i></button>
                  <button id='thumbsToggle' title="show/hide the thumbs box for you and your audience" onClick={this.toggleThumbs} className='tool-btn btn'><span>Thumbs</span><i className="fa fa-thumbs-up"></i></button>
                </div>

                <div className='row tools-row '>
                  <button id='pulseToggle' title="show/hide the thumbs box for you and your audience" className='tool-btn btn'><span>Pulse</span><i className="fa fa-line-chart"></i></button>
                  <button id='feedbackToggle' title="Disable audience members' Did Not Grok button" className='tool-btn btn'><span>Not Grok</span><i className="fa fa-exclamation"></i></button>
                </div>

                <div className='row tools-row '>
                  <Link to={`/`}>
                    <button id='stopPresentation' className='btn btn-red' title="Go home. In your presentation, this will end the presentation and go to a summary">
                      <i className="fa fa-times"></i> Stop Presentation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);
