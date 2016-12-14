export default {
  dateToRead (num) {
    let date = new Date(num)
    return date.getFullYear() + '-' + (date.getMonth() + 1) +'-' + date.getDate()
  },
  typeToRead (type) {
    switch (type) {
      case 'radio'    : return '单选题'
      case 'checkbox' : return '多选题'
      case 'textarea' : return '文本题'
      default         : return '未知'
    }
  },
  endTimeStatus (num) {
    let date = new Date(num)
    return +date > +new Date() ? '发布中' : '已截止'
  }
}
