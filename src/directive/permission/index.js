import hasRole from './hasRole'
import hasPermi from './hasPermi'

const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
  Vue.directive("loadmore", {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector(
        ".el-select-dropdown .el-select-dropdown__wrap"
      );
      SELECTWRAP_DOM.addEventListener("scroll", function() {
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (CONDITION) {
          binding.value();
        }
      });
    }
  });
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi

  Vue.use(install); // eslint-disable-line
}

export default install
