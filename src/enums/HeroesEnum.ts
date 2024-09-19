export type Hero = {
    index: string;
    name: string;
    token: string;
    requirement: string;
    baseBattlePower: number;
    baseMiningPower: number;
};
  
export const heroesEnum: Hero[] = [
    { index: 'bitcomon', name: 'Bitcomon', token: 'btc', requirement: 'halving_bitcoin', baseBattlePower: 2, baseMiningPower: 4 },
    { index: 'scamon', name: 'Scamon', token: 'btc', requirement: 'bitcoin_savings_and_trust', baseBattlePower: 1, baseMiningPower: 1 },
    { index: 'namecomon', name: 'Namecomon', token: 'nmc', requirement: 'merged_mining_effort', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'litecomon', name: 'Litecomon', token: 'ltc', requirement: 'third_but_fastest', baseBattlePower: 4, baseMiningPower: 2 },
    { index: 'dogemon', name: 'Dogemon', token: 'doge', requirement: 'sponsorize_nascar_driver', baseBattlePower: 5, baseMiningPower: 1 },
    { index: 'dashmon', name: 'Dashmon', token: 'dash', requirement: 'find_perfect_token_name', baseBattlePower: 2, baseMiningPower: 4 },
    { index: 'moneromon', name: 'Moneromon', token: 'xmr', requirement: 'get_delisted_from_binance', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'etheremon', name: 'Etheremon', token: 'eth', requirement: 'rejected_by_bitcoin_community', baseBattlePower: 5, baseMiningPower: 1 },
    { index: 'zcashmon', name: 'Zcashmon', token: 'zec', requirement: 'be_sexy_to_greyscale', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'bitcocashmon', name: 'Bitcocashmon', token: 'bch', requirement: 'create_a_schism', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'eosmon', name: 'Eosmon', token: 'eos', requirement: 'community_takeover', baseBattlePower: 5, baseMiningPower: 1 },
    { index: 'adamon', name: 'Adamon', token: 'ada', requirement: 'ouroboros_consensus', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'tronomon', name: 'Tronomon', token: 'trx', requirement: 'buy_bittorent', baseBattlePower: 2, baseMiningPower: 4 },
    { index: 'degenomon', name: 'Degenomon', token: 'cryptodollar', requirement: 'yolo_or_fomo', baseBattlePower: 6, baseMiningPower: 6 },
    { index: 'unimon', name: 'Unimon', token: 'uni', requirement: 'swap_whatever_in_large_amounts', baseBattlePower: 4, baseMiningPower: 2 },
    { index: 'solanamon', name: 'Solanamon', token: 'sol', requirement: 'beat_visa_transaction_speed', baseBattlePower: 5, baseMiningPower: 1 },
    { index: 'chainlinkomon', name: 'Chainlinkomon', token: 'link', requirement: 'consult_the_oracles', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'tezosomon', name: 'Tezosomon', token: 'xtz', requirement: 'harass_your_friends_about_nfts', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'polkadotmon', name: 'Polkadotmon', token: 'dot', requirement: 'crowdsource_parachain', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'shibainumon', name: 'Shibainumon', token: 'shib', requirement: 'send_shitcoins_to_vitalik', baseBattlePower: 2, baseMiningPower: 4 },
    
];
  