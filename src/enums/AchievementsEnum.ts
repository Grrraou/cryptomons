import MineManager from "@/managers/MineManager";

export type Achievement = {
    index: string;
    title: string;
    description: string;
    reference: string;
    target: number;
    loot: string | null;
};
  
export const achievementsEnum: Achievement[] = [
    /** MINES */
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
        loot: 'mining_slot:btc_mine',
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
      
      /** BATTLEFIELDS */
      {
        index: "click_area_binance_barricade_10",
        title: "Binance explorer",
        description: "Attack manually 10 times one of Binance Barricade monsters.",
        reference: 'battlefields:binance_barricade:clicks',
        target: 10,
        loot: 'battlefield_slot:binance_barricade',
      },

/*     {
        index: "upgrade_area_btc_mine_10",
        title: "Bitcoin Architect - 10 Upgrades",
        description: "Build your Bitcoin empire with 10 crucial upgrades.",
        target: 10,
        loot: 'good_new_btc',
    },
    {
        index: "upgrade_area_btc_mine_100",
        title: "Bitcoin Mogul - 100 Upgrades",
        description: "Elevate your Bitcoin mining operation with 100 strategic upgrades.",
        target: 100,
        loot: 'mining_slot_btc',
    },
    {
        index: "upgrade_area_btc_mine_1000",
        title: "Bitcoin Overlord - 1000 Upgrades",
        description: "Achieve legendary status by upgrading your Bitcoin mine 1000 times.",
        target: 1000,
        loot: 'mining_slot_btc',
    },
    {
        index: "clicks_area_xmr_mine_10",
        title: "Monero Initiate - 10 Clicks",
        description: "Begin mining Monero with your first 10 clicks.",
        target: 10,
        loot: null,
    },
    {
        index: "clicks_area_xmr_mine_100",
        title: "Monero Seeker - 100 Clicks",
        description: "Gather 100 clicks and delve deeper into Monero mining.",
        target: 100,
        loot: 'good_new_btc',
    },
    {
        index: "clicks_area_xmr_mine_1000",
        title: "Monero Maestro - 1000 Clicks",
        description: "Master Monero mining with a total of 1000 clicks.",
        target: 1000,
        loot: null,
    },
    {
        index: "upgrade_area_xmr_mine_10",
        title: "Monero Builder - 10 Upgrades",
        description: "Start expanding your Monero mine with 10 upgrades.",
        target: 10,
        loot: null,
    },
    {
        index: "upgrade_area_xmr_mine_100",
        title: "Monero Strategist - 100 Upgrades",
        description: "Push your Monero mine to new heights with 100 upgrades.",
        target: 100,
        loot: null,
    },
    {
        index: "upgrade_area_xmr_mine_1000",
        title: "Monero Tycoon - 1000 Upgrades",
        description: "Achieve greatness by upgrading your Monero mine 1000 times.",
        target: 1000,
        loot: null,
    },
    {
        index: "clicks_area_doge_mine_10",
        title: "Doge Explorer - 10 Clicks",
        description: "Take your first steps in Dogecoin mining with 10 clicks.",
        target: 10,
        loot: null,
    },
    {
        index: "clicks_area_doge_mine_100",
        title: "Doge Prospector - 100 Clicks",
        description: "Gather 100 clicks as you continue your Dogecoin mining adventure.",
        target: 100,
        loot: null,
    },
    {
        index: "clicks_area_doge_mine_1000",
        title: "Doge Magnate - 1000 Clicks",
        description: "Show your Dogecoin mining strength with 1000 clicks.",
        target: 1000,
        loot: null,
    },
    {
        index: "upgrade_area_doge_mine_10",
        title: "Doge Engineer - 10 Upgrades",
        description: "Start refining your Dogecoin mine with 10 important upgrades.",
        target: 10,
        loot: null,
    },
    {
        index: "upgrade_area_doge_mine_100",
        title: "Doge Visionary - 100 Upgrades",
        description: "Lead the Dogecoin revolution with 100 game-changing upgrades.",
        target: 100,
        loot: null,
    },
    {
        index: "upgrade_area_doge_mine_1000",
        title: "Doge Empire - 1000 Upgrades",
        description: "Become a legend by upgrading your Dogecoin mine 1000 times.",
        target: 1000,
        loot: null,
    }, */
];
  