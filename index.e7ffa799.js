!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},r=t.parcelRequired76b;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},t.parcelRequired76b=r);var o=r("bpxeT"),c=r("2TvXO"),i=r("ikj7U"),s=r("eaChm"),l=r("25beE"),u=r("i1PHi"),d=(o=r("bpxeT"),c=r("2TvXO"),i=r("ikj7U"),l=r("25beE"),s=r("eaChm"),u=r("i1PHi"),{listPages:document.getElementById("pages-list")});function v(){var e="",t=l.total_pgs-2;switch(!0){case l.pageNow<=3:for(var n=1;n<=5;n++)e+='<li><button id="num-page-btn">'.concat(n,"</button></li>");e+='<li>...</li>\n            <li><button id="num-page-btn">'.concat(l.total_pgs,"</button></li>"),d.listPages.innerHTML=e;break;case l.pageNow>=t:e+='<li><button id="num-page-btn">1</button></li><li>...</li>';for(var a=l.pageNow-2;a<=l.total_pgs;a++)e+='<li><button id="num-page-btn">'.concat(a,"</button></li>");d.listPages.innerHTML=e;break;case l.pageNow>3&&l.pageNow<t:e+='<li><button id="num-page-btn">1</button></li><li>...</li>';for(var r=l.pageNow-2;r<=l.pageNow+2;r++)e+='<li><button id="num-page-btn">'.concat(r,"</button></li>");e+='<li>...</li>\n            <li><button id="num-page-btn">'.concat(l.total_pgs,"</button></li>"),d.listPages.innerHTML=e;break;default:console.log("Caso no reconocido")}}function p(){var t;document.getElementById("pg-contoler").addEventListener("click",(t=e(o)(e(c).mark((function t(n){var a,r,o,d,p,g,f,m,b;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.target||!n.target.matches("#num-page-btn")){e.next=16;break}return a=n.target,e.next=4,i.getAPI.genres();case 4:return r=e.sent,e.next=7,i.getAPI.movies(s.varDOM.movieName.value.trim(),a.textContent);case 7:return o=e.sent,e.next=10,(0,l.renderPost)(o,a,r);case 10:v(),a.classList.add("pag-active"),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){s.varDOM.modalContainer.style.display="block",(0,u.detailsMovieValues)(t.dataset.id)}))})),e.next=46;break;case 16:if(!n.target||!n.target.matches("#pg-advance-btn")){e.next=32;break}return d=l.pageNow+1,e.next=20,i.getAPI.genres();case 20:return p=e.sent,e.next=23,i.getAPI.movies(s.varDOM.movieName.value.trim(),d);case 23:return g=e.sent,e.next=26,(0,l.renderPost)(g,d,p);case 26:console.log("page: ".concat(l.pageNow)),v(),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){s.varDOM.modalContainer.style.display="block",(0,u.detailsMovieValues)(t.dataset.id)}))})),e.next=46;break;case 32:if(!n.target||!n.target.matches("#pg-back-btn")){e.next=46;break}return f=1===l.pageNow?l.pageNow:l.pageNow-1,e.next=36,i.getAPI.genres();case 36:return m=e.sent,e.next=39,i.getAPI.movies(s.varDOM.movieName.value.trim(),f);case 39:return b=e.sent,e.next=42,(0,l.renderPost)(b,f,m);case 42:console.log(b.data.total_results),v(),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){s.varDOM.modalContainer.style.display="block",(0,u.detailsMovieValues)(t.dataset.id)}))}));case 46:case"end":return e.stop()}}),t)}))),function(e){return t.apply(this,arguments)}))}var g=r("isQdP"),f=r("UL92Z");r("3ngM5");var m,b=s.varDOM.movieName,x=s.varDOM.onSearchBtn,k=s.varDOM.modalContainer,E=(s.varDOM.modalP,s.varDOM.modalCloseBtn),M=s.varDOM.modalQueueBtn,y=s.varDOM.modalWatchedBtn,D=(s.varDOM.buttonWatchet,s.varDOM.buttonQueue,s.varDOM.buttons,s.varDOM.clearWatched,s.varDOM.clearQueue,s.varDOM.library,s.varDOM.filmsRender,s.varDOM.home,s.varDOM.error),w=s.varDOM.openModalFooter,h=s.varDOM.closeModalFooter,O=s.varDOM.modalFooter,A=s.varDOM.scrollTopBtn;function C(e,t,n){return N.apply(this,arguments)}function N(){return(N=e(o)(e(c).mark((function t(n,a,r){return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){e((0,l.renderPost)(n,a,r))})));case 1:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function L(){return L=e(o)(e(c).mark((function t(n){var a,r;return e(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.getAPI.trendMovies(n);case 2:return a=t.sent,t.next=5,i.getAPI.genres();case 5:return r=t.sent,m=r.slice(),t.next=9,C(a,n,r);case 9:v(),document.getElementById("pg-contoler").addEventListener("click",function(){var t=e(o)(e(c).mark((function t(n){var a,o,s,d;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.target||!n.target.matches("#num-page-btn")){e.next=13;break}return a=n.target,e.next=4,i.getAPI.trendMovies(a.textContent);case 4:return o=e.sent,e.next=7,C(o,a.textContent,r);case 7:v(),console.log(l.pageNow),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){k.style.display="block",(0,u.detailsMovieValues)(t.dataset.id)}))})),e.next=37;break;case 13:if(!n.target||!n.target.matches("#pg-advance-btn")){e.next=26;break}return pageAdv=l.pageNow===l.total_pgs?l.pageNow:l.pageNow+1,e.next=17,i.getAPI.trendMovies(pageAdv);case 17:return s=e.sent,e.next=20,C(s,pageAdv,r);case 20:v(),console.log(l.pageNow),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){k.style.display="block",(0,u.detailsMovieValues)(t.dataset.id)}))})),e.next=37;break;case 26:if(!n.target||!n.target.matches("#pg-back-btn")){e.next=37;break}return pageBack=1===l.pageNow?l.pageNow:l.pageNow-1,e.next=30,i.getAPI.trendMovies(pageBack);case 30:return d=e.sent,e.next=33,C(d,pageBack,r);case 33:v(),console.log(l.pageNow),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){k.style.display="block",(0,u.detailsMovieValues)(t.dataset.id)}))}));case 37:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){k.style.display="block",(0,u.detailsMovieValues)(t.dataset.id),y.textContent="ADD TO WATCHED",M.textContent="ADD TO QUEUE",1==(0,f.searchId)(t.dataset.id,"Watched")&&(y.textContent="REMOVE FROM WHATCHED",console.log((0,f.searchId)(t.dataset.id,"Watched"))),1==(0,f.searchId)(t.dataset.id,"Queue")&&(M.textContent="REMOVE FROM QUEUE")}))}));case 13:case"end":return t.stop()}}),t)}))),L.apply(this,arguments)}!function(e){L.apply(this,arguments)}(1),x.addEventListener("click",e(o)(e(c).mark((function t(){var n;return e(c).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""==b.value){e.next=17;break}return e.next=3,i.getAPI.movies(b.value.trim(),1);case 3:if(n=e.sent,console.log(n.data.total_results),!(n.data.total_results>=1)){e.next=14;break}return e.next=8,C(n,1,m);case 8:v(),p(),document.querySelectorAll(".movie-card").forEach((function(e){var t=e.querySelector("a");e.addEventListener("click",(function(){k.style.display="block",(0,u.detailsMovieValues)(t.dataset.id)}))})),e.next=15;break;case 14:D.innerHTML="No se encontraron Resultados";case 15:e.next=18;break;case 17:return e.abrupt("return",window.alert("Please write something!"));case 18:case"end":return e.stop()}}),t)})))),b.addEventListener("keydown",(function(e){13===e.keyCode&&(e.preventDefault(),x.click())})),M.addEventListener("click",(function(e){e.preventDefault(),"ADD TO QUEUE"==M.textContent?((0,f.setQueue)(M.value),M.textContent="REMOVE FROM QUEUE"):((0,f.removeQueue)(M.value),M.textContent="ADD TO QUEUE",console.log("remove"))})),y.addEventListener("click",(function(e){e.preventDefault(),"ADD TO WATCHED"==y.textContent?((0,f.setWatched)(y.value),y.textContent="REMOVE FROM WATCHED"):((0,f.removeWatched)(y.value),y.textContent="ADD TO WATCHED",console.log("remove"))})),w.addEventListener("click",(function(){O.style.display="block"})),h.addEventListener("click",(function(){O.style.display="none"})),window.addEventListener("scroll",g.scrollTop),A.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})})),E.addEventListener("click",(function(){k.style.display="none"}))}();
//# sourceMappingURL=index.e7ffa799.js.map
