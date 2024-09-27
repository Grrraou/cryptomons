export type PriceCandleType = { 
    x: number,
    o: number,
    h: number,
    l: number,
    c: number,
};

export type Token = {
    index: string;
    name: string;
    price: number;
    balance: number;
    history: PriceCandleType[];
};
  
export const tokensEnum = [
    { index: 'cryptodollar', name: 'Crypto Dollar', price: 1, },
    { index: 'btc', name: 'Bitcoin', price: 10,},//2009
    { index: 'nmc', name: 'Namecoin', price: 5 },//2011
    { index: 'ltc', name: 'Litecoin', price: 5 },//2011
    { index: 'xrp', name: 'Ripple', price: 1 },//2012
    { index: 'ppc', name: 'Peercoin', price: 1 },//2012
    { index: 'doge', name: 'Dogecoin', price: 1 },//2013
    { index: 'dash', name: 'Dash', price: 2 },//2014
    { index: 'xmr', name: 'Monero', price: 0.5 },//2014
    { index: 'eth', name: 'Ethereum', price: 2 },//2015
    { index: 'zec', name: 'Zcash', price: 2 },//2016
    { index: 'bch', name: 'Bitcoin Cash', price: 5 },//2017
    { index: 'eos', name: 'EOS', price: 5 },//2017
    { index: 'ada', name: 'Cardano', price: 5 },//2017
    { index: 'trx', name: 'Tron', price: 5 },//2017
    { index: 'bnb', name: 'Binance Coin', price: 5 },//2017
    { index: 'link', name: 'Chainlink', price: 5 },//2017
    { index: 'xtz', name: 'Tezos', price: 5 },//2018
    { index: 'dot', name: 'Polkadot', price: 5 },//2020
    { index: 'sol', name: 'Solana', price: 1 },//2020
    { index: 'shib', name: 'Shiba Inu', price: 10 },//2020
    { index: 'uni', name: 'Uniswap', price: 50 },//2020
    { index: 'cake', name: 'Cake', price: 100 },//2020
    { index: 'grt', name: 'The Graph', price: 3 },
    { index: 'osmo', name: 'Osmosis', price: 2 },
    { index: 'neo', name: 'Neo', price: 100 },
    { index: 'gas', name: 'Gas', price: 10 },
];