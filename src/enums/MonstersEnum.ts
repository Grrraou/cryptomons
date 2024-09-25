export type Monster = {
    index: string;
    name: string;
    description: string;
    power: number;
    health?: number;
    loot?: {
        index: string;
        ratio: number;
    };
};

export const monstersEnum: Monster[] = [
    /** BINANCE */
    { index: 'fisc_gobelin', name: 'Fisc Goblin', description: 'He wants your money', power: 1, loot: { index: 'binance-chestguard', ratio: 0.05 } },
    { index: 'scammer_troll', name: 'Scammer Troll', description: "Don't trust everyone", power: 2, loot: { index: 'binance-fortress-plate', ratio: 0.01 } },
    { index: 'pump_and_dump_dragon', name: 'Pump-and-Dump Dragon', description: 'Master of market manipulation', power: 1, loot: { index: 'binance-helmet', ratio: 0.05 } },
    { index: 'rug_puller_wraith', name: 'Rug-Puller Wraith', description: 'Vanishing with your investments', power: 2, loot: { index: 'binance-fortress-helmet', ratio: 0.02 } },
    { index: 'ponzi_kraken', name: 'Ponzi Kraken', description: 'Feeding off the naive', power: 1, loot: { index: 'binance-sword', ratio: 0.05 } },
    { index: 'gas_fee_gremlin', name: 'Gas Fee Gremlin', description: 'Eats up your transactions', power: 2, loot: { index: 'binance-fortress-sword', ratio: 0.02 } },
    { index: 'satoshi_specter', name: 'Satoshi Specter', description: 'The elusive creator, a ghostly presence', power: 4, loot: { index: 'good_news', ratio: 0.001 } },

    /** KRAKEN */
    { index: 'fomo_phantom', name: 'FOMO Phantom', description: 'Drives fear of missing out', power: 3, loot: { index: 'kraken-gloves', ratio: 0.05 } },
    { index: 'shill_serpent', name: 'Shill Serpent', description: 'Tempts you with empty promises', power: 4, loot: { index: 'kraken-fortress-gloves', ratio: 0.01 } },
    { index: 'whale_manipulator', name: 'Whale Manipulator', description: 'Shakes the market at will', power: 3, loot: { index: 'kraken-boots', ratio: 0.05 }  },
    { index: 'dusting_demon', name: 'Dusting Demon', description: 'Leaves traces to track you', power: 4, loot: { index: 'kraken-fortress-boots', ratio: 0.01 } },
    { index: 'defi_doppelganger', name: 'DeFi Doppelganger', description: 'A fake in the decentralized space', power: 3, loot: { index: 'kraken-pants', ratio: 0.05 }  },
    { index: 'crypto_clown', name: 'Crypto Clown', description: 'Turns serious investments into a joke', power: 4, loot: { index: 'kraken-fortress-pants', ratio: 0.01 } },

    /** UNISWAP */
    { index: 'hodl_hobgoblin', name: 'HODL Hobgoblin', description: 'Tells you to hold, no matter what', power: 10, loot: { index: 'uniswap-chestguard', ratio: 0.05 } },
    { index: 'airdrop_angel', name: 'Airdrop Angel', description: 'Gives you free tokens, but at what cost?', power: 15, loot: { index: 'uniswap-fortress-plate', ratio: 0.05 } },
    { index: 'fork_fiend', name: 'Fork Fiend', description: 'Splits chains and confuses investors', power: 10, loot: { index: 'uniswap-helmet', ratio: 0.05 } },
    { index: 'mempool_mimic', name: 'Mempool Mimic', description: 'Hides in pending transactions', power: 15, loot: { index: 'uniswap-fortress-helmet', ratio: 0.05 } },
    { index: 'exchange_imp', name: 'Exchange Imp', description: 'Plays tricks with your trading pairs', power: 10, loot: { index: 'uniswap-sword', ratio: 0.05 } },
    { index: 'blockchain_banshee', name: 'Blockchain Banshee', description: 'Screams of lost keys and frozen assets', power: 15, loot: { index: 'uniswap-fortress-sword', ratio: 0.05 } },

    /** PANCAKE */
    { index: 'node_nightmare', name: 'Node Nightmare', description: 'Disrupts consensus and causes chaos', power: 20, loot: { index: 'pancake-gloves', ratio: 0.05 } },
    { index: 'paper_wallet_poltergeist', name: 'Paper Wallet Poltergeist', description: 'Haunts forgotten backups', power: 30, loot: { index: 'pancake-fortress-gloves', ratio: 0.05 } },
    { index: 'dust_attack_djinn', name: 'Dust Attack Djinn', description: 'Curses you with tiny, malicious transactions', power: 20, loot: { index: 'pancake-boots', ratio: 0.05 } },
    { index: 'oracle_ogre', name: 'Oracle Ogre', description: 'Feeds false data to smart contracts', power: 30, loot: { index: 'pancake-fortress-boots', ratio: 0.05 } },
    { index: 'miner_minotaur', name: 'Miner Minotaur', description: 'Labors endlessly for rewards, but at great cost', power: 20, loot: { index: 'pancake-pants', ratio: 0.05 } },
    { index: 'token_troll', name: 'Token Troll', description: 'Lurks in obscure coins, waiting to trap victims', power: 30, loot: { index: 'pancake-fortress-pants', ratio: 0.05 } },

    /* 
    { index: 'wallet_wraith', name: 'Wallet Wraith', description: 'Drains your funds without a trace', power: 4 },
    { index: 'altcoin_abomination', name: 'Altcoin Abomination', description: 'A twisted creation, volatile and unpredictable', power: 3 },
    { index: 'faucet_fairy', name: 'Faucet Fairy', description: 'Grants tiny amounts of crypto, but it adds up', power: 2 },
    { index: 'cold_storage_cyclops', name: 'Cold Storage Cyclops', description: 'Guards your crypto, but is hard to reach', power: 4 },
    { index: 'lightning_lich', name: 'Lightning Lich', description: 'Moves funds swiftly, but with hidden dangers', power: 3 },
    { index: 'whitelist_wizard', name: 'Whitelist Wizard', description: 'Controls access to exclusive sales', power: 3 },
    { index: 'transaction_terror', name: 'Transaction Terror', description: 'Delays confirmations, causing panic', power: 2 },
    { index: 'hashrate_hydra', name: 'Hashrate Hydra', description: 'Multiplies its power with every new head', power: 5 },
    { index: 'staking_specter', name: 'Staking Specter', description: 'Holds your assets in a ghostly grip', power: 4 },
    { index: 'fee_fiend', name: 'Fee Fiend', description: 'Feeds on high transaction fees', power: 2 },
    { index: 'blockchain_bogeyman', name: 'Blockchain Bogeyman', description: 'Lurks in every transaction, waiting to strike', power: 3 },
    { index: 'ledger_leviathan', name: 'Ledger Leviathan', description: 'Records every move with an unbreakable grip', power: 5 },
    { index: 'ico_incubus', name: 'ICO Incubus', description: 'Seduces with promises of riches, often unfulfilled', power: 4 },
    { index: 'dapp_doppelganger', name: 'DApp Doppelganger', description: 'Mimics trusted apps to deceive', power: 3 },
    { index: 'bit_basilisk', name: 'Bit Basilisk', description: 'Its gaze turns traders to stone', power: 4 },
    { index: 'altcoin_ogre', name: 'Altcoin Ogre', description: 'Lumbers through the market, causing chaos', power: 3 },
    { index: 'proof_of_work_wyvern', name: 'Proof-of-Work Wyvern', description: 'Demands immense energy for its hoard', power: 5 }, */
];
  