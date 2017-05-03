import React, { Component } from 'react';

const TotalClicksRow = ({ displayUserSummary, userId, avatar, name, noOfClicks }) => {
  return (
    <tr>
      <td onClick = { () => { displayUserSummary(userId); } }>
        <img className='audience-pic' src={avatar} /><span>{name}</span>
        </td>
      <td className='text-center'>{noOfClicks}</td>
    </tr>
  );
};

export default TotalClicksRow;
