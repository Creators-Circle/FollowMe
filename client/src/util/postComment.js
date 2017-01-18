import $ from 'jquery';

// for posts a comment for a lecture or user.
const postComment = (lectureId, userId, comment) => {
  return $.ajax({
    url: `/api/${lectureId}/comment/${userId}`,
    type: 'POST',
    data: JSON.stringify({ comment: comment}),
    contentType: 'application/json'
  })
  .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}

export default postComment;
