(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{535:function(e,t,l){var a=l(1),i=l(536),n=l(58);a({target:"Array",proto:!0},{fill:i}),n("fill")},536:function(e,t,l){"use strict";var a=l(16),i=l(117),n=l(9);e.exports=function(e){for(var t=a(this),l=n(t.length),r=arguments.length,o=i(r>1?arguments[1]:void 0,l),s=r>2?arguments[2]:void 0,c=void 0===s?l:i(s,l);c>o;)t[o++]=e;return t}},606:function(e,t,l){"use strict";l.r(t);l(535),l(83);var a={data:function(){return{schema:{input1:{tag:"el-input",label:"输入框"},region:{tag:"el-select",label:"地址",items:["A"]},area:{tag:"el-select",vif:"$model.region",items:["B"],slot:{after:" "}},district:{tag:"el-select",vif:"$model.area",items:["C"],slot:{after:" "}},switch:{tag:"el-switch",default:!1,label:"复选框"},date:{tag:"el-date-picker",vif:"$model.switch",label:"日期范围",inline:!0,props:{type:"date"}},timeselect:{tag:"el-time-select",label:"固定时间点",vif:"$model.date",inline:!0,props:{pickerOptions:{start:"08:30",step:"00:15",end:"22:30"}}}},model:{}}},methods:{arrayData:function(e){return new Array(e).fill({}).map((function(e,t){return{label:"测试-".concat(t),value:t+1}}))}}},i=l(42),n=Object(i.a)(a,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("p",[e._v(e._s(e.model))]),e._v(" "),l("el-form-schema",{attrs:{schema:e.schema,inline:!1,"label-width":"120px"},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1)}),[],!1,null,null,null);t.default=n.exports}}]);