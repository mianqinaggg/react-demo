const ajaxOptions = {
    url: '#',
    method: 'GET',
    async: true,
    timeout: 20 * 1000,
    data: null,
    params: null,
    form: undefined,
    dataType: 'text',
    responseTransfer: null,
    xhr: null,
    headers: null,
  };
  
  /**
   * @param get 请求url的参数组装
   * @param {String} url
   * @param {Object} params
   * @return {String}
   */
  function fixUrl(url, params = {}) {
    if (!params) {
      params = {};
    }
    params['t'] = new Date().getTime();
    let paramsList = Object.keys(params).map((key) => {
      let value = params[key];
      if (typeof params[key] === 'string') {
        value = params[key].replace(/&/g, '%26').replace(/\?/g, '%3F');
      }
      return key + '=' + value;
    });
    if (url.search(/\?/) === -1) {
      url += '?' + paramsList.join('&');
    } else {
      url += '&' + paramsList.join('&');
    }
    return url;
  }
  
  /**
   * ajax函数，返回一个promise对象
   * @param {Object} optionsOverride 参数设置，支持的参数如下
   *   url:                     url地址，默认"#"
   *   method:                  请求方法，仅支持GET,POST,默认GET
   *   async:                   是否异步，默认true
   *   timeout:                 请求时限，超时将在promise中调用reject函数
   *   data:                    发送的数据，该函数不支持处理数据，将会直接发送
   *   dataType:                接受的数据的类型，默认为text
   *   headers:                 一个对象，包含请求头信息
   *   xhr:                     允许在函数外部创建xhr对象传入，但必须不能是使用过的
   * @return {Promise}
   *   该函数注册xhr.onloadend回调函数，判断xhr.status是否属于 [200,300)&&304 ，
   *   如果属于则promise引发resolve状态，允许拿到xhr对象
   *   如果不属于，或已经引发了ontimeout,onabort,则引发reject状态，允许拿到xhr对象
   * 关于reject
   *   返回一个对象，包含
   *   errorType:错误类型，
   *     abort_error:   xhr对象调用abort函数
   *     timeout_error: 请求超时
   *     onerror:       xhr对象触发了onerror事件w
   *     send_error:    发送请求出现错误
   *     status_error:  响应状态不属于 [200,300)&&304
   */
  export default function main(optionsOverride) {
    // 将传入的参数与默认设置合并
    if (optionsOverride.data) {
      // 过滤无效参数 或者为空白值 的参数
      Object.keys(optionsOverride.data).map((item) => {
        if (
          optionsOverride.data[item] === null ||
          optionsOverride.data[item] === undefined
          // optionsOverride.data[item] === ''
        ) {
          delete optionsOverride.data[item];
        }
      });
    }
    let options = {};
    for (let k in ajaxOptions) {
      options[k] = optionsOverride[k] || ajaxOptions[k];
    }
    options.async = options.async !== false;
    let xmlHttp = null;
  
    if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
  
    let xhr = (options.xhr = options.xhr || xmlHttp);
    if (window.runTime === 'notDev') {
      options.url = 'api' + options.url;
    }
  
    if (options.method.toLowerCase() === 'get') {
      options.url = fixUrl(options.url, options.data);
    } else if (options.method.toLowerCase() === 'post') {
      if (options.dataType === 'json') {
        options.url = fixUrl(options.url, options.params); // NOTE  后端接口都是这种奇葩拼的..
      } else {
        // options.url = fixUrl(options.url, options.params);
        options.url = fixUrl(options.url, options.data); // NOTE  后端接口都是这种奇葩拼的..
      }
    }
  
    // NOTE data 里面不放 form 了
    // options.data =
    //   options.method.toLowerCase() === 'get'
    //     ? null
    //     : !!options.data && !(options.data instanceof FormData)
    //       ? JSON.stringify(options.data)
    //       : options.data;
  
    const { responseTransfer, getXhr } = options;
  
    return new Promise((resolve, reject) => {
      xhr.open(options.method, options.url, options.async);
  
      xhr.timeout = options.timeout;
  
      // //设置请求头
      // for (let k in options.headers) {
      //   xhr.setRequestHeader(k, options.headers[k]);
      // }
      if (options.headers) {
        for (let k in options.headers) {
          xhr.setRequestHeader(k, options.headers[k]);
        }
      } else {
        // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
  
      if (xhr.responseType) {
        xhr.responseType = options.dataType;
      }
  
      // 返回 xhr 对象
      if (getXhr) {
        getXhr(xhr);
      }
  
      xhr.ontimeout = () => {
        reject({
          message: '请求超时, 请检查网络连接或刷新重试',
          errorType: 'timeout_error',
          xhr: xhr,
          status: 0,
        });
      };
  
      xhr.onerror = () => {
        reject({
          errorType: 'onerror',
          message: '未知错误',
          xhr: xhr,
          status: 0,
        });
      };
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          let status = 0;
  
          try {
            // 防止某些浏览器超时后抛出异常
            status = xhr.status;
          } catch (e) {
            return;
          }
  
          if (status === 0) return; // 请求被取消
  
          let resp = '';
  
          try {
            let res = xhr.responseText;
            // NOTE 转两次 比较NB...
            typeof res === 'string' && (res = JSON.parse(res));
            typeof res === 'string' && (res = JSON.parse(res));
  
            resp = res;
          } catch (e) {
            resp = xhr.responseText || '';
          }
  
          status === 200
            ? resolve(
                responseTransfer ? responseTransfer(xhr.responseText) : resp
              )
            : reject({
                message: `${resp.message || resp.toString()}`,
                errorType: 'onerror',
                status,
                xhr: xhr,
              });
        }
      };
  
      try {
        let fd = new FormData();
        let form = options.form;
        for (let key in form) {
          fd.append(key, form[key]);
        }
        if (options.dataType === 'json') {
          xhr.send(JSON.stringify(options.data)); // NOTE post json格式
        } else {
          xhr.send(form ? fd : undefined);
        }
      } catch (e) {
        reject({
          errorType: 'send_error',
          error: e,
        });
      }
    });
  }
  
  
  
  
  
  
  
  import message from 'components/message';
    import { loadingCenter, getAutoCtrl } from './helper';
  
  /********************  业务逻辑  ********************/
  
  // 在 options中接受一个 autoCatch, 来 自动捕捉 ajax错误. 默认开启
  // 在 options中接受一个 loading, 来 自动转圈圈. 默认开启
  export const ajax = async (options) => {
    const { autoCatch, loading } = getAutoCtrl(options);
  
    loading && loadingCenter.show(loading, options.__loadingTime);
  
    options.url = window.API_PREFIX + options.url;
  
    return main(options)
      .then((res) => {
        loading && loadingCenter.hide();
  
        const e = new Error();
  
        if (!res) {
          e.message = '请求结果发生异常!';
          throw e;
        }
  
        const { code, message, result = {} } = res;
  
        if (!autoCatch) return res;
  
        if (+code === 401 || +code === 403) {
          //　失效或者无权
          loadingCenter.logout();
          return;
        }
  
        if (+code !== 0) {
          e.message = message;
          throw e;
        }
  
        return result;
      })
      .catch((e) => {
        loading && loadingCenter.hide();
  
        if (autoCatch) {
          message.error(`错误: ${e.message}`, 3);
        }
  
        throw e;
      });
  };
  
  export const get = (options) => {
    return ajax({
      method: 'get',
      ...options,
    });
  };
  
  export const post = (options) => {
    return ajax({
      method: 'post',
      ...options,
    });
  };
  