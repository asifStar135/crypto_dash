import axios from "axios";
import Toast from "react-native-toast-message";

const CoinAPIBase = "https://rest.coinapi.io/v1";
const CoinAPIHeader = {
  "X-CoinAPI-Key": "4F97605B-D583-4B63-8F6F-090BA24B7271",
};

const CoinGeckoBase = "https://api.coingecko.com/api/v3";
const CoinGeckoHeader = { "x-cg-api-key": "CG-jnLdao5WsjRL2G8LGN75jEfr" };

const CMCapBase = "https://api.coinmarketcap.com/v1";
const CMCapHeader = {
  "X-CMC_PRO_API_KEY": "aa3a9b33-07df-4453-8dda-9925dc16b7ca",
};

export default {
  GetCoinDetail: async (coin_id) => {
    try {
      let { data } = await axios.get(
        CoinGeckoBase +
          "/coins/" +
          coin_id +
          "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true",
        {
          headers: CoinGeckoHeader,
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
        market_cap_rank: data.market_cap_rank,
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
        },
        sparkline_7d: data.market_data?.sparkline_7d?.price,
      };
    } catch (error) {
      showErrorToast();
    }
  },

  GetMarketData: async (base_currency) => {
    try {
      let { data } = await axios.get(
        CoinGeckoBase + "/coins/markets?vs_currency=" + base_currency,
        {
          // params: { vs_currency: base_currency },
          headers: CoinGeckoHeader,
        }
      );
      return data;
    } catch (error) {
      console.log("Market error", error);
      showErrorToast();
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
          price_usd: ass.price_usd,
          icon_id: ass.id_icon,
        };
      });
      return assets;
    } catch (error) {
      console.log(error);
      showErrorToast();
    }
  },

  TrendingCoins: async () => {
    try {
      let { data } = await axios.get(CoinGeckoBase + "/search/trending", {
        headers: CoinGeckoHeader,
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
          usd_price: coin?.data?.price,
          usd_change_percentage:
            coin?.data?.price_change_percentage_24h?.usd?.toFixed(2),
        };
      });

      return result;
    } catch (error) {
      console.log(error);
      showErrorToast();
    }
  },
};

const showErrorToast = () => {
  Toast.show({
    type: "error",
    text1: "Some error occured",
    position: "top",
  });
};
