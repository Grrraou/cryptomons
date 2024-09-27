import MineManager from "@/managers/MineManager";

export type Achievement = {
    index: string;
    title: string;
    description: string;
    reference: string;
    target: number;
    loot?: string | null;
    nft?: string | null;
};
  
export const achievementsEnum: Achievement[] = [
    /** 
     * MINES 
     * */
    /** BTC_MINE */
    {
        index: "clicks_area_btc_mine_10",
        title: "Bitcoin Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Bitcoin mine.",
        reference: 'mines:btc_mine:clicks',
        target: 10,
        loot: 'good_news:btc',
    },
    {
        index: "clicks_area_btc_mine_100",
        title: "Bitcoin Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Bitcoin mining.",
        reference: 'mines:btc_mine:clicks',
        target: 100,
        loot: 'good_news:btc',
    },
    {
        index: "clicks_area_btc_mine_1000",
        title: "Bitcoin Powerhouse",
        description: "Dominate the Bitcoin mine with 1000 clicks, proving your mining prowess.",
        reference: 'mines:btc_mine:clicks',
        target: 1000,
        loot: 'good_news:btc',
    },
    {
        index: "clicks_area_btc_mine_10000",
        title: "Bitcoin Crazy clicker",
        description: "Dominate the Bitcoin mine with 10000 clicks, proving your mining prowess.",
        reference: 'mines:btc_mine:clicks',
        target: 10000,
        loot: 'mining_slot:btc_mine',
    },

    {
        index: "upgrade_area_btc_mine_2",
        title: "Satoshi's noob",
        description: "Reach Bitcoin mine level 2",
        reference: 'mines:btc_mine:level',
        target: 2,
        loot: 'good_news:btc',
    },
    {
        index: "upgrade_area_btc_mine_10",
        title: "Satoshi's Apprentice",
        description: "Reach Bitcoin mine level 10",
        reference: 'mines:btc_mine:level',
        target: 10,
        loot: 'good_news:btc',
      },
      {
        index: "upgrade_area_btc_mine_100",
        title: "Crypto Aficionado",
        description: "Reach Bitcoin mine level 100",
        reference: 'mines:btc_mine:level',
        target: 100,
        loot: 'mining_slot:btc_mine',
      },
      {
        index: "upgrade_area_btc_mine_1000",
        title: "Master of the Blockchain",
        description: "Reach Bitcoin mine level 1000",
        reference: 'mines:btc_mine:level',
        target: 1000,
        loot: 'mining_slot:btc_mine',
      },

      {
        index: "mined_area_btc_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Bitcoin! A promising start in the crypto world.",
        reference: 'mines:btc_mine:totalMined',
        target: 100,
        loot: 'good_news:btc',
      },
      {
        index: "mined_area_btc_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Bitcoin mined, you're establishing yourself as a serious player in the mining game.",
        reference: 'mines:btc_mine:totalMined',
        target: 1000,
        loot: 'good_news:btc',
      },
      {
        index: "mined_area_btc_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Bitcoin mined! The crypto world is at your feet.",
        reference: 'mines:btc_mine:totalMined',
        target: 10000,
        loot: 'good_news:btc',
      },

      /** NMC_MINE */
      {
        index: "clicks_area_nmc_mine_10",
        title: "Namecoin Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Namecoin mine.",
        reference: "mines:nmc_mine:clicks",
        target: 10,
        loot: "good_news:nmc"
    },
    {
        index: "clicks_area_nmc_mine_100",
        title: "Namecoin Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Namecoin mining.",
        reference: "mines:nmc_mine:clicks",
        target: 100,
        loot: "good_news:nmc"
    },
    {
        index: "clicks_area_nmc_mine_1000",
        title: "Namecoin Powerhouse",
        description: "Dominate the Namecoin mine with 1000 clicks, proving your mining prowess.",
        reference: "mines:nmc_mine:clicks",
        target: 1000,
        loot: "good_news:nmc"
    },
    {
        index: "clicks_area_nmc_mine_10000",
        title: "Namecoin Crazy Clicker",
        description: "Dominate the Namecoin mine with 10000 clicks, proving your mining prowess.",
        reference: "mines:nmc_mine:clicks",
        target: 10000,
        loot: "mining_slot:nmc_mine"
    },
    {
        index: "upgrade_area_nmc_mine_2",
        title: "Nakamoto's Noob",
        description: "Reach Namecoin mine level 2.",
        reference: "mines:nmc_mine:level",
        target: 2,
        loot: "good_news:nmc"
    },
    {
        index: "upgrade_area_nmc_mine_10",
        title: "Nakamoto's Apprentice",
        description: "Reach Namecoin mine level 10.",
        reference: "mines:nmc_mine:level",
        target: 10,
        loot: "good_news:nmc"
    },
    {
        index: "upgrade_area_nmc_mine_100",
        title: "Crypto Enthusiast",
        description: "Reach Namecoin mine level 100.",
        reference: "mines:nmc_mine:level",
        target: 100,
        loot: "mining_slot:nmc_mine"
    },
    {
        index: "upgrade_area_nmc_mine_1000",
        title: "Master of the Blockchain",
        description: "Reach Namecoin mine level 1000.",
        reference: "mines:nmc_mine:level",
        target: 1000,
        loot: "mining_slot:nmc_mine"
    },
    {
        index: "mined_area_nmc_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Namecoin! A promising start in the crypto world.",
        reference: "mines:nmc_mine:totalMined",
        target: 100,
        loot: "good_news:nmc"
    },
    {
        index: "mined_area_nmc_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Namecoin mined, you're establishing yourself as a serious player in the mining game.",
        reference: "mines:nmc_mine:totalMined",
        target: 1000,
        loot: "good_news:nmc"
    },
    {
        index: "mined_area_nmc_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Namecoin mined! The crypto world is at your feet.",
        reference: "mines:nmc_mine:totalMined",
        target: 10000,
        loot: "good_news:nmc"
    },

    /** LTC_MINE */
    {
        index: "clicks_area_ltc_mine_10",
        title: "Litecoin Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Litecoin mine.",
        reference: "mines:ltc_mine:clicks",
        target: 10,
        loot: "good_news:ltc"
    },
    {
        index: "clicks_area_ltc_mine_100",
        title: "Litecoin Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Litecoin mining.",
        reference: "mines:ltc_mine:clicks",
        target: 100,
        loot: "good_news:ltc"
    },
    {
        index: "clicks_area_ltc_mine_1000",
        title: "Litecoin Powerhouse",
        description: "Dominate the Litecoin mine with 1000 clicks, proving your mining prowess.",
        reference: "mines:ltc_mine:clicks",
        target: 1000,
        loot: "good_news:ltc"
    },
    {
        index: "clicks_area_ltc_mine_10000",
        title: "Litecoin Crazy Clicker",
        description: "Dominate the Litecoin mine with 10000 clicks, proving your mining prowess.",
        reference: "mines:ltc_mine:clicks",
        target: 10000,
        loot: "mining_slot:ltc_mine"
    },
    {
        index: "upgrade_area_ltc_mine_2",
        title: "Lite Beginner",
        description: "Reach Litecoin mine level 2.",
        reference: "mines:ltc_mine:level",
        target: 2,
        loot: "good_news:ltc"
    },
    {
        index: "upgrade_area_ltc_mine_10",
        title: "Lite Apprentice",
        description: "Reach Litecoin mine level 10.",
        reference: "mines:ltc_mine:level",
        target: 10,
        loot: "good_news:ltc"
    },
    {
        index: "upgrade_area_ltc_mine_100",
        title: "Crypto Fanatic",
        description: "Reach Litecoin mine level 100.",
        reference: "mines:ltc_mine:level",
        target: 100,
        loot: "mining_slot:ltc_mine"
    },
    {
        index: "upgrade_area_ltc_mine_1000",
        title: "Master of the Altcoins",
        description: "Reach Litecoin mine level 1000.",
        reference: "mines:ltc_mine:level",
        target: 1000,
        loot: "mining_slot:ltc_mine"
    },
    {
        index: "mined_area_ltc_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Litecoin! A promising start in the crypto world.",
        reference: "mines:ltc_mine:totalMined",
        target: 100,
        loot: "good_news:ltc"
    },
    {
        index: "mined_area_ltc_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Litecoin mined, you're establishing yourself as a serious player in the mining game.",
        reference: "mines:ltc_mine:totalMined",
        target: 1000,
        loot: "good_news:ltc"
    },
    {
        index: "mined_area_ltc_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Litecoin mined! The crypto world is at your feet.",
        reference: "mines:ltc_mine:totalMined",
        target: 10000,
        loot: "good_news:ltc"
    },

    /** DOGE_MINE */
    {
        index: "clicks_area_doge_mine_10",
        title: "Dogecoin Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Dogecoin mine.",
        reference: "mines:doge_mine:clicks",
        target: 10,
        loot: "good_news:doge"
    },
    {
        index: "clicks_area_doge_mine_100",
        title: "Dogecoin Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Dogecoin mining.",
        reference: "mines:doge_mine:clicks",
        target: 100,
        loot: "good_news:doge"
    },
    {
        index: "clicks_area_doge_mine_1000",
        title: "Dogecoin Powerhouse",
        description: "Dominate the Dogecoin mine with 1000 clicks, proving your mining prowess.",
        reference: "mines:doge_mine:clicks",
        target: 1000,
        loot: "good_news:doge"
    },
    {
        index: "clicks_area_doge_mine_10000",
        title: "Dogecoin Crazy Clicker",
        description: "Dominate the Dogecoin mine with 10000 clicks, proving your mining prowess.",
        reference: "mines:doge_mine:clicks",
        target: 10000,
        loot: "mining_slot:doge_mine"
    },
    {
        index: "upgrade_area_doge_mine_2",
        title: "Such Beginner",
        description: "Reach Dogecoin mine level 2.",
        reference: "mines:doge_mine:level",
        target: 2,
        loot: "good_news:doge"
    },
    {
        index: "upgrade_area_doge_mine_10",
        title: "Much Apprentice",
        description: "Reach Dogecoin mine level 10.",
        reference: "mines:doge_mine:level",
        target: 10,
        loot: "good_news:doge"
    },
    {
        index: "upgrade_area_doge_mine_100",
        title: "Very Crypto",
        description: "Reach Dogecoin mine level 100.",
        reference: "mines:doge_mine:level",
        target: 100,
        loot: "mining_slot:doge_mine"
    },
    {
        index: "upgrade_area_doge_mine_1000",
        title: "Wow Master",
        description: "Reach Dogecoin mine level 1000.",
        reference: "mines:doge_mine:level",
        target: 1000,
        loot: "mining_slot:doge_mine"
    },
    {
        index: "mined_area_doge_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Dogecoin! A promising start in the crypto world.",
        reference: "mines:doge_mine:totalMined",
        target: 100,
        loot: "good_news:doge"
    },
    {
        index: "mined_area_doge_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Dogecoin mined, you're establishing yourself as a serious player in the mining game.",
        reference: "mines:doge_mine:totalMined",
        target: 1000,
        loot: "good_news:doge"
    },
    {
        index: "mined_area_doge_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Dogecoin mined! The crypto world is at your feet.",
        reference: "mines:doge_mine:totalMined",
        target: 10000,
        loot: "good_news:doge"
    },

    /** DASH_MINE */
    {
        index: "clicks_area_dash_mine_10",
        title: "Dash Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Dash mine.",
        reference: "mines:dash_mine:clicks",
        target: 10,
        loot: "good_news:dash"
    },
    {
        index: "clicks_area_dash_mine_100",
        title: "Dash Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Dash mining.",
        reference: "mines:dash_mine:clicks",
        target: 100,
        loot: "good_news:dash"
    },
    {
        index: "clicks_area_dash_mine_1000",
        title: "Dash Powerhouse",
        description: "Dominate the Dash mine with 1000 clicks, proving your mining prowess.",
        reference: "mines:dash_mine:clicks",
        target: 1000,
        loot: "good_news:dash"
    },
    {
        index: "clicks_area_dash_mine_10000",
        title: "Dash Crazy Clicker",
        description: "Dominate the Dash mine with 10000 clicks, proving your mining prowess.",
        reference: "mines:dash_mine:clicks",
        target: 10000,
        loot: "mining_slot:dash_mine"
    },
    {
        index: "upgrade_area_dash_mine_2",
        title: "Dark Beginner",
        description: "Reach Dash mine level 2.",
        reference: "mines:dash_mine:level",
        target: 2,
        loot: "good_news:dash"
    },
    {
        index: "upgrade_area_dash_mine_10",
        title: "Dark Apprentice",
        description: "Reach Dash mine level 10.",
        reference: "mines:dash_mine:level",
        target: 10,
        loot: "good_news:dash"
    },
    {
        index: "upgrade_area_dash_mine_100",
        title: "Darkcoin Enthusiast",
        description: "Reach Dash mine level 100.",
        reference: "mines:dash_mine:level",
        target: 100,
        loot: "mining_slot:dash_mine"
    },
    {
        index: "upgrade_area_dash_mine_1000",
        title: "Master of Dash",
        description: "Reach Dash mine level 1000.",
        reference: "mines:dash_mine:level",
        target: 1000,
        loot: "mining_slot:dash_mine"
    },
    {
        index: "mined_area_dash_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Dash! A promising start in the crypto world.",
        reference: "mines:dash_mine:totalMined",
        target: 100,
        loot: "good_news:dash"
    },
    {
        index: "mined_area_dash_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Dash mined, you're establishing yourself as a serious player in the mining game.",
        reference: "mines:dash_mine:totalMined",
        target: 1000,
        loot: "good_news:dash"
    },
    {
        index: "mined_area_dash_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Dash mined! The crypto world is at your feet.",
        reference: "mines:dash_mine:totalMined",
        target: 10000,
        loot: "good_news:dash"
    },

    /** XMR_MINE */
    {
        index: "clicks_area_xmr_mine_10",
        title: "Monero Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Monero mine.",
        reference: "mines:xmr_mine:clicks",
        target: 10,
        loot: "good_news:xmr"
    },
    {
        index: "clicks_area_xmr_mine_100",
        title: "Monero Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Monero mining.",
        reference: "mines:xmr_mine:clicks",
        target: 100,
        loot: "good_news:xmr"
    },
    {
        index: "clicks_area_xmr_mine_1000",
        title: "Monero Powerhouse",
        description: "Dominate the Monero mine with 1000 clicks, proving your mining prowess.",
        reference: "mines:xmr_mine:clicks",
        target: 1000,
        loot: "good_news:xmr"
    },
    {
        index: "clicks_area_xmr_mine_10000",
        title: "Monero Crazy Clicker",
        description: "Dominate the Monero mine with 10000 clicks, proving your mining prowess.",
        reference: "mines:xmr_mine:clicks",
        target: 10000,
        loot: "mining_slot:xmr_mine"
    },
    {
        index: "upgrade_area_xmr_mine_2",
        title: "Private Beginner",
        description: "Reach Monero mine level 2.",
        reference: "mines:xmr_mine:level",
        target: 2,
        loot: "good_news:xmr"
    },
    {
        index: "upgrade_area_xmr_mine_10",
        title: "Private Apprentice",
        description: "Reach Monero mine level 10.",
        reference: "mines:xmr_mine:level",
        target: 10,
        loot: "good_news:xmr"
    },
    {
        index: "upgrade_area_xmr_mine_100",
        title: "Privacy Enthusiast",
        description: "Reach Monero mine level 100.",
        reference: "mines:xmr_mine:level",
        target: 100,
        loot: "mining_slot:xmr_mine"
    },
    {
        index: "upgrade_area_xmr_mine_1000",
        title: "Master of Privacy",
        description: "Reach Monero mine level 1000.",
        reference: "mines:xmr_mine:level",
        target: 1000,
        loot: "mining_slot:xmr_mine"
    },
    {
        index: "mined_area_xmr_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Monero! A promising start in the crypto world.",
        reference: "mines:xmr_mine:totalMined",
        target: 100,
        loot: "good_news:xmr"
    },
    {
        index: "mined_area_xmr_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Monero mined, you're establishing yourself as a serious player in the mining game.",
        reference: "mines:xmr_mine:totalMined",
        target: 1000,
        loot: "good_news:xmr"
    },
    {
        index: "mined_area_xmr_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Monero mined! The crypto world is at your feet.",
        reference: "mines:xmr_mine:totalMined",
        target: 10000,
        loot: "good_news:xmr"
    },

    /** ZEC_MINE */
    {
        index: "clicks_area_zec_mine_10",
        title: "Zcash Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Zcash mine.",
        reference: "mines:zec_mine:clicks",
        target: 10,
        loot: "good_news:zec"
    },
    {
        index: "clicks_area_zec_mine_100",
        title: "Zcash Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Zcash mining.",
        reference: "mines:zec_mine:clicks",
        target: 100,
        loot: "good_news:zec"
    },
    {
        index: "clicks_area_zec_mine_1000",
        title: "Zcash Powerhouse",
        description: "Dominate the Zcash mine with 1000 clicks, proving your mining prowess.",
        reference: "mines:zec_mine:clicks",
        target: 1000,
        loot: "good_news:zec"
    },
    {
        index: "clicks_area_zec_mine_10000",
        title: "Zcash Crazy Clicker",
        description: "Dominate the Zcash mine with 10000 clicks, proving your mining prowess.",
        reference: "mines:zec_mine:clicks",
        target: 10000,
        loot: "mining_slot:zec_mine"
    },
    {
        index: "upgrade_area_zec_mine_2",
        title: "Shielded Beginner",
        description: "Reach Zcash mine level 2.",
        reference: "mines:zec_mine:level",
        target: 2,
        loot: "good_news:zec"
    },
    {
        index: "upgrade_area_zec_mine_10",
        title: "Shielded Apprentice",
        description: "Reach Zcash mine level 10.",
        reference: "mines:zec_mine:level",
        target: 10,
        loot: "good_news:zec"
    },
    {
        index: "upgrade_area_zec_mine_100",
        title: "Shielded Expert",
        description: "Reach Zcash mine level 100.",
        reference: "mines:zec_mine:level",
        target: 100,
        loot: "mining_slot:zec_mine"
    },
    {
        index: "upgrade_area_zec_mine_1000",
        title: "Master of Anonymity",
        description: "Reach Zcash mine level 1000.",
        reference: "mines:zec_mine:level",
        target: 1000,
        loot: "mining_slot:zec_mine"
    },
    {
        index: "mined_area_zec_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Zcash! A promising start in the crypto world.",
        reference: "mines:zec_mine:totalMined",
        target: 100,
        loot: "good_news:zec"
    },
    {
        index: "mined_area_zec_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Zcash mined, you're establishing yourself as a serious player in the mining game.",
        reference: "mines:zec_mine:totalMined",
        target: 1000,
        loot: "good_news:zec"
    },
    {
        index: "mined_area_zec_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Zcash mined! The crypto world is at your feet.",
        reference: "mines:zec_mine:totalMined",
        target: 10000,
        loot: "good_news:zec"
    },

    /** BCH_MINE */
    {
        index: "clicks_area_bch_mine_10",
        title: "Bitcoin Cash Tinkerer",
        description: "Start your journey with a modest 10 clicks in the Bitcoin Cash mine.",
        reference: "mines:bch_mine:clicks",
        target: 10,
        loot: "good_news:bch"
    },
    {
        index: "clicks_area_bch_mine_100",
        title: "Bitcoin Cash Enthusiast",
        description: "Reach a milestone of 100 clicks and show your dedication to Bitcoin Cash mining.",
        reference: "mines:bch_mine:clicks",
        target: 100,
        loot: "good_news:bch"
    },
    {
        index: "clicks_area_bch_mine_1000",
        title: "Bitcoin Cash Powerhouse",
        description: "Dominate the Bitcoin Cash mine with 1000 clicks, proving your mining prowess.",
        reference: "mines:bch_mine:clicks",
        target: 1000,
        loot: "good_news:bch"
    },
    {
        index: "clicks_area_bch_mine_10000",
        title: "Bitcoin Cash Crazy Clicker",
        description: "Dominate the Bitcoin Cash mine with 10000 clicks, proving your mining prowess.",
        reference: "mines:bch_mine:clicks",
        target: 10000,
        loot: "mining_slot:bch_mine"
    },
    {
        index: "upgrade_area_bch_mine_2",
        title: "Fork Beginner",
        description: "Reach Bitcoin Cash mine level 2.",
        reference: "mines:bch_mine:level",
        target: 2,
        loot: "good_news:bch"
    },
    {
        index: "upgrade_area_bch_mine_10",
        title: "Fork Apprentice",
        description: "Reach Bitcoin Cash mine level 10.",
        reference: "mines:bch_mine:level",
        target: 10,
        loot: "good_news:bch"
    },
    {
        index: "upgrade_area_bch_mine_100",
        title: "Fork Expert",
        description: "Reach Bitcoin Cash mine level 100.",
        reference: "mines:bch_mine:level",
        target: 100,
        loot: "mining_slot:bch_mine"
    },
    {
        index: "upgrade_area_bch_mine_1000",
        title: "Master of Bitcoin Cash",
        description: "Reach Bitcoin Cash mine level 1000.",
        reference: "mines:bch_mine:level",
        target: 1000,
        loot: "mining_slot:bch_mine"
    },
    {
        index: "mined_area_bch_mine_100",
        title: "Coin Collector",
        description: "You've mined your first 100 Bitcoin Cash! A promising start in the crypto world.",
        reference: "mines:bch_mine:totalMined",
        target: 100,
        loot: "good_news:bch"
    },
    {
        index: "mined_area_bch_mine_1000",
        title: "Blockchain Veteran",
        description: "With 1,000 Bitcoin Cash mined, you're establishing yourself as a serious player in the mining game.",
        reference: "mines:bch_mine:totalMined",
        target: 1000,
        loot: "good_news:bch"
    },
    {
        index: "mined_area_bch_mine_10000",
        title: "Mining Mogul",
        description: "You've reached a milestone few can claim: 10,000 Bitcoin Cash mined! The crypto world is at your feet.",
        reference: "mines:bch_mine:totalMined",
        target: 10000,
        loot: "good_news:bch"
    },
    
    




      
    /** 
     * BATTLEFIELDS 
     * */
    /** BINANCE */
    {
        index: "click_area_binance_barricade_10",
        title: "Binance explorer",
        description: "Attack manually 10 times one of Binance Barricade monsters.",
        reference: 'battlefields:binance_barricade:clicks',
        target: 10,
        loot: 'inventory_slot',
    },
    {
        index: "click_area_binance_barricade_100",
        title: "Binance explorer",
        description: "Attack manually 100 times one of Binance Barricade monsters.",
        reference: 'battlefields:binance_barricade:clicks',
        target: 100,
        loot: 'inventory_slot',
    },
    {
        index: "click_area_binance_barricade_1000",
        title: "Binance explorer",
        description: "Attack manually 1000 times one of Binance Barricade monsters.",
        reference: 'battlefields:binance_barricade:clicks',
        target: 1000,
        loot: 'inventory_slot',
    },
    {
        index: "click_area_binance_barricade_10000",
        title: "Binance explorer",
        description: "Attack manually 10000 times one of Binance Barricade monsters.",
        reference: 'battlefields:binance_barricade:clicks',
        target: 10000,
        loot: 'battlefield_slot:binance_barricade',
    },

    
    {
        index: "killed_area_binance_barricade_10",
        title: "Binance thug",
        description: "Kill 10 monsters in Binance Barricade.",
        reference: 'battlefields:binance_barricade:killed',
        target: 10,
        loot: 'inventory_slot',
    },
    {
        index: "killed_area_binance_barricade_100",
        title: "Binance thug",
        description: "Kill 100 monsters in Binance Barricade.",
        reference: 'battlefields:binance_barricade:killed',
        target: 100,
        loot: 'inventory_slot',
    },
    {
        index: "killed_area_binance_barricade_1000",
        title: "Binance thug",
        description: "Kill 1000 monsters in Binance Barricade.",
        reference: 'battlefields:binance_barricade:killed',
        target: 1000,
        loot: 'battlefield_slot:binance_barricade',
    },
    {
        index: "killed_area_binance_barricade_10000",
        title: "Binance thug",
        description: "Kill 10000 monsters in Binance Barricade.",
        reference: 'battlefields:binance_barricade:killed',
        target: 10000,
        loot: 'battlefield_slot:binance_barricade',
    },

    /** KRAKEN */
    {
        index: "click_area_kraken_abyss_10",
        title: "Kraken Explorer",
        description: "Attack manually 10 times one of Kraken Abyss monsters.",
        reference: "battlefields:kraken_abyss:clicks",
        target: 10,
        loot: "inventory_slot"
    },
    {
        index: "click_area_kraken_abyss_100",
        title: "Kraken Explorer",
        description: "Attack manually 100 times one of Kraken Abyss monsters.",
        reference: "battlefields:kraken_abyss:clicks",
        target: 100,
        loot: "inventory_slot"
    },
    {
        index: "click_area_kraken_abyss_1000",
        title: "Kraken Explorer",
        description: "Attack manually 1000 times one of Kraken Abyss monsters.",
        reference: "battlefields:kraken_abyss:clicks",
        target: 1000,
        loot: "inventory_slot"
    },
    {
        index: "click_area_kraken_abyss_10000",
        title: "Kraken Explorer",
        description: "Attack manually 10000 times one of Kraken Abyss monsters.",
        reference: "battlefields:kraken_abyss:clicks",
        target: 10000,
        loot: "battlefield_slot:kraken_abyss"
    },
    {
        index: "killed_area_kraken_abyss_10",
        title: "Kraken Thug",
        description: "Kill 10 monsters in Kraken Abyss.",
        reference: "battlefields:kraken_abyss:killed",
        target: 10,
        loot: "inventory_slot"
    },
    {
        index: "killed_area_kraken_abyss_100",
        title: "Kraken Thug",
        description: "Kill 100 monsters in Kraken Abyss.",
        reference: "battlefields:kraken_abyss:killed",
        target: 100,
        loot: "inventory_slot"
    },
    {
        index: "killed_area_kraken_abyss_1000",
        title: "Kraken Thug",
        description: "Kill 1000 monsters in Kraken Abyss.",
        reference: "battlefields:kraken_abyss:killed",
        target: 1000,
        loot: "battlefield_slot:kraken_abyss"
    },
    {
        index: "killed_area_kraken_abyss_10000",
        title: "Kraken Thug",
        description: "Kill 10000 monsters in Kraken Abyss.",
        reference: "battlefields:kraken_abyss:killed",
        target: 10000,
        loot: "battlefield_slot:kraken_abyss"
    },

    /** UNISWAP */
    {
        index: "click_area_uniswap_underground_10",
        title: "Uniswap Explorer",
        description: "Attack manually 10 times one of Uniswap Underground monsters.",
        reference: "battlefields:uniswap_underground:clicks",
        target: 10,
        loot: "inventory_slot"
    },
    {
        index: "click_area_uniswap_underground_100",
        title: "Uniswap Explorer",
        description: "Attack manually 100 times one of Uniswap Underground monsters.",
        reference: "battlefields:uniswap_underground:clicks",
        target: 100,
        loot: "inventory_slot"
    },
    {
        index: "click_area_uniswap_underground_1000",
        title: "Uniswap Explorer",
        description: "Attack manually 1000 times one of Uniswap Underground monsters.",
        reference: "battlefields:uniswap_underground:clicks",
        target: 1000,
        loot: "inventory_slot"
    },
    {
        index: "click_area_uniswap_underground_10000",
        title: "Uniswap Explorer",
        description: "Attack manually 10000 times one of Uniswap Underground monsters.",
        reference: "battlefields:uniswap_underground:clicks",
        target: 10000,
        loot: "battlefield_slot:uniswap_underground"
    },

    {
        index: "killed_area_uniswap_underground_10",
        title: "Uniswap Thug",
        description: "Kill 10 monsters in Uniswap Underground.",
        reference: "battlefields:uniswap_underground:killed",
        target: 10,
        loot: "inventory_slot"
    },
    {
        index: "killed_area_uniswap_underground_100",
        title: "Uniswap Thug",
        description: "Kill 100 monsters in Uniswap Underground.",
        reference: "battlefields:uniswap_underground:killed",
        target: 100,
        loot: "inventory_slot"
    },
    {
        index: "killed_area_uniswap_underground_1000",
        title: "Uniswap Thug",
        description: "Kill 1000 monsters in Uniswap Underground.",
        reference: "battlefields:uniswap_underground:killed",
        target: 1000,
        loot: "battlefield_slot:uniswap_underground"
    },
    {
        index: "killed_area_uniswap_underground_10000",
        title: "Uniswap Thug",
        description: "Kill 10000 monsters in Uniswap Underground.",
        reference: "battlefields:uniswap_underground:killed",
        target: 10000,
        loot: "battlefield_slot:uniswap_underground"
    },
    

    /** PANCAKE */
    {
        index: "click_area_pancakeswap_plains_10",
        title: "PancakeSwap Explorer",
        description: "Attack manually 10 times one of PancakeSwap Plains monsters.",
        reference: "battlefields:pancakeswap_plains:clicks",
        target: 10,
        loot: "inventory_slot"
    },
    {
        index: "click_area_pancakeswap_plains_100",
        title: "PancakeSwap Explorer",
        description: "Attack manually 100 times one of PancakeSwap Plains monsters.",
        reference: "battlefields:pancakeswap_plains:clicks",
        target: 100,
        loot: "inventory_slot"
    },
    {
        index: "click_area_pancakeswap_plains_1000",
        title: "PancakeSwap Explorer",
        description: "Attack manually 1000 times one of PancakeSwap Plains monsters.",
        reference: "battlefields:pancakeswap_plains:clicks",
        target: 1000,
        loot: "inventory_slot"
    },
    {
        index: "click_area_pancakeswap_plains_10000",
        title: "PancakeSwap Explorer",
        description: "Attack manually 10000 times one of PancakeSwap Plains monsters.",
        reference: "battlefields:pancakeswap_plains:clicks",
        target: 10000,
        loot: "battlefield_slot:pancakeswap_plains"
    },

    {
        index: "killed_area_pancakeswap_plains_10",
        title: "PancakeSwap Thug",
        description: "Kill 10 monsters in PancakeSwap Plains.",
        reference: "battlefields:pancakeswap_plains:killed",
        target: 10,
        loot: "inventory_slot"
    },
    {
        index: "killed_area_pancakeswap_plains_100",
        title: "PancakeSwap Thug",
        description: "Kill 100 monsters in PancakeSwap Plains.",
        reference: "battlefields:pancakeswap_plains:killed",
        target: 100,
        loot: "inventory_slot"
    },
    {
        index: "killed_area_pancakeswap_plains_1000",
        title: "PancakeSwap Thug",
        description: "Kill 1000 monsters in PancakeSwap Plains.",
        reference: "battlefields:pancakeswap_plains:killed",
        target: 1000,
        loot: "battlefield_slot:pancakeswap_plains"
    },
    {
        index: "killed_area_pancakeswap_plains_10000",
        title: "PancakeSwap Thug",
        description: "Kill 10000 monsters in PancakeSwap Plains.",
        reference: "battlefields:pancakeswap_plains:killed",
        target: 10000,
        loot: "battlefield_slot:pancakeswap_plains"
    },



    /**
     * SWAP
     */
    {
        index: "swap_volume_1",
        title: "Swaprentice",
        description: "Swap a volume of 1 cryptodollar.",
        reference: "swap::volume",
        target: 1,
        nft: "cold_cats:emotionless_feline"
    },
    {
        index: "swap_volume_5000",
        title: "Swap Conqueror",
        description: "Swap a volume of 5,000 cryptodollars.",
        reference: "swap::volume",
        target: 5000,
        nft: "cold_cats:cash_grab_kitty"
    },
    {
        index: "swap_volume_10000",
        title: "Swap Titan",
        description: "Swap a volume of 10,000 cryptodollars.",
        reference: "swap::volume",
        target: 10000,
        nft: "cold_cats:stay_positive_purr"
    },
    {
        index: "swap_volume_50000",
        title: "Swap King",
        description: "Swap a volume of 50,000 cryptodollars.",
        reference: "swap::volume",
        target: 50000,
        nft: "cold_cats:blue_eyed_blank"
    },
    {
        index: "swap_volume_100000",
        title: "Swap Emperor",
        description: "Swap a volume of 100,000 cryptodollars.",
        reference: "swap::volume",
        target: 100000,
        nft: "cold_cats:icy_enthusiast"
    },
    {
        index: "swap_volume_1000000",
        title: "Swap Overlord",
        description: "Swap a volume of 1,000,000 cryptodollars.",
        reference: "swap::volume",
        target: 1000000,
        nft: "cold_cats:meow_for_eth"
    },


    
    
    /**
     * Items
     */
    {
        index: "loot_item_rarity_0",
        title: "Looter, not looser",
        description: "Loot 10 items of rarity 0",
        reference: "item:looted:0",
        target: 10,
        nft: "azookie:overpriced_streetwear"
    },
    {
        index: "loot_item_rarity_1",
        title: "Loot Enthusiast",
        description: "Loot 10 items of rarity 1.",
        reference: "item:looted:1",
        target: 10,
        nft: "azookie:exclusive_hype_master"
    },
    {
        index: "loot_item_rarity_2",
        title: "Rare Finder",
        description: "Loot 10 items of rarity 2.",
        reference: "item:looted:2",
        target: 10,
        nft: "azookie:virtual_rave_king"
    },
    {
        index: "loot_item_rarity_3",
        title: "Epic Hoarder",
        description: "Loot 10 items of rarity 3.",
        reference: "item:looted:3",
        target: 10,
        nft: "azookie:bored_street_icon"
    },
    {
        index: "loot_item_rarity_4",
        title: "Legendary Collector",
        description: "Loot 10 items of rarity 4.",
        reference: "item:looted:4",
        target: 10,
        nft: "azookie:hype_fueled_influencer"
    },
    {
        index: "loot_item_rarity_5",
        title: "Mythical Master",
        description: "Loot 10 items of rarity 5.",
        reference: "item:looted:5",
        target: 10,
        nft: "azookie:perk_promises_pal"
    },
    
    
    /**
     * STAKING
     */
    

];
  