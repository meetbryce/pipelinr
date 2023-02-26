import {
  require_outline
} from "/build/_shared/chunk-5LGDZP35.js";
import {
  Navigation
} from "/build/_shared/chunk-DKEVWLZ4.js";
import {
  useUser
} from "/build/_shared/chunk-MQMQMTTY.js";
import {
  require_pipeline
} from "/build/_shared/chunk-O55YOBDW.js";
import {
  require_session
} from "/build/_shared/chunk-3Q6GZENC.js";
import {
  Link,
  NavLink,
  Outlet,
  require_jsx_dev_runtime,
  require_react,
  useLoaderData
} from "/build/_shared/chunk-IYXZEBXU.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/routes/pipelines.tsx
var import_outline = __toESM(require_outline());
var import_session = __toESM(require_session());
var import_pipeline = __toESM(require_pipeline());
var import_react20 = __toESM(require_react());

// node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
var import_react = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/env.js
var i = Object.defineProperty;
var d = (t7, e3, n2) => e3 in t7 ? i(t7, e3, { enumerable: true, configurable: true, writable: true, value: n2 }) : t7[e3] = n2;
var r = (t7, e3, n2) => (d(t7, typeof e3 != "symbol" ? e3 + "" : e3, n2), n2);
var o = class {
  constructor() {
    r(this, "current", this.detect());
    r(this, "handoffState", "pending");
    r(this, "currentId", 0);
  }
  set(e3) {
    this.current !== e3 && (this.handoffState = "pending", this.currentId = 0, this.current = e3);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
};
var s = new o();

// node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
var l = (e3, f5) => {
  s.isServer ? (0, import_react.useEffect)(e3, f5) : (0, import_react.useLayoutEffect)(e3, f5);
};

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
var import_react2 = __toESM(require_react(), 1);
function s2(e3) {
  let r6 = (0, import_react2.useRef)(e3);
  return l(() => {
    r6.current = e3;
  }, [e3]), r6;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
var import_react3 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/micro-task.js
function t3(e3) {
  typeof queueMicrotask == "function" ? queueMicrotask(e3) : Promise.resolve().then(e3).catch((o10) => setTimeout(() => {
    throw o10;
  }));
}

// node_modules/@headlessui/react/dist/utils/disposables.js
function m() {
  let a3 = [], i5 = [], r6 = { enqueue(e3) {
    i5.push(e3);
  }, addEventListener(e3, t7, n2, s7) {
    return e3.addEventListener(t7, n2, s7), r6.add(() => e3.removeEventListener(t7, n2, s7));
  }, requestAnimationFrame(...e3) {
    let t7 = requestAnimationFrame(...e3);
    return r6.add(() => cancelAnimationFrame(t7));
  }, nextFrame(...e3) {
    return r6.requestAnimationFrame(() => r6.requestAnimationFrame(...e3));
  }, setTimeout(...e3) {
    let t7 = setTimeout(...e3);
    return r6.add(() => clearTimeout(t7));
  }, microTask(...e3) {
    let t7 = { current: true };
    return t3(() => {
      t7.current && e3[0]();
    }), r6.add(() => {
      t7.current = false;
    });
  }, add(e3) {
    return a3.push(e3), () => {
      let t7 = a3.indexOf(e3);
      if (t7 >= 0) {
        let [n2] = a3.splice(t7, 1);
        n2();
      }
    };
  }, dispose() {
    for (let e3 of a3.splice(0))
      e3();
  }, async workQueue() {
    for (let e3 of i5.splice(0))
      await e3();
  }, style(e3, t7, n2) {
    let s7 = e3.style.getPropertyValue(t7);
    return Object.assign(e3.style, { [t7]: n2 }), this.add(() => {
      Object.assign(e3.style, { [t7]: s7 });
    });
  } };
  return r6;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
function p() {
  let [e3] = (0, import_react3.useState)(m);
  return (0, import_react3.useEffect)(() => () => e3.dispose(), [e3]), e3;
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
var import_react4 = __toESM(require_react(), 1);
var o3 = function(t7) {
  let e3 = s2(t7);
  return import_react4.default.useCallback((...r6) => e3.current(...r6), [e3]);
};

// node_modules/@headlessui/react/dist/hooks/use-id.js
var import_react6 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
var import_react5 = __toESM(require_react(), 1);
function l2() {
  let [e3, f5] = (0, import_react5.useState)(s.isHandoffComplete);
  return e3 && s.isHandoffComplete === false && f5(false), (0, import_react5.useEffect)(() => {
    e3 !== true && f5(true);
  }, [e3]), (0, import_react5.useEffect)(() => s.handoff(), []), e3;
}

// node_modules/@headlessui/react/dist/hooks/use-id.js
var o5;
var I = (o5 = import_react6.default.useId) != null ? o5 : function() {
  let n2 = l2(), [e3, u4] = import_react6.default.useState(n2 ? () => s.nextId() : null);
  return l(() => {
    e3 === null && u4(s.nextId());
  }, [e3]), e3 != null ? "" + e3 : void 0;
};

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var import_react8 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/match.js
function u(r6, n2, ...a3) {
  if (r6 in n2) {
    let e3 = n2[r6];
    return typeof e3 == "function" ? e3(...a3) : e3;
  }
  let t7 = new Error(`Tried to handle "${r6}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e3) => `"${e3}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t7, u), t7;
}

// node_modules/@headlessui/react/dist/utils/owner.js
function e(r6) {
  return s.isServer ? null : r6 instanceof Node ? r6.ownerDocument : r6 != null && r6.hasOwnProperty("current") && r6.current instanceof Node ? r6.current.ownerDocument : document;
}

// node_modules/@headlessui/react/dist/utils/focus-management.js
var f = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e3) => `${e3}:not([tabindex='-1'])`).join(",");
var L = ((r6) => (r6[r6.First = 1] = "First", r6[r6.Previous = 2] = "Previous", r6[r6.Next = 4] = "Next", r6[r6.Last = 8] = "Last", r6[r6.WrapAround = 16] = "WrapAround", r6[r6.NoScroll = 32] = "NoScroll", r6))(L || {});
var N = ((o10) => (o10[o10.Error = 0] = "Error", o10[o10.Overflow = 1] = "Overflow", o10[o10.Success = 2] = "Success", o10[o10.Underflow = 3] = "Underflow", o10))(N || {});
var T = ((n2) => (n2[n2.Previous = -1] = "Previous", n2[n2.Next = 1] = "Next", n2))(T || {});
function E(e3 = document.body) {
  return e3 == null ? [] : Array.from(e3.querySelectorAll(f)).sort((t7, n2) => Math.sign((t7.tabIndex || Number.MAX_SAFE_INTEGER) - (n2.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var F = ((n2) => (n2[n2.Strict = 0] = "Strict", n2[n2.Loose = 1] = "Loose", n2))(F || {});
function h(e3, t7 = 0) {
  var n2;
  return e3 === ((n2 = e(e3)) == null ? void 0 : n2.body) ? false : u(t7, { [0]() {
    return e3.matches(f);
  }, [1]() {
    let l6 = e3;
    for (; l6 !== null; ) {
      if (l6.matches(f))
        return true;
      l6 = l6.parentElement;
    }
    return false;
  } });
}
function g(e3) {
  let t7 = e(e3);
  m().nextFrame(() => {
    t7 && !h(t7.activeElement, 0) && S(e3);
  });
}
function S(e3) {
  e3 == null || e3.focus({ preventScroll: true });
}
var H = ["textarea", "input"].join(",");
function w(e3) {
  var t7, n2;
  return (n2 = (t7 = e3 == null ? void 0 : e3.matches) == null ? void 0 : t7.call(e3, H)) != null ? n2 : false;
}
function A(e3, t7 = (n2) => n2) {
  return e3.slice().sort((n2, l6) => {
    let o10 = t7(n2), i5 = t7(l6);
    if (o10 === null || i5 === null)
      return 0;
    let r6 = o10.compareDocumentPosition(i5);
    return r6 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : r6 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function v(e3, t7) {
  return I2(E(), t7, { relativeTo: e3 });
}
function I2(e3, t7, { sorted: n2 = true, relativeTo: l6 = null, skipElements: o10 = [] } = {}) {
  let i5 = Array.isArray(e3) ? e3.length > 0 ? e3[0].ownerDocument : document : e3.ownerDocument, r6 = Array.isArray(e3) ? n2 ? A(e3) : e3 : E(e3);
  o10.length > 0 && r6.length > 1 && (r6 = r6.filter((s7) => !o10.includes(s7))), l6 = l6 != null ? l6 : i5.activeElement;
  let d5 = (() => {
    if (t7 & 5)
      return 1;
    if (t7 & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), x3 = (() => {
    if (t7 & 1)
      return 0;
    if (t7 & 2)
      return Math.max(0, r6.indexOf(l6)) - 1;
    if (t7 & 4)
      return Math.max(0, r6.indexOf(l6)) + 1;
    if (t7 & 8)
      return r6.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p3 = t7 & 32 ? { preventScroll: true } : {}, c3 = 0, a3 = r6.length, u4;
  do {
    if (c3 >= a3 || c3 + a3 <= 0)
      return 0;
    let s7 = x3 + c3;
    if (t7 & 16)
      s7 = (s7 + a3) % a3;
    else {
      if (s7 < 0)
        return 3;
      if (s7 >= a3)
        return 1;
    }
    u4 = r6[s7], u4 == null || u4.focus(p3), c3 += d5;
  } while (u4 !== i5.activeElement);
  return t7 & 6 && w(u4) && u4.select(), u4.hasAttribute("tabindex") || u4.setAttribute("tabindex", "0"), 2;
}

// node_modules/@headlessui/react/dist/hooks/use-document-event.js
var import_react7 = __toESM(require_react(), 1);
function d2(e3, r6, n2) {
  let o10 = s2(r6);
  (0, import_react7.useEffect)(() => {
    function t7(u4) {
      o10.current(u4);
    }
    return document.addEventListener(e3, t7, n2), () => document.removeEventListener(e3, t7, n2);
  }, [e3, n2]);
}

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
function L2(m5, E4, c3 = true) {
  let i5 = (0, import_react8.useRef)(false);
  (0, import_react8.useEffect)(() => {
    requestAnimationFrame(() => {
      i5.current = c3;
    });
  }, [c3]);
  function f5(e3, o10) {
    if (!i5.current || e3.defaultPrevented)
      return;
    let l6 = function r6(t7) {
      return typeof t7 == "function" ? r6(t7()) : Array.isArray(t7) || t7 instanceof Set ? t7 : [t7];
    }(m5), n2 = o10(e3);
    if (n2 !== null && !!n2.getRootNode().contains(n2)) {
      for (let r6 of l6) {
        if (r6 === null)
          continue;
        let t7 = r6 instanceof HTMLElement ? r6 : r6.current;
        if (t7 != null && t7.contains(n2) || e3.composed && e3.composedPath().includes(t7))
          return;
      }
      return !h(n2, F.Loose) && n2.tabIndex !== -1 && e3.preventDefault(), E4(e3, n2);
    }
  }
  let u4 = (0, import_react8.useRef)(null);
  d2("mousedown", (e3) => {
    var o10, l6;
    i5.current && (u4.current = ((l6 = (o10 = e3.composedPath) == null ? void 0 : o10.call(e3)) == null ? void 0 : l6[0]) || e3.target);
  }, true), d2("click", (e3) => {
    !u4.current || (f5(e3, () => u4.current), u4.current = null);
  }, true), d2("blur", (e3) => f5(e3, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}

// node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js
var import_react9 = __toESM(require_react(), 1);
function i2(t7) {
  var n2;
  if (t7.type)
    return t7.type;
  let e3 = (n2 = t7.as) != null ? n2 : "button";
  if (typeof e3 == "string" && e3.toLowerCase() === "button")
    return "button";
}
function s5(t7, e3) {
  let [n2, u4] = (0, import_react9.useState)(() => i2(t7));
  return l(() => {
    u4(i2(t7));
  }, [t7.type, t7.as]), l(() => {
    n2 || !e3.current || e3.current instanceof HTMLButtonElement && !e3.current.hasAttribute("type") && u4("button");
  }, [n2, e3]), n2;
}

// node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
var import_react10 = __toESM(require_react(), 1);
var u2 = Symbol();
function y(...t7) {
  let n2 = (0, import_react10.useRef)(t7);
  (0, import_react10.useEffect)(() => {
    n2.current = t7;
  }, [t7]);
  let c3 = o3((e3) => {
    for (let o10 of n2.current)
      o10 != null && (typeof o10 == "function" ? o10(e3) : o10.current = e3);
  });
  return t7.every((e3) => e3 == null || (e3 == null ? void 0 : e3[u2])) ? void 0 : c3;
}

// node_modules/@headlessui/react/dist/hooks/use-tree-walker.js
var import_react11 = __toESM(require_react(), 1);
function F2({ container: e3, accept: t7, walk: r6, enabled: c3 = true }) {
  let o10 = (0, import_react11.useRef)(t7), l6 = (0, import_react11.useRef)(r6);
  (0, import_react11.useEffect)(() => {
    o10.current = t7, l6.current = r6;
  }, [t7, r6]), l(() => {
    if (!e3 || !c3)
      return;
    let n2 = e(e3);
    if (!n2)
      return;
    let f5 = o10.current, p3 = l6.current, d5 = Object.assign((i5) => f5(i5), { acceptNode: f5 }), u4 = n2.createTreeWalker(e3, NodeFilter.SHOW_ELEMENT, d5, false);
    for (; u4.nextNode(); )
      p3(u4.currentNode);
  }, [e3, c3, o10, l6]);
}

// node_modules/@headlessui/react/dist/utils/calculate-active-index.js
function f2(r6) {
  throw new Error("Unexpected object: " + r6);
}
var a2 = ((e3) => (e3[e3.First = 0] = "First", e3[e3.Previous = 1] = "Previous", e3[e3.Next = 2] = "Next", e3[e3.Last = 3] = "Last", e3[e3.Specific = 4] = "Specific", e3[e3.Nothing = 5] = "Nothing", e3))(a2 || {});
function x(r6, n2) {
  let t7 = n2.resolveItems();
  if (t7.length <= 0)
    return null;
  let l6 = n2.resolveActiveIndex(), s7 = l6 != null ? l6 : -1, d5 = (() => {
    switch (r6.focus) {
      case 0:
        return t7.findIndex((e3) => !n2.resolveDisabled(e3));
      case 1: {
        let e3 = t7.slice().reverse().findIndex((i5, c3, u4) => s7 !== -1 && u4.length - c3 - 1 >= s7 ? false : !n2.resolveDisabled(i5));
        return e3 === -1 ? e3 : t7.length - 1 - e3;
      }
      case 2:
        return t7.findIndex((e3, i5) => i5 <= s7 ? false : !n2.resolveDisabled(e3));
      case 3: {
        let e3 = t7.slice().reverse().findIndex((i5) => !n2.resolveDisabled(i5));
        return e3 === -1 ? e3 : t7.length - 1 - e3;
      }
      case 4:
        return t7.findIndex((e3) => n2.resolveId(e3) === r6.id);
      case 5:
        return null;
      default:
        f2(r6);
    }
  })();
  return d5 === -1 ? l6 : d5;
}

// node_modules/@headlessui/react/dist/utils/render.js
var import_react12 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/class-names.js
function e2(...n2) {
  return n2.filter(Boolean).join(" ");
}

// node_modules/@headlessui/react/dist/utils/render.js
var j = ((a3) => (a3[a3.None = 0] = "None", a3[a3.RenderStrategy = 1] = "RenderStrategy", a3[a3.Static = 2] = "Static", a3))(j || {});
var w2 = ((e3) => (e3[e3.Unmount = 0] = "Unmount", e3[e3.Hidden = 1] = "Hidden", e3))(w2 || {});
function X({ ourProps: r6, theirProps: t7, slot: e3, defaultTag: a3, features: s7, visible: n2 = true, name: l6 }) {
  let o10 = h2(t7, r6);
  if (n2)
    return m4(o10, e3, a3, l6);
  let u4 = s7 != null ? s7 : 0;
  if (u4 & 2) {
    let { static: i5 = false, ...d5 } = o10;
    if (i5)
      return m4(d5, e3, a3, l6);
  }
  if (u4 & 1) {
    let { unmount: i5 = true, ...d5 } = o10;
    return u(i5 ? 0 : 1, { [0]() {
      return null;
    }, [1]() {
      return m4({ ...d5, hidden: true, style: { display: "none" } }, e3, a3, l6);
    } });
  }
  return m4(o10, e3, a3, l6);
}
function m4(r6, t7 = {}, e3, a3) {
  var y2;
  let { as: s7 = e3, children: n2, refName: l6 = "ref", ...o10 } = T2(r6, ["unmount", "static"]), u4 = r6.ref !== void 0 ? { [l6]: r6.ref } : {}, i5 = typeof n2 == "function" ? n2(t7) : n2;
  o10.className && typeof o10.className == "function" && (o10.className = o10.className(t7));
  let d5 = {};
  if (t7) {
    let f5 = false, c3 = [];
    for (let [p3, F4] of Object.entries(t7))
      typeof F4 == "boolean" && (f5 = true), F4 === true && c3.push(p3);
    f5 && (d5["data-headlessui-state"] = c3.join(" "));
  }
  if (s7 === import_react12.Fragment && Object.keys(P(o10)).length > 0) {
    if (!(0, import_react12.isValidElement)(i5) || Array.isArray(i5) && i5.length > 1)
      throw new Error(['Passing props on "Fragment"!', "", `The current component <${a3} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(o10).map((p3) => `  - ${p3}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((p3) => `  - ${p3}`).join(`
`)].join(`
`));
    let f5 = e2((y2 = i5.props) == null ? void 0 : y2.className, o10.className), c3 = f5 ? { className: f5 } : {};
    return (0, import_react12.cloneElement)(i5, Object.assign({}, h2(i5.props, P(T2(o10, ["ref"]))), d5, u4, O(i5.ref, u4.ref), c3));
  }
  return (0, import_react12.createElement)(s7, Object.assign({}, T2(o10, ["ref"]), s7 !== import_react12.Fragment && u4, s7 !== import_react12.Fragment && d5), i5);
}
function O(...r6) {
  return { ref: r6.every((t7) => t7 == null) ? void 0 : (t7) => {
    for (let e3 of r6)
      e3 != null && (typeof e3 == "function" ? e3(t7) : e3.current = t7);
  } };
}
function h2(...r6) {
  var a3;
  if (r6.length === 0)
    return {};
  if (r6.length === 1)
    return r6[0];
  let t7 = {}, e3 = {};
  for (let s7 of r6)
    for (let n2 in s7)
      n2.startsWith("on") && typeof s7[n2] == "function" ? ((a3 = e3[n2]) != null || (e3[n2] = []), e3[n2].push(s7[n2])) : t7[n2] = s7[n2];
  if (t7.disabled || t7["aria-disabled"])
    return Object.assign(t7, Object.fromEntries(Object.keys(e3).map((s7) => [s7, void 0])));
  for (let s7 in e3)
    Object.assign(t7, { [s7](n2, ...l6) {
      let o10 = e3[s7];
      for (let u4 of o10) {
        if ((n2 instanceof Event || (n2 == null ? void 0 : n2.nativeEvent) instanceof Event) && n2.defaultPrevented)
          return;
        u4(n2, ...l6);
      }
    } });
  return t7;
}
function V(r6) {
  var t7;
  return Object.assign((0, import_react12.forwardRef)(r6), { displayName: (t7 = r6.displayName) != null ? t7 : r6.name });
}
function P(r6) {
  let t7 = Object.assign({}, r6);
  for (let e3 in t7)
    t7[e3] === void 0 && delete t7[e3];
  return t7;
}
function T2(r6, t7 = []) {
  let e3 = Object.assign({}, r6);
  for (let a3 of t7)
    a3 in e3 && delete e3[a3];
  return e3;
}

// node_modules/@headlessui/react/dist/utils/bugs.js
function r3(n2) {
  let e3 = n2.parentElement, l6 = null;
  for (; e3 && !(e3 instanceof HTMLFieldSetElement); )
    e3 instanceof HTMLLegendElement && (l6 = e3), e3 = e3.parentElement;
  let t7 = (e3 == null ? void 0 : e3.getAttribute("disabled")) === "";
  return t7 && i4(l6) ? false : t7;
}
function i4(n2) {
  if (!n2)
    return false;
  let e3 = n2.previousElementSibling;
  for (; e3 !== null; ) {
    if (e3 instanceof HTMLLegendElement)
      return false;
    e3 = e3.previousElementSibling;
  }
  return true;
}

// node_modules/@headlessui/react/dist/internal/open-closed.js
var import_react13 = __toESM(require_react(), 1);
var o7 = (0, import_react13.createContext)(null);
o7.displayName = "OpenClosedContext";
var p2 = ((e3) => (e3[e3.Open = 0] = "Open", e3[e3.Closed = 1] = "Closed", e3))(p2 || {});
function s6() {
  return (0, import_react13.useContext)(o7);
}
function C({ value: t7, children: n2 }) {
  return import_react13.default.createElement(o7.Provider, { value: t7 }, n2);
}

// node_modules/@headlessui/react/dist/components/keyboard.js
var o8 = ((r6) => (r6.Space = " ", r6.Enter = "Enter", r6.Escape = "Escape", r6.Backspace = "Backspace", r6.Delete = "Delete", r6.ArrowLeft = "ArrowLeft", r6.ArrowUp = "ArrowUp", r6.ArrowRight = "ArrowRight", r6.ArrowDown = "ArrowDown", r6.Home = "Home", r6.End = "End", r6.PageUp = "PageUp", r6.PageDown = "PageDown", r6.Tab = "Tab", r6))(o8 || {});

// node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js
var import_react14 = __toESM(require_react(), 1);
function t5(e3) {
  return [e3.screenX, e3.screenY];
}
function u3() {
  let e3 = (0, import_react14.useRef)([-1, -1]);
  return { wasMoved(r6) {
    let n2 = t5(r6);
    return e3.current[0] === n2[0] && e3.current[1] === n2[1] ? false : (e3.current = n2, true);
  }, update(r6) {
    e3.current = t5(r6);
  } };
}

// node_modules/@headlessui/react/dist/hooks/use-is-mounted.js
var import_react15 = __toESM(require_react(), 1);
function f3() {
  let e3 = (0, import_react15.useRef)(false);
  return l(() => (e3.current = true, () => {
    e3.current = false;
  }), []), e3;
}

// node_modules/@headlessui/react/dist/hooks/use-owner.js
var import_react16 = __toESM(require_react(), 1);
function n(...e3) {
  return (0, import_react16.useMemo)(() => e(...e3), [...e3]);
}

// node_modules/@headlessui/react/dist/components/menu/menu.js
var import_react17 = __toESM(require_react(), 1);
var pe = ((o10) => (o10[o10.Open = 0] = "Open", o10[o10.Closed = 1] = "Closed", o10))(pe || {});
var de = ((o10) => (o10[o10.Pointer = 0] = "Pointer", o10[o10.Other = 1] = "Other", o10))(de || {});
var me = ((e3) => (e3[e3.OpenMenu = 0] = "OpenMenu", e3[e3.CloseMenu = 1] = "CloseMenu", e3[e3.GoToItem = 2] = "GoToItem", e3[e3.Search = 3] = "Search", e3[e3.ClearSearch = 4] = "ClearSearch", e3[e3.RegisterItem = 5] = "RegisterItem", e3[e3.UnregisterItem = 6] = "UnregisterItem", e3))(me || {});
function U(t7, i5 = (o10) => o10) {
  let o10 = t7.activeItemIndex !== null ? t7.items[t7.activeItemIndex] : null, s7 = A(i5(t7.items.slice()), (u4) => u4.dataRef.current.domRef.current), a3 = o10 ? s7.indexOf(o10) : null;
  return a3 === -1 && (a3 = null), { items: s7, activeItemIndex: a3 };
}
var fe = { [1](t7) {
  return t7.menuState === 1 ? t7 : { ...t7, activeItemIndex: null, menuState: 1 };
}, [0](t7) {
  return t7.menuState === 0 ? t7 : { ...t7, menuState: 0 };
}, [2]: (t7, i5) => {
  var a3;
  let o10 = U(t7), s7 = x(i5, { resolveItems: () => o10.items, resolveActiveIndex: () => o10.activeItemIndex, resolveId: (u4) => u4.id, resolveDisabled: (u4) => u4.dataRef.current.disabled });
  return { ...t7, ...o10, searchQuery: "", activeItemIndex: s7, activationTrigger: (a3 = i5.trigger) != null ? a3 : 1 };
}, [3]: (t7, i5) => {
  let s7 = t7.searchQuery !== "" ? 0 : 1, a3 = t7.searchQuery + i5.value.toLowerCase(), n2 = (t7.activeItemIndex !== null ? t7.items.slice(t7.activeItemIndex + s7).concat(t7.items.slice(0, t7.activeItemIndex + s7)) : t7.items).find((d5) => {
    var l6;
    return ((l6 = d5.dataRef.current.textValue) == null ? void 0 : l6.startsWith(a3)) && !d5.dataRef.current.disabled;
  }), e3 = n2 ? t7.items.indexOf(n2) : -1;
  return e3 === -1 || e3 === t7.activeItemIndex ? { ...t7, searchQuery: a3 } : { ...t7, searchQuery: a3, activeItemIndex: e3, activationTrigger: 1 };
}, [4](t7) {
  return t7.searchQuery === "" ? t7 : { ...t7, searchQuery: "", searchActiveItemIndex: null };
}, [5]: (t7, i5) => {
  let o10 = U(t7, (s7) => [...s7, { id: i5.id, dataRef: i5.dataRef }]);
  return { ...t7, ...o10 };
}, [6]: (t7, i5) => {
  let o10 = U(t7, (s7) => {
    let a3 = s7.findIndex((u4) => u4.id === i5.id);
    return a3 !== -1 && s7.splice(a3, 1), s7;
  });
  return { ...t7, ...o10, activationTrigger: 1 };
} };
var G = (0, import_react17.createContext)(null);
G.displayName = "MenuContext";
function O2(t7) {
  let i5 = (0, import_react17.useContext)(G);
  if (i5 === null) {
    let o10 = new Error(`<${t7} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o10, O2), o10;
  }
  return i5;
}
function Te(t7, i5) {
  return u(i5.type, fe, t7, i5);
}
var ye = import_react17.Fragment;
var Ie = V(function(i5, o10) {
  let s7 = (0, import_react17.useReducer)(Te, { menuState: 1, buttonRef: (0, import_react17.createRef)(), itemsRef: (0, import_react17.createRef)(), items: [], searchQuery: "", activeItemIndex: null, activationTrigger: 1 }), [{ menuState: a3, itemsRef: u4, buttonRef: n2 }, e3] = s7, d5 = y(o10);
  L2([n2, u4], (R, A3) => {
    var g3;
    e3({ type: 1 }), h(A3, F.Loose) || (R.preventDefault(), (g3 = n2.current) == null || g3.focus());
  }, a3 === 0);
  let l6 = o3(() => {
    e3({ type: 1 });
  }), f5 = (0, import_react17.useMemo)(() => ({ open: a3 === 0, close: l6 }), [a3, l6]), M3 = i5, T4 = { ref: d5 };
  return import_react17.default.createElement(G.Provider, { value: s7 }, import_react17.default.createElement(C, { value: u(a3, { [0]: p2.Open, [1]: p2.Closed }) }, X({ ourProps: T4, theirProps: M3, slot: f5, defaultTag: ye, name: "Menu" })));
});
var ge = "button";
var Me = V(function(i5, o10) {
  var g3;
  let s7 = I(), { id: a3 = `headlessui-menu-button-${s7}`, ...u4 } = i5, [n2, e3] = O2("Menu.Button"), d5 = y(n2.buttonRef, o10), l6 = p(), f5 = o3((c3) => {
    switch (c3.key) {
      case o8.Space:
      case o8.Enter:
      case o8.ArrowDown:
        c3.preventDefault(), c3.stopPropagation(), e3({ type: 0 }), l6.nextFrame(() => e3({ type: 2, focus: a2.First }));
        break;
      case o8.ArrowUp:
        c3.preventDefault(), c3.stopPropagation(), e3({ type: 0 }), l6.nextFrame(() => e3({ type: 2, focus: a2.Last }));
        break;
    }
  }), M3 = o3((c3) => {
    switch (c3.key) {
      case o8.Space:
        c3.preventDefault();
        break;
    }
  }), T4 = o3((c3) => {
    if (r3(c3.currentTarget))
      return c3.preventDefault();
    i5.disabled || (n2.menuState === 0 ? (e3({ type: 1 }), l6.nextFrame(() => {
      var b2;
      return (b2 = n2.buttonRef.current) == null ? void 0 : b2.focus({ preventScroll: true });
    })) : (c3.preventDefault(), e3({ type: 0 })));
  }), R = (0, import_react17.useMemo)(() => ({ open: n2.menuState === 0 }), [n2]), A3 = { ref: d5, id: a3, type: s5(i5, n2.buttonRef), "aria-haspopup": "menu", "aria-controls": (g3 = n2.itemsRef.current) == null ? void 0 : g3.id, "aria-expanded": i5.disabled ? void 0 : n2.menuState === 0, onKeyDown: f5, onKeyUp: M3, onClick: T4 };
  return X({ ourProps: A3, theirProps: u4, slot: R, defaultTag: ge, name: "Menu.Button" });
});
var Re = "div";
var be = j.RenderStrategy | j.Static;
var Ae = V(function(i5, o10) {
  var b2, S2;
  let s7 = I(), { id: a3 = `headlessui-menu-items-${s7}`, ...u4 } = i5, [n2, e3] = O2("Menu.Items"), d5 = y(n2.itemsRef, o10), l6 = n(n2.itemsRef), f5 = p(), M3 = s6(), T4 = (() => M3 !== null ? M3 === p2.Open : n2.menuState === 0)();
  (0, import_react17.useEffect)(() => {
    let r6 = n2.itemsRef.current;
    !r6 || n2.menuState === 0 && r6 !== (l6 == null ? void 0 : l6.activeElement) && r6.focus({ preventScroll: true });
  }, [n2.menuState, n2.itemsRef, l6]), F2({ container: n2.itemsRef.current, enabled: n2.menuState === 0, accept(r6) {
    return r6.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : r6.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(r6) {
    r6.setAttribute("role", "none");
  } });
  let R = o3((r6) => {
    var h3, F4;
    switch (f5.dispose(), r6.key) {
      case o8.Space:
        if (n2.searchQuery !== "")
          return r6.preventDefault(), r6.stopPropagation(), e3({ type: 3, value: r6.key });
      case o8.Enter:
        if (r6.preventDefault(), r6.stopPropagation(), e3({ type: 1 }), n2.activeItemIndex !== null) {
          let { dataRef: p3 } = n2.items[n2.activeItemIndex];
          (F4 = (h3 = p3.current) == null ? void 0 : h3.domRef.current) == null || F4.click();
        }
        g(n2.buttonRef.current);
        break;
      case o8.ArrowDown:
        return r6.preventDefault(), r6.stopPropagation(), e3({ type: 2, focus: a2.Next });
      case o8.ArrowUp:
        return r6.preventDefault(), r6.stopPropagation(), e3({ type: 2, focus: a2.Previous });
      case o8.Home:
      case o8.PageUp:
        return r6.preventDefault(), r6.stopPropagation(), e3({ type: 2, focus: a2.First });
      case o8.End:
      case o8.PageDown:
        return r6.preventDefault(), r6.stopPropagation(), e3({ type: 2, focus: a2.Last });
      case o8.Escape:
        r6.preventDefault(), r6.stopPropagation(), e3({ type: 1 }), m().nextFrame(() => {
          var p3;
          return (p3 = n2.buttonRef.current) == null ? void 0 : p3.focus({ preventScroll: true });
        });
        break;
      case o8.Tab:
        r6.preventDefault(), r6.stopPropagation(), e3({ type: 1 }), m().nextFrame(() => {
          v(n2.buttonRef.current, r6.shiftKey ? L.Previous : L.Next);
        });
        break;
      default:
        r6.key.length === 1 && (e3({ type: 3, value: r6.key }), f5.setTimeout(() => e3({ type: 4 }), 350));
        break;
    }
  }), A3 = o3((r6) => {
    switch (r6.key) {
      case o8.Space:
        r6.preventDefault();
        break;
    }
  }), g3 = (0, import_react17.useMemo)(() => ({ open: n2.menuState === 0 }), [n2]), c3 = { "aria-activedescendant": n2.activeItemIndex === null || (b2 = n2.items[n2.activeItemIndex]) == null ? void 0 : b2.id, "aria-labelledby": (S2 = n2.buttonRef.current) == null ? void 0 : S2.id, id: a3, onKeyDown: R, onKeyUp: A3, role: "menu", tabIndex: 0, ref: d5 };
  return X({ ourProps: c3, theirProps: u4, slot: g3, defaultTag: Re, features: be, visible: T4, name: "Menu.Items" });
});
var ve = import_react17.Fragment;
var Se = V(function(i5, o10) {
  let s7 = I(), { id: a3 = `headlessui-menu-item-${s7}`, disabled: u4 = false, ...n2 } = i5, [e3, d5] = O2("Menu.Item"), l6 = e3.activeItemIndex !== null ? e3.items[e3.activeItemIndex].id === a3 : false, f5 = (0, import_react17.useRef)(null), M3 = y(o10, f5);
  l(() => {
    if (e3.menuState !== 0 || !l6 || e3.activationTrigger === 0)
      return;
    let p3 = m();
    return p3.requestAnimationFrame(() => {
      var v3, B;
      (B = (v3 = f5.current) == null ? void 0 : v3.scrollIntoView) == null || B.call(v3, { block: "nearest" });
    }), p3.dispose;
  }, [f5, l6, e3.menuState, e3.activationTrigger, e3.activeItemIndex]);
  let T4 = (0, import_react17.useRef)({ disabled: u4, domRef: f5 });
  l(() => {
    T4.current.disabled = u4;
  }, [T4, u4]), l(() => {
    var p3, v3;
    T4.current.textValue = (v3 = (p3 = f5.current) == null ? void 0 : p3.textContent) == null ? void 0 : v3.toLowerCase();
  }, [T4, f5]), l(() => (d5({ type: 5, id: a3, dataRef: T4 }), () => d5({ type: 6, id: a3 })), [T4, a3]);
  let R = o3(() => {
    d5({ type: 1 });
  }), A3 = o3((p3) => {
    if (u4)
      return p3.preventDefault();
    d5({ type: 1 }), g(e3.buttonRef.current);
  }), g3 = o3(() => {
    if (u4)
      return d5({ type: 2, focus: a2.Nothing });
    d5({ type: 2, focus: a2.Specific, id: a3 });
  }), c3 = u3(), b2 = o3((p3) => c3.update(p3)), S2 = o3((p3) => {
    !c3.wasMoved(p3) || u4 || l6 || d5({ type: 2, focus: a2.Specific, id: a3, trigger: 0 });
  }), r6 = o3((p3) => {
    !c3.wasMoved(p3) || u4 || !l6 || d5({ type: 2, focus: a2.Nothing });
  }), h3 = (0, import_react17.useMemo)(() => ({ active: l6, disabled: u4, close: R }), [l6, u4, R]);
  return X({ ourProps: { id: a3, ref: M3, role: "menuitem", tabIndex: u4 === true ? void 0 : -1, "aria-disabled": u4 === true ? true : void 0, disabled: void 0, onClick: A3, onFocus: g3, onPointerEnter: b2, onMouseEnter: b2, onPointerMove: S2, onMouseMove: S2, onPointerLeave: r6, onMouseLeave: r6 }, theirProps: n2, slot: h3, defaultTag: ve, name: "Menu.Item" });
});
var Ze = Object.assign(Ie, { Button: Me, Items: Ae, Item: Se });

// node_modules/@headlessui/react/dist/components/transitions/transition.js
var import_react18 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/once.js
function l5(r6) {
  let e3 = { called: false };
  return (...t7) => {
    if (!e3.called)
      return e3.called = true, r6(...t7);
  };
}

// node_modules/@headlessui/react/dist/components/transitions/utils/transition.js
function v2(t7, ...e3) {
  t7 && e3.length > 0 && t7.classList.add(...e3);
}
function f4(t7, ...e3) {
  t7 && e3.length > 0 && t7.classList.remove(...e3);
}
function F3(t7, e3) {
  let n2 = m();
  if (!t7)
    return n2.dispose;
  let { transitionDuration: a3, transitionDelay: i5 } = getComputedStyle(t7), [m5, d5] = [a3, i5].map((o10) => {
    let [r6 = 0] = o10.split(",").filter(Boolean).map((l6) => l6.includes("ms") ? parseFloat(l6) : parseFloat(l6) * 1e3).sort((l6, g3) => g3 - l6);
    return r6;
  });
  if (m5 + d5 !== 0) {
    let o10 = n2.addEventListener(t7, "transitionend", (r6) => {
      r6.target === r6.currentTarget && (e3(), o10());
    });
  } else
    e3();
  return n2.add(() => e3()), n2.dispose;
}
function M(t7, e3, n2, a3) {
  let i5 = n2 ? "enter" : "leave", m5 = m(), d5 = a3 !== void 0 ? l5(a3) : () => {
  };
  i5 === "enter" && (t7.removeAttribute("hidden"), t7.style.display = "");
  let u4 = u(i5, { enter: () => e3.enter, leave: () => e3.leave }), o10 = u(i5, { enter: () => e3.enterTo, leave: () => e3.leaveTo }), r6 = u(i5, { enter: () => e3.enterFrom, leave: () => e3.leaveFrom });
  return f4(t7, ...e3.enter, ...e3.enterTo, ...e3.enterFrom, ...e3.leave, ...e3.leaveFrom, ...e3.leaveTo, ...e3.entered), v2(t7, ...u4, ...r6), m5.nextFrame(() => {
    f4(t7, ...r6), v2(t7, ...o10), F3(t7, () => (f4(t7, ...u4), v2(t7, ...e3.entered), d5()));
  }), m5.dispose;
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
function D({ container: i5, direction: t7, classes: o10, onStart: s7, onStop: u4 }) {
  let a3 = f3(), c3 = p(), r6 = s2(t7);
  l(() => {
    let e3 = m();
    c3.add(e3.dispose);
    let n2 = i5.current;
    if (!!n2 && r6.current !== "idle" && !!a3.current)
      return e3.dispose(), s7.current(r6.current), e3.add(M(n2, o10.current, r6.current === "enter", () => {
        e3.dispose(), u4.current(r6.current);
      })), e3.dispose;
  }, [t7]);
}

// node_modules/@headlessui/react/dist/components/transitions/transition.js
function P3(i5 = "") {
  return i5.split(" ").filter((e3) => e3.trim().length > 1);
}
var A2 = (0, import_react18.createContext)(null);
A2.displayName = "TransitionContext";
var ge2 = ((s7) => (s7.Visible = "visible", s7.Hidden = "hidden", s7))(ge2 || {});
function be2() {
  let i5 = (0, import_react18.useContext)(A2);
  if (i5 === null)
    throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return i5;
}
function Ee() {
  let i5 = (0, import_react18.useContext)(M2);
  if (i5 === null)
    throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return i5;
}
var M2 = (0, import_react18.createContext)(null);
M2.displayName = "NestingContext";
function I3(i5) {
  return "children" in i5 ? I3(i5.children) : i5.current.filter(({ el: e3 }) => e3.current !== null).filter(({ state: e3 }) => e3 === "visible").length > 0;
}
function ne(i5, e3) {
  let s7 = s2(i5), n2 = (0, import_react18.useRef)([]), m5 = f3(), y2 = p(), b2 = o3((l6, r6 = w2.Hidden) => {
    let t7 = n2.current.findIndex(({ el: o10 }) => o10 === l6);
    t7 !== -1 && (u(r6, { [w2.Unmount]() {
      n2.current.splice(t7, 1);
    }, [w2.Hidden]() {
      n2.current[t7].state = "hidden";
    } }), y2.microTask(() => {
      var o10;
      !I3(n2) && m5.current && ((o10 = s7.current) == null || o10.call(s7));
    }));
  }), E4 = o3((l6) => {
    let r6 = n2.current.find(({ el: t7 }) => t7 === l6);
    return r6 ? r6.state !== "visible" && (r6.state = "visible") : n2.current.push({ el: l6, state: "visible" }), () => b2(l6, w2.Unmount);
  }), S2 = (0, import_react18.useRef)([]), u4 = (0, import_react18.useRef)(Promise.resolve()), p3 = (0, import_react18.useRef)({ enter: [], leave: [], idle: [] }), d5 = o3((l6, r6, t7) => {
    S2.current.splice(0), e3 && (e3.chains.current[r6] = e3.chains.current[r6].filter(([o10]) => o10 !== l6)), e3 == null || e3.chains.current[r6].push([l6, new Promise((o10) => {
      S2.current.push(o10);
    })]), e3 == null || e3.chains.current[r6].push([l6, new Promise((o10) => {
      Promise.all(p3.current[r6].map(([f5, a3]) => a3)).then(() => o10());
    })]), r6 === "enter" ? u4.current = u4.current.then(() => e3 == null ? void 0 : e3.wait.current).then(() => t7(r6)) : t7(r6);
  }), v3 = o3((l6, r6, t7) => {
    Promise.all(p3.current[r6].splice(0).map(([o10, f5]) => f5)).then(() => {
      var o10;
      (o10 = S2.current.shift()) == null || o10();
    }).then(() => t7(r6));
  });
  return (0, import_react18.useMemo)(() => ({ children: n2, register: E4, unregister: b2, onStart: d5, onStop: v3, wait: u4, chains: p3 }), [E4, b2, n2, d5, v3, p3, u4]);
}
function Se2() {
}
var xe = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
function re(i5) {
  var s7;
  let e3 = {};
  for (let n2 of xe)
    e3[n2] = (s7 = i5[n2]) != null ? s7 : Se2;
  return e3;
}
function Pe(i5) {
  let e3 = (0, import_react18.useRef)(re(i5));
  return (0, import_react18.useEffect)(() => {
    e3.current = re(i5);
  }, [i5]), e3;
}
var He = "div";
var ie = j.RenderStrategy;
var oe = V(function(e3, s7) {
  let { beforeEnter: n2, afterEnter: m5, beforeLeave: y2, afterLeave: b2, enter: E4, enterFrom: S2, enterTo: u4, entered: p3, leave: d5, leaveFrom: v3, leaveTo: l6, ...r6 } = e3, t7 = (0, import_react18.useRef)(null), o10 = y(t7, s7), f5 = r6.unmount ? w2.Unmount : w2.Hidden, { show: a3, appear: x3, initial: se } = be2(), [h3, _2] = (0, import_react18.useState)(a3 ? "visible" : "hidden"), K2 = Ee(), { register: D2, unregister: V2 } = K2, j2 = (0, import_react18.useRef)(null);
  (0, import_react18.useEffect)(() => D2(t7), [D2, t7]), (0, import_react18.useEffect)(() => {
    if (f5 === w2.Hidden && !!t7.current) {
      if (a3 && h3 !== "visible") {
        _2("visible");
        return;
      }
      return u(h3, { ["hidden"]: () => V2(t7), ["visible"]: () => D2(t7) });
    }
  }, [h3, t7, D2, V2, a3, f5]);
  let U2 = s2({ enter: P3(E4), enterFrom: P3(S2), enterTo: P3(u4), entered: P3(p3), leave: P3(d5), leaveFrom: P3(v3), leaveTo: P3(l6) }), L3 = Pe({ beforeEnter: n2, afterEnter: m5, beforeLeave: y2, afterLeave: b2 }), k = l2();
  (0, import_react18.useEffect)(() => {
    if (k && h3 === "visible" && t7.current === null)
      throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [t7, h3, k]);
  let G2 = se && !x3, le = (() => !k || G2 || j2.current === a3 ? "idle" : a3 ? "enter" : "leave")(), ae = o3((C2) => u(C2, { enter: () => L3.current.beforeEnter(), leave: () => L3.current.beforeLeave(), idle: () => {
  } })), ue = o3((C2) => u(C2, { enter: () => L3.current.afterEnter(), leave: () => L3.current.afterLeave(), idle: () => {
  } })), w3 = ne(() => {
    _2("hidden"), V2(t7);
  }, K2);
  D({ container: t7, classes: U2, direction: le, onStart: s2((C2) => {
    w3.onStart(t7, C2, ae);
  }), onStop: s2((C2) => {
    w3.onStop(t7, C2, ue), C2 === "leave" && !I3(w3) && (_2("hidden"), V2(t7));
  }) }), (0, import_react18.useEffect)(() => {
    !G2 || (f5 === w2.Hidden ? j2.current = null : j2.current = a3);
  }, [a3, G2, h3]);
  let B = r6, de2 = { ref: o10 };
  return x3 && a3 && s.isServer && (B = { ...B, className: e2(r6.className, ...U2.current.enter, ...U2.current.enterFrom) }), import_react18.default.createElement(M2.Provider, { value: w3 }, import_react18.default.createElement(C, { value: u(h3, { ["visible"]: p2.Open, ["hidden"]: p2.Closed }) }, X({ ourProps: de2, theirProps: B, defaultTag: He, features: ie, visible: h3 === "visible", name: "Transition.Child" })));
});
var J2 = V(function(e3, s7) {
  let { show: n2, appear: m5 = false, unmount: y2, ...b2 } = e3, E4 = (0, import_react18.useRef)(null), S2 = y(E4, s7);
  l2();
  let u4 = s6();
  if (n2 === void 0 && u4 !== null && (n2 = u(u4, { [p2.Open]: true, [p2.Closed]: false })), ![true, false].includes(n2))
    throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [p3, d5] = (0, import_react18.useState)(n2 ? "visible" : "hidden"), v3 = ne(() => {
    d5("hidden");
  }), [l6, r6] = (0, import_react18.useState)(true), t7 = (0, import_react18.useRef)([n2]);
  l(() => {
    l6 !== false && t7.current[t7.current.length - 1] !== n2 && (t7.current.push(n2), r6(false));
  }, [t7, n2]);
  let o10 = (0, import_react18.useMemo)(() => ({ show: n2, appear: m5, initial: l6 }), [n2, m5, l6]);
  (0, import_react18.useEffect)(() => {
    if (n2)
      d5("visible");
    else if (!I3(v3))
      d5("hidden");
    else {
      let a3 = E4.current;
      if (!a3)
        return;
      let x3 = a3.getBoundingClientRect();
      x3.x === 0 && x3.y === 0 && x3.width === 0 && x3.height === 0 && d5("hidden");
    }
  }, [n2, v3]);
  let f5 = { unmount: y2 };
  return import_react18.default.createElement(M2.Provider, { value: v3 }, import_react18.default.createElement(A2.Provider, { value: o10 }, X({ ourProps: { ...f5, as: import_react18.Fragment, children: import_react18.default.createElement(oe, { ref: S2, ...f5, ...b2 }) }, theirProps: {}, defaultTag: import_react18.Fragment, features: ie, visible: p3 === "visible", name: "Transition" })));
});
var Ne = V(function(e3, s7) {
  let n2 = (0, import_react18.useContext)(A2) !== null, m5 = s6() !== null;
  return import_react18.default.createElement(import_react18.default.Fragment, null, !n2 && m5 ? import_react18.default.createElement(J2, { ref: s7, ...e3 }) : import_react18.default.createElement(oe, { ref: s7, ...e3 }));
});
var Ke = Object.assign(J2, { Child: Ne, Root: J2 });

// app/routes/pipelines.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (typeof document != "undefined") {
  import("/build/_shared/index.min-BORHM5HA.js");
}
function PipelinesPage() {
  const data = useLoaderData();
  const { pipelineListItems } = data;
  const user = useUser();
  const inactiveClasses = "flex text-gray-700 hover:bg-gray-100";
  const activeClasses = "flex bg-gray-200 text-gray-900";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navigation, { user }, void 0, false, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "flex px-6 py-4", "aria-label": "Breadcrumb", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", { className: "inline-flex items-center space-x-1 md:space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Link,
        {
          to: ".",
          className: "text-sm font-medium text-gray-500 hover:text-blue-600",
          children: "Pipelines"
        },
        void 0,
        false,
        {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 46,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 45,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.ChevronRightIcon, { className: "h-5 w-5 mr-1 md:mr-2 flex-shrink-0 text-gray-400", "aria-hidden": "true" }, void 0, false, {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ze, { as: "div", className: "relative inline-block text-left", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Ze.Button,
            {
              className: "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100",
              children: [
                "Select pipeline ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.ChevronDownIcon, { className: "-mr-1 ml-2 h-5 w-5", "aria-hidden": "true" }, void 0, false, {
                  fileName: "app/routes/pipelines.tsx",
                  lineNumber: 58,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 55,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "app/routes/pipelines.tsx",
            lineNumber: 54,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Ke,
            {
              as: import_react20.Fragment,
              enter: "transition ease-out duration-100",
              enterFrom: "transform opacity-0 scale-95",
              enterTo: "transform opacity-100 scale-100",
              leave: "transition ease-in duration-75",
              leaveFrom: "transform opacity-100 scale-100",
              leaveTo: "transform opacity-0 scale-95",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                Ze.Items,
                {
                  className: "absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-1", children: [
                    pipelineListItems.map((pipeline) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      NavLink,
                      {
                        to: `/pipelines/${pipeline.id}`,
                        className: ({ isActive }) => isActive ? activeClasses : inactiveClasses,
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ze.Item, { as: "div", className: "flex w-full px-4 py-2 text-sm", children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.Square3Stack3DIcon, { className: "w-4 h-4 mt-0.5 mr-2" }, void 0, false, {
                            fileName: "app/routes/pipelines.tsx",
                            lineNumber: 81,
                            columnNumber: 29
                          }, this),
                          pipeline.name
                        ] }, void 0, true, {
                          fileName: "app/routes/pipelines.tsx",
                          lineNumber: 80,
                          columnNumber: 27
                        }, this)
                      },
                      pipeline.id,
                      false,
                      {
                        fileName: "app/routes/pipelines.tsx",
                        lineNumber: 75,
                        columnNumber: 25
                      },
                      this
                    )),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      NavLink,
                      {
                        to: "/pipelines/new",
                        end: true,
                        className: ({ isActive }) => isActive ? activeClasses : inactiveClasses,
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ze.Item, { as: "div", className: "flex w-full px-4 py-2 text-sm", children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.PlusIcon, { className: "w-4 h-4 mt-0.5 mr-2" }, void 0, false, {
                            fileName: "app/routes/pipelines.tsx",
                            lineNumber: 91,
                            columnNumber: 27
                          }, this),
                          "New pipeline"
                        ] }, void 0, true, {
                          fileName: "app/routes/pipelines.tsx",
                          lineNumber: 90,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/routes/pipelines.tsx",
                        lineNumber: 86,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "app/routes/pipelines.tsx",
                    lineNumber: 73,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "app/routes/pipelines.tsx",
                  lineNumber: 71,
                  columnNumber: 19
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 62,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 53,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 43,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "flex flex-col h-full bg-white", children: [
      pipelineListItems.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex px-6 space-x-1 md:space-x-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Link,
        {
          to: "new",
          className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.Square3Stack3DIcon, { className: "mx-auto h-10 w-10 text-gray-400" }, void 0, false, {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 111,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-2 font-medium text-gray-900", children: "Create a new Pipeline" }, void 0, false, {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 112,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 107,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 px-6 py-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, { context: { pipelineListItems } }, void 0, false, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/pipelines.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}
export {
  PipelinesPage as default
};
//# sourceMappingURL=/build/routes/pipelines-6PEZGCPT.js.map
