export default {
  asyncChangeName(context) {
    setTimeout(() => {
        context.commit('asyncChangeName','刘备');
    }, 1000);
  }
}
