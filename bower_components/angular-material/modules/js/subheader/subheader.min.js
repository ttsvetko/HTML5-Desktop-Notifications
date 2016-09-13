/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-master-2b98560
 */
!function(e,n,t){"use strict";function d(e,t,d,i){return{restrict:"E",replace:!0,transclude:!0,template:'<div class="md-subheader _md">  <div class="md-subheader-inner">    <div class="md-subheader-content"></div>  </div></div>',link:function(r,a,c,s,m){function u(e){return n.element(e[0].querySelector(".md-subheader-content"))}d(a),a.addClass("_md"),i.prefixer().removeAttribute(a,"ng-repeat");var o=a[0].outerHTML;m(r,function(e){u(a).append(e)}),a.hasClass("md-no-sticky")||m(r,function(n){var d=t('<div class="md-subheader-wrapper">'+o+"</div>")(r);i.nextTick(function(){u(d).append(n)}),e(r,a,d)})}}}d.$inject=["$mdSticky","$compile","$mdTheming","$mdUtil"],n.module("material.components.subheader",["material.core","material.components.sticky"]).directive("mdSubheader",d)}(window,window.angular);