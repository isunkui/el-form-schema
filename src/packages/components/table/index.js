import { Component } from "../index";
import { createElementBySlot, deepClone } from "../utils";

export default function(createElement, value, data) {
  // eslint-disable-next-line no-unused-vars
  const { formValues } = this;
  const listValues = eval(`formValues.${data.name}`);
  data.slot = data.slot || {};
  data.style = data.style || { marginBottom:  !data.showValidate ? '' : '22px' };
  data.operator = data.operator || {};
  const operatorColumnProps = Object.assign(
    {
      label: "操作",
      width: "100px"
    },
    data.operator.column || {}
  );
  const createTableColumns = () => {
    return Object.keys(data.components)
      .map(key => {
        return createElement("el-table-column", {
          props: data.components[key].column || {},
          scopedSlots: {
            default: scope => {
              data.components[key].labelWidth = data.labelWidth || "0px";
              data.components[key].showValidate = !data.showValidate;
              data.components[key].$index = scope.$index;
              data.components[key].$item = scope.row;
              const componentDataCopy = deepClone(data.components[key]);
              delete componentDataCopy.label;
              return [
                Component(
                  createElement,
                  this,
                  // 这里一定要用 [${index}] ( 原因：eval('data.0.name') 会报错）
                  `${data.name}[${scope.$index}].${key}`,
                  componentDataCopy
                )
              ];
            }
          }
        });
      })
      .concat(
        createElement("el-table-column", {
          props: operatorColumnProps,
          scopedSlots: {
            default: scope => {
              return data.operator.slot
                ? this.$scopedSlots[data.operator.slot]({
                    delDisabled: listValues.length === data.minLimit,
                    addDisabled: listValues.length === data.maxLimit,
                    ...scope
                  })
                : createElement("el-form-item", {
                  style: {
                    marginBottom: data.showValidate ? '22px' : '0px'
                  }
                },[
                    createElement(
                      "el-button",
                      {
                        props: {
                          disabled: listValues.length === data.minLimit,
                        },
                        on: {
                          click: () => {
                            eval(`formValues.${data.name}.splice(scope.$index, 1)`);
                          }
                        }
                      },
                      typeof data.slot.delete === "string" ? data.slot.delete : "删除"
                    )
                  ]
              );
            }
          }
        })
      );
  };

  // 数组最小限制
  if (data.minLimit > 0 && listValues.length === 0) {
    for (let i = 1; i <= data.minLimit; i++) {
      eval(
        `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
      );
    }
  }

  // 设置 uuid_key 作为 rowKey
  listValues.forEach(item => {
    if (!item.uuid_key) {
      this.$set(item, "uuid_key", Math.random().toString(36).substring(2));
    }
  });

  let nodes = [
    createElement(
      "el-table",
      {
        props: {
          data: listValues,
          size: 'small',
          border: true,
          rowKey: "uuid_key",
          headerCellStyle: { fontSize: '15px', background: '#f9f9f9' },
          ...data.props
        },
        style: {
          width: "100%"
        }
      },
      [
        data.showIndex ? createElement("el-table-column", { props: { type: 'index',  align: 'center'} }) : null,
        createTableColumns()
      ]
    ),
    createElement(
      "div",
      {
        style: {
          background: "#f9f9f9",
          padding: "5px 0 5px 20px",
          borderBottom: "1px solid #EBEEF5",
          borderLeft: "1px solid #EBEEF5",
          borderRight: "1px solid #EBEEF5"
        }
      },
      [
        createElement(
          "el-link",
          {
            props: {
              icon: "el-icon-plus",
              underline: false,
              disabled: listValues.length === data.maxLimit
            },
            on: {
              click() {
                eval(
                  `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
                );
              }
            }
          },
          typeof data.slot.add === "string" ? data.slot.add : "新增"
        ),
        data.maxLimit > 0
          ? createElement(
              "span",
              { style: { color: "#f56c6c" } },
              `（注意：当前限制最多${data.maxLimit}条数据）`
            )
          : null
      ]
    )
  ];

  return [
    createElementBySlot(createElement, data, "before"),
    createElement(
      "div",
      {
        style: { ...data.style }
      },
      nodes
    ),
    createElementBySlot(createElement, data, "after")
  ];
}
