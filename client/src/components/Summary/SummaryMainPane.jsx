import React, { Component } from 'react';
import { connect } from 'react-redux';

import SummaryInfoBox from './SummaryInfoBox';

const SummaryMainPane = ({ summary, userId }) => {
  if (summary.users) {
    // store id of the selected user
    const clickedUser = userId || '';
    // --------------- will move to other files after this pull request----------- //
    // store all the users
    const users = summary.users;
    const lecture = summary.lecture[0];

    // compute total number of clicks
    const userClicks = summary.clicks.filter(click => click.user_id === clickedUser);
    const totalClicks = !clickedUser ? summary.clicks.length : userClicks.length;

    // compute the average click per user, remove the presenter from the users
    // round to 1 decimal place
    const avgClickPerUser = Math.round((totalClicks / (users.length - 1) * 10)) / 10;

    // total number of questions asked about the lecture
    const questions = !clickedUser ? summary.questions
      : summary.questions.filter(question => question.user_id === clickedUser);

    const formattedQuestions = questions.sort((a, b) => b.votes - a.votes)
      .map(data => `${data.question}: ${data.votes}`);
    const noOfQuestions = questions.length;

    // store count of clicks per minute
    const clickPerTime = {};
    const clicks = !userId ? summary.clicks : userClicks;

    clicks.forEach(click => {
      const time = hourMinutes(new Date(click.date), true);
      clickPerTime[time] = clickPerTime[time] ? clickPerTime[time] += 1 : 1;
    });
    // copy time of click to an array
    const time = Object.keys(clickPerTime);
    // compute the average click per minute then round to 1 decimal place
    const avgClickPerMinute = Math.round((totalClicks / time.length) * 10) / 10;
    // sort by the highest number of clicks then get the first element
    const maxPeak = time.sort((a, b) => clickPerTime[b] - clickPerTime[a])[0];
    const maxPeakDetail = maxPeak ? `${clickPerTime[maxPeak]} at ${maxPeak}` : 0;

    // convert time to minutes
    const minutes = time.map(convertToMinutes);

    // compute the longest time the users didn't click the feedback button
    const startMinutes = convertToMinutes(hourMinutes(new Date(lecture.date)));
    const endMinutes = convertToMinutes(hourMinutes(new Date(lecture.end_time), true));

    let longestMinutesWithOutClicks = 0;
    [startMinutes, ...minutes, endMinutes].sort().forEach((minute, i, totalMinutes) => {
      const difference = Math.abs(totalMinutes[i] - totalMinutes[i + 1]);
      if (difference > longestMinutesWithOutClicks) longestMinutesWithOutClicks = difference;
    });

    const userUpvotes = summary.upvotes.filter(vote => vote.user_id === clickedUser)
      .map(upvote => upvote.question);

    const noOfUpvotes = userUpvotes.length;

    const thumbs = summary.thumbs.filter(thumb => thumb.user_id === clickedUser);
    const thumbsCount = {
      1: 0,
      2: 0,
      3: 0
    };
    thumbs.forEach(thumb => {
      thumbsCount[thumb.type]++;
    });
    const formattedThumbs = thumbs.map(thumb => `${thumb.topic}: ${thumb.type}`);

    const topicsSummary = {};
    const topics = summary.thumbs;
    topics.forEach(topic => {
      if (!topicsSummary.hasOwnProperty(topic.topic)) {
        topicsSummary[topic.topic] = { 1: 0, 2: 0, 3: 0 };
      }
    });

    topics.forEach(topic => {
      topicsSummary[topic.topic][topic.type]++;
    });

    const noOfTopics = Object.keys(topicsSummary);

    const formattedTopics = noOfTopics.map(topic => {
      const topicSummary = topicsSummary[topic];
      return `${topic}: thumbs up: ${topicSummary[1]}, thumbs side: ${topicSummary[2]}, thumbs down: ${topicSummary[3]}`;
    });
    // ------------------------------------------------------------------------------- //
    return (
      <div id='mainPane' className='summary container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
          <SummaryInfoBox title={'Average click per minute'} value={avgClickPerMinute}/>
          {
            !clickedUser
            ? <div>
              <SummaryInfoBox title={'Average click per user'} value={avgClickPerUser}/>
              <SummaryInfoBox title={'Topics'} value={noOfTopics.length} viewDetails={formattedTopics} />
            </div>
            : <div>
                <SummaryInfoBox title={'Upvotes'} value={noOfUpvotes} viewDetails={userUpvotes}/>
                <SummaryInfoBox title={'Thumbs'} value={thumbs.length} thumbs = {thumbsCount} viewDetails={formattedThumbs}/>
              </div>
          }
          </div>
          <div className='col-md-6'>
            <SummaryInfoBox title={'Max click peak'} value={maxPeakDetail}/>
            <SummaryInfoBox title={'Longest time w/o clicks'} value={`${longestMinutesWithOutClicks} minutes`}/>
            <SummaryInfoBox title={'Questions'} value={noOfQuestions} viewDetails={formattedQuestions}/>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStatetoProps = ({ summary }) => {
  return {
    summary
  };
};
// function to format hours and minutes
const hourMinutes = (time, increment) => {
  return increment ? `${time.getHours()}:${time.getMinutes() + 1}`
    : `${time.getHours()}:${time.getMinutes()}`;
};
// function for converting minutes, needs to move to a separate file
const convertToMinutes = (t) => {
  const time = t.split(':');
  return Number(time[0]) * 60 + Number(time[1]);
};
export default connect(mapStatetoProps)(SummaryMainPane);
