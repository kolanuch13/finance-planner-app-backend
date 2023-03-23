const { requestError } = require("../../helpers");

async function statisticInfo(req, res) {
  const { _id } = req.user;

  const currentDate = new Date();
  const { date = currentDate } = req.body;

  // incomes for the selected month

  const incomes = await Transaction.find({
    owner: _id,
    type: "income",
  });

  if (!incomes) {
    throw requestError(404);
  }

  const incomePerSelectedMonth = [];
  for (let i = 0; i < incomes.length; i++) {
    if (
      new Date(incomes[i].createdAt).getMonth() === new Date(date).getMonth() &&
      new Date(incomes[i].createdAt).getFullYear() ===
        new Date(date).getFullYear()
    ) {
      incomePerSelectedMonth.push(incomes[i].sum);
    }
  }
  const incomeSumPerSelectedMonth = incomePerSelectedMonth.reduce(
    (ac, item) => ac + item,
    0
  );

  // expenses for the selected month

  const expenses = await Transaction.find({
    owner: _id,
    type: "expense",
  });

  if (!expenses) {
    throw requestError(404);
  }

  const expensePerSelectedMonth = [];
  for (let i = 0; i < expenses.length; i++) {
    if (
      new Date(expenses[i].createdAt).getMonth() ===
        new Date(date).getMonth() &&
      new Date(expenses[i].createdAt).getFullYear() ===
        new Date(date).getFullYear()
    ) {
      expensePerSelectedMonth.push(expenses[i].sum);
    }
  }
  const expenseSumPerSelectedMonth = expensePerSelectedMonth.reduce(
    (ac, item) => ac + item,
    0
  );
  // acumulated for the selected month
  const acumulatedSumPerSelectedMonth =
    incomeSumPerSelectedMonth - expenseSumPerSelectedMonth;

  // plan money per month

  const { passiveIncome, salary, procent } = await personalPlan.find({
    owner: _id,
  });
  if (!passiveIncome || !salary || !procent) {
    throw requestError(404);
  }
  const planMoneyPerMonth = ((salary + passiveIncome) * procent) / 100;

  // plan percentage per month

  const percentagePlanPerMonth =
    (acumulatedSumPerSelectedMonth / planMoneyPerMonth) * 100;

  res.json({
    incomeSumPerSelectedMonth,
    expenseSumPerSelectedMonth,
    acumulatedSumPerSelectedMonth,
    planMoneyPerMonth,
    percentagePlanPerMonth,
  });
}

module.exports = statisticInfo;
