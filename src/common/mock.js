import Mock from 'mockjs';

export const userdata = Mock.mock('http://g.cn', {
    'nickname': '@name',
    'age|1-100': 100,
    'phone|11': '1',
    'sex': '男'
});