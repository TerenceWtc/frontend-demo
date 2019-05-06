import { setAccessToken, getAccessToken, removeAccessToken, setRefreshToken, getRefreshToken, removeRefreshToken } from '@/util/auth'
import { login, register } from '@/api/auth/login'
import { getUserInfo } from '@/api/admin/user'
import { getMenuList } from '@/api/admin/menu'

const user = {
  state: {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    userId: undefined,
    username: undefined,
    name: undefined,
    groupId: undefined,
    groupName: undefined,
    menus: undefined
  },

  mutations: {
    SET_ACCESS_TOKEN: (state, token) => {
      state.accessToken = token
    },
    SET_REFRESH_TOKEN: (state, token) => {
      state.refreshToken = token
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_GROUP_ID: (state, groupId) => {
      state.groupId = groupId
    },
    SET_GROUP_NAME: (state, groupName) => {
      state.groupName = groupName
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    Login ({ commit }, user) {
      removeAccessToken()
      removeRefreshToken()
      commit('SET_MENUS', undefined)
      return new Promise((resolve, reject) => {
        login(user).then(response => {
          setAccessToken(response.data.accessToken)
          commit('SET_ACCESS_TOKEN', response.data.accessToken)
          setRefreshToken(response.data.refreshToken)
          commit('SET_REFRESH_TOKEN', response.data.refreshToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Register ({ commit }, user) {
      removeAccessToken()
      removeRefreshToken()
      commit('SET_MENUS', undefined)
      return new Promise((resolve, reject) => {
        register(user).then(response => {
          setAccessToken(response.data.accessToken)
          commit('SET_ACCESS_TOKEN', response.data.accessToken)
          setRefreshToken(response.data.refreshToken)
          commit('SET_REFRESH_TOKEN', response.data.refreshToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // function logout for front end
    FrontendLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        removeAccessToken()
        removeRefreshToken()
        resolve()
      })
    },
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.accessToken).then(response => {
          let data = response.data
          commit('SET_USER_ID', data.userId)
          commit('SET_USERNAME', data.username)
          commit('SET_NAME', data.name)
          commit('SET_GROUP_ID', data.groupId)
          commit('SET_GROUP_NAME', data.groupName)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetMenus ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenuList(state.accessToken).then(response => {
          commit('SET_MENUS', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    RefreshToken ({ commit }, token) {
      setAccessToken(token)
      commit('SET_ACCESS_TOKEN', token)
    }
  }
}

export default user
