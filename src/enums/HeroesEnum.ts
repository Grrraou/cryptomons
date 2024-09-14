export type Hero = {
    index: string;
    name: string;
    requirement: string;
    baseBattlePower: number;
    baseMiningPower: number;
};
  
export const heroesEnum: Hero[] = [
    { index: 'bitcomon', name: 'Bitcomon', requirement: 'halving_bitcoin', baseBattlePower: 2, baseMiningPower: 4 },
    { index: 'dogemon', name: 'Dogemon', requirement: 'sponsorize_nascar_driver', baseBattlePower: 5, baseMiningPower: 1 },
    { index: 'etheremon', name: 'Etheremon', requirement: 'rejected_by_bitcoin_community', baseBattlePower: 5, baseMiningPower: 1 },
    { index: 'chainlinkomon', name: 'Chainlinkomon', requirement: 'consult_the_oracles', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'tezosomon', name: 'Tezosomon', requirement: 'harass_your_friends_about_nfts', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'polkadotmon', name: 'Polkadotmon', requirement: 'crowdsource_parachain', baseBattlePower: 3, baseMiningPower: 3 },
    { index: 'solanamon', name: 'Solanamon', requirement: 'beat_visa_transaction_speed', baseBattlePower: 5, baseMiningPower: 1 },
    { index: 'shibainumon', name: 'Shibainumon', requirement: 'send_shitcoins_to_vitalik', baseBattlePower: 2, baseMiningPower: 4 },
    { index: 'unimon', name: 'Unimon', requirement: 'swap_whatever_in_large_amounts', baseBattlePower: 4, baseMiningPower: 2 },
];
  