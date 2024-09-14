export type Staking = {
    index: string;
    name: string;
    token: string;
    apr: number;
    requirement: string | null;
    image: boolean;
};

export const stakingsEnum = [
    { index: 'peercoin_staking', name: 'Peercoin', token: 'ppc', apr: 0.001, requirement: null, image: false },
    { index: 'ethereum_staking', name: 'Ethereum', token: 'eth', apr: 0.002, requirement: 'hack_a_dao', image: false },
    { index: 'eos_staking', name: 'EOS', token: 'eos', apr: 0.002, requirement: 'participate_an_ico', image: false },
    { index: 'ada_staking', name: 'Cardano', token: 'ada', apr: 0.002, requirement: 'read_ada_lovelace_wikipedia_page', image: false },
    { index: 'trx_staking', name: 'Tron', token: 'trx', apr: 0.002, requirement: 'have_lunch_with_warren_buffet', image: false },
    { index: 'solana_staking', name: 'Solana', token: 'sol', apr: 0.001, requirement: 'ok_boomer', image: true },
];