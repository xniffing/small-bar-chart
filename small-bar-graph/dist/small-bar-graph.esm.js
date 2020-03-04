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

  data() {
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
    lastValue() {
      return this.dataObject.data[this.dataObject.data.length - 1];
    },

    maxValue() {
      return Math.max(...this.dataObject.data);
    },

    widgetData() {
      let formatted = [];

      for (const value of this.dataObject.data) {
        let calculation = (value / this.maxValue * 100).toFixed(0);
        let colorRamp = (value / this.maxValue * 100).toFixed(0);
        formatted.push({
          perc: {
            height: calculation + '%',
            background: 'hsl(' + colorRamp + ', 100%, 50%)'
          },
          value: value
        });
      }

      return formatted;
    },

    widgetSize() {
      let spacer = 200;

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
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    staticStyle: {
      "margin": "12px"
    }
  }, [_c('div', {
    staticClass: "graph-card columns is-block",
    style: _vm.widgetSize
  }, [_c('div', {
    staticClass: "column graph-title h4 has-text-centered",
    style: [_vm.isDark ? _vm.darkStyle : _vm.lightStyle]
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "graph-content has-text-centered"
  }, [_c('div', {
    staticClass: "graph-underlay is-flex",
    style: [_vm.isDark ? _vm.darkStyle : _vm.lightStyle]
  }, _vm._l(_vm.widgetData, function (item) {
    return _c('div', {
      key: item.value.key,
      staticClass: "graph",
      style: item.perc
    }, [_c('div', {
      staticClass: "has-text-centered is-full"
    })]);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "graph-value",
    style: [_vm.isDark ? _vm.darkColor : _vm.lightColor]
  }, [_vm._v(_vm._s(_vm.lastValue))])])])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-082ca45c_0", {
    source: ".graph{background:#55acee;width:var(--card-size);align-self:flex-end;opacity:.7}.graph-card{height:var(--card-size);width:var(--card-size);border-radius:3px;border:1px solid #d3d3d3}.graph-underlay{position:absolute;height:calc(var(--card-size) - 42px);width:calc(var(--card-size) - 1px);z-index:-1;border-radius:0 0 3px 3px}.graph-value{font-weight:200;font-size:calc(var(--card-size)/ 2.2);text-shadow:0 0 20px #fff}.graph-title{font-weight:700;max-height:41px;border-radius:3px 3px 0 0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installSmallBarGraph(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('SmallBarGraph', __vue_component__);
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

let GlobalVue = null;

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

export default __vue_component__;
