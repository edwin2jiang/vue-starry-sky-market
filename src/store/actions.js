export default {
  searchGoods(context, query) {
    query.this
      .$axios({
        type: 'get',
        url: '/static/data/goodsDetails.json',
      })
      .then((res) => {
        // console.log(res);
        // 根据关键词生成正则表达式
        let patt = new RegExp(query.qs.toLowerCase());
        let newArr = res.data.filter((item) => {
          return patt.test(item['标题'].toLowerCase());
        });
        // startIndex = (page-1)*size, endIndex = page*size
        let { page, size } = query;
        query.this.goodsList = newArr.slice((page - 1) * size, page * size);
        query.this.totalNum = newArr.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
