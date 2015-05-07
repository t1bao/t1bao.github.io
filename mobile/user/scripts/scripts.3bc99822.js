"use strict";function onBackKeyDown(a){console.log("onbackkey"),a.preventDefault()}document.addEventListener("deviceready",function(){console.log("deviceready")},!1),document.addEventListener("backbutton",onBackKeyDown,!1),angular.module("mmbaoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$httpProvider","$sceProvider",function(a,b,c){b.defaults.useXDomain=!0,b.defaults.withCredentials=!0,window.errors=webErrors.errors,c.enabled(!1),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/material-design/about.html",controller:"AboutCtrl"}).when("/user/home",{templateUrl:"views/user/home.html",controller:"UserCtrl"}).when("/user/login",{templateUrl:"views/user/login.html",controller:"UserCtrl"}).when("/user/register",{templateUrl:"views/user/register.html",controller:"UserCtrl"}).when("/user/password/retrieve",{templateUrl:"views/user/password/retrieve.html",controller:"UserCtrl"}).when("/user/password/retrieve",{templateUrl:"views/user/password/retrieve.html",controller:"UserCtrl"}).when("/grocery",{templateUrl:"views/grocery/list.html",controller:"GroceryCtrl"}).when("/grocery/:page",{templateUrl:"views/grocery/list.html",controller:"GroceryCtrl"}).when("/grocery/info/:id",{templateUrl:"views/grocery/info.html",controller:"GroceryCtrl"}).when("/order/list",{templateUrl:"views/order/list.html",controller:"OrderCtrl"}).when("/order/list/:page",{templateUrl:"views/order/list.html",controller:"OrderCtrl"}).when("/user/settings",{templateUrl:"views/user/settings.html",controller:"UserCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"SystemCtrl"}).when("/user/feedback",{templateUrl:"views/user/feedback.html",controller:"UserCtrl"}).when("/user/profile",{templateUrl:"views/user/profile.html",controller:"UserCtrl"}).when("/user/subscribe",{templateUrl:"views/user/subscribe.html",controller:"UserCtrl"}).when("/user/subscribe/:page",{templateUrl:"views/user/subscribe.html",controller:"UserCtrl"}).when("/address/list",{templateUrl:"views/address/list.html",controller:"AddressCtrl"}).when("/address/list/:page",{templateUrl:"views/address/list.html",controller:"AddressCtrl"}).when("/address/add",{templateUrl:"views/address/add.html",controller:"AddressCtrl"}).when("/address/edit/:id",{templateUrl:"views/address/edit.html",controller:"AddressCtrl"}).when("/cart",{templateUrl:"views/cart/list.html",controller:"CartCtrl"})}]),angular.module("mmbaoApp").controller("MainCtrl",["$scope","$location","messages","dialog",function(a,b,c,d){var e=!1;a.login=function(){if(!e){e=!0;var a=new FormData($("form")[0]);c.user.login(a,function(){e=!1,d.toast("登录成功！"),b.path("user/home")})}},a.toRegister=function(){b.path("user/register")}}]),angular.module("mmbaoApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("mmbaoApp").service("api",["$http","$location","url","dialog","fallback","prefix",function(a,b,c,d,e,f){function g(a){return c+f+a}function h(c,d,f,h){if(!i){i=!0;var j;j=d?d instanceof FormData?a.post(g(c),d,{withCredentials:!0,headers:{"Content-Type":void 0},transformRequest:angular.identity}):a.post(g(c),d):a.post(g(c)),h=h||e,j.success(function(a){if(i=!1,"code"in a)if("code"in a&&!a.code)f(a);else switch(a.code){case errors.USER_NOT_LOGIN.code:b.path(h);break;case errors.DATABASE_ERROR.code:case errors.INPUT_INVALID.code:case errors.EXISTED.code:case errors.NOT_FOUND.code:alert(a.message);break;default:alert(a.message),b.path(h)}else;}).error(function(){i=!1,"user/profile"===c&&b.path(h)})}}var i=!1;return{send:function(a,b,c,d){h(a,b,c,d)},auth:function(){h("user/profile",null,function(a){a&&"code"in a&&b.path(a.code?"/user/home":"/user/login")})},logout:function(a){h("user/logout",null,function(b){a(b)})},list:function(a,b,c){h(a,b,function(a){c(a)})},upload:function(c,d,f){a.post(g(c),d,{withCredentials:!0,headers:{"Content-Type":void 0},transformRequest:angular.identity}).success(function(a){if("code"in a)if("code"in a&&!a.code)f(a);else switch(a.code){case errors.USER_NOT_LOGIN.code:b.path(e);break;default:alert(a.message)}else;}).error(function(){b.path(e)})},success:function(a,b,c,d){h(a,b,function(a){return d?c(a):void(a.code===errors.SUCCESS.code&&c(a))})}}}]),angular.module("mmbaoApp").service("dialog",function(){return{alert:function(){},confirm:function(){},toast:function(){}}});var url="http://api.t1bao.com/";window.localStorage&&window.localStorage.getItem("url")&&(url=window.localStorage.getItem("url")),angular.module("mmbaoApp").constant("url",url).constant("fallback","user/login").constant("prefix","customer/"),angular.module("mmbaoApp").controller("UserCtrl",["$scope","$route","$location","messages","hardware","api","dialog","storage","barcode","lbs","user","images",function(a,b,c,d,e,f,g,h,i,j,k,l){a.isEditing=!1;var m="user";switch(a.$on("$includeContentLoaded",function(){a.module=m}),b.current.$$route.originalPath){case"/user/register":case"/user/login":case"/user/logout":case"/user/password/retrieve":break;case"/user/subscribe":case"/user/subscribe/:page":k.profile(function(){console.log("profile"),$(".progress-bar").hide();var c=b.current.params.page;c||(c=1),k.subscribed({page:c},function(b){a.groceries=b.data.results,h.set("subscribed",a.groceries)})});break;case"/user/profile":k.profile(function(b){console.log("profile"),$(".progress-bar").hide(),a.user=b,b.extra.logo&&(a.logo=b.extra.logo.url)}),a.edit=function(){a.isEditing=!0,$("input[disabled]").removeAttr("disabled"),$("textarea[disabled]").removeAttr("disabled")},a.update=function(){var b=new FormData($("form")[0]);k.update(b,function(){a.isEditing=!1,g.toast("更新成功！"),setTimeout(function(){c.path("user/home")},1e3)})};break;default:k.profile(function(b){console.log("profile"),$(".progress-bar").hide(),a.user=b,b.extra.logo&&(a.logo=b.extra.logo.url)})}a.login=function(){var a=new FormData($("form")[0]);k.login(a)},a.logout=function(){k.logout()},a.register=function(){var a=new FormData($("form")[0]);console.log(a),k.register(a)},a.toRegister=function(){c.path("user/register")},a.toLogin=function(){c.path("user/login")},a.goAbout=function(){c.path("about")},a.goProfile=function(){c.path("user/profile")},a.goFeedback=function(){c.path("user/feedback")},a.feedback=function(){var a=new FormData($("form")[0]);console.log(a),k.feedback(a,function(){alert("反馈成功！"),c.path("user/home")})},a.fileChanged=function(){l.preview($("input[type=file][name=image]")[0].files,function(a){$("img[name=image-logo]").attr("src",a)})},a.saveProfile=function(){var a=new FormData($("form")[0]);console.log(a),k.update(a,function(){alert("更新成功！"),c.path("user/home")})},a.goAddresses=function(){c.path("address/list")},a.goOrders=function(){c.path("order/list")},a.goSubscribed=function(){c.path("user/subscribe")}}]),angular.module("mmbaoApp").controller("StoreCtrl",["$scope","$location","api","dialog","store",function(a,b,c,d,e){a.isEditing=!1,e.profile(function(b){a.store=b.data,$(".progress-bar").hide()}),a.back=function(){b.path("user/home")},a.edit=function(){a.isEditing=!0,$("input[disabled]").removeAttr("disabled"),$("textarea[disabled]").removeAttr("disabled")},a.update=function(){var c=new FormData($("form")[0]);e.update(c,function(){a.isEditing=!1,d.toast("更新成功！"),setTimeout(function(){b.path("user/home")},1e3)})}}]),angular.module("mmbaoApp").controller("MerchandiseCtrl",["$scope","$location","$route","api","dialog","merchandise","$timeout","images","hardware","storage","barcode",function(a,b,c,d,e,f,g,h,i,j,k){var l=c.current.$$route.originalPath;switch(l){case"/merchandise/add":var m=new FormData($("form")[0]);f.add(m,function(a){a.code&&(e.toast("添加成功!"),g(function(){b.path("user/home")},1e3))});break;case"/merchandise/list":var n=f.getList($(".progress-bar"),function(b,c){a.merchandises=b.results,a.total=b.total,a.page=b.page,a.lastPage=c});n.list(),a.next=function(){n.next()},a.prev=function(){n.prev()},a.headers=[{name:"商品图片"},{name:"商品名"},{name:"操作"}],a.remove=function(a){confirm("确定要删除吗?操作不可恢复!")&&a.remove(a.merchandise.id,function(){n.list()})},a.clickItem=function(a){j.set("merchandise",a),b.path("/merchandise/info")};break;case"/merchandise/info":$(".button").hide(),f.query(a,$(".progress-bar"),function(){}),a.edit=function(){$(".edit").hide(),$("input").attr("disabled",!1),$("textarea").attr("disabled",!1),$(".update").removeAttr("hidden")},a.update=function(){var a=new FormData($("form")[0]);f.update($(".progress-bar"),a,function(a){a&&(e.toast("更新成功!"),b.path("user/home"))})}}a.toAdd=function(){b.path("/merchandise/add")},a.back=function(){b.path("user/home")},a.save=function(){var a=new FormData($("form")[0]);d.success("merchandise/add",a,function(){e.toast("添加成功!"),setTimeout(function(){b.path("scan/barcode")},1e3)})},a.startCapture=function(){console.log("camera"),i.camera.start(function(a,b){$("input[type=file][name=image]").attr("src",b)})},a.fileChanged=function(){a.images=[],h.preview($("input[type=file][name=image]")[0].files,function(b){console.log(b),a.images.push(b),a.$apply()})},a.bind=function(a){var c=j.get("barcode");k.bind(c.id,a.id,function(){console.log(a),b.path("/barcode/list")})}}]),angular.module("mmbaoApp").controller("BarcodeCtrl",["$scope","$location","$route","$mdDialog","api","dialog","storage","merchandise","barcode",function(a,b,c,d,e,f,g,h,i){var j,k=c.current.$$route.originalPath;switch(k){case"/barcode/bind/:id":a.headers=[{name:"图片"},{name:"商品名"},{name:"操作"}],j=h.getList($(".progress-bar"),function(b,c){b.results.length&&(a.merchandises=b.results,a.total=b.total,a.page=b.page),a.lastPage=c}),j.list(),a.next=function(){j.next()},a.prev=function(){j.prev()},a.bind=function(a){var c=g.get("barcode");i.bind(c.id,a.id,function(){b.path("barcode/list")})},a.back=function(){b.path("barcode/list")};break;case"/barcode/info":a.barcode=g.get("barcode_info");var l=!1;$(".progress-bar").show(),l=!0,i.query(a.barcode.code,a.barcode.format,function(){l=!1,$(".progress-bar").hide()}),a.back=function(){b.path("barcode/list")},a.update=function(){var a=new FormData($("form")[0]);i.update($(".progress-bar"),a,function(a){a.code&&(f.toast("更新成功!"),b.path("user/home"))})};break;default:a.headers=[{name:"商品图片"},{name:"格式"},{name:"条码值"},{name:"商品名"},{name:"操作"}],j=i.getList($(".progress-bar"),function(b,c){b.results.length&&(a.barcodes=b.results,a.total=b.total,a.page=b.page),a.lastPage=c}),j.list(),a.next=function(){j.next()},a.prev=function(){j.prev()},a.remove=function(a){confirm("确定要删除吗?操作不可恢复!")&&a.remove(a.id,function(){$("barcode-remove-"+a.id).remove()})},a.unbind=function(a){confirm("确定解决商品绑定吗？操作不可恢复")&&i.unbind(a.barcode.id,function(){j.list()})},a.openBind=function(a){g.set("barcode",a),b.path("barcode/bind/"+a.id)},a.clickItem=function(a){g.set("barcode_info",a.barcode),b.path("/barcode/info")},a.back=function(){b.path("user/home")}}}]),angular.module("mmbaoApp").service("admin",function(){}),angular.module("mmbaoApp").service("messages",["api",function(a){return{user:{login:function(b,c){a.success("user/login",b,c)},logout:function(b){a.success("user/logout",{},b)},profile:function(b){a.success("user/profile",{},b)},register:function(b,c){a.success("user/register",b,c)},update:function(b,c){a.success("user/update",b,c)},feedback:function(b,c){a.success("user/feedback",b,c)},subscribed:function(b,c){a.success("user/subscribed",b,c)}},location:{update:function(b,c){a.success("location/update",b,c)}},grocery:{list:function(b,c){a.success("store/list",b,c)},info:function(b,c){a.success("store/info",b,c)},subscribe:function(b,c){a.success("store/subscribe",b,c)},unsubscribe:function(b,c){a.success("store/unsubscribe",b,c)}},merchandise:{list:function(b,c){a.success("merchandise/list",b,c)},info:function(b,c){a.success("merchandise/info",b,c)}},order:{create:function(b,c){a.success("order/create",b,c)},list:function(b,c){a.success("order/list",b,c)}},address:{add:function(b,c){a.success("address/add",b,c)},list:function(b,c){a.success("address/list",b,c)},update:function(b,c){a.success("address/update",b,c)},remove:function(b,c){a.success("address/remove",b,c)}},category:{list:function(b,c){a.success("category/list",b,c)},merchandise:function(b,c){a.success("category/merchandise/list",b,c)}}}}]),angular.module("mmbaoApp").service("storage",function(){var a={};return{set:function(b,c){a[b]=c,window.localStorage&&window.localStorage.setItem(b,JSON.stringify(c))},get:function(b){if(a[b])return a[b];if(window.localStorage){var c=window.localStorage.getItem(b);return c=JSON.parse(c)}}}}),angular.module("mmbaoApp").controller("ScanCtrl",["$scope","$location","$timeout","dialog","storage","barcode","api","hardware","images","merchandise",function(a,b,c,d,e,f,g,h,i,j){a.barcode=e.get("barcode"),a.back=function(){b.path("user/home")};var k=j.getList($(".progress-bar"),function(b,c){a.merchandises=b.results,a.total=b.total,a.page=b.page,a.lastPage=c});k.list(),a.next=function(){k.next()},a.prev=function(){k.prev()},a.add=function(){b.path("/scan/add/"+a.barcode.id)},a.backBarcode=function(){b.path("/scan/barcode")},a.save=function(){var a=new FormData($("form")[0]);g.success("merchandise/add",a,function(){d.toast("添加成功!"),setTimeout(function(){b.path("scan/barcode")},1e3)})},a.startCapture=function(){console.log("camera"),h.camera.start(function(a,b){$("input[type=file][name=image]").attr("src",b)})},a.fileChanged=function(){a.images=[],i.preview($("input[type=file][name=image]")[0].files,function(b){console.log(b),a.images.push(b),a.$apply()})},a.bind=function(a){var c=e.get("barcode");f.bind(c.id,a.id,function(){console.log(a),b.path("/barcode/list")})}}]),angular.module("mmbaoApp").service("hardware",["dialog",function(a){return{camera:{start:function(b){if(!navigator.camera)return void a.alert("no camera found!");var c={quality:50,destinationType:window.Camera.DestinationType.FILE_URI,sourceType:1,encodingType:0};navigator.camera.getPicture(function(a){b(!0,a)},function(){console.log("failed to capture images"),b(!1)},c)}},scanner:{open:function(a){if(window.cordova)window.cordova.plugins.barcodeScanner.scan(function(b){null===b.text||void 0===b.text||""===b.text?a(!1):a(!0,b.text,b.format)});else{var b="4719579945280";b="4719579945280";var c="EAN_13";a(!0,b,c)}}}}}]),angular.module("mmbaoApp").service("images",function(){return{preview:function(a,b){function c(a){var c=new FileReader;c.readAsDataURL(a),c.onload=function(a){b(a.target.result)}}if(a)for(var d=0;d<a.length;d++)c(a[d])}}}),angular.module("mmbaoApp").service("user",["messages","$location","dialog",function(a,b,c){var d=a.user,e=null;return{isLogin:function(){return e?!0:!1},profile:function(a){return e?void a(e):void d.profile(function(b){e=b.data,a(e)})},login:function(d){a.user.login(d,function(){c.toast("登录成功！"),b.path("user/home")})},logout:function(){a.user.logout(function(){e=null,b.path("user/login")})},register:function(d){a.user.register(d,function(){c.toast("注册成功！"),b.path("user/home")})},update:function(d){a.user.update(d,function(){c.toast("更新成功！"),e=null,b.path("user/home")})},feedback:function(b,c){a.user.feedback(b,c)},subscribed:function(b,c){a.user.subscribed(b,c)}}}]),angular.module("mmbaoApp").service("merchandise",["messages",function(a){return{list:function(b,c,d){a.merchandise.list({id:b,page:c},d)}}}]),angular.module("mmbaoApp").service("barcode",["messages",function(a){return{getList:function(b,c){var d=1,e=!1,f=!1;return{list:function(g){d=g||d,f||(b.show(),f=!0,a.barcode.list(d,function(a){f=!1,b.hide(),c(a.data,e)}))},prev:function(){d>1&&(d--,this.list(d))},next:function(){d++,this.list(d)}}},add:function(b,c){a.barcode.add(b,c)},remove:function(b,c){a.barcode.remove(b,c)},bind:function(b,c,d){a.barcode.bind(b,c,d)},unbind:function(b,c){a.barcode.unbind(b,c)},query:function(b,c,d){a.barcode.query(b,c,function(a){switch(a.code){case errors.NOT_FOUND.code:d(!1,a.data);break;case errors.SUCCESS.code:d(!0,a.data)}})}}}]),angular.module("mmbaoApp").service("store",["messages",function(a){return{profile:a.store.profile,update:a.store.update}}]),angular.module("mmbaoApp").service("lbs",["messages",function(a){return{getPos:function(b){if(navigator.geolocation){var c=function(c){a.location.update(c.coords,function(a,c){b(!0,c)})},d=function(a){b(!1,a)};navigator.geolocation.getCurrentPosition(c,d)}else console.log("not supported")}}}]),angular.module("mmbaoApp").controller("GroceryCtrl",["$scope","$timeout","$route","$location","$filter","grocery","merchandise","storage","messages","user","modal",function(a,b,c,d,e,f,g,h,i,j,k){function l(a){var b=h.get("cart");if(b&&b[a]){var c=!1,d=0,f=0;for(var g in b[a].merchandises){c=!0,v.set(g,b[a].merchandises[g].count),d+=b[a].merchandises[g].count-1+1;var i=(b[a].merchandises[g].price||0)-1+1;f+=(b[a].merchandises[g].count-1+1)*i}c&&$(".cart > b").css("visibility","visible"),$(".cart-bar-item > b").html(d),$(".cart-bar-item > h2 > span").html(e("currency")(f))}}function m(a,b,c,d){var e=a.id,f=h.get("cart");f||(f={}),f[e]||(f[e]={name:a,merchandises:{}});var g=v.get(b.id);g?f[e].merchandises[b.id]={count:v.get(b.id),merchandise:b,price:c,images:d}:delete f[e].merchandises[b.id],h.set("cart",f),l(e)}function n(a,b){if(a){var c=h.get("cart"),d={};d.store=a;var e=0,f=0,g=[];if(!c[a])return void k.alert("请选择商品");for(var j in c[a].merchandises){var l=c[a].merchandises[j];e+=(l.count-1+1)*(l.price-1+1),f+=l.count-1+1;var m={id:j,name:l.merchandise.name,brand:l.merchandise.brand,desc:l.merchandise.desc,number:l.count,price:l.price};l.images&&l.images.length&&(m.url=l.images[0].url),g.push(m)}if(!g.length)return b(errors.NOT_FOUND);d.summary=e,d.merchandises=g,d.total=f,i.order.create({json:JSON.stringify(d)},b)}else b(errors.NOT_FOUND)}var o="grocery";a.$on("$includeContentLoaded",function(){a.module=o});var p=c.current.params.page;p||(p=1);var q=function(a){var b=h.get("subscribed");if(b&&b.length)for(var c=0;c<b.length;c++)if(b[c].id===a)return!0;return!1},r=function(){return j.subscribed({page:1},function(b){a.groceries=b.data.results,h.set("subscribed",a.groceries)}),!1},s=function(a){for(var b=h.get("subscribed"),c=0;c<b.length;c++)b[c].id===a&&delete b[c]};switch(c.current.$$route.originalPath){case"/grocery":case"/grocery/:page":f.list(p,function(b){console.log(b),a.data=b,a.groceries=b.results});break;case"/grocery/info/:id":case"/grocery/info/:id/:page":var t=c.current.params.id,u=f.getItem(t);u?(a.grocery=u,g.list(t,p,function(b){console.log(b),a.merchandises=b.data.results,j.isLogin()&&j.subscribed({page:1},function(b){a.groceries=b.data.results,h.set("subscribed",a.groceries),a.subscribed=q(t)}),i.category.list({id:t,page:p},function(b){a.categories=b.data.results})})):f.info({id:t},function(b){console.log(b),a.grocery=b.data,g.list(t,p,function(b){console.log(b),a.merchandises=b.data.results,j.isLogin()&&j.subscribed({page:1},function(b){a.groceries=b.data.results,h.set("subscribed",a.groceries),a.subscribed=q(t)}),i.category.list({id:t,page:p},function(b){a.categories=b.data.results})})})}a.count=0;var v={get:function(a){return $(".count-"+a).html()},set:function(a,b){$(".count-"+a).html(b),b>0&&$(".minus-"+a).removeClass("disabled")},inc:function(a){var b=this.get(a);b++,$(".count-"+a).html(b),$(".minus-"+a).removeClass("disabled")},desc:function(a){var b=this.get(a);b>0&&(b--,0>=b&&$(".minus-"+a).addClass("disabled"),$(".count-"+a).html(b))}};a.minus=function(b,c,d,e){v.desc(b),m(a.grocery,c,d,e)},a.plus=function(b,c,d,e){v.inc(b),m(a.grocery,c,d,e)},a.order=function(){var a=c.current.params.id;a&&n(a,function(){var c=h.get("cart");delete c[a],h.set("cart",c),b(function(){d.path("/order/list/1")},1e3)})},b(function(){var a=c.current.params.id;console.log("inside time out"),l(a)},1e3),a.subscribe=function(b){console.log(b),a.subscribed?f.unsubscribe(b.id,function(c){console.log(c),a.subscribed=!1,s(b.id)}):f.subscribe(b.id,function(c){console.log(c),a.subscribed=!0,r(b.id)})},a.getCategory=function(b){var d=c.current.params.id;$("#list-category > a").removeClass("active"),$("#list-category > a").each(function(){var a=$(this).attr("id");a==="category-"+b.id&&$(this).addClass("active")}),i.category.merchandise({id:d,page:1,category:b.id},function(b){a.merchandises=b.data.results})},a.getFullMerchandise=function(){$("#list-category > a").removeClass("active"),$("#list-category > a#category-0").addClass("active"),g.list(t,p,function(b){console.log(b),a.merchandises=b.data.results})}}]),angular.module("mmbaoApp").service("grocery",["messages",function(a){var b=a.grocery,c=null;return{subscribe:function(a,c){b.subscribe({id:a},c)},unsubscribe:function(a,c){b.unsubscribe({id:a},c)},list:function(a,d){b.list({page:a},function(a){c=a.data.results,d(a.data)})},getItem:function(a){if(!c)return null;for(var b=0;b<c.length;b++){var d=c[b];if(d&&d.id===a)return d}return null},info:b.info}}]),angular.module("mmbaoApp").filter("currency",function(){return function(a){return a=parseFloat(a).toFixed(2),isNaN(a)&&(a=0),parseFloat(a).toFixed(2)}}),angular.module("mmbaoApp").controller("OrderCtrl",["$scope","$route","$timeout","messages",function(a,b,c,d){function e(a){console.log("keydown 1");var b=$("#order-"+a.id);$(".cancel",b).removeClass("hidden").show(),$(".delete",b).removeClass("hidden").show(),j=!1}function f(a){console.log("keyup 1");var b=$("#order-"+a.id);$(".cancel",b).hide(),$(".delete",b).hide(),j=!0}var g="order";a.$on("$includeContentLoaded",function(){a.module=g});var h=b.current.params.page;h||(h=1),d.order.list({page:h},function(b){a.orders=b.data.results});var i=null,j=!0;a.mouseup=function(a){console.log(a),i},a.mousedown=function(a){console.log("keydown"),console.log(a),i||(i=c(function(){j?e(a):f(a),i=null},1e3))}}]),angular.module("mmbaoApp").controller("SystemCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("mmbaoApp").controller("AddressCtrl",["$scope","$route","$location","address","storage",function(a,b,c,d,e){var f=b.current.params.page;f||(f=1);var g="user";switch(a.$on("$includeContentLoaded",function(){a.module=g}),b.current.$$route.originalPath){case"/address/list":d.list({page:f},function(b){a.addresses=b.data.results});break;case"/address/add":break;case"/address/edit/:id":var h=b.current.params.id;if(h){var i=e.get("address");a.id=i.id,console.log(a.id),a.address=i.address}else c.path("address/list")}a.add=function(){var a=new FormData($("form")[0]);console.log(a),d.add(a,function(){alert("添加成功！"),c.path("address/list")})},a.select=function(a){e.set("address",a),c.path("address/edit/"+a.id)},a.save=function(){var a=new FormData($("form")[0]);console.log(a),d.update(a,function(){alert("更新成功！"),c.path("address/list")})},a.remove=function(a){confirm("操作不可能撤销，确定要删除吗？")&&d.remove({id:a},function(){alert("删除成功！"),c.path("address/list")})}}]),angular.module("mmbaoApp").service("address",["messages",function(a){return{add:a.address.add,list:a.address.list,update:a.address.update,remove:a.address.remove}}]),angular.module("mmbaoApp").controller("CartCtrl",["$scope","$timeout","$location","storage","messages",function(a,b,c,d,e){function f(a,b){if(a){var c=d.get("cart"),f={};f.store=a;var g=0,h=0,i=[];for(var j in c[a].merchandises){var k=c[a].merchandises[j];g+=(k.count-1+1)*(k.price-1+1),h+=k.count-1+1;var l={id:j,name:k.merchandise.name,brand:k.merchandise.brand,desc:k.merchandise.desc,number:k.count,price:k.price};k.images&&k.images.length&&(l.url=k.images[0].url),i.push(l)}if(!i.length)return b(errors.NOT_FOUND);f.summary=g,f.merchandises=i,f.total=h,e.order.create({json:JSON.stringify(f)},b)}else b(errors.NOT_FOUND)}var g="cart";a.$on("$includeContentLoaded",function(){a.module=g});var h=d.get("cart"),i=[];for(var j in h){var k=h[j],l=0,m=0;console.log(k);for(var n in k.merchandises){var o=k.merchandises[n];console.log(o),m+=(o.count-1+1)*(o.price-1+1),l+=o.count-1+1}k.count=l,k.summary=m,i.push(k)}a.carts=i,console.log(a.carts),a.order=function(a){f(a,function(){var e=d.get("cart");delete e[a],d.set("cart",e),b(function(){c.path("/order/list/1")},1e3)})}}]),angular.module("mmbaoApp").service("modal",function(){return{alert:function(a){$("#alert").modal("show"),$(".modal-body",$("#alert")).html(a)}}});