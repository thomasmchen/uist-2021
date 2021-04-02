(this["webpackJsonpuist-2021"]=this["webpackJsonpuist-2021"]||[]).push([[0],{23:function(e){e.exports=JSON.parse('[{"id":0,"value":"woke-long"},{"id":1,"value":"woke-short"},{"id":2,"value":"woke-full"},{"id":2,"value":"woke-full-new"}]')},28:function(e,t,a){},29:function(e,t,a){},31:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),s=a(21),i=a.n(s),l=(a(28),a(6)),r=a(7),d=a(9),o=a(8),u=[{title:"Explore",url:"/uist-2021/data/explore",cName:"nav-links"},{title:"Q&A",url:"/uist-2021/data/qa",cName:"nav-links"},{title:"Speakers",url:"/uist-2021/data/speaker",cName:"nav-links"},{title:"About Us",url:"/uist-2021/static/about",cName:"nav-links-mobile"}],j=(a(29),a(0)),b=["btn--primary","btn--outline"],m=["btn--medium","btn--large"],h=function(e){var t=e.children,a=e.type,n=e.onClick,c=e.buttonStyle,s=e.buttonSize,i=b.includes(c)?c:b[0],l=m.includes(s)?s:m[0];return Object(j.jsx)("button",{className:"btn ".concat(i," ").concat(l),onClick:n,type:a,children:t})},O=(a(31),a(14)),x=function(e){Object(d.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={clicked:!1},e.handleClick=function(){e.setState({clicked:!e.state.clicked})},e}return Object(r.a)(a,[{key:"render",value:function(){return Object(j.jsxs)("nav",{className:"NavbarItems",children:[Object(j.jsxs)("h1",{className:"navbar-logo",children:["Contoso ",Object(j.jsx)("i",{className:"fab fa-affiliatetheme"})]}),Object(j.jsx)("div",{className:"menu-icon",onClick:this.handleClick,children:Object(j.jsx)("i",{className:this.state.clicked?"fas fa-times":"fas fa-bars"})}),Object(j.jsx)("ul",{className:this.state.clicked?"nav-menu active":"nav-menu",children:u.map((function(e,t){return Object(j.jsx)("li",{className:e.cName,children:Object(j.jsx)(O.b,{to:e.url,children:e.title})},t)}))}),Object(j.jsx)(h,{children:Object(j.jsx)(O.b,{to:"/static/about",children:"About Us"})})]})}}]),a}(n.Component),f=a(11),p=a(2);var v=function(e){return Object(j.jsx)("div",{className:"Segment",children:Object(j.jsxs)("div",{className:"SegmentDataContainer",children:[null!=e.speaker&&Object(j.jsx)("div",{className:"SegmentSpeakerContainer",children:Object(j.jsxs)("p",{className:"SegmentSpeakerText",children:["Speaker ",e.speaker]})}),Object(j.jsx)("div",{className:"SegmentIdContainer",children:Object(j.jsx)("p",{className:"SegmentIdText",children:e.id})}),Object(j.jsx)("div",{className:"SegmentTextContainer",children:Object(j.jsx)("p",{className:"SegmentTextText",children:e.text})})]})})},N=(a(37),a(13)),g=a.n(N),S=function(e,t){for(var a=new Set(t),n=0;n<e.length;n++)if(a.has(e[n]))return!0;return!1};function C(e){var t=Object(n.useState)([]),a=Object(f.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)([]),l=Object(f.a)(i,2),r=l[0],d=l[1],o=Object(n.useState)([]),u=Object(f.a)(o,2),b=u[0],m=u[1],h=Object(n.useState)([]),O=Object(f.a)(h,2),x=O[0],p=O[1],v=e.raw;return Object(n.useEffect)((function(){if(e.raw){var t=e.raw[0].start,a=e.raw[e.raw.length-1].end-t,n=e.raw.map((function(e){return{name:e.id[0],duration:(e.end-e.start)/a,ids:e.id}})),c={};n.forEach((function(e){return c[e.name]=e.duration}));var i=e.low.map((function(e){return{name:e.id.join(", "),duration:e.id.reduce((function(e,t){return e+c[t]}),0),ids:e.id}})),l=e.med.map((function(e){return{name:e.id.join(", "),duration:e.id.reduce((function(e,t){return e+c[t]}),0),ids:e.id}})),r=e.high.map((function(e){return{name:e.id.join(", "),duration:e.id.reduce((function(e,t){return e+c[t]}),0),ids:e.id}}));s(n),d(i),m(l),p(r)}}),[v]),Object(j.jsxs)("div",{className:"temporal",children:[Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("p",{className:"label",children:"Raw"}),Object(j.jsx)("div",{className:"data raw",children:c.map((function(t,a){return Object(j.jsx)("div",{className:g()({selected:S(t.ids,e.selectedIds),item:!0}),style:{flex:"".concat((100*t.duration).toFixed(2)," 1 auto")},onClick:function(){return e.setSelected(t.ids)}},a)}))})]}),Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("p",{className:"label",children:"Low"}),Object(j.jsx)("div",{className:"data low",children:r.map((function(t,a){return Object(j.jsx)("div",{className:g()({selected:S(t.ids,e.selectedIds),item:!0}),style:{flex:"".concat((100*t.duration).toFixed(2)," 1 auto")},onClick:function(){return e.setSelected(t.ids)}},a)}))})]}),Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("p",{className:"label",children:"Med"}),Object(j.jsx)("div",{className:"data med",children:b.map((function(t,a){return Object(j.jsx)("div",{className:g()({selected:S(t.ids,e.selectedIds),item:!0}),style:{flex:"".concat((100*t.duration).toFixed(2)," 1 auto")},onClick:function(){return e.setSelected(t.ids)}},a)}))})]}),Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("p",{className:"label",children:"High"}),Object(j.jsx)("div",{className:"data high",children:x.map((function(t,a){return Object(j.jsx)("div",{className:g()({selected:S(t.ids,e.selectedIds),item:!0}),style:{flex:"".concat((100*t.duration).toFixed(2)," 1 auto")},onClick:function(){return e.setSelected(t.ids)}},a)}))})]})]})}function k(e){return Object(j.jsxs)("div",{className:"SegmentColumn High",children:[Object(j.jsx)("div",{className:"ColumnTitleContainer",children:Object(j.jsx)("h2",{className:"ColumnTitle",children:"High Pass"})}),Object(j.jsx)("div",{className:"data",children:e.segments.map((function(t,a){return Object(j.jsx)("div",{onClick:function(){return e.setSelected(t.id)},className:g()({selected:S(t.id,e.selectedIds),item:!0}),children:Object(j.jsx)(v,{text:t.text,id:t.id.join(", ")})},a)}))})]})}function w(e){return Object(j.jsxs)("div",{className:"SegmentColumn notclickable ".concat(e.title),children:[Object(j.jsx)("div",{className:"ColumnTitleContainer",children:Object(j.jsxs)("h2",{className:"ColumnTitle",children:[e.title," Pass"]})}),Object(j.jsx)("div",{className:"data",children:e.segments.filter((function(t){return S(t.id,e.selectedIds)})).map((function(e,t){return Object(j.jsx)("div",{className:g()({selected:!0,item:!0}),children:Object(j.jsx)(v,{text:e.text,id:e.id.join(", "),speaker:e.speaker?e.speaker:null})},t)}))})]})}var A=function(e){var t=Object(n.useState)([]),a=Object(f.a)(t,2),c=a[0],s=a[1],i=e.audioData;return Object(n.useEffect)((function(){return s(null)}),[i]),e.audioData?Object(j.jsxs)("div",{className:"Parent",children:[Object(j.jsx)("div",{className:"HighSegmentViewColumn",children:Object(j.jsx)(k,{segments:e.audioData.high.segments,selectedIds:c,setSelected:s})}),Object(j.jsxs)("div",{className:"DataViewColumn",children:[Object(j.jsx)("div",{children:Object(j.jsx)(C,{raw:e.audioData.raw.segments,high:e.audioData.high.segments,med:e.audioData.med.segments,low:e.audioData.low.segments,selectedIds:c,setSelected:s})}),Object(j.jsxs)("div",{className:"SegmentColumnContainer",children:[Object(j.jsx)(w,{title:"Medium",segments:e.audioData.med.segments,selectedIds:c}),Object(j.jsx)(w,{title:"Low",segments:e.audioData.low.segments,selectedIds:c}),Object(j.jsx)(w,{title:"Raw",segments:e.audioData.raw.segments,selectedIds:c})]})]})]}):Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:"Explore View"}),Object(j.jsx)("p",{children:"No audio sample selected"})]})},y=function(e){Object(d.a)(a,e);var t=Object(o.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"QAView"})})}}]),a}(n.Component),D=function(e){Object(d.a)(a,e);var t=Object(o.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"SpeakerView"})})}}]),a}(n.Component),I=(a(38),function(e){Object(d.a)(a,e);var t=Object(o.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"AboutView"})})}}]),a}(n.Component));var T=function(e){var t=Object(n.useState)(null),a=Object(f.a)(t,2),c=a[0],s=a[1],i=e.audioName;return Object(n.useEffect)((function(){if(i){fetch("../data/".concat(i,".json"),{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){s(e)})).catch((function(e){console.log(e)}))}}),[i]),Object(j.jsx)("div",{className:"DataContainer",children:Object(j.jsxs)(p.c,{children:[Object(j.jsx)(p.a,{path:"/uist-2021/data/explore",children:Object(j.jsx)(A,{className:"SpansView",audioName:e.audioName,audioData:c})}),Object(j.jsx)(p.a,{path:"/uist-2021/data/qa",children:Object(j.jsx)(y,{className:"QAView",audioName:e.audioName,audioData:c})}),Object(j.jsx)(p.a,{path:"/uist-2021/data/speaker",children:Object(j.jsx)(D,{className:"SpeakerView",audioName:e.audioName,audioData:c})}),Object(j.jsx)(p.a,{path:"/uist-2021/static/about",children:Object(j.jsx)(I,{})}),Object(j.jsx)(p.a,{children:Object(j.jsx)("p",{children:"Welcome! Navigate to the Explore Page to Begin."})})]})})},V=(a(39),function(e){Object(d.a)(a,e);var t=Object(o.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this;return Object(j.jsxs)("div",{className:"AudioSelectionContainer",children:[Object(j.jsxs)("p",{className:"CurrentAudioLabel",children:["Currently Analyzing Audio: ",Object(j.jsx)("strong",{children:this.props.selectedAudio?this.props.selectedAudio:Object(j.jsx)("samp",{className:"NoAudioSelectedText",children:"No Audio Selected"})})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("label",{className:"SelectAudioLabel",children:"Select an Audio:"}),Object(j.jsx)("select",{className:"AudioSelector",name:"AudioSelect",onChange:function(t){return e.props.onChange(t.target.value)},children:this.props.audios.map((function(e){return Object(j.jsx)("option",{children:e.value},e.id)}))})]})]})}}]),a}(n.Component)),E=a(23),F=(a(40),function(e){Object(d.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleChange=function(e){if(""===e)return n.setState({selectedAudio:""}),void n.setState({selectedAudioData:""});n.setState({selectedAudio:e})},n.state={audios:E,selectedAudio:""},n}return Object(r.a)(a,[{key:"render",value:function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(O.a,{children:[Object(j.jsx)(x,{}),Object(j.jsx)(V,{audios:this.state.audios,selectedAudio:this.state.selectedAudio,onChange:this.handleChange}),Object(j.jsx)(T,{audioName:this.state.selectedAudio})]})})}}]),a}(c.a.Component)),L=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,42)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;a(e),n(e),c(e),s(e),i(e)}))};i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(F,{})}),document.getElementById("root")),L()}},[[41,1,2]]]);
//# sourceMappingURL=main.debc46e7.chunk.js.map