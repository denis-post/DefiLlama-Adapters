const sdk = require("@defillama/sdk");
const BigNumber = require("ethers").BigNumber;

const getRatio = (amount1, amount2, precision = 5) => {
  const [amount1Scaled, amount2Scaled] = scaleAmounts([amount1, amount2]);
  return {
    value:
      amount1Scaled.amount
        .mul(BigNumber.from(10).pow(precision))
        .div(amount2Scaled.amount)
        .toNumber() / Math.pow(10, precision),
    precision,
  };
};

const multiplyByRatio = (number, multiplier) => {
  const multiplyBy = BigNumber.from(
    Math.round(multiplier.value * Math.pow(10, multiplier.precision))
  );
  return number
    .mul(multiplyBy)
    .div(BigNumber.from(10).pow(multiplier.precision));
};

/**
 * Returns the amounts scaled to the maximum number of decimals
 */
const scaleAmounts = (amounts) => {
  const maxDecimals = Math.max(...amounts.map((a) => a.decimals));
  return amounts.map((a) => ({
    amount: scaleAmount(a.amount, a.decimals, maxDecimals),
    decimals: maxDecimals,
  }));
};

const scaleAmount = (amount, amountDecimals, newDecimals) => {
  const scaleDiff = newDecimals - amountDecimals;
  if (!scaleDiff) {
    return amount;
  }
  const scaleFactor = BigNumber.from(10).pow(Math.abs(scaleDiff));
  if (scaleDiff < 0) {
    return amount.div(scaleFactor);
  }
  return amount.mul(scaleFactor);
};

function sumBalances(bal1, bal2) {
  for (const balance in bal2) {
    if (bal1[balance] !== undefined) {
      const tokenBalanceInBal1 = BigNumber.from(bal1[balance]);
      bal1[balance] = tokenBalanceInBal1
        .add(BigNumber.from(bal2[balance]))
        .toString();
    }
    if (bal1[balance] === undefined) {
      bal1[balance] = bal2[balance];
    }
  }
}

function sumMultiBalances(balances, otherBalances) {
  otherBalances.forEach((b) => {
    sdk.util.sumSingleBalance(balances, b.token, b.balance);
  });
}

function getAddressOnChain(address, chain) {
  return `${chain.name}:${address}`;
}

function getAbi(abiConfig, abiName) {
  return abiConfig.find((obj) => obj.name === abiName);
}

module.exports = {
  getRatio,
  multiplyByRatio,
  sumBalances,
  getAddressOnChain,
  getAbi,
  sumMultiBalances,
};
