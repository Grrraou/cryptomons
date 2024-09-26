export type NFTCollectionType = {
    index: string,
    name: string,
    description: string,
    lootable: boolean,
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
        description: 'Double the speed of heroes ⛏️ mining',
        lootable: true,
        nfts: [
            {
                "index": "empty_wallet",
                "name": "Empty Wallet",
                "description": "Once a high-roller, now just a guy with an empty Metamask and dreams.",
                "rarity": 2,
            },
            {
                "index": "burned_btc_millionaire",
                "name": "Burned BTC Millionaire",
                "description": "A millionaire, if you count all the coins he lost in that 'totally secure' wallet.",
                "rarity": 3,
            },
            {
                "index": "failed_ico_founder",
                "name": "Failed ICO Founder",
                "description": "He promised the moon, but only delivered enough to afford ramen.",
                "rarity": 4,
            },
            {
                "index": "right_click_master",
                "name": "Right-Click Master",
                "description": "Why buy NFTs when you can right-click and save? Genius.",
                "rarity": 1,
            },
            {
                "index": "hodl_till_broke",
                "name": "Hodl Till Broke",
                "description": "Still holding... and holding... even though the bottom dropped out years ago.",
                "rarity": 5,
            },
            {
                "index": "rug_pull_victim",
                "name": "Rug Pull Victim",
                "description": "Believed in the project until it vanished along with his investment.",
                "rarity": 2,
            },
            {
                "index": "crypto_burnout",
                "name": "Crypto Burnout",
                "description": "Spent too many nights watching ETH charts and now he's just tired.",
                "rarity": 3,
            },
            {
                "index": "p2e_dreamer",
                "name": "P2E Dreamer",
                "description": "Thought playing games for crypto would make him rich. Now just plays for fun.",
                "rarity": 1,
            },
            {
                "index": "degen_gambler",
                "name": "Degen Gambler",
                "description": "He rolls the dice on anything that looks like a dog coin. Maybe next time.",
                "rarity": 4,
            },
            {
                "index": "altcoin_junkie",
                "name": "Altcoin Junkie",
                "description": "Diversified into every coin you've never heard of. Now he’s just diversified into debt.",
                "rarity": 5,
            }     
        ],
    },
    {
        index: 'bored_ape_garage_sale',
        name: 'Bored Ape Garage Sale',
        description: 'Double the speed of 🔒 stacking rewards',
        lootable: true,
        nfts: [
            {
                "index": "banana_peel_apocalypse",
                "name": "Banana Peel Apocalypse",
                "description": "The apes have moved on, leaving nothing but banana peels and dreams of yachts.",
                "rarity": 1,
            },
            {
                "index": "rusty_yacht_buyer",
                "name": "Rusty Yacht Buyer",
                "description": "Bought a yacht to flex, but it’s rustier than his portfolio now.",
                "rarity": 2,
            },
            {
                "index": "monkey_with_no_plan",
                "name": "Monkey With No Plan",
                "description": "Lost his roadmap, just like the project that promised him millions.",
                "rarity": 3,
            },
            {
                "index": "banana_token_king",
                "name": "Banana Token King",
                "description": "He’s still holding those banana tokens like they’re going to the moon. Spoiler: they’re not.",
                "rarity": 4,
            },
            {
                "index": "yacht_club_bouncer",
                "name": "Yacht Club Bouncer",
                "description": "Guarded the VIP area once. Now he’s guarding garage sale leftovers.",
                "rarity": 2,
            },
            {
                "index": "ape_derivatives_sucker",
                "name": "Ape Derivatives Sucker",
                "description": "Bought every single ape derivative, but now he’s selling them for pennies.",
                "rarity": 1,
            },
            {
                "index": "yacht_leaseholder",
                "name": "Yacht Leaseholder",
                "description": "Couldn’t afford a full yacht, so he leased half. The other half sank.",
                "rarity": 3,
            },
            {
                "index": "flipping_failure",
                "name": "Flipping Failure",
                "description": "Tried to flip apes, but now the only thing he’s flipping is burgers.",
                "rarity": 5,
            },
            {
                "index": "moldy_ape_collector",
                "name": "Moldy Ape Collector",
                "description": "Proud owner of an ape that hasn’t aged well... like, at all.",
                "rarity": 2,
            },
            {
                "index": "lazy_hodler",
                "name": "Lazy Hodler",
                "description": "He’s still holding onto apes, but now he's just too lazy to sell them.",
                "rarity": 4,
            }
        ],
    },
    {
        index: 'art_blocked',
        name: 'Art Blocked',
        description: 'Double the speed of heroes ⚔️ battle',
        lootable: true,
        nfts: [
            {
                "index": "generative_squiggle",
                "name": "Generative Squiggle",
                "description": "A squiggle that could have been drawn by a toddler, but it's algorithmic, so... 50 ETH.",
                "rarity": 1
            },
            {
                "index": "loading_forever",
                "name": "Loading Forever",
                "description": "An NFT that never fully loads. It’s art because you don’t get it.",
                "rarity": 3
            },
            {
                "index": "algorithmic_masterpiece",
                "name": "Algorithmic Masterpiece",
                "description": "Random shapes and colors smashed together by a computer. Truly priceless.",
                "rarity": 5
            },
            {
                "index": "blank_canvas_deluxe",
                "name": "Blank Canvas Deluxe",
                "description": "It’s a blank canvas! Pure minimalism. And worth every nonexistent penny.",
                "rarity": 4
            },
            {
                "index": "abstract_mess",
                "name": "Abstract Mess",
                "description": "It looks like your printer ran out of ink, but it’s generative art, so who’s complaining?",
                "rarity": 2
            },
            {
                "index": "triangle_spaghetti",
                "name": "Triangle Spaghetti",
                "description": "Is it triangles? Is it spaghetti? Only the algorithm knows.",
                "rarity": 3
            },
            {
                "index": "pixels_on_purpose",
                "name": "Pixels on Purpose",
                "description": "A random pixelated mess that makes no sense. But hey, it’s on-chain.",
                "rarity": 1
            },
            {
                "index": "neon_explosion",
                "name": "Neon Explosion",
                "description": "Just bright neon colors fighting each other for no reason. Must be worth a fortune.",
                "rarity": 4
            },
            {
                "index": "blocky_mystery",
                "name": "Blocky Mystery",
                "description": "It’s a bunch of blocks. The meaning is a mystery, much like the price tag.",
                "rarity": 2
            },
            {
                "index": "algorithm_gone_wild",
                "name": "Algorithm Gone Wild",
                "description": "When the algorithm has too much freedom, you get this... whatever it is.",
                "rarity": 5
            }
        ],
    },
    {
        index: 'women_of_the_wordly_market',
        name: 'Women of the Worldly Market',
        description: 'Double the speed of the 🚀 rocket',
        lootable: true,
        nfts: [
            {
                "index": "diversity_for_sale",
                "name": "Diversity for Sale",
                "description": "Tokenized diversity at its finest—empowerment with a price tag!",
                "rarity": 2
            },
            {
                "index": "empowered_by_eth",
                "name": "Empowered by ETH",
                "description": "Because true empowerment is only a smart contract away, right?",
                "rarity": 3
            },
            {
                "index": "tokenized_feminism",
                "name": "Tokenized Feminism",
                "description": "One NFT = one step closer to breaking the glass ceiling. Sort of.",
                "rarity": 4
            },
            {
                "index": "queen_of_the_blockchain",
                "name": "Queen of the Blockchain",
                "description": "Reigning over a digital empire that’s as empowering as it is profitable.",
                "rarity": 5
            },
            {
                "index": "pixel_perfection",
                "name": "Pixel Perfection",
                "description": "Women in pixel form, perfectly monetized and ready for the market.",
                "rarity": 1
            }
        ],
    },
    {
        index: 'cold_cats',
        name: 'Cold Cats',
        description: 'Consult token graphs for free in the 🏛️ vault',
        lootable: false,
        nfts: [
            {
                "index": "emotionless_feline",
                "name": "Emotionless Feline",
                "description": "A cool cat so chill it doesn’t even feel emotions anymore. Positivity sold separately.",
                "rarity": 0
            },
            {
                "index": "cash_grab_kitty",
                "name": "Cash Grab Kitty",
                "description": "It’s not about the art—it’s about the ETH. Buy now, feel cool later.",
                "rarity": 1
            },
            {
                "index": "stay_positive_purr",
                "name": "Stay Positive Purr",
                "description": "Forcing smiles and good vibes because that’s what the blockchain demands.",
                "rarity": 2
            },
            {
                "index": "blue_eyed_blank",
                "name": "Blue Eyed Blank",
                "description": "This cold cat has seen it all... and cares about none of it. But hey, it’s blue!",
                "rarity": 3
            },
            {
                "index": "icy_enthusiast",
                "name": "Icy Enthusiast",
                "description": "Coolness isn’t free—this cat was sold for a mint and still hasn’t warmed up.",
                "rarity": 4
            },
            {
                "index": "meow_for_eth",
                "name": "Meow for ETH",
                "description": "Will purr for positivity... as long as there’s a price tag attached.",
                "rarity": 5
            }
        ],
    }
];
