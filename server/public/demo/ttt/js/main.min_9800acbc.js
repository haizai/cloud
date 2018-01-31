var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);n.prototype=e.prototype,t.prototype=new n},__awaiter=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(i,r){function a(t){try{c(o.next(t))}catch(e){r(e)}}function s(t){try{c(o["throw"](t))}catch(e){r(e)}}function c(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(a,s)}c((o=o.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function n(t){return function(e){return o([t,e])}}function o(n){if(i)throw new TypeError("Generator is already executing.");for(;c;)try{if(i=1,r&&(a=r[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(r,n[1])).done)return a;switch(r=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,r=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(a=c.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){c.label=n[1];break}if(6===n[0]&&c.label<a[1]){c.label=a[1],a=n;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(n);break}a[2]&&c.ops.pop(),c.trys.pop();continue}n=e.call(t,c)}catch(o){n=[6,o],r=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,r,a,s,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},Log=function(){function t(){}return t.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];console.log.apply(console,t)},t}();__reflect(Log.prototype,"Log");var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,n){function o(o){e.call(n,o,t)}if(RES.hasRes(t)){var i=RES.getRes(t);i?o(i):RES.getResAsync(t,o,this)}else RES.getResByUrl(t,o,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var r,Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(n){switch(n.label){case 0:return[4,this.loadResource()];case 1:return n.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return t=n.sent(),this.startAnimation(t),[4,platform.login()];case 3:return n.sent(),[4,platform.getUserInfo()];case 4:return e=n.sent(),console.log(e),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return n.sent(),this.stage.removeChild(t),[3,5];case 4:return e=n.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,n){var o=new eui.Theme("resource/default.thm.json",t.stage);o.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){var t=new egret.TextField;this.textfield=t;var e=this.createBitmapByName("bg_jpg");this.addChild(e);var n=this.stage.stageWidth,o=this.stage.stageHeight;e.width=n,e.height=o,r=new Root(this)},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,n=RES.getRes(t);return e.texture=n,e},e.prototype.startAnimation=function(t){var e=this,n=new egret.HtmlTextParser,o=t.map(function(t){return n.parse(t)}),i=this.textfield,r=-1,a=function(){r++,r>=o.length&&(r=0);var t=o[r];i.textFlow=t;var n=egret.Tween.get(i);n.to({alpha:1},200),n.wait(2e3),n.to({alpha:0},200),n.call(a,e)};a()},e.prototype.onButtonClick=function(t){var e=new eui.Panel;e.title="Title",e.horizontalCenter=0,e.verticalCenter=0,this.addChild(e)},e}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var SocketIO=function(){function t(t){this.logic=t,this.connet()}return t.prototype.connet=function(){this.socket=io("http://localhost/ttt")},t.prototype.tryMove=function(t,e){this.socket.emit("tryMove",t,e)},t}();__reflect(SocketIO.prototype,"SocketIO");var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,n,o){function i(t){e.call(o,t)}function r(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),n.call(o))}"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(o,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),RES.getResByUrl(t,i,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var ConstantData=function(){function t(){}return t.getStageWidth=function(){return egret.MainContext.instance.stage.stageWidth},t.getStageHeight=function(){return egret.MainContext.instance.stage.stageHeight},t.TextColors={roomBlue:7194537,white:16777215,milkWhite:16511407,grayWhite:13547170,yellow:16776960,lightYellow:16765813,orangeYellow:16750848,orange:16764489,red:15799040,green:58624,lgreen:6474584,blue:1742039,grayBlue:3101047,purple:15284466,pink:16724016,black:3026221,golden:16766720},t.LabelFontSize={miniSize:12,smallSize:14,middleSize:18,normalSize:24,bigSize:36},t.frame=60,t.CONTENT_WIDTH=640,t.CONTENT_HEIGHT=1136,t}();__reflect(ConstantData.prototype,"ConstantData");var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Utils=function(){function t(){}return t.randomInt=function(t,e){var n=e-t+1;return Math.floor(Math.random()*n+t)},t.randomIntString=function(t){for(var e="",n=0;t>n;n++)e+=this.randomInt(0,9).toString();return e},t.shuffle=function(t,e){void 0===e&&(e=t.length);for(var n=t.slice(0),o=n.length,i=[],r=o;r>o-e;r--){var a=n.splice(~~(Math.random()*r),1)[0];i.push(a)}return i},t.getRandomItemByArray=function(t){var e=this.randomInt(0,t.length-1);return t[e]},t.getRandomIndexByWeights=function(t){for(var e=0,n=Math.random()*t.reduce(function(t,e){return t+e}),o=0;o<t.length;o++)if(e+=t[o],e>=n)return o},t}();__reflect(Utils.prototype,"Utils");var Board=function(t){function e(e){var n=t.call(this)||this;n.thick=5,n.chessmen=[],n.room=e;var o=ConstantData.CONTENT_WIDTH;n.height=o+2*n.thick,n.width=o,n.cellUnit=(o-10-2*n.thick)/3;var i=new egret.Shape;i.graphics.beginFill(0,1),i.graphics.drawRect(10,n.cellUnit,o-20,n.thick),i.graphics.endFill(),n.addChild(i);var r=new egret.Shape;r.graphics.beginFill(0,1),r.graphics.drawRect(10,2*n.cellUnit+n.thick,o-20,n.thick),r.graphics.endFill(),n.addChild(r);var a=new egret.Shape;a.graphics.beginFill(0,1),a.graphics.drawRect(10+n.cellUnit,0,n.thick,o-20),a.graphics.endFill(),n.addChild(a);var s=new egret.Shape;s.graphics.beginFill(0,1),s.graphics.drawRect(10+2*n.cellUnit+n.thick,0,n.thick,o-20),s.graphics.endFill(),n.addChild(s);for(var c,l=function(t){for(var e=function(e){c=new egret.Shape,c.graphics.beginFill(0,0),c.graphics.drawRect(10+t*(h.cellUnit+h.thick),e*(h.cellUnit+h.thick),h.cellUnit,h.cellUnit),c.graphics.endFill(),h.addChild(c),c.touchEnabled=!0,c.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){Log.info("tap",t,e),n.tap(t,e)},h)},o=0;2>=o;o++)e(o)},h=this,u=0;2>=u;u++)l(u);return n}return __extends(e,t),e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,n=RES.getRes(t);return e.texture=n,e},e.prototype.move=function(t,e,n){var o=this.createBitmapByName(t+"_png");o.width=this.cellUnit,o.height=this.cellUnit,o.x=10+(this.cellUnit+this.thick)*e,o.y=(this.cellUnit+this.thick)*n,this.chessmen.push(o),this.addChild(o)},e.prototype.tap=function(t,e){this.room.root.socketio.tryMove(t,e)},e.prototype.reset=function(){var t=this;this.chessmen.forEach(function(e){return t.removeChild(e)}),this.chessmen=[]},e}(eui.Group);__reflect(Board.prototype,"Board");var Lobby=function(t){function e(e){var n=t.call(this)||this;n.inReady=!1,n.root=e,n.myGroup=new eui.Group,n.myGroup.width=ConstantData.CONTENT_WIDTH,n.myGroup.height=ConstantData.CONTENT_HEIGHT,n.addChild(n.myGroup);var o=new eui.VerticalLayout;o.gap=30,o.paddingTop=ConstantData.CONTENT_WIDTH/2-50,o.horizontalAlign=egret.HorizontalAlign.CENTER,n.myGroup.layout=o;var i=new eui.Label;return i.textColor=41430,i.text="井字棋",i.size=36,n.myGroup.addChild(i),n.nameInput=new eui.TextInput,n.nameInput.skinName="resource/eui_skins/TextInputSkin.exml",n.nameInput.prompt="请输入你的昵称",n.myGroup.addChild(n.nameInput),n.btn=new eui.Button,n.btn.label="开始匹配!",n.myGroup.addChild(n.btn),n.btn.percentWidth=30,n.btn.height=80,n.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,n.btnHandler,n),n.infoLabel=new eui.Label,n.infoLabel.textColor=0,n.infoLabel.size=20,n.infoLabel.text="",n.myGroup.addChild(n.infoLabel),n}return __extends(e,t),e.prototype.btnHandler=function(){if(this.toggleBtn(),this.inReady){var t=this.nameInput.text||Utils.randomIntString(6);this.root.socketio.ready(t)}else this.root.socketio.abandonReady()},e.prototype.toggleBtn=function(){this.inReady=!this.inReady,this.inReady?this.btn.label="终止匹配!":(this.btn.label="开始匹配!",this.info("已终止匹配"))},e.prototype.info=function(t){this.infoLabel.text=t},e}(egret.DisplayObjectContainer);__reflect(Lobby.prototype,"Lobby");var Room=function(t){function e(e){var n=t.call(this)||this;n.thick=5,n.root=e;var o=new eui.Group;o.width=ConstantData.CONTENT_WIDTH,o.height=ConstantData.CONTENT_HEIGHT,n.addChild(o);var i=new eui.VerticalLayout;i.gap=30,i.paddingTop=20,i.horizontalAlign=egret.HorizontalAlign.CENTER,o.layout=i;var r=new eui.Label;return r.textColor=41430,r.text="井字棋",r.size=36,o.addChild(r),n.nameLable=new eui.Label,n.nameLable.text="namelabel",n.nameLable.textColor=0,o.addChild(n.nameLable),n.board=new Board(n),o.addChild(n.board),n.infoLable=new eui.Label,n.infoLable.textColor=0,n.infoLable.text="info",o.addChild(n.infoLable),n.exitBtn=new eui.Button,n.exitBtn.label="退出游戏",o.addChild(n.exitBtn),n.exitBtn.percentWidth=30,n.exitBtn.height=60,n.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){n.root.socketio.exit()},n),n.againBtn=new eui.Button,n.againBtn.label="再来一局",o.addChild(n.againBtn),n.againBtn.percentWidth=30,n.againBtn.height=60,n.againBtn.visible=!1,n.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){n.root.socketio.tryAgain(),n.info("等待对方")},n),n}return __extends(e,t),e.prototype.info=function(t){this.infoLable.text=t},e.prototype.infoName=function(t){this.nameLable.text=t},e.prototype.move=function(t,e,n){this.board.move(t,e,n)},e.prototype.reset=function(){this.board.reset(),this.againBtn.visible=!1},e.prototype.end=function(){this.againBtn.visible=!0},e}(egret.DisplayObjectContainer);__reflect(Room.prototype,"Room");var Root=function(){function t(t){this.main=t,this.lobby=new Lobby(this),this.room=new Room(this),this.main.addChild(this.lobby),this.socketio=new Socketio(this)}return t.prototype.start=function(){this.lobby.toggleBtn(),this.lobby.info(""),this.toRoom()},t.prototype.toRoom=function(){this.main.removeChild(this.lobby),this.main.addChild(this.room)},t.prototype.toLobby=function(){this.main.removeChild(this.room),this.main.addChild(this.lobby)},t.prototype.exit=function(t){this.room.board.reset(),this.toLobby(),t&&this.lobby.info(t)},t}();__reflect(Root.prototype,"Root");var Socketio=function(){function t(t){this.nowPlayer=1,this.myPlayer=1,this.name="name",this.cells={"0_0":!1,"0_1":!1,"0_2":!1,"1_0":!1,"1_1":!1,"1_2":!1,"2_0":!1,"2_1":!1,"2_2":!1},this.root=t,this.connetSocket(),this.room=this.root.room}return t.prototype.tryMove=function(t,e){this.cells[t+"_"+e]?Log.info(t,e,"have"):this.socket.emit("tryMove",t,e)},t.prototype.ready=function(t){this.name=t,this.socket.emit("ready",t)},t.prototype.abandonReady=function(){this.socket.emit("abandonReady",name)},t.prototype.tryAgain=function(){this.socket.emit("tryAgain")},t.prototype.exit=function(){this.socket.emit("exit"),this.root.exit("已退出游戏")},t.prototype.connetSocket=function(){var t=this;this.socket=io("http://localhost/ttt"),this.socket.on("connect",function(){Log.info("connect",t.socket)}),this.socket.on("info",function(e){switch(console.info("info",e),e){case"wait":t.root.lobby.info("匹配中...");break;case"disconnect":Log.info("disconnect")}}),this.socket.on("reset",function(e){Log.info("reset",e),t.room.reset(),t.cells={"0_0":!1,"0_1":!1,"0_2":!1,"1_0":!1,"1_1":!1,"1_2":!1,"2_0":!1,"2_1":!1,"2_2":!1},e.forEach(function(e){e.id==t.socket.id?t.myPerson=e:t.otherPerson=e}),1==t.myPerson.player?t.room.info("你先落子"):t.room.info("等待对方落子")}),this.socket.on("start",function(e,n){Log.info("start",e,n),t.root.start(),e.forEach(function(e){e.id==t.socket.id?t.myPerson=e:t.otherPerson=e}),t.room.infoName(t.name+" VS "+t.otherPerson.name+" 房间号:"+n),1==t.myPerson.player?t.room.info("你先落子"):t.room.info("等待对方落子")}),this.socket.on("move",function(e,n,o){Log.info("move",e,n,o),t.cells[n+"_"+o]=!0,t.room.move(e,n,o),1==t.nowPlayer?t.nowPlayer=2:t.nowPlayer=1,t.nowPlayer===t.myPlayer?t.room.info("等待对方落子"):t.room.info("请落子")}),this.socket.on("end",function(e,n,o,i){Log.info("end",e,n,o,i),t.room.move(e,n,o),i===t.myPerson.player?t.room.info("你赢了"):0===i?t.room.info("平局"):t.room.info("你输了"),t.room.end()}),this.socket.on("otherExit",function(e){t.root.exit("对方退出游戏"),t.socket.emit("leaveroom",e)})},t}();__reflect(Socketio.prototype,"Socketio");