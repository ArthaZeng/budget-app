import AsyncStorage from "@react-native-community/async-storage";
import { CATEGORIES } from "./constants";

export const loadData = async prevData => {
  const newExpense = [...prevData];
  let gain = 0;
  let spend = 0;
  for (const key in CATEGORIES) {
    let total = 0;
    const entry = CATEGORIES[key];
    const expense = await AsyncStorage.getItem(entry.key);
    if (expense) {
      const expenseArr = JSON.parse(expense);
      total = expenseArr.reduce(
        (totalExp, currExp) => totalExp + parseFloat(currExp[0]),
        0
      );
    }
    console.log(entry);
    newExpense.push({
      name: entry.label,
      amount: total,
      left: entry.budget,
      color: entry.color
    });
    if (
      entry.key === CATEGORIES.salary.key ||
      entry.key === CATEGORIES.otherIncome.key
    ) {
      gain += total;
    } else if (entry.key !== CATEGORIES.reimbursement) {
      // reimbursement does not go to difference calculation
      spend += total;
    }
  }
  return {
    data: newExpense,
    difference: Math.round((gain - spend) * 100) / 100
  };
};
