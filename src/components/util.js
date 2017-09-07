/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function GetQueryString(key, url) {
    if (typeof (url) == "undefined")
        url = window.location.search;
    var re = new RegExp("[?&]" + key + "=([^\\&]*)", "i");
    var a = re.exec(url);
    if (a == null) return "";
    return a[1];
}

export function IsNullOrEmpty(o) {
    return !(o && o != null && o != "")
}


export function alert(txt, callback, times) {
    if ($("#_alert_bg").length > 0) {
        $("#_alert_bg").show();
    }
    else {
        var _d = document;
        var _alert_bg = _d.createElement("div");
        _alert_bg.setAttribute("id", "_alert_bg");
        _d.body.appendChild(_alert_bg);

        var _alert_content = _d.createElement("div");
        _alert_content.setAttribute("id", "_alert_content");
        _alert_bg.appendChild(_alert_content);
    }
    var _this = $("#_alert_content");
    if (!times) {
        times = 1500;
    }
    _this.html(txt).fadeIn(function () {
        setTimeout(function () {
            _this.fadeOut(function () {
                $("#_alert_bg").hide();
                callback && callback();
            })
        }, times)
    });
}

export function confirm(tle, btnA, btnB, submit_fun, cancel_fun) {
    var _d = document;
    var _confirm_bg = _d.createElement("div");
    _confirm_bg.setAttribute("id", "_confirm_bg");
    _d.body.appendChild(_confirm_bg);

    var _confirm_content = _d.createElement("div");
    _confirm_content.setAttribute("id", "_confirm_content");
    _confirm_bg.appendChild(_confirm_content);

    var _wrap = $("#_confirm_content");
    var _temp = "";
    _temp = _temp + "<p>" + tle + "</p>";
    _temp = _temp + "<em id='_confirm_shadowA'>&nbsp;</em>";
    _temp = _temp + "<em id='_confirm_shadowB'>&nbsp;</em>";
    _temp = _temp + "<div id='_confirm_btnW'>";
    if (btnB && btnB[0]) {//B按钮有
        _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "'>" + btnA[0] + "</div>";
        _temp = _temp + "<em id='_confirm_shadowC'>&nbsp;</em>";
        _temp = _temp + "<em id='_confirm_shadowD'>&nbsp;</em>";
        _temp = _temp + "<div id='_confirm_btnB' class='" + btnB[1] + "'>" + btnB[0] + "</div>";
    }
    else {
        _temp = _temp + "<div id='_confirm_btnA' class='" + btnA[1] + "' style='width:100%'>" + btnA[0] + "</div>";
    }
    _temp = _temp + "</div>";

    _wrap.html(_temp).fadeIn();
    $("#_confirm_btnA").bind("click", function () {//cancel
        cancel_fun && cancel_fun();
        _wrap.fadeOut(function () {
            $("#_confirm_bg").remove();
        })
    })
    if (btnB && btnB[0]) {//B按钮有
        $("#_confirm_btnB").bind("click", function () {//submit
            submit_fun && submit_fun();
            _wrap.fadeOut(function () {
                $("#_confirm_bg").remove();
            })
        })
    }
}

export function ArrayRemove(arr, obj) {
    var index = arr.indexOf(obj);
    if (index > -1) { arr.splice(index, 1); }
}
export function InArray(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
export function ArrayIndexof(arr, obj) {
    for (var i = 0; i < arr.length; i++) { if (arr[i] == obj) return i; } return -1;
}