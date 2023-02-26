import {
  require_outline
} from "/build/_shared/chunk-A6IMWZZS.js";
import {
  Navigation
} from "/build/_shared/chunk-PWSHOSZL.js";
import {
  SmartTable,
  require_prop_types
} from "/build/_shared/chunk-IWBMQWI4.js";
import "/build/_shared/chunk-NDSEZY7R.js";
import {
  useUser
} from "/build/_shared/chunk-PMDIGT5R.js";
import {
  require_session
} from "/build/_shared/chunk-3Q6GZENC.js";
import {
  Form,
  require_jsx_dev_runtime,
  require_react,
  useActionData,
  useSubmit
} from "/build/_shared/chunk-RLA37IRW.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// empty-module:~/models/playground.server
var require_playground = __commonJS({
  "empty-module:~/models/playground.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/playground.tsx
var import_react12 = __toESM(require_react());

// node_modules/@monaco-editor/loader/lib/es/_virtual/_rollupPluginBabelHelpers.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/state-local/lib/es/state-local.js
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread22(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x) {
    return fns.reduceRight(function(y, f) {
      return f(y);
    }, x);
  };
}
function curry(fn) {
  return function curried() {
    var _this = this;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return args.length >= fn.length ? fn.apply(this, args) : function() {
      for (var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nextArgs[_key3] = arguments[_key3];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject(value) {
  return {}.toString.call(value).includes("Object");
}
function isEmpty(obj) {
  return !Object.keys(obj).length;
}
function isFunction(value) {
  return typeof value === "function";
}
function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
function validateChanges(initial, changes) {
  if (!isObject(changes))
    errorHandler("changeType");
  if (Object.keys(changes).some(function(field) {
    return !hasOwnProperty(initial, field);
  }))
    errorHandler("changeField");
  return changes;
}
function validateSelector(selector) {
  if (!isFunction(selector))
    errorHandler("selectorType");
}
function validateHandler(handler) {
  if (!(isFunction(handler) || isObject(handler)))
    errorHandler("handlerType");
  if (isObject(handler) && Object.values(handler).some(function(_handler) {
    return !isFunction(_handler);
  }))
    errorHandler("handlersType");
}
function validateInitial(initial) {
  if (!initial)
    errorHandler("initialIsRequired");
  if (!isObject(initial))
    errorHandler("initialType");
  if (isEmpty(initial))
    errorHandler("initialContent");
}
function throwError(errorMessages3, type) {
  throw new Error(errorMessages3[type] || errorMessages3["default"]);
}
var errorMessages = {
  initialIsRequired: "initial state is required",
  initialType: "initial state should be an object",
  initialContent: "initial state shouldn't be an empty object",
  handlerType: "handler should be an object or a function",
  handlersType: "all handlers should be a functions",
  selectorType: "selector should be a function",
  changeType: "provided value of changes should be an object",
  changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
  "default": "an unknown error accured in `state-local` package"
};
var errorHandler = curry(throwError)(errorMessages);
var validators = {
  changes: validateChanges,
  selector: validateSelector,
  handler: validateHandler,
  initial: validateInitial
};
function create(initial) {
  var handler = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  validators.initial(initial);
  validators.handler(handler);
  var state = {
    current: initial
  };
  var didUpdate = curry(didStateUpdate)(state, handler);
  var update = curry(updateState)(state);
  var validate = curry(validators.changes)(initial);
  var getChanges = curry(extractChanges)(state);
  function getState2() {
    var selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(state2) {
      return state2;
    };
    validators.selector(selector);
    return selector(state.current);
  }
  function setState2(causedChanges) {
    compose(didUpdate, update, validate, getChanges)(causedChanges);
  }
  return [getState2, setState2];
}
function extractChanges(state, causedChanges) {
  return isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}
function updateState(state, changes) {
  state.current = _objectSpread22(_objectSpread22({}, state.current), changes);
  return changes;
}
function didStateUpdate(state, handler, changes) {
  isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function(field) {
    var _handler$field;
    return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
  });
  return changes;
}
var index = {
  create
};
var state_local_default = index;

// node_modules/@monaco-editor/loader/lib/es/config/index.js
var config = {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs"
  }
};
var config_default = config;

// node_modules/@monaco-editor/loader/lib/es/utils/curry.js
function curry2(fn) {
  return function curried() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.length >= fn.length ? fn.apply(this, args) : function() {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextArgs[_key2] = arguments[_key2];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
var curry_default = curry2;

// node_modules/@monaco-editor/loader/lib/es/utils/isObject.js
function isObject2(value) {
  return {}.toString.call(value).includes("Object");
}
var isObject_default = isObject2;

// node_modules/@monaco-editor/loader/lib/es/validators/index.js
function validateConfig(config3) {
  if (!config3)
    errorHandler2("configIsRequired");
  if (!isObject_default(config3))
    errorHandler2("configType");
  if (config3.urls) {
    informAboutDeprecation();
    return {
      paths: {
        vs: config3.urls.monacoBase
      }
    };
  }
  return config3;
}
function informAboutDeprecation() {
  console.warn(errorMessages2.deprecation);
}
function throwError2(errorMessages3, type) {
  throw new Error(errorMessages3[type] || errorMessages3["default"]);
}
var errorMessages2 = {
  configIsRequired: "the configuration object is required",
  configType: "the configuration object should be an object",
  "default": "an unknown error accured in `@monaco-editor/loader` package",
  deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler2 = curry_default(throwError2)(errorMessages2);
var validators2 = {
  config: validateConfig
};
var validators_default = validators2;

// node_modules/@monaco-editor/loader/lib/es/utils/compose.js
var compose2 = function compose3() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x) {
    return fns.reduceRight(function(y, f) {
      return f(y);
    }, x);
  };
};
var compose_default = compose2;

// node_modules/@monaco-editor/loader/lib/es/utils/deepMerge.js
function merge(target, source) {
  Object.keys(source).forEach(function(key) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  });
  return _objectSpread2(_objectSpread2({}, target), source);
}
var deepMerge_default = merge;

// node_modules/@monaco-editor/loader/lib/es/utils/makeCancelable.js
var CANCELATION_MESSAGE = {
  type: "cancelation",
  msg: "operation is manually canceled"
};
function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function(resolve, reject) {
    promise.then(function(val) {
      return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
    });
    promise["catch"](reject);
  });
  return wrappedPromise.cancel = function() {
    return hasCanceled_ = true;
  }, wrappedPromise;
}
var makeCancelable_default = makeCancelable;

// node_modules/@monaco-editor/loader/lib/es/loader/index.js
var _state$create = state_local_default.create({
  config: config_default,
  isInitialized: false,
  resolve: null,
  reject: null,
  monaco: null
});
var _state$create2 = _slicedToArray(_state$create, 2);
var getState = _state$create2[0];
var setState = _state$create2[1];
function config2(globalConfig) {
  var _validators$config = validators_default.config(globalConfig), monaco = _validators$config.monaco, config3 = _objectWithoutProperties(_validators$config, ["monaco"]);
  setState(function(state) {
    return {
      config: deepMerge_default(state.config, config3),
      monaco
    };
  });
}
function init() {
  var state = getState(function(_ref) {
    var monaco = _ref.monaco, isInitialized = _ref.isInitialized, resolve = _ref.resolve;
    return {
      monaco,
      isInitialized,
      resolve
    };
  });
  if (!state.isInitialized) {
    setState({
      isInitialized: true
    });
    if (state.monaco) {
      state.resolve(state.monaco);
      return makeCancelable_default(wrapperPromise);
    }
    if (window.monaco && window.monaco.editor) {
      storeMonacoInstance(window.monaco);
      state.resolve(window.monaco);
      return makeCancelable_default(wrapperPromise);
    }
    compose_default(injectScripts, getMonacoLoaderScript)(configureLoader);
  }
  return makeCancelable_default(wrapperPromise);
}
function injectScripts(script) {
  return document.body.appendChild(script);
}
function createScript(src) {
  var script = document.createElement("script");
  return src && (script.src = src), script;
}
function getMonacoLoaderScript(configureLoader2) {
  var state = getState(function(_ref2) {
    var config3 = _ref2.config, reject = _ref2.reject;
    return {
      config: config3,
      reject
    };
  });
  var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));
  loaderScript.onload = function() {
    return configureLoader2();
  };
  loaderScript.onerror = state.reject;
  return loaderScript;
}
function configureLoader() {
  var state = getState(function(_ref3) {
    var config3 = _ref3.config, resolve = _ref3.resolve, reject = _ref3.reject;
    return {
      config: config3,
      resolve,
      reject
    };
  });
  var require2 = window.require;
  require2.config(state.config);
  require2(["vs/editor/editor.main"], function(monaco) {
    storeMonacoInstance(monaco);
    state.resolve(monaco);
  }, function(error) {
    state.reject(error);
  });
}
function storeMonacoInstance(monaco) {
  if (!getState().monaco) {
    setState({
      monaco
    });
  }
}
function __getMonacoInstance() {
  return getState(function(_ref4) {
    var monaco = _ref4.monaco;
    return monaco;
  });
}
var wrapperPromise = new Promise(function(resolve, reject) {
  return setState({
    resolve,
    reject
  });
});
var loader = {
  config: config2,
  init,
  __getMonacoInstance
};
var loader_default = loader;

// node_modules/@monaco-editor/react/lib/es/DiffEditor/index.js
var import_react7 = __toESM(require_react());

// node_modules/@monaco-editor/react/lib/es/DiffEditor/DiffEditor.js
var import_react6 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@monaco-editor/react/lib/es/MonacoContainer/index.js
var import_react3 = __toESM(require_react());

// node_modules/@monaco-editor/react/lib/es/MonacoContainer/MonacoContainer.js
var import_react2 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@monaco-editor/react/lib/es/_virtual/_rollupPluginBabelHelpers.js
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// node_modules/@monaco-editor/react/lib/es/Loading/Loading.js
var import_react = __toESM(require_react());
var loadingStyles = {
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center"
};
function Loading({
  content
}) {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    style: loadingStyles
  }, content);
}
var Loading_default = Loading;

// node_modules/@monaco-editor/react/lib/es/MonacoContainer/styles.js
var styles = {
  wrapper: {
    display: "flex",
    position: "relative",
    textAlign: "initial"
  },
  fullWidth: {
    width: "100%"
  },
  hide: {
    display: "none"
  }
};
var styles_default = styles;

// node_modules/@monaco-editor/react/lib/es/MonacoContainer/MonacoContainer.js
function MonacoContainer({
  width,
  height,
  isEditorReady,
  loading,
  _ref,
  className,
  wrapperProps
}) {
  return /* @__PURE__ */ import_react2.default.createElement("section", _extends({
    style: {
      ...styles_default.wrapper,
      width,
      height
    }
  }, wrapperProps), !isEditorReady && /* @__PURE__ */ import_react2.default.createElement(Loading_default, {
    content: loading
  }), /* @__PURE__ */ import_react2.default.createElement("div", {
    ref: _ref,
    style: {
      ...styles_default.fullWidth,
      ...!isEditorReady && styles_default.hide
    },
    className
  }));
}
MonacoContainer.propTypes = {
  width: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]).isRequired,
  height: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]).isRequired,
  loading: import_prop_types.default.oneOfType([import_prop_types.default.element, import_prop_types.default.string]).isRequired,
  isEditorReady: import_prop_types.default.bool.isRequired,
  className: import_prop_types.default.string,
  wrapperProps: import_prop_types.default.object
};
var MonacoContainer_default = MonacoContainer;

// node_modules/@monaco-editor/react/lib/es/MonacoContainer/index.js
var MonacoContainer2 = /* @__PURE__ */ (0, import_react3.memo)(MonacoContainer_default);
var MonacoContainer_default2 = MonacoContainer2;

// node_modules/@monaco-editor/react/lib/es/hooks/useMount/index.js
var import_react4 = __toESM(require_react());
function useMount(effect) {
  (0, import_react4.useEffect)(effect, []);
}
var useMount_default = useMount;

// node_modules/@monaco-editor/react/lib/es/hooks/useUpdate/index.js
var import_react5 = __toESM(require_react());
function useUpdate(effect, deps, applyChanges = true) {
  const isInitialMount = (0, import_react5.useRef)(true);
  (0, import_react5.useEffect)(isInitialMount.current || !applyChanges ? () => {
    isInitialMount.current = false;
  } : effect, deps);
}
var useUpdate_default = useUpdate;

// node_modules/@monaco-editor/react/lib/es/utils/index.js
function noop() {
}
function getOrCreateModel(monaco, value, language, path) {
  return getModel(monaco, path) || createModel(monaco, value, language, path);
}
function getModel(monaco, path) {
  return monaco.editor.getModel(createModelUri(monaco, path));
}
function createModel(monaco, value, language, path) {
  return monaco.editor.createModel(value, language, path && createModelUri(monaco, path));
}
function createModelUri(monaco, path) {
  return monaco.Uri.parse(path);
}
function isUndefined(input) {
  return input === void 0;
}

// node_modules/@monaco-editor/react/lib/es/DiffEditor/DiffEditor.js
function DiffEditor({
  original,
  modified,
  language,
  originalLanguage,
  modifiedLanguage,
  originalModelPath,
  modifiedModelPath,
  keepCurrentOriginalModel,
  keepCurrentModifiedModel,
  theme,
  loading,
  options,
  height,
  width,
  className,
  wrapperProps,
  beforeMount,
  onMount
}) {
  const [isEditorReady, setIsEditorReady] = (0, import_react6.useState)(false);
  const [isMonacoMounting, setIsMonacoMounting] = (0, import_react6.useState)(true);
  const editorRef = (0, import_react6.useRef)(null);
  const monacoRef = (0, import_react6.useRef)(null);
  const containerRef = (0, import_react6.useRef)(null);
  const onMountRef = (0, import_react6.useRef)(onMount);
  const beforeMountRef = (0, import_react6.useRef)(beforeMount);
  useMount_default(() => {
    const cancelable = loader_default.init();
    cancelable.then((monaco) => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch((error) => (error === null || error === void 0 ? void 0 : error.type) !== "cancelation" && console.error("Monaco initialization: error:", error));
    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });
  useUpdate_default(() => {
    const modifiedEditor = editorRef.current.getModifiedEditor();
    if (modifiedEditor.getOption(monacoRef.current.editor.EditorOption.readOnly)) {
      modifiedEditor.setValue(modified);
    } else {
      if (modified !== modifiedEditor.getValue()) {
        modifiedEditor.executeEdits("", [{
          range: modifiedEditor.getModel().getFullModelRange(),
          text: modified,
          forceMoveMarkers: true
        }]);
        modifiedEditor.pushUndoStop();
      }
    }
  }, [modified], isEditorReady);
  useUpdate_default(() => {
    editorRef.current.getModel().original.setValue(original);
  }, [original], isEditorReady);
  useUpdate_default(() => {
    const {
      original: original2,
      modified: modified2
    } = editorRef.current.getModel();
    monacoRef.current.editor.setModelLanguage(original2, originalLanguage || language);
    monacoRef.current.editor.setModelLanguage(modified2, modifiedLanguage || language);
  }, [language, originalLanguage, modifiedLanguage], isEditorReady);
  useUpdate_default(() => {
    monacoRef.current.editor.setTheme(theme);
  }, [theme], isEditorReady);
  useUpdate_default(() => {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  const setModels = (0, import_react6.useCallback)(() => {
    beforeMountRef.current(monacoRef.current);
    const originalModel = getOrCreateModel(monacoRef.current, original, originalLanguage || language, originalModelPath);
    const modifiedModel = getOrCreateModel(monacoRef.current, modified, modifiedLanguage || language, modifiedModelPath);
    editorRef.current.setModel({
      original: originalModel,
      modified: modifiedModel
    });
  }, [language, modified, modifiedLanguage, original, originalLanguage, originalModelPath, modifiedModelPath]);
  const createEditor = (0, import_react6.useCallback)(() => {
    editorRef.current = monacoRef.current.editor.createDiffEditor(containerRef.current, {
      automaticLayout: true,
      ...options
    });
    setModels();
    monacoRef.current.editor.setTheme(theme);
    setIsEditorReady(true);
  }, [options, theme, setModels]);
  (0, import_react6.useEffect)(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  (0, import_react6.useEffect)(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);
  function disposeEditor() {
    const models = editorRef.current.getModel();
    if (!keepCurrentOriginalModel) {
      var _models$original;
      (_models$original = models.original) === null || _models$original === void 0 ? void 0 : _models$original.dispose();
    }
    if (!keepCurrentModifiedModel) {
      var _models$modified;
      (_models$modified = models.modified) === null || _models$modified === void 0 ? void 0 : _models$modified.dispose();
    }
    editorRef.current.dispose();
  }
  return /* @__PURE__ */ import_react6.default.createElement(MonacoContainer_default2, {
    width,
    height,
    isEditorReady,
    loading,
    _ref: containerRef,
    className,
    wrapperProps
  });
}
DiffEditor.propTypes = {
  original: import_prop_types2.default.string,
  modified: import_prop_types2.default.string,
  language: import_prop_types2.default.string,
  originalLanguage: import_prop_types2.default.string,
  modifiedLanguage: import_prop_types2.default.string,
  originalModelPath: import_prop_types2.default.string,
  modifiedModelPath: import_prop_types2.default.string,
  keepCurrentOriginalModel: import_prop_types2.default.bool,
  keepCurrentModifiedModel: import_prop_types2.default.bool,
  theme: import_prop_types2.default.string,
  loading: import_prop_types2.default.oneOfType([import_prop_types2.default.element, import_prop_types2.default.string]),
  options: import_prop_types2.default.object,
  width: import_prop_types2.default.oneOfType([import_prop_types2.default.number, import_prop_types2.default.string]),
  height: import_prop_types2.default.oneOfType([import_prop_types2.default.number, import_prop_types2.default.string]),
  className: import_prop_types2.default.string,
  wrapperProps: import_prop_types2.default.object,
  beforeMount: import_prop_types2.default.func,
  onMount: import_prop_types2.default.func
};
DiffEditor.defaultProps = {
  theme: "light",
  loading: "Loading...",
  options: {},
  keepCurrentOriginalModel: false,
  keepCurrentModifiedModel: false,
  width: "100%",
  height: "100%",
  wrapperProps: {},
  beforeMount: noop,
  onMount: noop
};

// node_modules/@monaco-editor/react/lib/es/hooks/useMonaco/index.js
var import_react8 = __toESM(require_react());

// node_modules/@monaco-editor/react/lib/es/Editor/index.js
var import_react11 = __toESM(require_react());

// node_modules/@monaco-editor/react/lib/es/Editor/Editor.js
var import_react10 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());

// node_modules/@monaco-editor/react/lib/es/hooks/usePrevious/index.js
var import_react9 = __toESM(require_react());
function usePrevious(value) {
  const ref = (0, import_react9.useRef)();
  (0, import_react9.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var usePrevious_default = usePrevious;

// node_modules/@monaco-editor/react/lib/es/Editor/Editor.js
var viewStates = /* @__PURE__ */ new Map();
function Editor({
  defaultValue,
  defaultLanguage,
  defaultPath,
  value,
  language,
  path,
  theme,
  line,
  loading,
  options,
  overrideServices,
  saveViewState,
  keepCurrentModel,
  width,
  height,
  className,
  wrapperProps,
  beforeMount,
  onMount,
  onChange,
  onValidate
}) {
  const [isEditorReady, setIsEditorReady] = (0, import_react10.useState)(false);
  const [isMonacoMounting, setIsMonacoMounting] = (0, import_react10.useState)(true);
  const monacoRef = (0, import_react10.useRef)(null);
  const editorRef = (0, import_react10.useRef)(null);
  const containerRef = (0, import_react10.useRef)(null);
  const onMountRef = (0, import_react10.useRef)(onMount);
  const beforeMountRef = (0, import_react10.useRef)(beforeMount);
  const subscriptionRef = (0, import_react10.useRef)(null);
  const valueRef = (0, import_react10.useRef)(value);
  const previousPath = usePrevious_default(path);
  const preventCreation = (0, import_react10.useRef)(false);
  useMount_default(() => {
    const cancelable = loader_default.init();
    cancelable.then((monaco) => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch((error) => (error === null || error === void 0 ? void 0 : error.type) !== "cancelation" && console.error("Monaco initialization: error:", error));
    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });
  useUpdate_default(() => {
    const model = getOrCreateModel(monacoRef.current, defaultValue || value, defaultLanguage || language, path);
    if (model !== editorRef.current.getModel()) {
      saveViewState && viewStates.set(previousPath, editorRef.current.saveViewState());
      editorRef.current.setModel(model);
      saveViewState && editorRef.current.restoreViewState(viewStates.get(path));
    }
  }, [path], isEditorReady);
  useUpdate_default(() => {
    editorRef.current.updateOptions(options);
  }, [options], isEditorReady);
  useUpdate_default(() => {
    if (editorRef.current.getOption(monacoRef.current.editor.EditorOption.readOnly)) {
      editorRef.current.setValue(value);
    } else {
      if (value !== editorRef.current.getValue()) {
        editorRef.current.executeEdits("", [{
          range: editorRef.current.getModel().getFullModelRange(),
          text: value,
          forceMoveMarkers: true
        }]);
        editorRef.current.pushUndoStop();
      }
    }
  }, [value], isEditorReady);
  useUpdate_default(() => {
    monacoRef.current.editor.setModelLanguage(editorRef.current.getModel(), language);
  }, [language], isEditorReady);
  useUpdate_default(() => {
    if (!isUndefined(line)) {
      editorRef.current.revealLine(line);
    }
  }, [line], isEditorReady);
  useUpdate_default(() => {
    monacoRef.current.editor.setTheme(theme);
  }, [theme], isEditorReady);
  const createEditor = (0, import_react10.useCallback)(() => {
    if (!preventCreation.current) {
      beforeMountRef.current(monacoRef.current);
      const autoCreatedModelPath = path || defaultPath;
      const defaultModel = getOrCreateModel(monacoRef.current, value || defaultValue, defaultLanguage || language, autoCreatedModelPath);
      editorRef.current = monacoRef.current.editor.create(containerRef.current, {
        model: defaultModel,
        automaticLayout: true,
        ...options
      }, overrideServices);
      saveViewState && editorRef.current.restoreViewState(viewStates.get(autoCreatedModelPath));
      monacoRef.current.editor.setTheme(theme);
      setIsEditorReady(true);
      preventCreation.current = true;
    }
  }, [defaultValue, defaultLanguage, defaultPath, value, language, path, options, overrideServices, saveViewState, theme]);
  (0, import_react10.useEffect)(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  (0, import_react10.useEffect)(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);
  valueRef.current = value;
  (0, import_react10.useEffect)(() => {
    if (isEditorReady && onChange) {
      var _subscriptionRef$curr, _editorRef$current;
      (_subscriptionRef$curr = subscriptionRef.current) === null || _subscriptionRef$curr === void 0 ? void 0 : _subscriptionRef$curr.dispose();
      subscriptionRef.current = (_editorRef$current = editorRef.current) === null || _editorRef$current === void 0 ? void 0 : _editorRef$current.onDidChangeModelContent((event) => {
        onChange(editorRef.current.getValue(), event);
      });
    }
  }, [isEditorReady, onChange]);
  (0, import_react10.useEffect)(() => {
    if (isEditorReady) {
      const changeMarkersListener = monacoRef.current.editor.onDidChangeMarkers((uris) => {
        var _editorRef$current$ge;
        const editorUri = (_editorRef$current$ge = editorRef.current.getModel()) === null || _editorRef$current$ge === void 0 ? void 0 : _editorRef$current$ge.uri;
        if (editorUri) {
          const currentEditorHasMarkerChanges = uris.find((uri) => uri.path === editorUri.path);
          if (currentEditorHasMarkerChanges) {
            const markers = monacoRef.current.editor.getModelMarkers({
              resource: editorUri
            });
            onValidate === null || onValidate === void 0 ? void 0 : onValidate(markers);
          }
        }
      });
      return () => {
        changeMarkersListener === null || changeMarkersListener === void 0 ? void 0 : changeMarkersListener.dispose();
      };
    }
  }, [isEditorReady, onValidate]);
  function disposeEditor() {
    var _subscriptionRef$curr2;
    (_subscriptionRef$curr2 = subscriptionRef.current) === null || _subscriptionRef$curr2 === void 0 ? void 0 : _subscriptionRef$curr2.dispose();
    if (keepCurrentModel) {
      saveViewState && viewStates.set(path, editorRef.current.saveViewState());
    } else {
      var _editorRef$current$ge2;
      (_editorRef$current$ge2 = editorRef.current.getModel()) === null || _editorRef$current$ge2 === void 0 ? void 0 : _editorRef$current$ge2.dispose();
    }
    editorRef.current.dispose();
  }
  return /* @__PURE__ */ import_react10.default.createElement(MonacoContainer_default2, {
    width,
    height,
    isEditorReady,
    loading,
    _ref: containerRef,
    className,
    wrapperProps
  });
}
Editor.propTypes = {
  defaultValue: import_prop_types3.default.string,
  defaultPath: import_prop_types3.default.string,
  defaultLanguage: import_prop_types3.default.string,
  value: import_prop_types3.default.string,
  language: import_prop_types3.default.string,
  path: import_prop_types3.default.string,
  theme: import_prop_types3.default.string,
  line: import_prop_types3.default.number,
  loading: import_prop_types3.default.oneOfType([import_prop_types3.default.element, import_prop_types3.default.string]),
  options: import_prop_types3.default.object,
  overrideServices: import_prop_types3.default.object,
  saveViewState: import_prop_types3.default.bool,
  keepCurrentModel: import_prop_types3.default.bool,
  width: import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string]),
  height: import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string]),
  className: import_prop_types3.default.string,
  wrapperProps: import_prop_types3.default.object,
  beforeMount: import_prop_types3.default.func,
  onMount: import_prop_types3.default.func,
  onChange: import_prop_types3.default.func,
  onValidate: import_prop_types3.default.func
};
Editor.defaultProps = {
  theme: "light",
  loading: "Loading...",
  options: {},
  overrideServices: {},
  saveViewState: true,
  keepCurrentModel: false,
  width: "100%",
  height: "100%",
  wrapperProps: {},
  beforeMount: noop,
  onMount: noop,
  onValidate: noop
};
var Editor_default = Editor;

// node_modules/@monaco-editor/react/lib/es/Editor/index.js
var index2 = /* @__PURE__ */ (0, import_react11.memo)(Editor_default);
var Editor_default2 = index2;

// app/routes/playground.tsx
var import_outline = __toESM(require_outline());
var import_session = __toESM(require_session());
var import_playground = __toESM(require_playground());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function PlaygroundPage() {
  const user = useUser();
  const editorRef = (0, import_react12.useRef)(null);
  const editorOptions = {
    fontSize: 15,
    fontLigatures: true,
    minimap: { enabled: false }
  };
  let submit = useSubmit();
  const actionData = useActionData();
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function handleSubmit(event) {
    var _a;
    event.preventDefault();
    let query = (_a = editorRef == null ? void 0 : editorRef.current) == null ? void 0 : _a.getValue();
    if (!query)
      return;
    let $form = event.currentTarget;
    let formData = new FormData($form);
    formData.set("query", query);
    submit(formData, { method: "post" });
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navigation, { user }, void 0, false, {
      fileName: "app/routes/playground.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "flex flex-col h-full bg-white p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "-mx-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Editor_default2,
        {
          height: "50vh",
          defaultLanguage: "sql",
          defaultValue: "-- Write your Unify SQL query here\nselect id, number, title, base_repo_name from tenant_default.github____org_pulls limit 1",
          onMount: handleEditorDidMount,
          options: editorOptions
        },
        void 0,
        false,
        {
          fileName: "app/routes/playground.tsx",
          lineNumber: 78,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/playground.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 flex items-center", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full border-t border-gray-300" }, void 0, false, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 89,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { onSubmit: handleSubmit, method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "query" }, void 0, false, {
            fileName: "app/routes/playground.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "group inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-green-50 hover:text-green-800 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition duration-50 ease-in-out",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  import_outline.PlayIcon,
                  {
                    className: "-ml-1.5 mr-1 h-5 w-5 text-gray-400 group-hover:text-green-800",
                    "aria-hidden": "true"
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/routes/playground.tsx",
                    lineNumber: 99,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Run Query" }, void 0, false, {
                  fileName: "app/routes/playground.tsx",
                  lineNumber: 101,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/playground.tsx",
              lineNumber: 95,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 92,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/playground.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4 h-full", children: actionData && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        SmartTable,
        {
          entity: {},
          reloadData: () => console.log("reloading..."),
          columnDefs: actionData.columnDefs,
          rowData: actionData.rowData
        },
        void 0,
        false,
        {
          fileName: "app/routes/playground.tsx",
          lineNumber: 107,
          columnNumber: 26
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/playground.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/playground.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/playground.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, this);
}
export {
  PlaygroundPage as default
};
//# sourceMappingURL=/build/routes/playground-WZC6UMEA.js.map
