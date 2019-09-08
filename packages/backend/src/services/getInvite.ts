async function getInvite(instance: any, type: 'getSentInvites' | 'getInvites'): Promise<any> {
  const invites = await instance[type]({
    attributes: ['id', 'email', 'name', 'avatarUrl'],
    order: [['createdAt', 'ASC']]
  })

  delete invites[0].dataValues.FriendInvites
  return invites[0].dataValues
}

export default getInvite
