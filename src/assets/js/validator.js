
/**
 *
 *  验证
 *     默认规则：v-validator:email.vanow= "['required', 'Mail']"
 *     自定义规则：v-validator:email= "[{required: '', msg: '不可以为空呦'}]"
 * 
 *        v-validator:password= "validatePassword" 
          data () {
            return {
              validatePassword: [
                  { required: '', msg: '请输入内容' },
                  { limit: this.limit, msg: '字符长度在 6 和 12 之间' }
              ]
            }
          },
          methods: {
            limit: function () {
              let password = this.$data.password
              return (password.length >= 6 && password.length <= 12)
            }
          }

 * 
 *  方法调用
          check () {
            let checkResult = this.$va.checkAll()
            if (checkResult) {
              console.log('请求接口去跳转页面')
            }
          }
 *
 *  注意：必须设置唯一的 name 属性值
 *  错误：<span class="error"></span>、输入框父元素有 error_item 类名时显示  
 * 
 *  引入
        import Validator from './assets/js/validator'
        Vue.use(Validator)
 */


// 默认规则正则表
let regList = {
  required: true,
  num: 'function',
  idCard: 'function',
  // 英文与数字组成
  Code: /^[A-Za-z0-9]+$/,
  // 英文姓名中间支持有空格，中文姓名支持空格有“·”的匹配
  Name: /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/,
  // 中英文、下划线、# 号
  Address: /^[\u4E00-\u9FA5A-Za-z0-9_#]{2,200}$/,
  Mobile: /^1[3|4|5|7|8]\d{9}$/,
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}
// 默认规则错误信息
let msgList = {
  required: '必填',
  num: "请输入正确的数字",
  idCard: "请输入正确的身份证号",
  Code: '请输入正确的编码',
  Name: '请输入正确的姓名',
  Address: '请输入正确的地址',
  Mobile: '请输入正确的手机号',
  Mail: '请输入正确的邮箱'
}
// 规则构造器
function Rule (ruleName, ruleValue, ruleMsg) {
  this.ruleName = ruleName
  this.ruleValue = ruleValue
  this.msg = ruleMsg
}
// 挂在vue实例上面$va
function createVa (vm, domSelector) {
  let va = {
    ruleListRank: [],
    forms: {},
    checkRule: checkRule,
    checkAll: checkAll
  }
  if (vm.$va) {
    return vm.$va
  } else {
    vm.$va = va
    return vm.$va
  }
}
// va构造器挂在vue实例上面$va的forms上面
function VaForm (el, finalRule) {
  this.dom = el
  this.rules = finalRule
}
// 断言函数
function assert (condition, message) {
  if (!condition) {
    console.error('[validator-warn]:' + message)
  }
}
// 挂载va上的方法================================================>
// 校验表单的全部字段
function checkAll () {
  let checkFlag = true
  let forms = forms

  for (let name of this.ruleListRank) {
    let flag = this.checkRule(this.forms[name].dom, this.forms[name].rules)
    if (flag === false) {
      checkFlag = flag
    }
  }
  return checkFlag
}
// 校验表单的一个字段的第一个报错信息
function checkRule (dom, rules) {

  let ruleCheckers = {
    required: checkEmpty,
    reg: checkReg,
    idCard: checkIdCard,
    num: checkNum
  }
  for (let rule of rules) {
    let {ruleName, ruleValue, msg} = rule
    let checkResult
   
    if (typeof ruleValue === 'function') {
      checkResult = ruleValue()
    } else {
      
      checkResult = ruleCheckers[ruleName]
        ? ruleCheckers[ruleName](ruleValue, dom)
        : ruleCheckers.reg(ruleValue, dom)
    }
    if (!checkResult) {
      setError(dom, msg, 'add')
      return false
    }
  }
  setError(dom, '', 'remove')
  return true
}
// 表单验证的方法================================================>
// 检测非空
function checkEmpty (ruleValue, vaForm) {
  return vaForm.value.trim() !== ''
}
// 检测正则
function checkReg (ruleValue, vaForm) {
  return ruleValue.test(vaForm.value)
}
// 检测纯数字
function checkNum (ruleValue, vaForm) {
  return !isNaN(vaForm.value)
}
// 验证身份证号
function checkIdCard(ruleValue, vaForm) {
  var value = vaForm.value.trim();
  if(!value){ return false }

  var ereg
   var Y,JYM;  
  var S,M;  
  var idcard_array = new Array();  
  idcard_array = value.split("");
   var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
  if(value!=""&&value.length!=15&&value.length!=18){
    return false;
  }
   if(value!=""&&area[parseInt(value.substr(0,2))]==null){
     return false;
  }
   
  switch(value.length){
    //15位身份证号校验
    case 15:
      if ((parseInt(value.substr(6,2))+1900) % 400 == 0 || ((parseInt(value.substr(6,2))+1900) % 100 != 0 && (parseInt(value.substr(6,2))+1900) % 4 == 0 )){ 
        ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; 
      } else { 
        ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; 
      }
      if(!ereg.test(value)){
        return false;	
      }
      break;
    //18位身份证号校验
    case 18:
      if ( parseInt(value.substr(6,4)) % 400 == 0 || (parseInt(value.substr(6,4)) % 100 != 0 && parseInt(value.substr(6,4))%4 == 0 )){ 
        //闰年出生日期的合法性正则表达式 
        ereg=/^[1-9][0-9]{5}(19|([2-9][0-9]))[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9xX]{1}$/;
      } else { 
        //平年出生日期的合法性正则表达式 
        ereg=/^[1-9][0-9]{5}(19|([2-9][0-9]))[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9xX]{1}$/;
      }	
      
      if(ereg.test(value)){//测试出生日期的合法性  
        //计算校验位  
        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7  
        + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9  
        + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10  
        + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5  
        + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8  
        + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4  
        + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2  
        + parseInt(idcard_array[7]) * 1   
        + parseInt(idcard_array[8]) * 6  
        + parseInt(idcard_array[9]) * 3 ;
        
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y,1);/*判断校验位*/
        if(M == idcard_array[17].toUpperCase()){
          return true; /*检测ID的校验位false;*/  
        }  
        else {
          return false;  
        }
      }
      else {
        return false;  
      }
      break;
    default:
      return true;
  }
}


/**
 * 设置错误的方法
 * @param {*} dom 当前dom元素
 * @param {*} msg 报错信息
 * @param {*} type 是添加报错信息还是移除
 */
function setError (dom, msg, type) {
  if (dom.parentNode.classList) {
    if (type === 'add') {
      dom.parentNode.classList.add('error_item')
    } else {
      dom.parentNode.classList.remove('error_item')
    }
  }
  dom.nextElementSibling.innerHTML = msg
}

let installed = false
function plugin (Vue, options) {
  if (installed) {
    assert(installed, 'already installed')
    return
  }
  Vue.directive('validator', {
    bind: function (el, binding, vnode) {
      let vm = vnode.context  // 基本的校验规则
      let finalRule = []      // 最终的校验规则
      let domSelector = binding.arg === undefined ? el.getAttribute('name') : binding.arg
      let options = binding.value ? binding.value : [] // 特殊配置（允许非空，编辑新增共用等）
      assert(domSelector, 'not set name or binding.arg')
      let va = createVa(vm, domSelector)  // 单例模式创建va，绑定在vm上
      va.ruleListRank.push(domSelector)   // 表单检验的顺序

      for (let option of options) {
        if (typeof option === 'object') {
          // 用户自定义的校验规则
          let ruleName = Object.keys(option)[0]
          let ruleValue = option[ruleName] ? option[ruleName] : regList[ruleName]
          assert(ruleValue, domSelector + " selector's " + ruleName + ' not set verification mode')
          finalRule.push(new Rule(ruleName, ruleValue, option.msg))
        } else {
          // 配置项定义的校验规则
          if (regList[option]) {
            finalRule.push(new Rule(option, regList[option], msgList[option]))
          }
        }
      }

      // 需要立即校验的框
      if(binding.modifiers.vanow){
        el.addEventListener('blur', function(){
          
          checkRule(el, finalRule)
        })
      }
      

      let vaForm = new VaForm(el, finalRule)
      va.forms[domSelector] = vaForm
    }
  })
  installed = true
}
// 自动注册vue
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
export default {
  install: plugin
}


