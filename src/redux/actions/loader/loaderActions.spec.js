import * as actions from './loaderActions';

describe('loader actions', () => {
  const expectedAction = {};

  it('should handle LOADER_BEGIN', () => {
    expectedAction.type = actions.LOADER_BEGIN;
    expect(actions.loaderBegin()).toEqual(expectedAction);
  });

  it('should handle LOADER_DONE', () => {
    expectedAction.type = actions.LOADER_DONE;
    expect(actions.loaderDone()).toEqual(expectedAction);
  });

  it('should handle NOTIFY_ERROR', () => {
    expectedAction.type = actions.NOTIFY_ERROR;
    expectedAction.payload = 'payload';
    expect(actions.notifyError('payload')).toEqual(expectedAction);
  });

  it('should handle NOTIFY_SUCCESS', () => {
    expectedAction.type = actions.NOTIFY_SUCCESS;
    expectedAction.payload = 'payload';
    expect(actions.notifySuccess('payload')).toEqual(expectedAction);
  });
});