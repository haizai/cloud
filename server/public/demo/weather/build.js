Vue.transition('container', {
  afterLeave: function(el) {
    appVue.isTran = true
    console.log('Transition ending. ')
      //若过渡结束时,ajax已返回,$set data为newData,并v-show: true
    if (appVue.isAjax) {
      appVue.$set('data', appVue.newData)
      appVue.isShow = true
      document.activeElement.blur()
      appVue.isTran = false
      appVue.isAjax = false
    }
  }
})

var appVue = new Vue({
  created: function() { //初始化，发送ajax设置data
    this.getAjax()
  },
  el: '#app',
  data: {
    allCity: allCityData,
    cityInput: '切换城市',
    isShow: true,
    isAjax: false,
    isTran: false
  },
  computed: {
    //根据天气设置背景色
    topBackground: function() {
      if (this.data.now.cond.code[0] == 1) {
        return '#70b8e3'
      } else {
        return '#a1b4b8'
      }
    }
  },
  methods: {
    getAjax: function(x) {
      //初始化时不传入参数
      if (!x) {
        $.ajax({
          //获得ip
          type: "GET",
          url: 'https://pv.sohu.com/cityjson', // 必须使用https协议
          dataType: 'script',
          success: function() {
            console.log('my-ip: ', returnCitySN.cip)
            $.ajax({
              //获得ip对应的城市名
              type: 'GET',
              url: 'https://apis.baidu.com/showapi_open_bus/ip/ip',
              data: {
                ip: returnCitySN.cip
              },
              headers: {
                apikey: 'ace4c062b938e16663ff786b61323c75'
              },
              success: function(msg) {
                console.log('my-city: ', msg)
                  // 若返回了city且存在于allCityData中，
                if (msg.showapi_res_body.city && allCityData.some(function(item) {
                    return item === msg.showapi_res_body.city
                  })) {
                  changeCityAjax(msg.showapi_res_body.city, true)
                } else {
                  changeCityAjax('北京', true)
                }
              },
              error: function() {
                changeCityAjax('北京', true)
              }
            })
          },
          error: function() {
            changeCityAjax('北京', true)
          }
        })
      } else {
        changeCityAjax(x)
      }
      // 发送ajax 改变city
      function changeCityAjax(cityAjax, isFirst) {
        var api = null
        $.ajax({
          //http://www.heweather.com/documents/api
          type: 'GET',
          url: 'https://api.heweather.com/x3/weather',
          data: {
            city: cityAjax,
            key: '980022d93f2a4b8c8c02cdb3126ce910'
          },
          success: function(api) {
            if (isFirst) {
              appVue.$set('data', api['HeWeather data service 3.0'][0])
              return
            }
            appVue.isAjax = true
              //若ajax返回时过渡完成，直接$set data，并v-show: true
              //否则$set newData，等待Vue.transition的afterLeave事件。
            if (appVue.isTran) {
              appVue.$set('data', api['HeWeather data service 3.0'][0])
              appVue.isShow = true
              document.activeElement.blur()
              appVue.isTran = false
              appVue.isAjax = false
            } else {
              appVue.$set('newData', api['HeWeather data service 3.0'][0])
            }
            console.log('Ajax return. ')
          }
        })
      }
    },

    clearCityInput: function() {
      this.cityInput = ''
    },
    // 重置Input输入框，不能用blur()，不然点击浮出框时也触发事件！
    resetCityInput: function(e) {
      if (e.target.className !== 'city-input' && e.target.className !== 'city-search-item')
        this.cityInput = '切换城市'
    },
    //点击浮出框的城市
    changeCity: function(city) {
      this.cityInput = '切换城市'
      this.isShow = false
      this.getAjax(city)
    },
    //输入框按enter
    getCityInput: function(cityInput) {
      var isFond = false
      var str = null
      this.allCity.forEach(function(item) {
        if (item === cityInput) {
          isFond = true
          str = '切换城市'
        }
      })
      if (str) {
        this.cityInput = '切换城市'
        this.isShow = false
        this.getAjax(cityInput)
      }
      if (!isFond) {
        alert('未找到所查城市')
      }
    }
  },
  filters: {
    dateHour: function(date) {
      return date.split(' ')[1]
    },
    // 后几天的日期
    indexToWeekDay: function(index) {
      if (index === 0) {
        return '今天'
      } else if (index === 1) {
        return '明天'
      } else {
        var num = new Date().getDay() + index
        switch (num) {
          case 2:
          case 9:
            return "周二";
          case 3:
          case 10:
            return "周三";
          case 4:
          case 11:
            return "周四";
          case 5:
          case 12:
            return "周五";
          case 6:
            return "周六";
          case 7:
            return "周日";
          case 8:
            return "周一";
          default:
            return "未知";
        }
      }
    },
    popToicon: function(num) {
      var i = null
      if (num > 50) {
        i = 306
      } else {
        i = 102
      }
      return {
        'background-image': 'url(png/' + i + '.png)'
      }
    },
    //根据input过滤所有城市
    searchCity: function(allCity, input, nowCity) {
      if (input.trim()) {
        var arr = []
        var reg = new RegExp(input, "g")
        allCity.forEach(function(city) {
          if (reg.test(city) && city !== nowCity) {
            arr.push(city)
          }
        })
        return arr
      }
    }
  }
})