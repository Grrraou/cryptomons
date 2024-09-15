import { defineStore } from 'pinia';

const images = import.meta.glob('/src/assets/tokens/*.png');

// Define the type for a token
type Token = {
  index: string;
  name: string;
  price: number;
  balance: number;
};

// Define the token list
export const tokensEnum = [
    { index: 'cryptodollar', name: 'Crypto Dollar', price: 1 },
    { index: 'btc', name: 'Bitcoin', price: 10 },//2009
    { index: 'nmc', name: 'Namecoin', price: 5 },//2011
    { index: 'ltc', name: 'Litecoin', price: 5 },//2011
    { index: 'xrp', name: 'Ripple', price: 1 },//2012
    { index: 'ppc', name: 'Peercoin', price: 1 },//2012
    { index: 'doge', name: 'Dogecoin', price: 0.2 },//2013
    { index: 'dash', name: 'Dash', price: 2 },//2014
    { index: 'xmr', name: 'Monero', price: 0.5 },//2014
    { index: 'eth', name: 'Ethereum', price: 2 },//2015
    { index: 'zec', name: 'Zcash', price: 2 },//2016
    { index: 'bch', name: 'Bitcoin Cash', price: 0.2 },//2017
    { index: 'eos', name: 'EOS', price: 0.2 },//2017
    { index: 'ada', name: 'Cardano', price: 0.2 },//2017
    { index: 'trx', name: 'Tron', price: 0.2 },//2017
    { index: 'bnb', name: 'Binance Coin', price: 0.2 },//2017
    { index: 'link', name: 'Chainlink', price: 0.2 },//2017
    { index: 'xtz', name: 'Tezos', price: 0.2 },//2018
    { index: 'dot', name: 'Polkadot', price: 0.2 },//2020
    { index: 'sol', name: 'Solana', price: 1 },//2020
    { index: 'shib', name: 'Shiba Inu', price: 0.1 },//2020
    { index: 'uni', name: 'Uniswap', price: 0.1 },//2020
];

// Define stores for each token but do not create them yet
export type TokenStoreType = {
    index: string;
    name: string;
    balance: number;
    price: number;
    swapFees: number;
    updateBalance: (amount: number) => void;
    getIcon: () => string;
    getBalanceInCrypto: () => number;
};
  
// Create a map of store functions
export const useTokenStores: Record<string, () => TokenStoreType> = tokensEnum.reduce((acc, token) => {
  const store = defineStore(`token_${token.index}`, {
    state: (): Omit<Token, 'balance'> & { balance: number, swapFees: number } => ({
      ...token,
      balance: 0,
      swapFees: 0.05,
    }),
    actions: {
      updateBalance(amount: number) {
        this.balance += amount;
      },
      getIcon() {
        const imgPath = `/tokens/${this.index}.png`;
        return new URL(imgPath, import.meta.url).href;
      },
      getBalanceInCrypto() {
        return this.balance * this.price;
      },
    },
    persist: true, // Enable persistence for each store
  });
    
  // Return the store with type assertion for autocompletion
  acc[token.index] = store as unknown as () => TokenStoreType;
  return acc;
}, {} as Record<string, () => TokenStoreType>);
