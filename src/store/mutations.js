import axios from 'axios'
import Cookies from 'js-cookie'
export default {
  increaseCount(state) {
    state.count += 5
  },
  updateUsers(state, users) {
    state.users = users
  },
  login(state, userInfo) {
    state.userInfo = userInfo
  },
  logOut(state) {
    console.log('hello')
    state.userInfo = null
    Cookies.remove('isLogin')
  },
  loadDefaultUsers(state) {
    let users = localStorage.getItem('users')
    console.log('这里是loadDefaultUsers方法')
    if (!users) {
      // 如果不存在用户，就读取默认用户
      axios({
        type: 'get',
        url: '/static/data/default-users.json',
      })
        .then((res) => {
          console.log(res.data)
          localStorage.setItem('users', JSON.stringify(res.data))
          state.users = JSON.parse(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      state.users = JSON.parse(users)
    }
  },
  getUsersAndCheck(state, info) {
    // 获取所有用户到 state.users
    let users = localStorage.getItem('users')
    console.log('这里是getUsersAndCheck方法')
    console.log('这是用户信息')
    console.log(info.userInfo)
    if (!users) {
      // 如果不存在用户，就读取默认用户
      axios({
        type: 'get',
        url: '/static/data/default-users.json',
      })
        .then((res) => {
          console.log(res.data)
          localStorage.setItem('users', JSON.stringify(res.data))
          state.users = JSON.parse(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      state.users = JSON.parse(users)
    }

    // checkinfo.userInfo
    users = state.users
    console.log('这里是全部用户的信息')
    console.log(users)

    let newArr = users.filter((item) => {
      return item.username === info.userInfo.username
    })
    console.log(newArr)

    if (newArr.length === 0) {
      info.that.$message({
        showClose: true,
        message: '警告，用户名错误',
        type: 'error',
      })
      return false
    } else {
      if (newArr[0].password !== info.userInfo.password) {
        info.that.$message({
          showClose: true,
          message: '警告，密码错误',
          type: 'error',
        })
        return false
      } else {
        info.that.$message({
          showClose: true,
          message: '恭喜你, 登录成功',
          type: 'success',
        })

        state.userInfo = newArr[0]

        console.log('----------------')
        console.log('登录成功')

        //创建有效期为7天的cookie
        Cookies.set('isLogin', 'true', {
          expires: 7,
        })

        // window.$cookies.set('userInfo', 'JSON.stringify(newArr[0])', '7d');

        info.that.$router.go(-1)
        return true
      }
    }
  },
  checkRegAndAdd(state, info) {
    // 获取所有用户到 state.users
    let users = localStorage.getItem('users')
    console.log('这里是checkRegAndAdd方法')
    console.log('这是用户信息')
    console.log(info.userInfo)
    if (!users) {
      // 如果不存在用户，就读取默认用户
      axios({
        type: 'get',
        url: '/static/data/default-users.json',
      })
        .then((res) => {
          console.log(res.data)
          localStorage.setItem('users', JSON.stringify(res.data))
          state.users = JSON.parse(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      state.users = JSON.parse(users)
    }

    users = JSON.parse(users)
    console.log(users)

    let newArr = users.filter((item) => {
      return item.username === info.userInfo.username
    })
    console.log(newArr)

    if (newArr.length !== 0) {
      info.that.$message({
        showClose: true,
        message: '警告，该用户名已被注册',
        type: 'error',
      })
      return false
    } else {
      info.that.$message({
        showClose: true,
        message: '注册成功',
        type: 'success',
      })

      let defaultUser = {
        username: 'root',
        password: '123456',
        name: '何玉洁',
        email: 's.zoq@vuyydkhus.sb',
        age: 18,
        headImg: '/static/images/headImg/5.jpg',
        isPlus: 1,
        carts: [],
      }
      defaultUser.username = info.userInfo.username
      defaultUser.name = info.userInfo.username
      defaultUser.password = info.userInfo.password

      users.push(defaultUser)
      console.log(users)
      localStorage.setItem('users', JSON.stringify(users))
      return true
    }
  },
}
