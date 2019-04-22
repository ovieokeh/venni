import * as types from 'actions/invites/invitesActions';
import profileReducer from './profileReducer';

const initialState = {
  profile: null,
  friends: [],
  friendInvites: [],
  sentInvites: [],
};

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_PROFILE_SUCCESS', () => {
    initialState.profile = 'profile';

    expect(profileReducer(undefined, {
      type: 'GET_PROFILE_SUCCESS',
      payload: initialState,
    }).profile).toEqual('profile');
  });

  it('should handle NEW_FRIEND_INVITE', () => {
    expect(profileReducer(undefined, {
      type: types.NEW_FRIEND_INVITE,
      payload: { id: 1 },
    }).friendInvites.length).toEqual(1);
  });

  it('should handle NEW_SENT_INVITE', () => {
    expect(profileReducer(undefined, {
      type: types.NEW_SENT_INVITE,
      payload: { id: 3 },
    }).sentInvites.length).toEqual(1);
  });

  it('should handle CANCELED_SENT_INVITE and DECLINED_SENT_INVITE', () => {
    initialState.sentInvites = [{ id: 1 }];

    expect(profileReducer(initialState, {
      type: types.CANCELED_SENT_INVITE,
      payload: 1,
    }).sentInvites.length).toEqual(0);

    initialState.sentInvites = [{ id: 2 }];

    expect(profileReducer(initialState, {
      type: types.CANCELED_SENT_INVITE,
      payload: 2,
    }).sentInvites.length).toEqual(0);
  });

  it('should handle DECLINED_INVITE and CANCELED_INVITE', () => {
    initialState.friendInvites = [{ id: 1 }];

    expect(profileReducer(initialState, {
      type: types.DECLINED_INVITE,
      payload: 1,
    }).friendInvites.length).toEqual(0);

    initialState.friendInvites = [{ id: 2 }];

    expect(profileReducer(initialState, {
      type: types.CANCELED_INVITE,
      payload: 2,
    }).friendInvites.length).toEqual(0);
  });

  it('should handle ACCEPTED_SENT_INVITE', () => {
    initialState.sentInvites = [{ id: 1 }];

    expect(profileReducer(initialState, {
      type: types.ACCEPTED_SENT_INVITE,
      payload: {
        id: 1,
      },
    }).sentInvites.length).toEqual(0);
  });

  it('should handle ACCEPTED_INVITE', () => {
    initialState.friendInvites = [{ id: 1 }];

    expect(profileReducer(initialState, {
      type: types.ACCEPTED_INVITE,
      payload: {
        id: 1,
      },
    }).friendInvites.length).toEqual(0);
  });

  it('should handle UNFRIEND', () => {
    initialState.friends = [{ id: 1 }];

    expect(profileReducer(initialState, {
      type: types.UNFRIEND,
      payload: 1,
    }).friends.length).toEqual(0);
  });
});
