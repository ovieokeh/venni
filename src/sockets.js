import Axios from 'axios';
import io from 'socket.io-client';
import store from 'store/store';
import * as actions from 'actions/invites/invitesActions';
import dotenv from 'dotenv';

dotenv.config();

/* istanbul ignore next */
function setupSockets(token) {
  global.sockets = io(process.env.API_URL);

  sockets.on('connect', () => {
    sockets.emit('authentication', token);

    sockets.on('socket', async (socketId) => {
      const url = `${process.env.API_URL}/sockets/${socketId}`;
      await Axios.get(url, { headers: { token } });
    });

    sockets.on('authenticated', () => {
      sockets.on('newFriendInvite', (inviteDetails) => {
        store.dispatch(actions.newFriendInvite(inviteDetails));
      });

      sockets.on('newSentInvite', (inviteDetails) => {
        store.dispatch(actions.newSentInvite(inviteDetails));
      });

      sockets.on('handledSentInvite', (details) => {
        const { action, inviteId, friend } = details;
        let payload = inviteId;
        let type;

        switch (action) {
          case 'canceled':
            type = actions.CANCELED_SENT_INVITE;
            break;

          case 'declined':
            type = actions.DECLINED_SENT_INVITE;
            break;

          default:
            type = actions.ACCEPTED_SENT_INVITE;
            payload = friend;
        }

        store.dispatch(actions.handledSentInvite(type, payload));
      });

      sockets.on('handledInvite', (details) => {
        const { action, inviteId, friend } = details;
        let payload = inviteId;
        let type;

        switch (action) {
          case 'canceled':
            type = actions.CANCELED_INVITE;
            break;

          case 'declined':
            type = actions.DECLINED_INVITE;
            break;

          default:
            type = actions.ACCEPTED_INVITE;
            payload = friend;
        }

        store.dispatch(actions.handledInvite(type, payload));
      });

      sockets.on('unfriend', (friendId) => {
        store.dispatch(actions.unfriend(friendId));
      });
    });
  });
}

export {
  setupSockets,
};
