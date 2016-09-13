/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-master-2b98560
 */
function MdSubheaderDirective(e,r,a,n){return{restrict:"E",replace:!0,transclude:!0,template:'<div class="md-subheader _md">  <div class="md-subheader-inner">    <div class="md-subheader-content"></div>  </div></div>',link:function(t,i,d,o,c){function m(e){return angular.element(e[0].querySelector(".md-subheader-content"))}a(i),i.addClass("_md"),n.prefixer().removeAttribute(i,"ng-repeat");var s=i[0].outerHTML;c(t,function(e){m(i).append(e)}),i.hasClass("md-no-sticky")||c(t,function(a){var d=r('<div class="md-subheader-wrapper">'+s+"</div>")(t);n.nextTick(function(){m(d).append(a)}),e(t,i,d)})}}}goog.provide("ngmaterial.components.subheader"),goog.require("ngmaterial.components.sticky"),goog.require("ngmaterial.core"),MdSubheaderDirective.$inject=["$mdSticky","$compile","$mdTheming","$mdUtil"],angular.module("material.components.subheader",["material.core","material.components.sticky"]).directive("mdSubheader",MdSubheaderDirective),ngmaterial.components.subheader=angular.module("material.components.subheader");