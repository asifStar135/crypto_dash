import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../api";
import Body from "./Body";
import { getLocalData, saveLocalData, shuffleArray } from "../../helpers";
import Search from "./Search";

let staticCategories = [
  {
    name: "Gaming",
    category_id: "gaming",
    icon: "https://www.iconpacks.net/icons/1/free-game-controller-icon-1436-thumb.png",
  },
  {
    category_id: "meme-token",
    name: "Memes",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/MemeCoin_Crypto_Currency_Logo.png",
  },
  {
    category_id: "artificial-intelligence",
    name: "AI",
    icon: "https://cdn-icons-png.freepik.com/512/10873/10873639.png",
  },
  {
    category_id: "virtual-reality",
    name: "VR",
    icon: "https://cdn-icons-png.freepik.com/512/9316/9316103.png",
  },
  {
    category_id: "bitcoin-ecosystem",
    name: "Bitcoin ES",
    icon: "https://cdn-icons-png.freepik.com/512/9307/9307870.png",
  },
  {
    category_id: "elon-musk-inspired-coins",
    name: "Elon Musk",
    icon: "https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-twitter-social-logo-vector-png-image_9183349.png",
  },
  {
    category_id: "entertainment",
    name: "Entertainment",
    icon: "https://static.vecteezy.com/system/resources/previews/036/496/315/original/two-thirty-second-notes-metallic-silver-clipart-flat-design-icon-isolated-on-transparent-background-3d-render-entertainment-and-music-concept-png.png",
  },
  {
    category_id: "ethereum-ecosystem",
    name: "Ethereum ES",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    category_id: "gambling",
    name: "Gambling",
    icon: "https://cdn-icons-png.flaticon.com/512/831/831184.png",
  },
  {
    category_id: "marketing",
    name: "Marketing",
    icon: "https://icones.pro/wp-content/uploads/2021/11/icone-de-marketing-grise.png",
  },
  {
    category_id: "technology-science",
    name: "Tech & Science",
    icon: "https://icons.veryicon.com/png/o/miscellaneous/common-icons-9/88-high-technology.png",
  },
  {
    category_id: "metaverse",
    name: "Metaverse",
    icon: "https://static.vecteezy.com/system/resources/previews/024/512/560/original/group-of-black-and-white-metaverse-icons-set-metaverse-learning-concept-png.png",
  },
  {
    category_id: "nft-index",
    name: "NFT Index",
    icon: "https://cdn-icons-png.freepik.com/512/11710/11710227.png",
  },
  {
    category_id: "play-to-earn",
    name: "Play To Earn",
    icon: "https://cdn-icons-png.freepik.com/512/8769/8769546.png",
  },
  {
    category_id: "software",
    name: "Software",
    icon: "https://cdn-icons-png.flaticon.com/512/4882/4882524.png",
  },
  {
    category_id: "sports",
    name: "Sports",
    icon: "https://cdn-icons-png.flaticon.com/512/10155/10155266.png",
  },
];

const Index = ({ route }) => {
  const { marketData, news } = route.params;
  // console.log("Discover -> ", news[0]);
  const [history, setHistory] = useState([
    "mat",
    "eth",
    "asdfjkl",
    "qwerty",
    "dfd",
    "usd",
  ]);
  const [categories, setCategories] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggetions, setSuggetions] = useState({
    categories: [],
    coins: [],
    news: [],
  });

  useEffect(() => {
    fetchCategories();
    loadHistory();
  }, []);

  useEffect(() => {
    if (searchInput?.length < 3) setSuggetions({ categories: [], coins: [] });
    else getSuggetions(searchInput.toLowerCase());
  }, [searchInput]);

  const fetchCategories = async () => {
    const cats = await api.getCategoryList();
    setCategories(cats);
  };

  const loadHistory = async () => {
    const result = await getLocalData("history");
    if (result?.length) setHistory(history);
  };

  const removeFromHistory = (item) => {
    setHistory((state) => state.filter((it) => it != item));
    saveLocalData("history", history);
  };

  const getSuggetions = async (input) => {
    const cats = categories?.filter((item) =>
      item.name?.toLowerCase()?.includes(input?.trim())
    );

    const nws = news.filter((nw) => nw?.title?.toLowerCase()?.includes(input));

    let coins = marketData?.filter(
      (coin) =>
        coin.id?.toLowerCase()?.includes(input?.trim()) ||
        coin.name?.toLowerCase()?.includes(input?.trim())
    );

    // if (coins?.length < 5) {
    //   const searchResult = await api.SearchCoins(searchInput);
    //   console.log(searchResult);
    //   coins = coins.concat(searchResult);
    // }
    setSuggetions({ categories: cats, coins, news: nws });
  };

  return (
    <ScrollView className="bg-darkBlue">
      {!openSearch ? (
        <Body
          _this={{
            staticCategories,
            // : shuffleArray(staticCategories)
            setOpenSearch,
          }}
        />
      ) : (
        <Search
          _this={{
            openSearch,
            searchInput,
            setSearchInput,
            history,
            setOpenSearch,
            removeFromHistory,
            suggetions,
          }}
        />
      )}
    </ScrollView>
  );
};

export default Index;
