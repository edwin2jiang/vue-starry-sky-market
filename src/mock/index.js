import Mock from 'mockjs';
import comments from './comment.config';
import headImg from './headImg.config';

// 模拟 评论信息
const mockComment = Mock.mock('http://localhost:8080/api/comments', {
  'comments|8': [
    {
      name: '@cname',
      email: '@email',
      'age|18-20': 5,
      'content|1': comments,
      'headImg|1': headImg,
      datetime: '@now(yyyy-MM-dd) @increment(1):00:00',
      'star|4-5': 5,
      'isVIP|0-1': 0,
    },
  ],
});

export default {
  mockComment,
};
