import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import Toast from "react-native-toast-message";
import { getLocalData } from "../helpers";

const CoinAPIBase = "https://rest.coinapi.io/v1";
const CoinAPIHeader = {
  "X-CoinAPI-Key": "4F97605B-D583-4B63-8F6F-090BA24B7271",
};

const CoinGeckoBase = "https://api.coingecko.com/api/v3";
const CoinGeckoHeader2 = { "x-cg-api-key": "CG-jnLdao5WsjRL2G8LGN75jEfr" };
const CoinGeckoHeader = { "x-cg-api-key": "CG-DEWffCcAR5sdJiWSQjdoGxLx" };

const getRandomHeader = () => {
  let dig = Math.random() * 2;
  if (dig < 1) return CoinGeckoHeader;
  return CoinGeckoHeader2;
};

const CMCapBase = "https://api.coinmarketcap.com/v1";
const CMCapHeader = {
  "X-CMC_PRO_API_KEY": "aa3a9b33-07df-4453-8dda-9925dc16b7ca",
};

const RapidBase =
  "https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph";
const RapidHeader = {
  "X-RapidAPI-Key": "675122cbdemsh8a02408f782d89fp18cca7jsn74d3c5172f17",
  "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
};

export default {
  getCategoryList: async () => {
    try {
      let { data } = await axios.get(CoinGeckoBase + "/coins/categories/list", {
        headers: getRandomHeader(),
      });

      return data;
    } catch (error) {
      showErrorToast("GetCategoryList", error);
    }
  },

  getWatchListData: async () => {
    try {
      const list = await getLocalData("watchList");

      let { data } = await axios.get(
        CoinGeckoBase + "/coins/markets?vs_currency=usd;ids=" + list.join(","),
        {
          headers: getRandomHeader(),
        }
      );

      const finalData = data.map((item) => {
        return {
          id: item.id,
          icon: item.image,
          name: item.name,
          market_cap_rank: item.market_cap_rank,
          symbol: item.symbol,
          usd_price: numeral(item.current_price).format("0.00a"),
          usd_change_percentage: numeral(
            item.price_change_percentage_24h
          ).format("0.00a"),
        };
      });
      return finalData?.sort(
        (a, b) => b?.usd_change_percentage - a?.usd_change_percentage
      );
    } catch (error) {
      showErrorToast("getWatchListData", error);
    }
  },

  GetNews: async () => {
    try {
      const options = {
        method: "GET",
        url: RapidBase,
        headers: RapidHeader,
      };

      const { data } = await axios.request(options);
      // console.log(data.data);
      return data?.data;
    } catch (error) {
      showErrorToast("GetNews", error);
    }
  },

  GetMarketChartInRange: async (coin_id, from, to, vs_currency) => {
    try {
      let { data } = await axios.get(
        `${CoinGeckoBase}/coins/${coin_id}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}&precision=2`,
        {
          headers: getRandomHeader(),
        }
      );

      return data;
    } catch (error) {
      showErrorToast("GetMarketChartInRange", error);
    }
  },

  GetCoinDetail: async (coin_id) => {
    try {
      let { data } = await axios.get(
        CoinGeckoBase +
          "/coins/" +
          coin_id +
          "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true",
        {
          headers: getRandomHeader(),
        }
      );

      return {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        description: data.description?.en,
        link: {
          homepage: data.links?.homepage[0],
          whitepaper: data.links?.whitepaper,
        },
        image: data.image,
        market_data: {
          current_price: data.market_data?.current_price,
          price_change_24h: data.market_data?.price_change_24h?.toFixed(2),
          price_change_percentage_24h:
            data.market_data?.price_change_percentage_24h?.toFixed(2),
          price_change_percentage_7d:
            data.market_data?.price_change_percentage_7d?.toFixed(2),
          price_change_percentage_14d:
            data.market_data?.price_change_percentage_14d?.toFixed(2),
          price_change_percentage_30d:
            data.market_data?.price_change_percentage_30d?.toFixed(2),
          price_change_percentage_60d:
            data.market_data?.price_change_percentage_60d?.toFixed(2),
          price_change_percentage_1y:
            data.market_data?.price_change_percentage_1y?.toFixed(2),
          market_cap_rank: data.market_data?.market_cap_rank,
          ath: data?.market_data?.ath?.usd?.toFixed(2),
          ath_date: moment(data?.market_data?.ath_date?.usd).format(
            "DD MMM,YY"
          ),
          atl: data?.market_data?.atl?.usd?.toFixed(2),
          atl_date: moment(data?.market_data?.atl_date?.usd).format(
            "DD MMM,YY"
          ),
          market_cap: numeral(data?.market_data?.market_cap?.usd)
            .format("0.0a")
            .toUpperCase(),
          total_volume: numeral(data?.market_data?.total_volume?.usd)
            ?.format("0.0a")
            ?.toUpperCase(),
          total_supply: data?.market_data?.total_supply,
        },
        sparkline_7d: data.market_data?.sparkline_7d?.price,
      };
    } catch (error) {
      showErrorToast("GetCoinDetail", error);
    }
  },

  GetMarketData: async (base_currency, category = "") => {
    try {
      let { data } = await axios.get(
        CoinGeckoBase +
          "/coins/markets?vs_currency=" +
          base_currency +
          ";per_page=250" +
          (category ? ";category=" + category : ""),
        {
          headers: getRandomHeader(),
        }
      );

      const finalData = data.map((item) => {
        return {
          id: item.id,
          icon: item.image,
          name: item.name,
          market_cap_rank: item.market_cap_rank,
          symbol: item.symbol,
          usd_price: numeral(item.current_price).format("0.00a"),
          usd_change_percentage: numeral(
            item.price_change_percentage_24h
          ).format("0.00a"),
        };
      });
      return finalData;
    } catch (error) {
      showErrorToast("GetMarketData", error);
    }
  },

  GetAllAssetList: async () => {
    try {
      let { data } = await axios.get(CoinAPIBase + "/assets", {
        headers: CoinAPIHeader,
      });
      const assets = data.splice(0, 31).map((ass) => {
        return {
          asset_id: ass.asset_id,
          asset_name: ass.name,
          is_crypto: ass.type_is_crypto,
          price_usd: numeral(ass.price_usd).format("0.0a"),
          icon_id: ass.id_icon,
        };
      });
      return assets;
    } catch (error) {
      showErrorToast("GetAllAssetList", error);
    }
  },

  TrendingCoins: async () => {
    try {
      let { data } = await axios.get(CoinGeckoBase + "/search/trending", {
        headers: getRandomHeader(),
      });

      const result = data?.coins?.map((item) => {
        let coin = item.item;
        return {
          id: coin.id,
          coin_id: coin.coin_id,
          name: coin.name,
          icon: coin.small,
          symbol: coin.symbol,
          sparkline: coin?.data?.sparkline,
          market_cap_rank: coin.market_cap_rank,
          usd_price: numeral(coin?.data?.price).format("0.00a"),
          usd_change_percentage: numeral(
            coin?.data?.price_change_percentage_24h?.usd
          ).format("0.0a"),
        };
      });

      return result;
    } catch (error) {
      showErrorToast("TrendingCoins", error);
    }
  },

  SearchCoins: async (searchInput) => {
    try {
      let { data } = await axios.get(
        CoinGeckoBase + "/search?query=" + searchInput,
        {
          headers: getRandomHeader(),
        }
      );

      return data?.coins?.map((item) => {
        return {
          symbol: item?.id,
          name: item?.id,
          icon: item?.large,
          usd_price: "--",
          usd_change_percentage: "--",
        };
      });
    } catch (error) {
      showErrorToast("SearchCoins", error);
    }
  },
};

const showErrorToast = (name, error) => {
  console.log("Error in ->", name, error);
  Toast.show({
    type: "error",
    text1: "Some error occured",
    position: "top",
  });
};
