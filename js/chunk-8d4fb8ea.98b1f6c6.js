(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8d4fb8ea"],{"202c":function(t,e,a){},"398d":function(t,e,a){"use strict";a("ac1f"),a("841c"),a("498a");var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"c-macro__header"},[e("div",{staticClass:"m-archive-search",attrs:{slot:"search-before"},slot:"search-before"},[e("a",{staticClass:"u-publish el-button el-button--primary",attrs:{href:t.publish_link}},[t._v("+ 发布作品")]),e("el-input",{attrs:{placeholder:"请输入搜索内容",clearable:""},on:{clear:t.onSearch},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSearch.apply(null,arguments)}},model:{value:t.search,callback:function(e){t.search="string"===typeof e?e.trim():e},expression:"search"}},[e("span",{attrs:{slot:"prepend"},slot:"prepend"},[e("i",{staticClass:"el-icon-search"}),t._v(" "),e("span",{staticClass:"u-search"},[t._v("关键词")])]),e("el-button",{staticClass:"u-btn",attrs:{slot:"append",icon:"el-icon-position"},on:{click:t.onSearch},slot:"append"})],1)],1),t.canFilter?e("div",{staticClass:"m-archive-filter"},[e("div",{staticClass:"m-filter--left"},[e("clientBy",{attrs:{type:t.client},on:{filter:t.filterImperceptibly}}),e("markBy",{on:{filter:t.filterMeta}}),e("menuBy",{attrs:{data:t.langs,type:"lang",placeholder:"语言"},on:{filter:t.filterMeta}}),e("zlpBy",{attrs:{type:"zlp",client:t.client},on:{filter:t.filterMeta}}),"std"==t.client?e("versionBy",{attrs:{value:t.is_wujie},on:{filter:t.onWujieChange}}):t._e()],1),e("div",{staticClass:"m-filter--right"},[e("orderBy",{on:{filter:t.filterMeta}})],1)]):t._e()])},n=[],s=a("1fb9"),r=a("85e4"),o=(a("4de4"),a("d3b7"),a("0643"),a("2382"),function(){var t=this,e=t._self._c;return e("div",{staticClass:"w-filter-client"},[e("ul",[e("li",{staticClass:"u-client",class:{on:""==t.version},on:{click:function(e){return t.filter("")}}},[t._v(" 双端 ")]),t._l(t.versions,(function(a,i){return e("li",{key:i,staticClass:"u-client",class:{on:t.version==i},on:{click:function(e){return t.filter(i)}}},[t._v(t._s(a))])}))],2)])}),c=[],l={name:"versionBy",props:["value"],data:function(){return{version:this.value||""}},computed:{versions:function(){var t={0:"旗舰",1:"无界"};return t}},methods:{filter:function(t){this.version=t,this.$emit("filter",{type:"version",val:t}),this.$forceUpdate()}}},u=l,d=(a("a475"),a("2877")),h=Object(d["a"])(u,o,c,!1,null,null,null),p=h.exports,m={name:"CommonHeader",components:{versionBy:p},props:{canFilter:{type:Boolean,default:!0},client:{type:String,default:"std"}},data:function(){return{search:"",langs:{cn:"简体中文",tr:"繁體中文"},rows:1,is_wujie:""}},computed:{publish_link:function(){return Object(r["p"])(s["a"])}},methods:{filterImperceptibly:function(t){this.$emit("filterImperceptibly",t)},filterMeta:function(t){this.$emit("filterMeta",t)},onSearch:function(){this.$emit("search",this.search)},onWujieChange:function(t){this.is_wujie=t["val"],this.$emit("wujie",this.is_wujie)}}},f=m,v=Object(d["a"])(f,i,n,!1,null,null,null);e["a"]=v.exports},"415f":function(t,e,a){"use strict";a("202c")},"44fd":function(t,e,a){"use strict";a("b0c0"),a("2c3e");var i=function(){var t=this,e=t._self._c;return e("li",{staticClass:"u-item"},[e("h2",{staticClass:"u-post",class:{isSticky:t.isPublic&&t.item.sticky}},[e("img",{staticClass:"u-icon",attrs:{src:t.xficon(t.item.post_subtype),alt:t.item.post_subtype,title:t.item.post_subtype,onerror:"this.src='https://img.jx3box.com/image/xf/0.png'"}}),t.isMine?[~~t.item.visible?e("span",{staticClass:"u-private"},[e("i",{staticClass:"el-icon-lock"}),t._v(" "+t._s(t.visibleTxt(t.item.visible))+" ")]):t._e(),"draft"==t.item.post_status?e("span",{staticClass:"u-draft"},[e("i",{staticClass:"el-icon-edit-outline"}),t._v(" 草稿 ")]):t._e()]:t._e(),t.item.zlp?e("span",{staticClass:"u-label u-zlp"},[t._v(t._s(t.item.zlp))]):t._e(),t.item.is_wujie?e("span",{staticClass:"u-label u-zlp u-wujie"},[t._v("无界")]):t._e(),"tr"==t.item.lang?e("span",{staticClass:"u-label u-lang"},[t._v("繁體")]):t._e(),e("a",{directives:[{name:"reporter",rawName:"v-reporter",value:{data:{href:t.reporterLink(t.item.ID)},caller:"macro_index_click"},expression:"{\n                data: {\n                    href: reporterLink(item.ID),\n                },\n                caller: 'macro_index_click',\n            }"}],staticClass:"u-title",style:t.showHighlight(t.item.color),attrs:{href:t.postLink(t.item.ID),target:t.target}},[t._v(t._s(t.item.post_title||"无标题"))]),t.item.mark&&t.item.mark.length?e("span",{staticClass:"u-marks"},t._l(t.item.mark,(function(a){return e("i",{key:a,staticClass:"u-mark"},[t._v(t._s(t.showMark(a)))])})),0):t._e(),t.hasPermission?e("span",{staticClass:"u-push"},[t.showPushDate?e("time",{staticClass:"u-push__time",class:{"is-recent":t.isRecent()}},[t._v(t._s(t.pushDate)+" 已推送")]):t._e(),e("el-button",{staticClass:"u-push__btn",attrs:{size:"mini",type:"warning",icon:"el-icon-s-promotion"},on:{click:t.onPush}},[t._v("推送")])],1):t._e()],2),e("div",{staticClass:"u-content"},[t.item.post_meta&&t.item.post_meta.data&&t.item.post_meta.data.length?e("ul",{staticClass:"m-macro-list-item-meta"},t._l(t.item.post_meta.data,(function(a,i){return e("li",{key:i,staticClass:"u-macro"},[e("img",{staticClass:"u-macro-icon",attrs:{src:t.iconLink(a.icon)}}),e("el-tooltip",{attrs:{effect:"dark",content:"点击快捷查看 · "+a.name,placement:"top-start"}},[e("span",{staticClass:"u-macro-name",on:{click:function(e){return t.loadMacro(t.item.author,a,t.item.ID)}}},[t._v(t._s(a.name||"未命名"))])])],1)})),0):t._e()]),e("div",{staticClass:"u-misc"},[e("div",{staticClass:"u-author"},[e("a",{staticClass:"u-author-name",attrs:{href:t.authorLink(t.item.post_author),target:"_blank"}},[t._v(t._s(t.item.author_info&&t.item.author_info.display_name||t.item.author||"匿名"))])]),e("span",{staticClass:"u-date"},[e("i",{staticClass:"el-icon-date"}),"update"==t.order?e("time",[t._v(t._s(t.dateFormat(t.item.post_modified)))]):e("time",[t._v(t._s(t.dateFormat(t.item.post_date)))])])])])},n=[],s=(a("99af"),a("1fb9")),r=a("85e4"),o=a("65c2"),c=a("1647"),l=a("e4f1"),u=a("46d4"),d=a("c9d2"),h=a("5a0c"),p=a.n(h),m=a("d8ad"),f={name:"ListItem",props:["item","order"],components:{},data:function(){return{target:Object(r["b"])()}},computed:{isPublic:function(){return"index"==this.$route.name},isMine:function(){return"bucket"==this.$route.name},client:function(){var t;return(null===(t=this.item)||void 0===t?void 0:t.client)||"std"},hasPermission:function(){return d["a"].hasPermission("push_banner")},pushDate:function(t){var e,a=t.item,i=null===a||void 0===a||null===(e=a.log)||void 0===e?void 0:e.push_at;return Object(l["a"])(new Date(i))},showPushDate:function(){var t;return Boolean(null===(t=this.item)||void 0===t?void 0:t.log)}},watch:{},methods:{loadMacro:function(t,e,a){this.$emit("loadMacro",[t,e,a])},authorLink:r["a"],iconLink:r["m"],postLink:function(t){return location.origin+"/".concat(s["a"],"/")+t},showHighlight:function(t){return t?"color:".concat(t,";font-weight:600;"):""},showMark:function(t){return c["a"][t]||t},showAvatar:function(t){return Object(r["r"])(null===t||void 0===t?void 0:t.user_avatar)},showNickname:function(t){return(null===t||void 0===t?void 0:t.display_name)||"匿名"},dateFormat:function(t){return Object(l["a"])(new Date(t))},xficon:function(t){t&&"其它"!=t||(t="通用");var e=u[t]["id"];return o["__imgPath"]+"image/xf/"+e+".png"},visibleTxt:function(t){return o["__visibleMap"][t]},reporterLink:function(t){var e="std"==this.client?"www":"origin";return"".concat(e,":/").concat(s["a"],"/")+t},showDate:l["a"],isRecent:function(){var t,e,a=null===(t=this.item)||void 0===t||null===(e=t.log)||void 0===e?void 0:e.push_at;return p()().diff(p()(a),"day")<30},onPush:function(){m["a"].emit("design-task",this.item)}},created:function(){},mounted:function(){}},v=f,_=a("2877"),g=Object(_["a"])(v,i,n,!1,null,null,null);e["a"]=g.exports},"498a":function(t,e,a){"use strict";var i=a("23e7"),n=a("58a8").trim,s=a("c8d2");i({target:"String",proto:!0,forced:s("trim")},{trim:function(){return n(this)}})},"5b08":function(t,e,a){"use strict";a("75c3")},"6afb":function(t,e,a){},"75c3":function(t,e,a){},a475:function(t,e,a){"use strict";a("6afb")},c8d2:function(t,e,a){"use strict";var i=a("5e77").PROPER,n=a("d039"),s=a("5899"),r="​᠎";t.exports=function(t){return n((function(){return!!s[t]()||r[t]()!==r||i&&s[t].name!==t}))}},d504:function(t,e,a){"use strict";a.r(e);a("ac1f"),a("841c");var i=function(){var t=this,e=t._self._c;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"m-archive-box"},[e("common-header",{attrs:{client:t.client},on:{filterImperceptibly:t.filterImperceptibly,filterMeta:t.filterMeta,search:t.onSearch,wujie:t.onWujieChange}}),t.search||t.subtype?t._e():e("rec-table"),t.data&&t.data.length?e("div",{staticClass:"m-archive-list"},[e("ul",{staticClass:"u-list"},t._l(t.data,(function(a,i){return e("list-item",{key:i+a,attrs:{item:a,order:t.order},on:{loadMacro:t.loadMacro}})})),1)]):e("el-alert",{staticClass:"m-archive-null",attrs:{title:"没有找到相关条目",type:"info",center:"","show-icon":""}}),e("el-button",{directives:[{name:"show",rawName:"v-show",value:t.hasNextPage,expression:"hasNextPage"}],staticClass:"m-archive-more",attrs:{type:"primary",loading:t.loading,icon:"el-icon-arrow-down"},on:{click:t.appendPage}},[t._v("加载更多")]),e("el-pagination",{staticClass:"m-archive-pages",attrs:{background:"",layout:"total, prev, pager, next, jumper","hide-on-single-page":!0,"page-size":t.per,total:t.total,"current-page":t.page},on:{"update:currentPage":function(e){t.page=e},"update:current-page":function(e){t.page=e},"current-change":t.changePage}}),e("el-drawer",{staticClass:"m-macro-drawer",attrs:{title:"云端宏",visible:t.drawer,"append-to-body":!0},on:{"update:visible":function(e){t.drawer=e}}},[e("div",{staticClass:"u-box"},[e("h2",{staticClass:"u-title"},[t._v(t._s(t.drawer_title))]),e("macro",{attrs:{ctx:t.drawer_content,name:t.drawer_title,id:t.drawer_id}}),e("a",{staticClass:"u-skip el-button el-button--primary",attrs:{href:t.drawer_link}},[e("i",{staticClass:"el-icon-copy-document"}),t._v(" 查看详情 ")])],1)]),e("design-task",{attrs:{post:t.currentPost},model:{value:t.showDesignTask,callback:function(e){t.showDesignTask=e},expression:"showDesignTask"}})],1)},n=[],s=a("3835"),r=a("ade3"),o=a("c7eb"),c=a("1da1"),l=(a("99af"),a("7db0"),a("caad"),a("a15b"),a("d81d"),a("14d9"),a("b0c0"),a("b64b"),a("d3b7"),a("2c3e"),a("2532"),a("498a"),a("0643"),a("fffc"),a("a573"),a("29c2")),u=a("1fb9"),d=a("44fd"),h=a("a25b"),p=(a("9911"),function(){var t=this,e=t._self._c;return e("div",{staticClass:"m-index-rec"},[t._m(0),e("div",{staticClass:"u-ac",domProps:{innerHTML:t._s(t.ac)}}),e("el-row",t._l(t.data,(function(a,i){return e("el-col",{key:i,attrs:{span:6}},[e("div",{staticClass:"u-rec"},[e("a",{directives:[{name:"reporter",rawName:"v-reporter",value:{data:{href:t.macroLink(a.link)},caller:"macro_suggest"},expression:"{\n                        data: {\n                            href: macroLink(item.link),\n                        },\n                        caller: 'macro_suggest',\n                    }"}],style:t.highLight(a.color),attrs:{href:a.link,target:"_blank"}},[a.icon?e("img",{attrs:{src:t.iconLink(a.icon),onerror:"this.src='https://img.jx3box.com/image/xf/0.png'"}}):t._e(),t._v(" "+t._s(a.label)+" ")])])])})),1)],1)}),m=[function(){var t=this,e=t._self._c;return e("h5",{staticClass:"u-title"},[e("span",[e("i",{staticClass:"el-icon-star-off"}),t._v("当前版本编辑推荐")])])}],f=a("73cd"),v=a("65c2"),_={color:"",label:"",link:"",icon:""},g={name:"rec_table",props:[],components:{},data:function(){return{data:[],ac:""}},computed:{client:function(){return this.$store.state.client}},methods:{macroLink:function(t){var e="std"==this.client?"www":"origin";return"".concat(e,":").concat(t)},init:function(){var t=this,e="origin"==this.client?"-origin":"";Object(f["b"])("macro-rec"+e).then((function(e){t.data=e.data.data.menus||[];var a=t.data.length%4;if(a)for(var i=0;i<4-a;i++)t.data.push(_)})),Object(f["a"])("macro-ac"+e).then((function(e){t.ac=e.data.data.html}))},highLight:function(t){return t?"color:"+t+";font-weight:bold;":""},iconLink:function(t){return v["__imgPath"]+"image/xf/"+t+".png"}},watch:{client:{immediate:!0,handler:function(){this.init()}}}},b=g,w=(a("415f"),a("2877")),k=Object(w["a"])(b,p,m,!1,null,null,null),y=k.exports,C=a("398d"),j=a("16e5"),x=a("41cb"),O=function(t){return Object(x["a"])().get("/api/cms/design/task/log",{params:t})},P=a("7d14"),D=a("d8ad"),M=a("c9d2"),L={name:"Index",props:[],data:function(){return{loading:!1,data:[],page:1,per:10,total:1,pages:1,number_queries:["per","page"],subtype:"",order:"update",mark:"",client:this.$store.state.client,search:"",lang:"",zlp:"",is_wujie:"",drawer:!1,drawer_title:"",drawer_content:"",drawer_link:"",drawer_id:"",langs:{cn:"简体中文",tr:"繁體中文"},showDesignTask:!1,currentPost:{}}},computed:{hasNextPage:function(){return this.pages>1&&this.page<this.total},query:function(){return{subtype:this.subtype,order:this.order,mark:this.mark,client:this.client,search:this.search,lang:this.lang,zlp:this.zlp,is_wujie:this.is_wujie}},pg_queries:function(){return{page:this.page,per:this.per}},reset_queries:function(){return[this.subtype,this.search]}},methods:{buildQuery:function(t){t&&(this.page+=1,this.replaceRoute({page:this.page},!1));var e={per:this.per,page:this.page};for(var a in this.query)void 0!==this.query[a]&&""!==this.query[a]&&null!==this.query[a]&&("search"==a?e.search=this.query.search.trim():e[a]=this.query[a]);return e.subtype&&(e.sticky=1),e},onSearch:function(t){this.search=t},loadData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=this.buildQuery(e);return this.loading=!0,Object(l["e"])(a).then(function(){var a=Object(c["a"])(Object(o["a"])().mark((function a(i){var n,s,r,c,l,u,d,h,p,m;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.data=e?t.data.concat(null===(l=i.data)||void 0===l||null===(u=l.data)||void 0===u?void 0:u.list):null===(d=i.data)||void 0===d||null===(h=d.data)||void 0===h?void 0:h.list,Object(j["b"])({caller:"macro_index_load",data:{aggregate:i.data.data.list.map((function(e){return t.postLink(e.ID)}))}}),t.total=null===(n=i.data)||void 0===n||null===(s=n.data)||void 0===s?void 0:s.total,t.pages=null===(r=i.data)||void 0===r||null===(c=r.data)||void 0===c?void 0:c.pages,!M["a"].hasPermission("push_banner")||t.isPhone){a.next=10;break}return p=t.data.map((function(t){return t.ID})),a.next=8,O({source_type:"macro",ids:p.join(",")}).then((function(t){return t.data.data}));case 8:m=a.sent,t.data=t.data.map((function(e){var a=m.find((function(t){return t.source_id==e.ID}))||null;return t.$set(e,"log",a),e}));case 10:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}()).finally((function(){t.loading=!1}))},replaceRoute:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return this.$router.push({name:this.$route.name,query:Object.assign({},this.$route.query,t)}).then((function(){e&&window.scrollTo(0,0)})).catch((function(t){}))},filterMeta:function(t){this.replaceRoute(Object(r["a"])(Object(r["a"])({},t["type"],t["val"]),"page",1))},filterImperceptibly:function(t){this[t["type"]]=t["val"]},onWujieChange:function(t){this.is_wujie=t,this.replaceRoute({is_wujie:t,page:1})},changePage:function(t){this.loadData(),this.replaceRoute({page:t})},appendPage:function(){this.loadData(!0)},loadMacro:function(t){var e=Object(s["a"])(t,3),a=e[0],i=e[1],n=e[2];this.drawer=!0,this.drawer_title=a+"#"+i.name,this.drawer_content=i.macro,this.drawer_link="/macro/"+n+"?tab="+i.name,this.drawer_id=n},postLink:function(t){var e="std"==this.client?"www":"origin";return"".concat(e,":/").concat(u["a"],"/")+t}},watch:{"$route.query":{deep:!0,immediate:!0,handler:function(t){if(Object.keys(t).length)for(var e in t)this.number_queries.includes(e)?this[e]=~~t[e]:this[e]=t[e]}},reset_queries:{deep:!0,handler:function(){this.page=1}},query:{deep:!0,immediate:!0,handler:function(t){this.loadData()}},is_wujie:function(){this.page=1,this.replaceRoute({page:1})},client:function(t){this.is_wujie=""}},mounted:function(){var t=this;D["a"].on("design-task",(function(e){t.currentPost=e,t.showDesignTask=!0}))},components:{listItem:d["a"],recTable:y,macro:h["a"],CommonHeader:C["a"],DesignTask:P["a"]}},q=L,I=(a("5b08"),Object(w["a"])(q,i,n,!1,null,null,null));e["default"]=I.exports},d8ad:function(t,e,a){"use strict";var i=a("1344"),n=Object(i["a"])();e["a"]=n}}]);
//# sourceMappingURL=chunk-8d4fb8ea.98b1f6c6.js.map