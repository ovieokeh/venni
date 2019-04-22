import { GET_PROFILE_SUCCESS } from 'actions/profile/profileActions';
import * as types from 'actions/invites/invitesActions';

let initialState;

try {
  const remember = localStorage.getItem('remember');
  /* istanbul ignore next */
  initialState = remember === 'yes'
    ? JSON.parse(localStorage.getItem('store')).user
    : initialState = {
      profile: null,
      friends: [],
      friendInvites: [],
      sentInvites: [],
    };
} catch (error) {
  /* istanbul ignore next */
  initialState = {
    profile: null,
    friends: [],
    friendInvites: [],
    sentInvites: [],
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        friends: action.payload.friends,
        friendInvites: action.payload.friendInvites,
        sentInvites: action.payload.sentInvites,
      };

    case types.NEW_FRIEND_INVITE:
      return {
        ...state,
        friendInvites: [...state.friendInvites, action.payload],
      };

    case types.NEW_SENT_INVITE:
      return {
        ...state,
        sentInvites: [...state.sentInvites, action.payload],
      };

    case types.CANCELED_SENT_INVITE:
    case types.DECLINED_SENT_INVITE:
      return {
        ...state,
        sentInvites: [...state.sentInvites]
          .filter(invite => invite.id !== action.payload),
      };

    case types.DECLINED_INVITE:
    case types.CANCELED_INVITE:
      return {
        ...state,
        friendInvites: [...state.friendInvites]
          .filter(invite => invite.id !== action.payload),
      };

    case types.ACCEPTED_SENT_INVITE:
      return {
        ...state,
        sentInvites: [...state.sentInvites]
          .filter(invite => invite.id !== action.payload.id),
        friends: [...state.friends, action.payload],
      };

    case types.ACCEPTED_INVITE:
      return {
        ...state,
        friendInvites: [...state.friendInvites]
          .filter(invite => invite.id !== action.payload.id),
        friends: [...state.friends, action.payload],
      };

    case types.UNFRIEND:
      return {
        ...state,
        friends: [...state.friends]
          .filter(friend => friend.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
