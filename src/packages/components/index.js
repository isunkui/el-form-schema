/*
 * @Author: liwei
 * @Date: 2020-11-10 10:17:52
 * @Description: In User Settings Edit
 */
import {
  customTags,
  slotComponent,
  createTipComponent,
  createElementBySlot
} from "./utils";

export const Component = (createElement, vm, key, item) => {
  let {
    rules = null,
    labelWidth = "",
    name = key,
    keys = {},
    $index = "",
    items = [],
    tag,
    on = {}
  } = item;

  // 新增 name 属性（目的：为了做给复杂类型(object|array)用来遍历嵌套 el-form-item 的时候设置 prop 值）
  item.name = key;

  // eslint-disable-next-line no-unused-vars
  const { formValues, model } = vm;

  // 获取value
  const value = eval(`formValues.${key}`);

  // 合并事件
  item.on = Object.assign(on, {
    input: function(value) {
      // 解决对象的问题 object: { test: '' }, name = object.test
      eval(`vm.formValues.${name} = value`);
      // on : { changeExt(val,item) { }
      if (["el-select", "el-radio", "el-checkbox"].includes(tag) && on.changeExt) {
        const model = items.find(
          item => item[keys ? keys["value"] : "value"] == value
        );
        on.changeExt.call(vm, value, model);
      }
      // on : { changeModel(val,item) { }
      if (on.changeModel) {
        on.changeModel.call(vm, { $item: eval(`vm.formValues.${item.name.slice(0,item.name.lastIndexOf("."))} || vm.formValues`), $index: item.$index });
      }
    }
  });

  // 开启debug模式
  if (
    vm.debug &&
    typeof item.slot === "object" &&
    !["$tab", "$array"].includes(tag)
  ) {
    item.slot.after = key;
  }

  // 编译表达式字符串
  const compilerExpressionString = condition => {
    if (typeof condition === "boolean" || condition === undefined) {
      // bool值vif
      return condition;
    } else if (typeof condition === "string") {
      // 复杂vif: "test.length>0" || "arr[$index].test"
      try {
        // vif 包含 $index
        if (condition.includes("[$index]") && $index > -1) {
          condition = condition.replace("$index", $index || 0);
        }
        // vif 包含 $item
        if (condition.includes("$item")) {
          condition = condition.replace(/(\$item)/g, "item.$item");
        }
        // vif 包含 $model
        if (condition.includes("$model")) {
          condition = condition.replace(/(\$model)/g, "formValues");
        }
        // 执行eval
        return eval(condition);
      } catch (e) {
        console.log(e);
        // 阻止多级报错的情况，比如："$model.a.b.c"
        console.log(`[condition](${condition})，存在问题`);
      }
    }
  };

  let vifBool = true;
  // 编译 vif 表达式字符串
  if (item.vif && typeof item.vif === "string") {
    vifBool = compilerExpressionString(item.vif);
  }
  // 编译 props.disabled 表达式字符串
  if (item.props && typeof item.props.disabled === "string") {
    item.props.disabled = compilerExpressionString(item.props.disabled);
  }
  // 编译 attrs.disabled 表达式字符串
  if (item.attrs && typeof item.attrs.disabled === "string") {
    item.attrs.disabled = compilerExpressionString(item.attrs.disabled);
  }

  // 收集vif=false的隐藏字段（目的：后续为了用来移除验证）
  vifBool ? vm.validiteFieldSet.delete(name) : vm.validiteFieldSet.add(name);

  // 通过 vifBool 设置 rules 的 required 值
  if (item.rules) rules.required = vifBool;

  let nodes = [];

  if (item.isInput === false && !item.vmodel) {
    item.style.marin = item.style.margin || "0 0 22px 0";
  }

  if (customTags[tag]) {
    nodes = [
      customTags[tag].call(vm, createElement, value, item),
      createTipComponent(createElement, item)
    ];
  } else {
    nodes = [
      createElementBySlot(createElement, item, "before"),
      createElement(
        tag,
        {
          props: {
            value,
            ...item.props
          },
          attrs: item.attrs,
          style: item.style,
          class: item.class,
          on: {
            ...item.on,
            click() {
              item.on && item.on.click.call(item, item.$item, item.$index);
            }
          }
        },
        typeof item.slot === "object"
          ? Object.keys(item.slot).length === 0
            ? value || item.default
            : slotComponent.call(vm, createElement, value, item)
          : item.slot
      ),
      createElementBySlot(createElement, item, "after"),
      createTipComponent(createElement, item)
    ];
  }

  if (item.isInput === false) {
    return customTags[tag]
      ? customTags[tag].call(vm, createElement, value, item)
      : nodes;
  }
  
  return [
    createElement(
      "el-form-item",
      {
        class: {
          "el-form-item-inline is-set-inline":
            !["object", "array", "table"].includes(item.tag) && item.inline && !vm.inline
        },
        props: {
          rules,
          prop: key,
          labelWidth: labelWidth || vm.labelWidth,
          label: item.label
        },
        style: {
          display: vifBool
            ? !["object", "array", "table"].includes(item.tag) && item.inline
              ? "inline-flex"
              : ""
            : "none",
          alignItems: !["object", "array", "table"].includes(item.tag) && item.inline ? "flex-end" : null,
          marginRight: item.inline && item.slot && item.slot.after ? "0px" : "",
          marginBottom: !vm.inline
            ? item.showValidate 
              ? "0px"
              : item.style && item.style.marginBottom ? item.style.marginBottom : item.isMarginBottom
              ? "22px"
              : "22px"
            : ""
        },
        ref: key
      },
      nodes
    ),
    item.isLastInline
      ? createElement("div", { style: { display: "flex" } })
      : []
  ];
};