const config = {
  treasuryAddress: "0x5505ad96d4B1181c00248C8ac2a9A865065FD69D",
  opsAddress: "0x3dABd1Ac5E89e01e928fca232672c4848C6E3097",
  farms: [
    {
      id: "craftsman-v2",
      contractAddresses: {
        "0x19": "0xbc149c62EFe8AFC61728fC58b1b66a0661712e76",
      },
    },
  ],
  liquidityPools: [
    {
      id: "versa-usdc-lp",
      token0: "versa",
      token1: "usdc",
      lpToken: "versa-usdc-lp",
      contractAddresses: {
        "0x19": "0xfc0445f2063fa6def196B34C105F0E0A4834eC8f",
      },
    },
    {
      id: "versa-vvs-lp",
      farmId: 30,
      token0: "versa",
      token1: "vvs",
      lpToken: "versa-vvs-lp",
      contractAddresses: {
        "0x19": "0xD7F3d8035cd7BD5aD5E43Fa4E1d4DcA12e133FdD",
      },
    },
  ],
  stakingPools: [
    {
      id: "xvvs-versa-sp",
      stakingToken: "xvvs",
      rewardToken: "versa",
      contractAddresses: {
        "0x19": "0x2d676d626d812a38eee2addbf8b22416c0313efb",
      },
    },
    {
      id: "xvvs-single-sp",
      stakingToken: "xvvs",
      rewardToken: "single",
      contractAddresses: {
        "0x19": "0xa618D96d36Cb32a7618e71850BD569726608372E",
      },
    },
  ],
  tokens: {
    versa: {
      id: "versa",
      symbol: "VERSA",
      addresses: {
        "0x19": "0x00d7699b71290094ccb1a5884cd835bd65a78c17",
      },
      decimals: 18,
    },
    cro: {
      id: "cro",
      symbol: "CRO",
      addresses: {
        "0x19": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      },
      decimals: 18,
    },
    usdc: {
      id: "usdc",
      symbol: "USDC",
      addresses: {
        "0x19": "0xc21223249ca28397b4b6541dffaecc539bff0c59",
      },
      decimals: 6,
    },
    "versa-usdc-lp": {
      id: "versa-usdc-lp",
      symbol: "VERSA-USDC",
      addresses: {
        "0x19": "0xfc0445f2063fa6def196B34C105F0E0A4834eC8f",
      },
      decimals: 18,
    },
    "versa-vvs-lp": {
      id: "versa-vvs-lp",
      symbol: "VERSA-VVS",
      addresses: {
        "0x19": "0xD7F3d8035cd7BD5aD5E43Fa4E1d4DcA12e133FdD",
      },
      decimals: 18,
    },
    xversa: {
      id: "xversa",
      symbol: "xVERSA",
      addresses: {
        "0x19": "0x8216E362d07741b562eBB02C61b1659B6B1258aD",
      },
      decimals: 18,
    },
    xvvs: {
      id: "xvvs",
      symbol: "xVVS",
      addresses: {
        "0x19": "0x7fe4db9063b7dd7ba55313b9c258070bed2c143a",
      },
      decimals: 18,
    },
    vvs: {
      id: "vvs",
      symbol: "VVS",
      addresses: {
        "0x19": "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03",
      },
      decimals: 18,
    },
    single: {
      id: "single",
      symbol: "SINGLE",
      name: "SINGLE Token",
      addresses: {
        "0x19": "0x0804702a4E749d39A35FDe73d1DF0B1f1D6b8347",
      },
      decimals: 18,
    },
  },
  chains: {
    cronos: {
      id: "0x19",
      name: "cronos",
    },
  },
};

function getToken(id, chainId) {
  const token = config.tokens[id];
  const address = token.addresses[chainId];

  if (!address) {
    throw new Error(`Token ${id} is not supported on chain ${chainId}`);
  }

  const { addresses, ...tokenRest } = token;
  return {
    ...tokenRest,
    address,
  };
}

function getFarm(farmId) {
  return config.farms.find((f) => f.id === farmId);
}

function getLiquidityPool(lPoolId) {
  return config.liquidityPools.find((lp) => lp.id === lPoolId);
}

function getStakingPoolByAddressAndChain(address, chainId) {
  return config.stakingPools.find(
    (sp) => sp.contractAddresses[chainId] === address
  );
}

module.exports = {
  config,
  getToken,
  getFarm,
  getLiquidityPool,
  getStakingPoolByAddressAndChain,
};
