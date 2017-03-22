import React, { Component } from 'react';

const TotalClicksRow = (props) => {
  return (
    <tr>
      <td onClick = { () => { props.displayUserSummary(props.userId); } }>
        <img className='audience-pic' src={props.avatar} /><span>{props.name}</span>
        </td>
      <td className='text-center'>{props.noOfClicks}</td>
    </tr>
  );
};

export default TotalClicksRow;
