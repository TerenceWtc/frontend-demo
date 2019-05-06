const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  accessToken: state => state.user.accessToken,
  refreshToken: state => state.user.refreshToken,
  userId: state => state.user.userId,
  username: state => state.user.username,
  name: state => state.user.name,
  groupId: state => state.user.groupId,
  groupName: state => state.user.groupName,
  menus: state => state.user.menus
}
export default getters
