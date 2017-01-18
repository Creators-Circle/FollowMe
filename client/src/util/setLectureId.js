// This helper function generates a 6 character lecture Id for a presentation

const setLectureId = () => {
    // Generate a random, 6 character string to name the socket 'room' for that presentation
    let lectureId = (Math.random().toString(36) + '00000000000000000').slice(2, 8);

    return lectureId;
  }

export default setLectureId;
