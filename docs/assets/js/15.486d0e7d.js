(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{535:function(e,t,a){var l=a(1),r=a(536),n=a(58);l({target:"Array",proto:!0},{fill:r}),n("fill")},536:function(e,t,a){"use strict";var l=a(16),r=a(117),n=a(9);e.exports=function(e){for(var t=l(this),a=n(t.length),i=arguments.length,o=r(i>1?arguments[1]:void 0,a),s=i>2?arguments[2]:void 0,c=void 0===s?a:r(s,a);c>o;)t[o++]=e;return t}},597:function(e,t,a){"use strict";a.r(t);a(535),a(83);var l={data:function(){return{schema:{time:{tag:"el-time-select",label:" ",inline:!0},obj:{tag:"object",label:"对象",title:"我是对象",required:!0,type:"fieldset",labelWidthComponents:"100px",components:{input:{tag:"el-input",required:!0,label:"输入框"},radio:{tag:"el-radio",items:this.arrayData(4)},checkbox:{tag:"el-checkbox",items:this.arrayData(5)}}}},model:{}}},methods:{arrayData:function(e){return new Array(e).fill({}).map((function(e,t){return{label:"测试-".concat(t),value:t+1}}))},submit:function(){this.$refs["el-form-schema"].validate((function(e){alert(e)}))},reset:function(){this.$refs["el-form-schema"].resetFields()}}},r=a(42),n=Object(r.a)(l,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("p",[e._v(e._s(e.model))]),e._v(" "),a("el-form-schema",{ref:"el-form-schema",attrs:{schema:e.schema,"label-width":"100px","component-width":"200px"},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:e.reset}},[e._v("重置")])],1)],1)],1)}),[],!1,null,null,null);t.default=n.exports}}]);