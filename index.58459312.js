var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},o=e.parcelRequired76b;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in a){var o=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){a[e]=t},e.parcelRequired76b=o);var n=o("2I93e"),l=o("2WKNU"),i=o("2Tvkn");l=o("2WKNU"),n=o("2I93e");const{modalContainer:r,modalImgPoster:c,modalCloseBtn:s,modalTitle:d,modalInfoValues:u,modalDescMovie:g,modalWatchedBtn:m,modalQueueBtn:p,defaultPoster:v}=l.varDOM;async function w(e){const t=await n.getAPI.detailMovie(e),{backdrop_path:a,poster_path:o,original_title:l,title:i,vote_average:r,vote_count:s,popularity:w,genres:y,overview:b,id:f}=t.data;let h="";t.data.genres.forEach((e=>{h+=e.name+" | "})),c.src=null!=o?`https://image.tmdb.org/t/p/w500${o}`:null!=a?`https://image.tmdb.org/t/p/w500${a}`:v,d.textContent=i,m.value=f,p.value=f;const k=`\n        <li><span class="film-info_vote">${r.toFixed(1)}</span> / <span class="film-info_count">${s}</span></li>\n        <li>${w}</li>\n        <li>${l}</li>\n        <li>${h}</li>`;u.innerHTML=k,g.textContent=b}n=o("2I93e"),i=o("2Tvkn"),l=o("2WKNU");let y={listPages:document.getElementById("pages-list")};function b(){let e="",t=i.total_pgs-2;switch(!0){case i.pageNow<=3:for(let t=1;t<=5;t++)e+=`<li><button id="num-page-btn">${t}</button></li>`;e+=`<li>...</li>\n            <li><button id="num-page-btn">${i.total_pgs}</button></li>`,y.listPages.innerHTML=e;break;case i.pageNow>=t:e+='<li><button id="num-page-btn">1</button></li><li>...</li>';for(let t=i.pageNow-2;t<=i.total_pgs;t++)e+=`<li><button id="num-page-btn">${t}</button></li>`;y.listPages.innerHTML=e;break;case i.pageNow>3&&i.pageNow<t:e+='<li><button id="num-page-btn">1</button></li><li>...</li>';for(let t=i.pageNow-2;t<=i.pageNow+2;t++)e+=`<li><button id="num-page-btn">${t}</button></li>`;e+=`<li>...</li>\n            <li><button id="num-page-btn">${i.total_pgs}</button></li>`,y.listPages.innerHTML=e;break;default:console.log("Caso no reconocido")}}l=o("2WKNU");var f=o("31u3U");const h=document.querySelector("#switch-label"),k=document.querySelector("body"),E=document.querySelector(".switch-button__checkbox");let L=localStorage.getItem("ui-theme");window.addEventListener("DOMContentLoaded",(function(){L=localStorage.getItem("ui-theme"),"dark"===L?(k.classList.add("body-theme"),E.checked=!0):(k.classList.remove("body-theme"),E.checked=!1)})),h.addEventListener("click",(function(){L=localStorage.getItem("ui-theme"),"dark"===L?(k.classList.remove("body-theme"),localStorage.setItem("ui-theme","light")):(k.classList.add("body-theme"),localStorage.setItem("ui-theme","dark"))}));const{movieName:N,onSearchBtn:I,modalContainer:P,modalP:S,modalCloseBtn:A,modalQueueBtn:M,modalWatchedBtn:q,buttonWatchet:_,buttonQueue:C,buttons:D,clearWatched:B,clearQueue:O,library:T,filmsRender:$,home:x,error:W,openModalFooter:U,closeModalFooter:H,modalFooter:F,scrollTopBtn:Q}=l.varDOM;let K;async function R(e,t,a){return new Promise((o=>{o((0,i.renderPost)(e,t,a))}))}!async function(e){const t=await n.getAPI.trendMovies(e),a=await n.getAPI.genres();K=a.slice(),await R(t,e,a),b(),document.getElementById("pg-contoler").addEventListener("click",(async e=>{if(e.target&&e.target.matches("#num-page-btn")){const t=e.target,o=await n.getAPI.trendMovies(t.textContent);await R(o,t.textContent,a),b(),console.log(i.pageNow);document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{P.style.display="block",w(t.dataset.id)}))}))}else if(e.target&&e.target.matches("#pg-advance-btn")){pageAdv=i.pageNow===i.total_pgs?i.pageNow:i.pageNow+1;const e=await n.getAPI.trendMovies(pageAdv);await R(e,pageAdv,a),b(),console.log(i.pageNow);document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{P.style.display="block",w(t.dataset.id)}))}))}else if(e.target&&e.target.matches("#pg-back-btn")){pageBack=1===i.pageNow?i.pageNow:i.pageNow-1;const e=await n.getAPI.trendMovies(pageBack);await R(e,pageBack,a),b(),console.log(i.pageNow);document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{P.style.display="block",w(t.dataset.id)}))}))}})),document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{P.style.display="block",w(t.dataset.id)}))}))}(1),I.addEventListener("click",(async()=>{if(""==N.value)return window.alert("Please write something!");{const e=await n.getAPI.movies(N.value.trim(),1);if(console.log(e.data.total_results),e.data.total_results>=1){await R(e,1,K),b(),document.getElementById("pg-contoler").addEventListener("click",(async e=>{if(e.target&&e.target.matches("#num-page-btn")){const t=e.target,a=await n.getAPI.genres(),o=await n.getAPI.movies(l.varDOM.movieName.value.trim(),t.textContent);await(0,i.renderPost)(o,t,a),b(),t.classList.add("pag-active"),document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{l.varDOM.modalContainer.style.display="block",w(t.dataset.id)}))}))}else if(e.target&&e.target.matches("#pg-advance-btn")){const e=i.pageNow+1,t=await n.getAPI.genres(),a=await n.getAPI.movies(l.varDOM.movieName.value.trim(),e);await(0,i.renderPost)(a,e,t),console.log(`page: ${i.pageNow}`),b(),document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{l.varDOM.modalContainer.style.display="block",w(t.dataset.id)}))}))}else if(e.target&&e.target.matches("#pg-back-btn")){const e=1===i.pageNow?i.pageNow:i.pageNow-1,t=await n.getAPI.genres(),a=await n.getAPI.movies(l.varDOM.movieName.value.trim(),e);await(0,i.renderPost)(a,e,t),console.log(a.data.total_results),b(),document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{l.varDOM.modalContainer.style.display="block",w(t.dataset.id)}))}))}}));document.querySelectorAll(".movie-card").forEach((e=>{const t=e.querySelector("a");e.addEventListener("click",(()=>{P.style.display="block",w(t.dataset.id)}))}))}else W.innerHTML="No se encontraron Resultados"}})),N.addEventListener("keydown",(e=>{13===e.keyCode&&(e.preventDefault(),I.click())})),M.addEventListener("click",(e=>{e.preventDefault(),(0,f.setQueue)(M.value)})),q.addEventListener("click",(e=>{e.preventDefault(),(0,f.setWatched)(q.value)})),U.addEventListener("click",(()=>{F.style.display="block"})),H.addEventListener("click",(()=>{F.style.display="none"})),window.addEventListener("scroll",(()=>{let e=window.pageYOffset,t=document.documentElement.scrollHeight/2;l.varDOM.scrollTopBtn.style.display=e>t?"block":"none"})),Q.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})})),A.addEventListener("click",(()=>{P.style.display="none"}));
//# sourceMappingURL=index.58459312.js.map
