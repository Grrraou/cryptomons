export type NFTCollectionType = {
    index: string,
    name: string,
    nfts: NFTType[],
}

export type NFTType = {
    index: string;
    name: string;
    description: string;
    rarity: 0 | 1 | 2 | 3 | 4 | 5;
};
  
export const NFTsEnum: NFTCollectionType[] = [
    {
        index: 'crypto_hoboes',
        name: 'CryptoHoboes',
        nfts: [
            {
                "index": "empty_wallet",
                "name": "Empty Wallet",
                "description": "Once a high-roller, now just a guy with an empty Metamask and dreams.",
                "rarity": 2
            },
            {
                "index": "burned_btc_millionaire",
                "name": "Burned BTC Millionaire",
                "description": "A millionaire, if you count all the coins he lost in that 'totally secure' wallet.",
                "rarity": 3
            },
            {
                "index": "failed_ico_founder",
                "name": "Failed ICO Founder",
                "description": "He promised the moon, but only delivered enough to afford ramen.",
                "rarity": 4
            },
            {
                "index": "right_click_master",
                "name": "Right-Click Master",
                "description": "Why buy NFTs when you can right-click and save? Genius.",
                "rarity": 1
            },
            {
                "index": "hodl_till_broke",
                "name": "Hodl Till Broke",
                "description": "Still holding... and holding... even though the bottom dropped out years ago.",
                "rarity": 5
            },
            {
                "index": "rug_pull_victim",
                "name": "Rug Pull Victim",
                "description": "Believed in the project until it vanished along with his investment.",
                "rarity": 2
            },
            {
                "index": "crypto_burnout",
                "name": "Crypto Burnout",
                "description": "Spent too many nights watching ETH charts and now he's just tired.",
                "rarity": 3
            },
            {
                "index": "p2e_dreamer",
                "name": "P2E Dreamer",
                "description": "Thought playing games for crypto would make him rich. Now just plays for fun.",
                "rarity": 1
            },
            {
                "index": "degen_gambler",
                "name": "Degen Gambler",
                "description": "He rolls the dice on anything that looks like a dog coin. Maybe next time.",
                "rarity": 4
            },
            {
                "index": "altcoin_junkie",
                "name": "Altcoin Junkie",
                "description": "Diversified into every coin you've never heard of. Now he’s just diversified into debt.",
                "rarity": 5
            }     
        ],
    },
    {
        index: 'bored_ape_garage_sale',
        name: 'Bored Ape Garage Sale',
        nfts: [
            {
                "index": "banana_peel_apocalypse",
                "name": "Banana Peel Apocalypse",
                "description": "The apes have moved on, leaving nothing but banana peels and dreams of yachts.",
                "rarity": 1
            },
            {
                "index": "rusty_yacht_buyer",
                "name": "Rusty Yacht Buyer",
                "description": "Bought a yacht to flex, but it’s rustier than his portfolio now.",
                "rarity": 2
            },
            {
                "index": "monkey_with_no_plan",
                "name": "Monkey With No Plan",
                "description": "Lost his roadmap, just like the project that promised him millions.",
                "rarity": 3
            },
            {
                "index": "banana_token_king",
                "name": "Banana Token King",
                "description": "He’s still holding those banana tokens like they’re going to the moon. Spoiler: they’re not.",
                "rarity": 4
            },
            {
                "index": "yacht_club_bouncer",
                "name": "Yacht Club Bouncer",
                "description": "Guarded the VIP area once. Now he’s guarding garage sale leftovers.",
                "rarity": 2
            },
            {
                "index": "ape_derivatives_sucker",
                "name": "Ape Derivatives Sucker",
                "description": "Bought every single ape derivative, but now he’s selling them for pennies.",
                "rarity": 1
            },
            {
                "index": "yacht_leaseholder",
                "name": "Yacht Leaseholder",
                "description": "Couldn’t afford a full yacht, so he leased half. The other half sank.",
                "rarity": 3
            },
            {
                "index": "flipping_failure",
                "name": "Flipping Failure",
                "description": "Tried to flip apes, but now the only thing he’s flipping is burgers.",
                "rarity": 5
            },
            {
                "index": "moldy_ape_collector",
                "name": "Moldy Ape Collector",
                "description": "Proud owner of an ape that hasn’t aged well... like, at all.",
                "rarity": 2
            },
            {
                "index": "lazy_hodler",
                "name": "Lazy Hodler",
                "description": "He’s still holding onto apes, but now he's just too lazy to sell them.",
                "rarity": 4
            }
        ],
    },
];
