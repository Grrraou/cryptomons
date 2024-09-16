export type Mine = {
  index: string;
  name: string;
  token: string;
  requirement: string | null;
  image: boolean;
};
  
  export const minesEnum: Mine[] = [
  { index: 'btc_mine', name: 'Bitcoin', token: 'btc', requirement: null, image: true },
  { index: 'nmc_mine', name: 'Namecoin', token: 'nmc', requirement: 'decentralize_dns', image: false },
  { index: 'ltc_mine', name: 'Litecoin', token: 'ltc', requirement: 'gold_deserve_silver', image: false },
  { index: 'doge_mine', name: 'Dogecoin', token: 'doge', requirement: 'play_million_doge_disco', image: false },
  { index: 'dash_mine', name: 'Dash (Darkcoin)', token: 'dash', requirement: 'fork_bitcoin_plug_paypal', image: false },
  { index: 'xmr_mine', name: 'Monero', token: 'xmr', requirement: 'work_for_lazarus_group', image: false },
  { index: 'zec_mine', name: 'Zcash', token: 'zec', requirement: 'zero_knowledge_master', image: false },
  { index: 'bch_mine', name: 'Bitcoin Cash', token: 'bch', requirement: 'prove_size_matter', image: false },
  
  // { index: 'ore_mine', name: 'Ore', token: 'ore', requirement: null }, // Uncomment if needed
];
  
export const miningSoundsEnum: string[] = [
  'mining.mp3',
  'mining2.wav',
  'mining3.wav',
  'mining4.wav',
];
  