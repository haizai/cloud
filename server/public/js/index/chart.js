(function () {
  var chart = echarts.init(document.getElementById('part-chart-main'))
  var option = {
    color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3', ' #C71585','#4169E1', '#556B2F'],
    backgroundColor: 'rgba(255,255,255,0.9)',
    title: {
      text: '起点VIP小说数据分析',
      textAlign: 'center',
      left: '50%',
      top:10,
      textStyle: {
        fontSize: 28
      },
      subtext: '全部17500部VIP小说',
      subtextStyle: {
        color: '#666'
      },
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
      center: [400,300],
      itemStyle: {
        normal: {
          shadowBlur: 150,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      label: {
        textStyle: {
          fontSize: 18
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
      center: [400,300],
      roseType: 'angle',
      label: {
        textStyle: {
          fontSize: 14
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
        changeBookData(type)
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
              {name: '星际文明',value: 107},
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

var Books={"玄幻":[{"allClickCount":14990.7,"allCommendCount":662.91,"secondType":"异世大陆","title":"斗破苍穹","wordCount":532.45,"writer":"天蚕土豆"},{"allClickCount":6676.76,"allCommendCount":246.09,"secondType":"东方玄幻","title":"武动乾坤","wordCount":393.98,"writer":"天蚕土豆"},{"allClickCount":6313.9,"allCommendCount":570.62,"secondType":"异世大陆","title":"斗罗大陆","wordCount":302.11,"writer":"唐家三少"},{"allClickCount":5281.05,"allCommendCount":570.89,"secondType":"异世大陆","title":"神墓","wordCount":311.72,"writer":"辰东"},{"allClickCount":3826.49,"allCommendCount":527.49,"secondType":"异世大陆","title":"恶魔法则","wordCount":393.41,"writer":"跳舞"},{"allClickCount":3557.97,"allCommendCount":499.41,"secondType":"异世大陆","title":"邪神传说","wordCount":277.97,"writer":"云天空"},{"allClickCount":3517.75,"allCommendCount":281.53,"secondType":"异世大陆","title":"猎国","wordCount":356.58,"writer":"跳舞"},{"allClickCount":3487.04,"allCommendCount":255.98,"secondType":"异世大陆","title":"傲世九重天","wordCount":842.84,"writer":"风凌天下"}], "都市":[{"allClickCount":2514.59,"allCommendCount":52.2,"secondType":"异术超能","title":"校花的贴身高手","wordCount":1176.35,"writer":"鱼人二代"},{"allClickCount":2252.78,"allCommendCount":162.17,"secondType":"都市生活","title":"天才相师","wordCount":282.53,"writer":"打眼"},{"allClickCount":2197.8,"allCommendCount":178.87,"secondType":"都市生活","title":"陈二狗的妖孽人生","wordCount":113.42,"writer":"烽火戏诸侯"},{"allClickCount":2036.21,"allCommendCount":197.9,"secondType":"异术超能","title":"天王","wordCount":168.06,"writer":"跳舞"},{"allClickCount":2028.08,"allCommendCount":104.92,"secondType":"异术超能","title":"很纯很暧昧","wordCount":681.19,"writer":"鱼人二代"},{"allClickCount":1877.46,"allCommendCount":297.52,"secondType":"异术超能","title":"生肖守护神","wordCount":300.95,"writer":"唐家三少"},{"allClickCount":1826.92,"allCommendCount":162.59,"secondType":"都市生活","title":"黄金瞳","wordCount":417.03,"writer":"打眼"},{"allClickCount":1753.54,"allCommendCount":140.77,"secondType":"爱情婚姻","title":"老婆爱上我","wordCount":160.19,"writer":"傲无常"}],"仙侠":[ {"allClickCount":10083.79,"allCommendCount":1344.29,"secondType":"幻想修仙","title":"凡人修仙传","wordCount":747.84,"writer":"忘语"},{"allClickCount":6287.17,"allCommendCount":546.1,"secondType":"修真文明","title":"遮天","wordCount":635.92,"writer":"辰东"},{"allClickCount":6164.48,"allCommendCount":531.03,"secondType":"修真文明","title":"莽荒纪","wordCount":417.89,"writer":"我吃西红柿"},{"allClickCount":4988.92,"allCommendCount":671.33,"secondType":"幻想修仙","title":"星辰变","wordCount":283.68,"writer":"我吃西红柿"},{"allClickCount":4986.19,"allCommendCount":420.09,"secondType":"幻想修仙","title":"阳神","wordCount":308.89,"writer":"梦入神机"},{"allClickCount":4150.24,"allCommendCount":378,"secondType":"幻想修仙","title":"仙逆","wordCount":654.58,"writer":"耳根"},{"allClickCount":2914.43,"allCommendCount":231.72,"secondType":"修真文明","title":"诛仙","wordCount":258.79,"writer":"萧鼎"},{"allClickCount":2330.56,"allCommendCount":269.19,"secondType":"现代修真","title":"升龙道","wordCount":227.54,"writer":"血红"}],"科幻":[ {"allClickCount":8462.73,"allCommendCount":745.78,"secondType":"未来世界","title":"吞噬星空","wordCount":478.04,"writer":"我吃西红柿"},{"allClickCount":2557.02,"allCommendCount":442.19,"secondType":"星际文明","title":"小兵传奇","wordCount":206.86,"writer":"玄雨"},{"allClickCount":2519.74,"allCommendCount":346.8,"secondType":"宇宙练功","title":"星战风暴","wordCount":393.32,"writer":"骷髅精灵"},{"allClickCount":2269.64,"allCommendCount":368.76,"secondType":"宇宙练功","title":"冒牌大英雄","wordCount":411.08,"writer":"七十二编"},{"allClickCount":2260.48,"allCommendCount":342.97,"secondType":"未来世界","title":"卡徒","wordCount":209.19,"writer":"方想"},{"allClickCount":2220.61,"allCommendCount":419.1,"secondType":"时空穿梭","title":"无限恐怖","wordCount":270.09,"writer":"zhttty"},{"allClickCount":1837.26,"allCommendCount":175.89,"secondType":"宇宙练功","title":"机动风暴","wordCount":287.74,"writer":"骷髅精灵"},{"allClickCount":1681.86,"allCommendCount":296.92,"secondType":"时空穿梭","title":"最终进化","wordCount":458.98,"writer":"卷土"}], "历史":[{"allClickCount":3394.11,"allCommendCount":544.24,"secondType":"架空历史","title":"极品家丁","wordCount":319.88,"writer":"禹岩"},{"allClickCount":2935.73,"allCommendCount":577.2,"secondType":"架空历史","title":"随波逐流之一代军师","wordCount":154.82,"writer":"随波逐流"},{"allClickCount":2660.9,"allCommendCount":498.51,"secondType":"两宋元明","title":"回到明朝当王爷","wordCount":370.01,"writer":"月关"},{"allClickCount":2521.15,"allCommendCount":395.64,"secondType":"架空历史","title":"步步生莲","wordCount":357.36,"writer":"月关"},{"allClickCount":2202.53,"allCommendCount":331.47,"secondType":"架空历史","title":"庆余年","wordCount":393.44,"writer":"猫腻"},{"allClickCount":1977.49,"allCommendCount":303.79,"secondType":"两宋元明","title":"锦衣夜行","wordCount":382.24,"writer":"月关"},{"allClickCount":1805.49,"allCommendCount":323.42,"secondType":"架空历史","title":"赘婿","wordCount":339.67,"writer":"愤怒的香蕉"},{"allClickCount":1661.32,"allCommendCount":274.74,"secondType":"两晋隋唐","title":"江山美色","wordCount":429.93,"writer":"墨武"}],"游戏":[ {"allClickCount":6475.93,"allCommendCount":1331.17,"secondType":"虚拟网游","title":"从零开始","wordCount":2018.08,"writer":"雷云风暴"},{"allClickCount":2529.31,"allCommendCount":246.67,"secondType":"电子竞技","title":"网游之天地","wordCount":540.17,"writer":"隐为者"},{"allClickCount":2419.18,"allCommendCount":225.29,"secondType":"虚拟网游","title":"重生之贼行天下","wordCount":296.51,"writer":"发飙的蜗牛"},{"allClickCount":2338.36,"allCommendCount":473.49,"secondType":"游戏生涯","title":"全职高手","wordCount":535.18,"writer":"蝴蝶蓝"},{"allClickCount":2154.32,"allCommendCount":415.54,"secondType":"电子竞技","title":"流氓高手II","wordCount":370.86,"writer":"无罪"},{"allClickCount":1955.69,"allCommendCount":106.59,"secondType":"游戏异界","title":"异界全职业大师","wordCount":488.64,"writer":"庄毕凡"},{"allClickCount":1915.15,"allCommendCount":277.77,"secondType":"虚拟网游","title":"猛龙过江","wordCount":236.01,"writer":"骷髅精灵"},{"allClickCount":1285.05,"allCommendCount":128.92,"secondType":"虚拟网游","title":"高手寂寞","wordCount":133.4,"writer":"兰帝魅晨"}],"灵异":[ {"allClickCount":2103.67,"allCommendCount":31.53,"secondType":"寻墓探险","title":"盗墓笔记","wordCount":144.18,"writer":"南派三叔"},{"allClickCount":2010.01,"allCommendCount":67.33,"secondType":"寻墓探险","title":"鬼吹灯","wordCount":93.15,"writer":"本物天下霸唱"},{"allClickCount":1006.46,"allCommendCount":39.76,"secondType":"寻墓探险","title":"茅山后裔","wordCount":131.23,"writer":"大力金刚掌"},{"allClickCount":523.84,"allCommendCount":35.49,"secondType":"寻墓探险","title":"鬼吹灯II","wordCount":102.91,"writer":"本物天下霸唱"},{"allClickCount":381.75,"allCommendCount":25.87,"secondType":"恐怖惊悚","title":"超级猛鬼分身","wordCount":189.57,"writer":"奥比椰"},{"allClickCount":364.55,"allCommendCount":4.02,"secondType":"灵异鬼怪","title":"我当阴阳先生的那几年","wordCount":105.73,"writer":"崔走召"},{"allClickCount":324.28,"allCommendCount":23.64,"secondType":"恐怖惊悚","title":"鉴鬼实录","wordCount":124.42,"writer":"阿修罗的眼泪"},{"allClickCount":310.99,"allCommendCount":58.47,"secondType":"灵异鬼怪","title":"十三局灵异档案","wordCount":86.7,"writer":"微不二"}],"奇幻":[ {"allClickCount":9454.45,"allCommendCount":771.47,"secondType":"剑与魔法","title":"盘龙","wordCount":335.66,"writer":"我吃西红柿"},{"allClickCount":3529.89,"allCommendCount":242.64,"secondType":"现代魔法","title":"酒神","wordCount":281.85,"writer":"唐家三少"},{"allClickCount":2935.26,"allCommendCount":462.59,"secondType":"现代魔法","title":"琴帝","wordCount":321.73,"writer":"唐家三少"},{"allClickCount":2528.75,"allCommendCount":620.99,"secondType":"剑与魔法","title":"亵渎","wordCount":263.53,"writer":"烟雨江南"},{"allClickCount":2353.04,"allCommendCount":109.25,"secondType":"剑与魔法","title":"善良的死神","wordCount":335.47,"writer":"唐家三少"},{"allClickCount":1748.67,"allCommendCount":319.99,"secondType":"现代魔法","title":"冰火魔厨","wordCount":214.64,"writer":"唐家三少"},{"allClickCount":1082.74,"allCommendCount":66.49,"secondType":"史诗奇幻","title":"界王","wordCount":127.42,"writer":"骷髅精灵"},{"allClickCount":961.84,"allCommendCount":54.68,"secondType":"史诗奇幻","title":"魔兽领主","wordCount":267.73,"writer":"高坡"}],"武侠":[ {"allClickCount":5703.58,"allCommendCount":377.41,"secondType":"武侠幻想","title":"九鼎记","wordCount":202.6,"writer":"我吃西红柿"},{"allClickCount":1737.65,"allCommendCount":310.78,"secondType":"国术无双","title":"龙蛇演义","wordCount":223.17,"writer":"梦入神机"},{"allClickCount":1362.54,"allCommendCount":61.55,"secondType":"武侠幻想","title":"不死不灭","wordCount":139.86,"writer":"辰东"},{"allClickCount":767.35,"allCommendCount":82.52,"secondType":"国术无双","title":"傲剑天下","wordCount":125.85,"writer":"龙的天下"},{"allClickCount":736.43,"allCommendCount":64.52,"secondType":"国术无双","title":"无敌黑拳","wordCount":209.57,"writer":"大大王"},{"allClickCount":574.68,"allCommendCount":52.05,"secondType":"国术无双","title":"无限道武者路","wordCount":407.7,"writer":"饥饿2006"},{"allClickCount":509.59,"allCommendCount":27.44,"secondType":"传统武侠","title":"仗剑诀","wordCount":181.44,"writer":"二踢脚"},{"allClickCount":448.71,"allCommendCount":37.89,"secondType":"国术无双","title":"天生不凡","wordCount":90.83,"writer":"出水小葱水上飘"}],"二次元":[ {"allClickCount":749.91,"allCommendCount":1.74,"secondType":"衍生同人","title":"斗破之无上之境","wordCount":227.12,"writer":"夜雨闻铃0"},{"allClickCount":539.69,"allCommendCount":20.22,"secondType":"衍生同人","title":"星辰变后传","wordCount":108.92,"writer":"不吃西红柿"},{"allClickCount":310.54,"allCommendCount":45.53,"secondType":"变身入替","title":"异界变身狂想曲","wordCount":79.67,"writer":"破军王戟"},{"allClickCount":280.62,"allCommendCount":0.7556,"secondType":"衍生同人","title":"盘龙后传","wordCount":139.25,"writer":"吃西红柿"},{"allClickCount":255.68,"allCommendCount":12.73,"secondType":"衍生同人","title":"穿越者纵横动漫世界","wordCount":233.15,"writer":"龙之宫"},{"allClickCount":219.15,"allCommendCount":15.52,"secondType":"变身入替","title":"超级无敌变身美少女","wordCount":288.77,"writer":"草尖上的云雀"},{"allClickCount":196.42,"allCommendCount":4.35,"secondType":"衍生同人","title":"斗破之魂族帝师","wordCount":104.47,"writer":"三角四方圈圈叉"},{"allClickCount":147.95,"allCommendCount":10.88,"secondType":"变身入替","title":"异界变身之后","wordCount":72.95,"writer":"小金"}],"职场":[ {"allClickCount":1178.6,"allCommendCount":83.69,"secondType":"官场沉浮","title":"官神","wordCount":844.96,"writer":"何常在"},{"allClickCount":777.26,"allCommendCount":265.79,"secondType":"官场沉浮","title":"官道无疆","wordCount":986.78,"writer":"瑞根"},{"allClickCount":678.77,"allCommendCount":93.75,"secondType":"娱乐明星","title":"大亨传说","wordCount":179.98,"writer":"黯然销魂"},{"allClickCount":578.05,"allCommendCount":51.61,"secondType":"商战职场","title":"YY之王（原名龙）","wordCount":71.54,"writer":"撒冷"},{"allClickCount":542.89,"allCommendCount":37.01,"secondType":"商战职场","title":"重生传奇","wordCount":23.66,"writer":"紫箫"},{"allClickCount":529.34,"allCommendCount":50.18,"secondType":"娱乐明星","title":"最佳导演","wordCount":285.35,"writer":"机器人瓦力"},{"allClickCount":529.25,"allCommendCount":46.17,"secondType":"商战职场","title":"重生之资源大亨","wordCount":1191.17,"writer":"月下的孤狼"},{"allClickCount":515.74,"allCommendCount":57.92,"secondType":"娱乐明星","title":"导演万岁","wordCount":799.83,"writer":"张云.QD"}],"体育":[ {"allClickCount":1037.06,"allCommendCount":378.96,"secondType":"足球运动","title":"我们是冠军","wordCount":317.56,"writer":"林海听涛"},{"allClickCount":918.01,"allCommendCount":179.32,"secondType":"篮球运动","title":"校园篮球风云","wordCount":167.87,"writer":"大秦炳炳"},{"allClickCount":693.66,"allCommendCount":184.39,"secondType":"足球运动","title":"冠军教父","wordCount":464.35,"writer":"林海听涛"},{"allClickCount":613.47,"allCommendCount":93.15,"secondType":"篮球运动","title":"梦开始于篮球","wordCount":159.7,"writer":"郁郁林中树"},{"allClickCount":533.42,"allCommendCount":59.29,"secondType":"足球运动","title":"禁区之雄","wordCount":518.66,"writer":"林海听涛"},{"allClickCount":531.74,"allCommendCount":52.64,"secondType":"足球运动","title":"重生之足球神话","wordCount":205.31,"writer":"冰魂46"},{"allClickCount":487.36,"allCommendCount":92.08,"secondType":"足球运动","title":"冠军传奇","wordCount":479.06,"writer":"林海听涛"},{"allClickCount":481.89,"allCommendCount":29.9,"secondType":"足球运动","title":"超级教练","wordCount":550.7,"writer":"陈爱庭"}],"军事":[ {"allClickCount":1205.45,"allCommendCount":321.53,"secondType":"战争幻想","title":"复活之战斗在第三帝国","wordCount":282.95,"writer":"锋锐"},{"allClickCount":983.3,"allCommendCount":74.88,"secondType":"抗战烽火","title":"重生之红星传奇","wordCount":718.42,"writer":"豫西山人"},{"allClickCount":788.75,"allCommendCount":72.38,"secondType":"军旅生涯","title":"弹痕","wordCount":169.93,"writer":"纷舞妖姬"},{"allClickCount":473.53,"allCommendCount":16.94,"secondType":"军事战争","title":"国策","wordCount":629.63,"writer":"闪烁"},{"allClickCount":463.96,"allCommendCount":39.5,"secondType":"抗战烽火","title":"国破山河在","wordCount":192.76,"writer":"华表"},{"allClickCount":407.94,"allCommendCount":46.38,"secondType":"军事战争","title":"海魂","wordCount":590.42,"writer":"闪烁"},{"allClickCount":356.08,"allCommendCount":30.07,"secondType":"军事战争","title":"第五部队","wordCount":102.95,"writer":"纷舞妖姬"},{"allClickCount":340.46,"allCommendCount":18.31,"secondType":"战争幻想","title":"巴比伦帝国","wordCount":345.01,"writer":"华东之雄"}],"短篇":[ {"allClickCount":536.59,"allCommendCount":2.51,"secondType":"短篇小说","title":"千狼劫","wordCount":3.43,"writer":"鹤璧君"},{"allClickCount":209.73,"allCommendCount":33.09,"secondType":"短篇小说","title":"鬼屋夜话","wordCount":53.83,"writer":"谢绝假言"},{"allClickCount":133.22,"allCommendCount":133,"secondType":"短篇小说","title":"玄案","wordCount":76.32,"writer":"东方乙"},{"allClickCount":76.16,"allCommendCount":42.2,"secondType":"短篇小说","title":"剑尖上的国术","wordCount":38.78,"writer":"轩辕凌霄"},{"allClickCount":37.77,"allCommendCount":0.7158,"secondType":"短篇小说","title":"二傻","wordCount":18.04,"writer":"颜梅"},{"allClickCount":36.19,"allCommendCount":21.6,"secondType":"短篇小说","title":"婚与床","wordCount":31.59,"writer":"紫芋的世界"},{"allClickCount":11.89,"allCommendCount":3.08,"secondType":"短篇小说","title":"深层心理学","wordCount":22.32,"writer":"莲花九天落"},{"allClickCount":9.73,"allCommendCount":9.93,"secondType":"短篇小说","title":"花暝柳昏","wordCount":24.16,"writer":"流光宛转"}]}

for (var i = 1; i < 9; i++) {
  $('.part-chart-rank').append('<li><div class="chart-rank-left"><span class="chart-rank-level">'+i+'</span></div><table class="chart-rank-table"><tbody><tr><td style="width:140px;font-weight:bold;"></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table></li>')
}
$('.chart-rank-level:gt(2)').css({backgroundColor: '#b8c0cc'})
$('.part-chart-rank li').eq(0).css({height:'90px'})

$('.part-chart-rank li').each(function(){
  var $li = $(this)
  $li.hover(function(){
    $li.css({height: '90px'}).siblings().css({height: '30px'})
  },function(){
    $li.css({height: '30px'})
    $('.part-chart-rank li').eq(0).css({height: '90px'})
  })
})

changeBookData('玄幻')
function changeBookData(type) {
  $('.part-chart-title').text(type + '小说top8')
  Books[type].forEach( function(book, index) {
    var $tds = $('.part-chart-rank li').eq(index).find('td')
    $tds.eq(0).text(book.title)
    $tds.eq(1).text(Math.round(book.allClickCount) + ' 万总点击')
    $tds.eq(2).text('作者 ' + book.writer)
    $tds.eq(3).text(type+ ' · ' + book.secondType)
    $tds.eq(4).text(Math.round(book.wordCount) + ' 万总字数')
    $tds.eq(5).text(Math.round(book.allCommendCount) + ' 万总推荐')
  });
}


})()