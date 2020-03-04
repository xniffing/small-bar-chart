'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "SoloBarGraph",
  props: {
    title: {
      type: String,
      required: true
    },
    dataObject: {
      type: Object,
      required: true
    },
    isMedium: {
      type: Boolean,
      default: false
    },
    isLarge: {
      type: Boolean,
      default: false
    },
    isExtraLarge: {
      type: Boolean,
      default: false
    },
    isDark: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      darkStyle: {
        background: 'black',
        color: 'white'
      },
      lightStyle: {
        background: 'white',
        color: 'black'
      },
      lightColor: {
        color: 'black'
      },
      darkColor: {
        color: 'white'
      }
    };
  },
  computed: {
    lastValue: function lastValue() {
      return this.dataObject.data[this.dataObject.data.length - 1];
    },
    maxValue: function maxValue() {
      return Math.max.apply(Math, _toConsumableArray(this.dataObject.data));
    },
    widgetData: function widgetData() {
      var formatted = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.dataObject.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;
          var calculation = (value / this.maxValue * 100).toFixed(0);
          var colorRamp = (value / this.maxValue * 100).toFixed(0);
          formatted.push({
            perc: {
              height: calculation + '%',
              background: 'hsl(' + colorRamp + ', 100%, 50%)'
            },
            value: value
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return formatted;
    },
    widgetSize: function widgetSize() {
      var spacer = 200;

      if (this.isMedium === true) {
        return {
          '--card-size': spacer + 50 + 'px'
        };
      }

      if (this.isExtraLarge === true) {
        return {
          '--card-size': spacer + 200 + 'px'
        };
      }

      if (this.isLarge === true) {
        return {
          '--card-size': spacer + 100 + 'px'
        };
      } else {
        return {
          '--card-size': spacer + 'px'
        };
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticStyle: {
      "margin": "12px"
    }
  }, [_vm._ssrNode("<div class=\"graph-card columns is-block\"" + _vm._ssrStyle(null, _vm.widgetSize, null) + "><div class=\"column graph-title h4 has-text-centered\"" + _vm._ssrStyle(null, [_vm.isDark ? _vm.darkStyle : _vm.lightStyle], null) + ">" + _vm._ssrEscape(_vm._s(_vm.title)) + "</div> <div class=\"graph-content has-text-centered\"><div class=\"graph-underlay is-flex\"" + _vm._ssrStyle(null, [_vm.isDark ? _vm.darkStyle : _vm.lightStyle], null) + ">" + _vm._ssrList(_vm.widgetData, function (item) {
    return "<div class=\"graph\"" + _vm._ssrStyle(null, item.perc, null) + "><div class=\"has-text-centered is-full\"></div></div>";
  }) + "</div> <div class=\"graph-value\"" + _vm._ssrStyle(null, [_vm.isDark ? _vm.darkColor : _vm.lightColor], null) + ">" + _vm._ssrEscape(_vm._s(_vm.lastValue)) + "</div></div></div>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-082ca45c_0", {
    source: ".graph{background:#55acee;width:var(--card-size);align-self:flex-end;opacity:.7}.graph-card{height:var(--card-size);width:var(--card-size);border-radius:3px;border:1px solid #d3d3d3}.graph-underlay{position:absolute;height:calc(var(--card-size) - 42px);width:calc(var(--card-size) - 1px);z-index:-1;border-radius:0 0 3px 3px}.graph-value{font-weight:200;font-size:calc(var(--card-size)/ 2.2);text-shadow:0 0 20px #fff}.graph-title{font-weight:700;max-height:41px;border-radius:3px 3px 0 0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-082ca45c";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installSmallBarGraph(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('SmallBarGraph', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;