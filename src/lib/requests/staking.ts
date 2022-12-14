import { ReturnDataType } from "lib/types/base";
import {
  Top30validatorsbasedoncurrentbalance,
  Top10validatorbasedontotalvolumeofdelegatetothem,
  Top10validatorbasedonuniqueuserdelegatetothem,
  Top10validatorbasedontotalnumberofdelegatetothem,
  Weeklytop10validatorbasedonnumberofdelegatetothem,
  Weeklytop10validatorbasedonuniqueuserdelegatetothem,
  Weeklytop10validatorbasedonvolumeofdelegatetothem,
  Averageweeklytxcounttxvolumeanduniqueusers,
  Weeklytxcounttxvolumeanduniqueusers,
  DistributionOfStakingRewards,
  Stakingrewards,
  Top100Richlist,
  BridgeTransactions,
} from "lib/types/types/staking";
import {
  getSimpleArrayData,
  getSimpleOutSourceData,
  pivotData,
  summerizeRow,
  summerizeRow2Item,
} from "./utils";

export const getTop30ValidatorBasedOnCurrentBalance = () =>
  getSimpleArrayData<
    Top30validatorsbasedoncurrentbalance,
    Top30validatorsbasedoncurrentbalance
  >(
    "07a4656d-7f81-4126-b6f6-c31cbde7b505",
    "Top 30 validators based on current balance",
    "Current delegate amount"
  );

export const getTop10validatorbasedontotalvolumeofdelegatetothem = () =>
  getSimpleArrayData<
    Top10validatorbasedontotalvolumeofdelegatetothem,
    Top10validatorbasedontotalvolumeofdelegatetothem
  >(
    "ac0805f3-0919-475d-bcd2-f8334c070ce0",
    "Top 10 validator based on total volume of delegate to them",
    "Volume"
  );

export const getTop10validatorbasedonuniqueuserdelegatetothem = () =>
  getSimpleArrayData<
    Top10validatorbasedonuniqueuserdelegatetothem,
    Top10validatorbasedonuniqueuserdelegatetothem
  >(
    "4f6568d6-a6e6-4e89-a871-0a3e58d0cfb5",
    "Top 10 validator based on total unique user delegate to them",
    "Volume"
  );

export const getTop10validatorbasedontotalnumberofdelegatetothem = () =>
  getSimpleArrayData<
    Top10validatorbasedontotalnumberofdelegatetothem,
    Top10validatorbasedontotalnumberofdelegatetothem
  >(
    "6ef77d4c-252b-4026-80eb-8313ee91ec0e",
    "Top 10 validator based on total number of delegate to them",
    "Volume"
  );

const _getWeeklytop10validatorbasedonnumberofdelegatetothem = () =>
  getSimpleArrayData<
    Weeklytop10validatorbasedonnumberofdelegatetothem,
    Weeklytop10validatorbasedonnumberofdelegatetothem
  >(
    "7b354100-5f9c-4559-90e8-b3b7436a7e37",
    "Weekly top 10 validator based on number of delegate to them",
    "Day"
  );

export const _getWeeklytop10validatorbasedonuniqueuserdelegatetothem = () =>
  getSimpleArrayData<
    Weeklytop10validatorbasedonuniqueuserdelegatetothem,
    Weeklytop10validatorbasedonuniqueuserdelegatetothem
  >(
    "9103e919-5e84-4dec-bad8-3da6195eaa16",
    "Weekly top 10 validator based on unique users delegate to them",
    "Day"
  );

export const _getWeeklytop10validatorbasedonvolumeofdelegatetothem = () =>
  getSimpleArrayData<
    Weeklytop10validatorbasedonvolumeofdelegatetothem,
    Weeklytop10validatorbasedonvolumeofdelegatetothem
  >(
    "eb48a6b4-557f-4685-ab89-362a2ff33422",
    "Weekly top 10 validator based on volume of delegate to them",
    "Day"
  );

export const getAverageweeklytxcounttxvolumeanduniqueusers = () =>
  getSimpleArrayData<
    Averageweeklytxcounttxvolumeanduniqueusers,
    Averageweeklytxcounttxvolumeanduniqueusers
  >(
    "a24aa648-28b5-47c8-b6d0-a4a8cbe7391b",
    "Average transactions volume of each staking action,Average weekly number of transactions of each staking action,Average weekly number of unique users of each action,Average weekly total volume of transactions of each staking action",
    "Actions"
  );

export const _getWeeklytxcounttxvolumeanduniqueusers = () =>
  getSimpleArrayData<
    Weeklytxcounttxvolumeanduniqueusers,
    Weeklytxcounttxvolumeanduniqueusers
  >(
    "e61958f7-d387-48af-8b41-9d4d20a99c2d",
    "Cumulative volume of staking transactions,Weekly total volume of staking transactions,Weekly number of unique users,Cumulative number of staking transactions,Weekly number of staking transactions",
    "Actions"
  );

export const getStakingrewards = () =>
  getSimpleArrayData<Stakingrewards, Stakingrewards>(
    "fc27af03-03d6-4cc3-82fc-5580169bb9ce",
    "Weekly staking rewards",
    "Day"
  );

export const getDistributionOfStakingRewards = () =>
  getSimpleArrayData<
    DistributionOfStakingRewards,
    DistributionOfStakingRewards
  >(
    "ac813125-c5f2-4dac-83c6-f3f704eef44d",
    "Distribution of staking rewards",
    "Count"
  );

export const getTop100Richlist = () =>
  getSimpleArrayData<Top100Richlist, Top100Richlist>(
    "d5e35fae-75a5-4008-8a7b-3c076ce0eaff",
    "Top 100 LUNA holders",
    "Balance"
  );

export const getTotalInfo = async () => {
  const communityPool =
    (
      await getSimpleOutSourceData<{
        pool: [{ denum: string; amount: number }];
      }>(
        "https://phoenix-lcd.terra.dev/cosmos/distribution/v1beta1/community_pool"
      )
    ).pool[0].amount / 1e6;

  const supplyTotalArr: any[] = (
    await getSimpleOutSourceData<any>(
      "https://phoenix-lcd.terra.dev/cosmos/bank/v1beta1/supply?pagination.reverse=true"
    )
  ).supply;

  const supplyTotal = supplyTotalArr.at(-1).amount / 1e6;

  const supplyPool = (
    await getSimpleOutSourceData<{
      pool: { not_bonded_tokens: number; bonded_tokens: number };
    }>("https://phoenix-lcd.terra.dev/cosmos/staking/v1beta1/pool")
  ).pool;

  const stakingReturnArr: any[] = await getSimpleOutSourceData<any>(
    "https://phoenix-api.terra.dev/chart/staking-return/annualized"
  );

  const stakingReturn = stakingReturnArr.at(-1).value * 100;
  const stakingReturnChange =
    (stakingReturnArr.at(-1).value - stakingReturnArr.at(-30).value) * 100;

  const stakingRatio: number = (supplyPool.bonded_tokens * 100) / supplyTotal;
  const data = {
    supplyTotal,
    bonded: supplyPool.bonded_tokens / 1e6,
    stakingRatio,
    communityPool,
    stakingReturn,
    stakingReturnChange,
  };

  return {
    data,
    title: "",
    key: "https://station.terra.money/",
  };
};

export const _getBridgeTransactions = () =>
  getSimpleArrayData<BridgeTransactions, BridgeTransactions>(
    "a7fb6d3b-d85b-4903-b8af-6cb7111c5839",
    "Top destination for Terra bridgers in terms of volume of transactions,Top destination for Terra bridgers in terms of number of transactions,Weekly volume of bridge transactions,Weekly number of bridge transactions,Weekly number of outflow transactions to each chain,Weekly volume of outflow transactions to each chain",
    "Day"
  );

export const getWeeklytop10validatorbasedonnumberofdelegatetothem: () => Promise<any> =
  async () => {
    const rawData =
      await _getWeeklytop10validatorbasedonnumberofdelegatetothem();
    const actionType = Array.from(
      new Set(
        rawData.data.map((item) => {
          return item["Validator name"];
        })
      )
    );
    const countInfo = pivotData(
      rawData.data,
      "Day",
      "Validator name",
      "tx count",
      actionType,
      0
    );

    return {
      data: {
        info: countInfo,
        actions: actionType,
      },
      key: rawData.key,
      title: rawData.title,
    } as ReturnDataType<any>;
    return;
  };

export const getWeeklytop10validatorbasedonuniqueuserdelegatetothem: () => Promise<any> =
  async () => {
    const rawData =
      await _getWeeklytop10validatorbasedonuniqueuserdelegatetothem();
    const actionType = Array.from(
      new Set(
        rawData.data.map((item) => {
          return item["Validator name"];
        })
      )
    );
    const countInfo = pivotData(
      rawData.data,
      "Day",
      "Validator name",
      "Unique wallet",
      actionType,
      0
    );

    return {
      data: {
        info: countInfo,
        actions: actionType,
      },
      key: rawData.key,
      title: rawData.title,
    } as ReturnDataType<any>;
    return;
  };

export const getWeeklytop10validatorbasedonvolumeofdelegatetothem: () => Promise<any> =
  async () => {
    const rawData =
      await _getWeeklytop10validatorbasedonvolumeofdelegatetothem();
    const actionType = Array.from(
      new Set(
        rawData.data.map((item) => {
          return item["Validator name"];
        })
      )
    );
    const countInfo = pivotData(
      rawData.data,
      "Day",
      "Validator name",
      "Volume",
      actionType,
      0
    );

    return {
      data: {
        info: countInfo,
        actions: actionType,
      },
      key: rawData.key,
      title: rawData.title,
    } as ReturnDataType<any>;
    return;
  };

export const getWeeklytxcounttxvolumeanduniqueusers: () => Promise<any> =
  async () => {
    const rawData = await _getWeeklytxcounttxvolumeanduniqueusers();
    const actionType = Array.from(
      new Set(
        rawData.data.map((item) => {
          return item["Actions"];
        })
      )
    );
    const cumVolume = pivotData(
      rawData.data,
      "Day",
      "Actions",
      "Cum volume",
      actionType,
      0
    );

    const volume = pivotData(
      rawData.data,
      "Day",
      "Actions",
      "Volume",
      actionType,
      0
    );

    const uniqueWallet = pivotData(
      rawData.data,
      "Day",
      "Actions",
      "Unique wallet",
      actionType,
      0
    );

    const cumTXCount = pivotData(
      rawData.data,
      "Day",
      "Actions",
      "Cum tx count",
      actionType,
      0
    );
    const tXCount = pivotData(
      rawData.data,
      "Day",
      "Actions",
      "tx count",
      actionType,
      0
    );

    return {
      data: {
        tXCount: tXCount.sort((a, b) => (a["Name"] > b["Name"] ? 1 : -1)),
        cumTXCount: cumTXCount.sort((a, b) => (a["Name"] > b["Name"] ? 1 : -1)),
        uniqueWallet: uniqueWallet.sort((a, b) =>
          a["Name"] > b["Name"] ? 1 : -1
        ),
        volume: volume.sort((a, b) => (a["Name"] > b["Name"] ? 1 : -1)),
        cumVolume: cumVolume.sort((a, b) => (a["Name"] > b["Name"] ? 1 : -1)),
        actions: actionType,
      },
      key: rawData.key,
      title: rawData.title,
    } as ReturnDataType<any>;
    return;
  };

export const getBridgeTransactions: () => Promise<any> = async () => {
  const rawData = await _getBridgeTransactions();
  const chains = Array.from(
    new Set(
      rawData.data.map((item) => {
        return item["Destination chain"];
      })
    )
  );

  const valueChain = summerizeRow(rawData.data, "Destination chain", "Volume");
  const txChain = summerizeRow(rawData.data, "Destination chain", "tx count");
  const dailyValueChain = summerizeRow(rawData.data, "Day", "Volume");
  const dailyTXAndUnique = summerizeRow2Item(
    rawData.data,
    "Day",
    "tx count",
    "Unique wallet"
  );

  const outflowEachChainVolume = pivotData(
    rawData.data,
    "Day",
    "Destination chain",
    "Volume",
    chains,
    0
  );

  const outflowEachChainTxCount = pivotData(
    rawData.data,
    "Day",
    "Destination chain",
    "tx count",
    chains,
    0
  );

  return {
    data: {
      valueChain,
      txChain,
      dailyValueChain,
      dailyTXAndUnique: dailyTXAndUnique.map((item) => ({ ...item, fake: 0 })),
      outflowEachChainVolume,
      outflowEachChainTxCount,
      chains,
    },
    key: rawData.key,
    title: rawData.title,
  } as ReturnDataType<any>;
  return;
};
