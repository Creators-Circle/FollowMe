// This is a helper function for computing the difference of time and convert it to minutes
const timeDiffToMinutes = (startTime, currTime) => {
  let time1 = startTime.getTime()
  let time2 = new Date(currTime).getTime();
  // the output will be in milliseconds, then convert it to minutes
  let timeDiffToMinutes = (time2-time1)/(1000*60);
  return timeDiffToMinutes;
}

export default timeDiffToMinutes;
