import api from "../api";

export const getTopGainersLosers = async (marketData) => {
  // console.log("Gainers -> ");
  marketData.sort((a, b) => {
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
  });

  let size = 5;

  const len = marketData?.length;
  let gainers = marketData.slice(0, size),
    losers = marketData.slice(len - size, len);

  // console.log("Gainers -> ", gainers[0]);
  losers.reverse();

  return { gainers, losers };
};
