
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_clicks').del()
    .then(function () {
      return knex('user_lectures').del()
      .then(function () {
        return knex('questions').del()
        .then(function () {
          return knex('users').del()
          .then(function () {
            return knex('lectures').del()
            .then(function () {
              return Promise.all([
                knex('lectures').insert({id: 'cc0001', name: 'sample presentation', presentation_id: 'sample1', preview_image: 'https://www.engageselling.com/blog/wp-content/uploads/2014/12/RefreshBLogDecember2nd.jpg'}),
                knex('lectures').insert({id: 'cc0002', name: 'sample presentation', presentation_id: 'sample2', preview_image: 'https://blognumbers.files.wordpress.com/2010/09/2.jpg'}),
                knex('lectures').insert({id: 'ea23aa', name: 'test time presentation'}),
                knex('lectures').insert({id: 'ea2351', name: 'test order presentation'}),
                knex('lectures').insert({id: 'ea2355', name: 'test1 order presentation'}),
                knex('lectures').insert({id: '12dwwa', name: 'test server time'}),
                knex('lectures').insert({id: '112355', name: 'test1 order presentation'}),
                knex('users').insert({id: '114267757081727627546', name: 'First User', avatar: 'https://lh4.googleusercontent.com/-ENvzYvvyW_k/AAAAAAAAAAI/AAAAAAAAEOA/_nB-8dk8arg/photo.jpg', email: 'test@test.mail.com'}),
                knex('users').insert({id: '110709938641205847283', name: 'Second User', avatar: 'https://lh5.googleusercontent.com/-F0mWWBnynZI/AAAAAAAAAAI/AAAAAAAAP6o/IXUujroyAlo/photo.jpg', email: 'test@test.mail.com'}),
                knex('users').insert({id: 'a083b72cbc4b', name: 'Third User', avatar: 'https://avatars.githubusercontent.com/u/13170829?v=3', email: 'test@testmail.com'}),
                knex('users').insert({id: 'ea2f59c19983', name: 'Fourth User', avatar: 'https://avatars.githubusercontent.com/u/17533705?v=3', email: 'test@testmail.com'}),
                knex('questions').insert({lecture_id: 'cc0001', user_id: '110709938641205847283', question: 'help', votes: 2}),
                knex('questions').insert({lecture_id: 'cc0001', user_id: '114267757081727627546', question: 'i dont understand', votes: 1}),
                knex('questions').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b', question: 'this is not clear', votes: 3}),
                knex('questions').insert({lecture_id: 'cc0002', user_id: '114267757081727627546', question: 'can we go over that again', votes: 2}),
                knex('questions').insert({lecture_id: 'cc0002', user_id: '110709938641205847283', question: 'can we go over that again', votes: 2}),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea2351', role: 'audience'}),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: '12dwwa', role: 'audience'}),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'cc0002', role: 'audience', comment: 'attentive', no_of_clicks: 3}),
                knex('user_lectures').insert({user_id: 'a083b72cbc4b', lecture_id: 'cc0002', role: 'presenter', comment: 'i need to make this shorter', no_of_clicks: 0}),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'cc0001', role: 'presenter', comment: 'i need to add detail', no_of_clicks: 0}),
                knex('user_lectures').insert({user_id: '114267757081727627546', lecture_id: 'cc0002', role: 'audience', comment: 'consider office hours on this topic', no_of_clicks: 2}),
                knex('user_lectures').insert({user_id: '110709938641205847283', lecture_id: 'cc0002', role: 'audience', comment: 'appears to understand material', no_of_clicks: 1}),
                knex('user_lectures').insert({user_id: '114267757081727627546', lecture_id: 'cc0001', role: 'audience', comment: 'consider remedial instruction', no_of_clicks: 2}),
                knex('user_lectures').insert({user_id: '110709938641205847283', lecture_id: 'cc0001', role: 'audience', comment: 'consider office hours', no_of_clicks: 1}),
                knex('user_lectures').insert({user_id: 'a083b72cbc4b', lecture_id: 'cc0001', role: 'audience', comment: 'consider office hours', no_of_clicks: 3}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '114267757081727627546'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '110709938641205847283'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '114267757081727627546'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'}),
                knex('users_clicks').insert({lecture_id: 'cc0002', user_id: '114267757081727627546'}),
                knex('users_clicks').insert({lecture_id: 'cc0002', user_id: '110709938641205847283'}),
                knex('users_clicks').insert({lecture_id: 'cc0002', user_id: 'a083b72cbc4b'}),
                knex('users_clicks').insert({lecture_id: 'cc0002', user_id: '114267757081727627546'}),
                knex('users_clicks').insert({lecture_id: 'cc0002', user_id: 'a083b72cbc4b'}),
                knex('users_clicks').insert({lecture_id: 'cc0002', user_id: 'a083b72cbc4b'})
              ]);
            });
          });
        });
      });
    });
};
