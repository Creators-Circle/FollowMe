// reducer for storing user's information

/* example Action that might be dispatched to make use of this reducer:
{
  action: 'STORE_USER',
  payload: {
    avatar: 'https://avatars.githubusercontent.com/u/17049809?v=3',
    email: 'ari.l.frankel@gmail.com',
    id: 'a056fe6e05e5',
    name: 'Ari Leo Frankel'
  }
}
*/

const user = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return {name: action.payload.name, email: action.payload.email, role: action.role, avatar: action.payload.avatar, id: action.payload.id};
    case 'CHANGE_ROLE':
      return action.role === 'presenter' || action.role === 'audience' || action.role === 'tutee'
        ? Object.assign({}, state, {role: action.role}) : state;
    default:
      return state;
  }
};

export default user;
