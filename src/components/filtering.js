import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        return `<option value="${name}">${name}</option>`;
      })
    );
  });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (
      action &&
      action.type === "click" &&
      action.target &&
      action.target.matches('button[name="clear"]')
    ) {
      const button = action.target;
      const parentLabel =
        button.closest(".filter-wrapper") || button.closest("label");
      if (parentLabel) {
        const input = parentLabel.querySelector("input");
        if (input) {
          input.value = "";
        }
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
