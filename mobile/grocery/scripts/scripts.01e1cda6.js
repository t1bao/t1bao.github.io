"use strict";angular.module("businessApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$httpProvider",function(a,b){b.defaults.useXDomain=!0,b.defaults.withCredentials=!0,window.errors=webErrors.errors,a.when("/",{templateUrl:"views/store/profile.html",controller:"StoreCtrl"}).when("/user/login",{templateUrl:"views/user/login.html",controller:"UserCtrl"}).when("/user/register",{templateUrl:"views/user/register.html",controller:"UserCtrl"}).when("/user/profile",{templateUrl:"views/user/profile.html",controller:"UserCtrl"}).when("/password/retrieve",{templateUrl:"views/password/retrieve.html",controller:"UserCtrl"}).when("/merchandise/list/:page",{templateUrl:"views/merchandise/list.html",controller:"MerchandiseCtrl"}).when("/merchandise/q/:query/:page",{templateUrl:"views/merchandise/query.html",controller:"MerchandiseCtrl"}).when("/store/location",{templateUrl:"views/location/main.html",controller:"LocationCtrl"}).when("/store/profile",{templateUrl:"views/store/profile.html",controller:"StoreCtrl"}).when("/barcode/list/:page",{templateUrl:"views/barcode/list.html",controller:"BarcodeCtrl"}).when("/order/list/:page",{templateUrl:"views/order/list.html",controller:"OrderCtrl"}).when("/order/query/:q/:page",{templateUrl:"views/order/query.html",controller:"OrderCtrl"}).when("/subscribed/list/:page",{templateUrl:"views/subscribed/list.html",controller:"SubscribedCtrl"}).when("/user/password",{templateUrl:"views/user/password.html",controller:"UserCtrl"}).when("/user/dashboard",{templateUrl:"views/user/dashboard.html",controller:"UserCtrl"}).when("/category/:parent/list/:id",{templateUrl:"views/category/list.html",controller:"CategoryCtrl"})}]),angular.module("businessApp").controller("UserCtrl",["$scope","$location","api","modal",function(a,b,c,d){a.register=function(){var a=new FormData($("form")[0]);c.send("user/register",a,function(a){console.log(a),a.code===errors.SUCCESS.code&&d.alert("注册成功!")})},a.login=function(){var a=new FormData($("form")[0]);c.send("user/login",a,function(a){console.log(a),a.code===errors.SUCCESS.code&&(d.alert("登录成功!"),b.path("store/profile"))})},a.retrieve=function(){var a=new FormData($("form")[0]);c.send("password/retrieve",a,function(a){console.log(a),a.code===errors.SUCCESS.code&&d.alert("密码重置成功!")})},c.send("user/profile",{},function(b){b.code===errors.SUCCESS.code&&(a.user=b.data)})}]),angular.module("businessApp").service("api",["url","$http","$location","modal",function(a,b,c,d){function e(b){return a+h+b}function f(a,f,h,i){var j;j=f?f instanceof FormData?b.post(e(a),f,{withCredentials:!0,headers:{"Content-Type":void 0}}):b.post(e(a),f):b.post(e(a)),h=h||g,j.success(function(a){if("code"in a)if("code"in a&&!a.code)i(a);else switch(a.code){case errors.NOT_LOGIN.code:case errors.MERCHANT_NOT_LOGIN.code:case errors.USER_NOT_LOGIN.code:c.path(h);break;default:a.data?i(a):d.alert(a.message)}else;}).error(function(){if("user/profile"===a)c.path(h);else{var b="请求错误，请检测网络。";d.alert(b)}})}var g="user/login",h="grocery/";return{send:function(a,b,c){f(a,b,null,c)},upload:function(a,f,h){b.post(e(a),f,{withCredentials:!0,headers:{"Content-Type":void 0},transformRequest:angular.identity}).success(function(a){if("code"in a)if("code"in a&&!a.code)h(a);else switch(a.code){case errors.USER_NOT_LOGIN.code:c.path(g);break;default:d.alert(a.message)}else;}).error(function(){c.path(g)})},success:function(a,b,c,d){f(a,b,function(a){return d?c(a):void(a.code===errors.SUCCESS.code&&c(a))})}}}]);var url="http://api.t1bao.com/";window.localStorage&&window.localStorage.getItem("url")&&(url=window.localStorage.getItem("url")),angular.module("businessApp").constant("url",url),angular.module("businessApp").service("modal",function(){return{alert:function(a){$("#alert").modal("show"),$(".modal-body",$("#alert")).html(a)}}}),angular.module("businessApp").controller("StoreCtrl",["$scope","modal","api","user",function(a,b,c,d){console.log("insdie store controller");var e="profile";a.$on("$includeContentLoaded",function(){$(".datepicker").datetimepicker({datepicker:!1,lang:"ch",format:"H:i"}),a.module=e}),a.user=d.get(),c.send("store/profile",{},function(b){b.code===errors.SUCCESS.code&&(a.store=b.data)}),a.modify=function(){var d=new FormData($("form.modify")[0]);console.log(d),c.send("store/update",d,function(d){console.log(d),d.code===errors.SUCCESS.code&&($("#modify").modal("hide"),b.alert("更新成功!"),c.send("store/profile",{},function(b){b.code===errors.SUCCESS.code&&(a.store=b.data)}))})}}]),angular.module("businessApp").controller("NavCtrl",["$scope","$location","api","user",function(a,b,c,d){c.send("user/profile",null,function(b){b&&"code"in b&&b.code===errors.SUCCESS.code&&(console.log(b),a.user=b.data,d.set(b.data))}),a.exit=function(){c.send("user/logout",null,function(a){a&&"code"in a&&a.code===errors.SUCCESS.code&&b.path("user/login")})}}]),angular.module("businessApp").service("user",function(){var a;return{set:function(b){a=b},get:function(){return a}}}),angular.module("businessApp").controller("MerchandiseCtrl",["$scope","$route","$location","api","modal",function(a,b,c,d,e){function f(b){d.send("merchandise/list",{page:b},function(b){b.code===errors.SUCCESS.code&&(a.merchandises=b.data.results,a.total=b.data.total,a.page=b.data.page)})}function g(b,c){d.send("merchandise/query",{q:b,page:c},function(b){console.log(b),b.code===errors.SUCCESS.code&&(a.merchandises=b.data.results,a.total=b.data.total,a.page=b.data.page)})}function h(b){"undefined"!==b&&b?(a.q=b,g(b,j)):f(j)}var i="merchandise";a.page=0,a.total=0,a.base="merchandise";var j=parseInt(b.current.params.page),k=b.current.params.query;k=decodeURIComponent(k),a.$on("$includeContentLoaded",function(){a.module=i}),(!j||1>j)&&(j=1),h(k),a.add=function(){var a=new FormData($("form.add")[0]);d.send("merchandise/add",a,function(a){switch(a.code){case errors.SUCCESS.code:$("#add").hide(),e.alert("添加成功！"),f(j)}})},a.remove=function(a){confirm("确定要删除吗?操作不可恢复!")&&d.send("merchandise/remove",{id:a.merchandise.id},function(a){switch(a.code){case errors.SUCCESS.code:$("#add").hide(),e.alert("添加成功！"),f(j)}})},a.openModify=function(b,c,d,e){var f=b;f.sis=c,f.images=d,f.price=e,a.merchandise=f},a.modify=function(){var a=new FormData($("form.modify")[0]);console.log(a),d.send("merchandise/update",a,function(a){console.log(a),a.code===errors.SUCCESS.code&&($("#modify").modal("hide"),e.alert("更新成功!"),f(j))})},a.removeImage=function(a,b){console.log(a),console.log(b),confirm("确定要删除吗?操作不可恢复!")&&d.send("merchandise/image/remove",{mid:a,id:b},function(a){console.log(a),a.code===errors.SUCCESS.code&&f(j)})},a.search=function(){a.q&&"undefined"!==a.q?c.path("/merchandise/q/"+encodeURIComponent(a.q)+"/1"):e.alert("请输入搜索词")},a.online=function(a){d.send("merchandise/online",{id:a.merchandise.id,online:!0},function(a){console.log(a),a.code===errors.SUCCESS.code&&h(k,j)})},a.offline=function(a){d.send("merchandise/online",{id:a.merchandise.id,online:!1},function(a){console.log(a),a.code===errors.SUCCESS.code&&h(k,j)})}}]),angular.module("businessApp").controller("LocationCtrl",function(){}),angular.module("businessApp").controller("BarcodeCtrl",["$route","$scope","api",function(a,b,c){function d(a){c.send("merchandise/list",{page:a},function(a){a.code===errors.SUCCESS.code&&(b.merchandises=a.data.results,b.total=a.data.total,b.page=a.data.page)})}function e(a){c.send("barcode/list",{page:a},function(a){a.code===errors.SUCCESS.code&&(b.barcodes=a.data.results,b.page=a.data.page,b.total=a.data.total)})}function f(){var a,f=1;b.openBind=function(b){f=1,a=b,console.log(b),d(f)},b.prev=function(){f>1&&f--,d(f)},b.next=function(){f++,d(f)},b.onSelectItem=function(a){b.merchandise=a.merchandise,b.merchandise.sis=a.sis,b.merchandise.images=a.images,console.log(a.merchandise)},b.bind=function(){console.log(a),c.send("barcode/bind",{barcode:a.barcode.id,merchandise:b.merchandise.id},function(a){switch(a.code){case errors.SUCCESS.code:$("#bindMerchandise").hide(),e(h)}})},b.unbind=function(a){c.send("barcode/unbind",{barcode:a.barcode.id},function(a){switch(a.code){case errors.SUCCESS.code:$("#bindMerchandise").hide(),e(h)}})}}var g="barcode";b.page=0,b.total=0,b.base="barcode";var h=parseInt(a.current.params.page);b.$on("$includeContentLoaded",function(){b.module=g}),e(h),b.openQuery=function(){b.queried=!1},b.query=function(){console.log("query"),b.queried=!1;var a=new FormData($("form.query")[0]);c.send("barcode/query",a,function(a){switch(console.log(a),b.queried=!0,a.code){case errors.NOT_FOUND.code:console.log("not found"),b.merchandise=a.data.merchandise;break;case errors.SUCCESS.code:console.log(a.data.merchandise),b.found=!0,b.merchandise=a.data.merchandise}e(h)})},b.remove=function(a){confirm("确定要删除吗?操作不可恢复!")&&c.send("barcode/remove",{id:a.id},function(b){switch(console.log(b),b.code){case errors.SUCCESS.code:$("barcode-remove-"+a.id).remove(),e(h)}})},f()}]),angular.module("businessApp").filter("currency",function(){return function(a){return a=parseFloat(a).toFixed(2),isNaN(a)&&(a=0),parseFloat(a).toFixed(2)}}),angular.module("businessApp").controller("OrderCtrl",["$scope","$route","$location","api",function(a,b,c,d){function e(b){d.send("order/list",{page:b},function(b){switch(console.log(b),b.code){case errors.SUCCESS.code:console.log(b),a.orders=b.data.results,a.page=b.data.page,a.total=b.data.total,a.count=b.data.count,a.base="order"}})}function f(b,c){d.send("order/query",{no:b,page:c},function(d){switch(console.log(d),d.code){case errors.SUCCESS.code:console.log(d),a.order=d.data,a.query=b,a.page=c}})}var g=parseInt(b.current.params.page);switch((!g||1>g)&&(g=1),a.$on("$includeContentLoaded",function(){a.module="order"}),b.current.$$route.originalPath){case"/order/list/:page":e(g);break;case"/order/query/:q/:page":var h=b.current.params.q;f(h,g)}a.cancel=function(a){d.send("order/cancel",{id:a.id},function(a){switch(console.log(a),a.code){case errors.SUCCESS.code:console.log(a),e(g)}})},a.query=function(){a.q&&c.path("order/query/"+a.q+"/"+g)},a.back=function(){c.path("order/list/"+g)}}]),angular.module("businessApp").controller("SubscribedCtrl",["$scope","$route","api",function(a,b,c){a.$on("$includeContentLoaded",function(){a.module="subscribed",a.total=0,a.page=0});var d=parseInt(b.current.params.page);(!d||1>d)&&(d=1),c.send("subscribed/list",{page:d},function(b){switch(console.log(b),b.code){case errors.SUCCESS.code:console.log(b),a.subscibed=b.data.results,a.total=b.data.total,a.count=b.data.count,a.page=b.data.page}})}]),angular.module("businessApp").controller("CategoryCtrl",["$scope","$route","api",function(a,b,c){function d(b){c.send("category/list",{page:b},function(b){b.code===errors.SUCCESS.code&&(a.categories=b.data.results,a.total=b.data.total,a.page=b.data.page)})}var e=parseInt(b.current.params.page);(!e||1>e)&&(e=1),a.$on("$includeContentLoaded",function(){a.module="category"}),d(e),a.add=function(){var a=new FormData($("form.add")[0]);console.log(a),c.send("category/create",a,function(a){console.log(a),a.code===errors.SUCCESS.code&&(d(e),$("#add").hide())})},a.openModify=function(b){a.category=b},a.remove=function(a){confirm("操作不可恢复，你确定要删除吗？")&&c.send("category/remove",{id:a.id},function(a){console.log(a),a.code===errors.SUCCESS.code&&d(e)})},a.update=function(){var a=new FormData($("form.update")[0]);console.log(a),c.send("category/update",a,function(a){console.log(a),a.code===errors.SUCCESS.code&&(d(e),$("#modify").hide())})}}]);