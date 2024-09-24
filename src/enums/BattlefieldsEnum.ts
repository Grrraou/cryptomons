export type Battlefield = {
    index: string;
    name: string;
    requirement: string | null;
    monsters: string[];
    image?: boolean;
};
  
export const battlefieldsEnum: Battlefield[] = [
    { 
        index: 'binance_barricade', 
        name: 'Binance Barricade', 
        requirement: null, 
        monsters: ['fisc_gobelin', 'scammer_troll', 'pump_and_dump_dragon', 'rug_puller_wraith', 'gas_fee_gremlin', 'ponzi_kraken'], 
    },
    { 
        index: 'kraken_abyss', 
        name: "Kraken's Abyss", 
        requirement: 'buy_uwucrew_and_digidaigaku', 
        monsters: ['fomo_phantom', 'shill_serpent', 'whale_manipulator', 'dusting_demon', 'defi_doppelganger', 'crypto_clown'],
    },
    { 
        index: 'uniswap_underground', 
        name: 'Uniswap Underground', 
        requirement: 'fill_a_pool_with_cash_money', 
        monsters: ['hodl_hobgoblin', 'airdrop_angel', 'fork_fiend', 'mempool_mimic', 'exchange_imp', 'blockchain_banshee'],
    },
    /* 
    { index: 'pancakeswap_plains', name: 'PancakeSwap Plains', requirement: null, image: false },
    { index: 'gemini_gorge', name: 'Gemini Gorge', requirement: null, image: false },
    { index: 'bybit_blitz', name: 'Bybit Blitz', requirement: null, image: false },
    { index: 'sushiswap_slaughterhouse', name: 'SushiSwap Slaughterhouse', requirement: null, image: false },
    { index: 'kucoin_citadel', name: 'KuCoin Citadel', requirement: null, image: false },
    { index: 'coinbase_clash', name: 'Coinbase Clash', requirement: null, image: false },
    { index: 'huobi_highlands', name: 'Huobi Highlands', requirement: null, image: false },
    { index: 'chainlink_crater', name: 'Chainlink Crater', requirement: null, image: false },
    { index: 'aave_arena', name: 'Aave Arena', requirement: null, image: false },
    { index: 'curve_conquest', name: 'Curve Conquest', requirement: null, image: false },
    { index: 'synthetix_stronghold', name: 'Synthetix Stronghold', requirement: null, image: false },
    { index: 'makerdao_maze', name: 'MakerDAO Maze', requirement: null, image: false },
    { index: 'balancer_battleground', name: 'Balancer Battleground', requirement: null, image: false },
    { index: 'arbitrum_ambush', name: 'Arbitrum Ambush', requirement: null, image: false },
    { index: 'optimism_outpost', name: 'Optimism Outpost', requirement: null, image: false },
    { index: 'yearn_yard', name: 'Yearn Yard', requirement: null, image: false },
    { index: 'gnosis_gorge', name: 'Gnosis Gorge', requirement: null, image: false }, */
];

export const attackSoundsEnum: string[] = [
    'slash.ogg',
    'slash2.wav',
    'slash3.wav',
    'slash4.wav',
  ];
  