(function () {
  var chart = echarts.init(document.getElementById('part-chart-main'))
  var option = {
    color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3', ' #C71585','#4169E1', '#556B2F'],
    backgroundColor: 'rgba(255,255,255,0.9)',
    title: {
      text: '起点全部VIP小说类型分析',
      textAlign: 'center',
      left: '50%',
    },
    tooltip: {
      formatter: "{b}:{c}部({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      textStyle:{
        color: '#333'
      },
      data:['玄幻','都市','仙侠','科幻','历史','游戏','灵异','奇幻','武侠','二次元','职场','体育','军事','短篇']
    },
    series: [{
      name:'main',
      type:'pie',
      radius: [150, 200],
      itemStyle: {
        normal: {
          shadowBlur: 150,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 18
          }
        },
        emphasis: {
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        }
      },
      selectedMode: 'single',
      data: [
        {name: '玄幻',value: 3770, selected: true},
        {name: '都市',value: 3195},
        {name: '仙侠',value: 1917},
        {name: '科幻',value: 1813},
        {name: '历史',value: 1724},
        {name: '游戏',value: 1480},
        {name: '灵异',value: 1024},
        {name: '奇幻',value: 691},
        {name: '武侠',value: 418},
        {name: '二次元',value: 369},
        {name: '职场',value: 365},
        {name: '体育',value: 331},
        {name: '军事',value: 316},
        {name: '短篇',value: 88},
      ]
    },{
      type:'pie',
      radius: [10, 60],
      roseType: 'angle',
      label: {
        normal: {
          textStyle: {
            fontSize: 14
          }
        },
        emphasis: {
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        }
      },
      data: [
        {name: '东方玄幻',value: 2376},
        {name: '异世大陆',value: 1256},
        {name: '王朝争霸',value: 127},
        {name: '高武世界',value: 11},
      ]
    }]
  }
  chart.setOption(option)


  chart.on('legendselectchanged', function(params){
    if (!params.selected[params.name]) {
      var isSelectSelected = option.series[0].data.some(function(item){
        if (item.name == params.name && item.selected == true) {
          return true
        }
      })
      if (isSelectSelected) {
        option.series[0].data.map(function(item){
          item.selected = false
          return item
        })
        option.series[1].data = []
        chart.setOption(option)
      }
    }
  })

  chart.on('pieselectchanged', function (params) {
    var isAllNotSelected = true
    for ( var type in params.selected) {
      if (params.selected[type]) {
        isAllNotSelected = false
        option.series[0].data.map(function(item){
          item.name == type ? item.selected = true : item.selected = false
          return item
        })
        switch (type) {
          case '玄幻':
            option.series[1].data = [
              {name: '东方玄幻',value: 2376},
              {name: '异世大陆',value: 1256},
              {name: '王朝争霸',value: 127},
              {name: '高武世界',value: 11},
            ]
            break;
          case '都市':
            option.series[1].data = [
              {name: '都市生活',value: 1479},
              {name: '异术超能',value: 1440},
              {name: '现实百态',value: 134},
              {name: '青春校园',value: 82},
              {name: '恩怨情仇',value: 33},
              {name: '爱情婚姻',value: 27},
            ]
            break;
          case '仙侠':
            option.series[1].data = [
              {name: '幻想修仙',value: 846},
              {name: '修真文明',value: 600},
              {name: '现代修真',value: 250},
              {name: '神话修真',value: 210},
              {name: '奇幻修真',value: 10},
              {name: '都市修真',value: 1},
            ]
            break;
          case '科幻':
            option.series[1].data = [
              {name: '时空穿梭',value: 688},
              {name: '末世危机',value: 411},
              {name: '未来世界',value: 257},
              {name: '进化变异',value: 189},
              {name: '超级科技',value: 107},
              {name: '超级科技',value: 87},
              {name: '宇宙练功',value: 74},
            ]
            break;
          case '历史':
            option.series[1].data = [
              {name: '架空历史',value: 506},
              {name: '两宋元明',value: 419},
              {name: '秦汉三国',value: 317},
              {name: '两晋隋唐',value: 211},
              {name: '清史民国',value: 137},
              {name: '外国历史',value: 67},
              {name: '上古先秦',value: 35},
              {name: '五代十国',value: 17},
              {name: '历史传记',value: 14},
              {name: '民间传说',value: 1},
            ]
            break;
          case '游戏':
            option.series[1].data = [
              {name: '虚拟网游',value: 600},
              {name: '游戏异界',value: 564},
              {name: '电子竞技',value: 173},
              {name: '游戏生涯',value: 143},
            ]
            break;
          case '灵异':
            option.series[1].data = [
              {name: '灵异鬼怪',value: 520},
              {name: '寻墓探险',value: 268},
              {name: '恐怖惊悚',value: 167},
              {name: '悬疑侦探',value: 49},
              {name: '风水秘术',value: 20},
            ]
            break;
          case '奇幻':
            option.series[1].data = [
              {name: '剑与魔法',value: 415},
              {name: '史诗奇幻',value: 105},
              {name: '黑暗幻想',value: 97},
              {name: '现代魔法',value: 59},
              {name: '另类幻想',value: 14},
              {name: '历史神话',value: 1},
            ]
            break;
          case '武侠':
            option.series[1].data = [
              {name: '传统武侠',value: 214},
              {name: '武侠幻想',value: 165},
              {name: '国术无双',value: 39},
            ]
            break;
          case '二次元':
            option.series[1].data = [
              {name: '衍生同人',value: 224},
              {name: '原生幻想',value: 71},
              {name: '变身入替',value: 57},
              {name: '搞笑吐槽',value: 11},
              {name: '青春日常',value: 6},
            ]
            break;
          case '职场':
            option.series[1].data = [
              {name: '娱乐明星',value: 285},
              {name: '商战职场',value: 73},
              {name: '官场沉浮',value: 7},
            ]
            break;
          case '体育':
            option.series[1].data = [
              {name: '篮球运动',value: 151},
              {name: '足球运动',value: 131},
              {name: '体育赛事',value: 49},
            ]
            break;
          case '军事':
            option.series[1].data = [
              {name: '抗战烽火',value: 90},
              {name: '战争幻想',value: 74},
              {name: '军事战争',value: 72},
              {name: '谍战特工',value: 42},
              {name: '军旅生涯',value: 38},
            ]
            break;
          case '短篇':
            option.series[1].data = [
              {name: '短篇小说',value: 85},
              {name: '儿童文学',value: 1},
              {name: '生活随笔',value: 2},
            ]
            break;
        }
        chart.setOption(option)
      }
    }
    if (isAllNotSelected) {
      option.series[0].data.map(function(item){
        item.selected = false
        return item
      })
      option.series[1].data = []
      chart.setOption(option)
    }
  });
})()