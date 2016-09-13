/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-master-2b98560
 */
function mdCardDirective(e){return{restrict:"E",link:function(r,a,i){a.addClass("_md"),e(a)}}}goog.provide("ngmaterial.components.card"),goog.require("ngmaterial.core"),mdCardDirective.$inject=["$mdTheming"],angular.module("material.components.card",["material.core"]).directive("mdCard",mdCardDirective),ngmaterial.components.card=angular.module("material.components.card");