export type Goal = {
    index: string;
    name: string;
    description: string;
    costs: { token: string; value: number; isPaid: boolean }[];
    reward: string;
    isCompleted: boolean;
    image: boolean
};

export const goalsEnum = [
    {
      index: 'grandma_bitcoin',
      name: 'Convince Grandma to Buy Bitcoin',
      description: 'Help your grandma set up a crypto wallet and buy her first bitcoin.',
      costs: [
        { token: 'btc', value: 0.5, isPaid: false },
      ],
      reward: 'Unlock the Vault and gain access to all your cryptos!',
      image: true,
    },
    {
      index: 'halving_bitcoin',
      name: 'Halving Bitcoin',
      description: 'This won\'t really halve BTC mining... or maybe it will.. uhm',
      costs: [
        { token: 'btc', value: 1, isPaid: false },
      ],
      reward: 'Unlock Bitcomon !',
      image: true,
    },
    {
      index: 'decentralize_dns',
      name: 'Decentralize the Domain Name System',
      description: 'Everything must be decentralized, start with DNS.',
      costs: [
        { token: 'btc', value: 5, isPaid: false },
      ],
      reward: 'Unlock the Namecoin mine',
      image: true,
    },
    {
      index: 'gold_deserve_silver',
      name: 'Gold deserve Silver',
      description: 'If you have gold, why not having silver too ?',
      costs: [
        { token: 'nmc', value: 5, isPaid: false },
      ],
      reward: 'Unlock the Litecoin mine',
      image: true,
    },
    {
      index: 'centralize_decentralization',
      name: 'Centralize decentralization',
      description: 'This makes no sens ? yeah i know...',
      costs: [
        { token: 'ltc', value: 10, isPaid: false },
      ],
      reward: 'Unlock Swap',
      image: true,
    },
    {
      index: 'discover_proof_of_stake',
      name: 'Discover the Proof of stake',
      description: 'How dare you mining crypto when you can just stake !?',
      costs: [
        { token: 'ppc', value: 100, isPaid: false },
      ],
      reward: 'Unlock Staking',
      image: true,
    },
    {
      index: 'play_million_doge_disco',
      name: 'Play Million Doge Disco',
      description: 'Disco stu would enjoy',
      costs: [
        { token: 'cryptodollar', value: 5000, isPaid: false },
      ],
      reward: 'Unlock Dogecoin mine !',
      image: true,
    },
    {
      index: 'shopping_on_silk_road',
      name: 'Do some shopping on Silk Road',
      description: 'Make your mama proud',
      costs: [
        { token: 'btc', value: 500, isPaid: false },
      ],
      reward: 'Unlock The inventory !',
      image: true,
    },
    {
      index: 'sponsorize_nascar_driver',
      name: 'Sponsorize a NASCAR driver',
      description: 'Why ? Because we can.',
      costs: [
        { token: 'doge', value: 5000, isPaid: false },
      ],
      reward: 'Unlock Dogemon',
      image: true,
    },
    {
      index: 'fork_bitcoin_plug_paypal',
      name: 'Fork Bitcoin and plug it to paypal',
      description: 'Ever dreamed of paying with crypto via paypal ?',
      costs: [
        { token: 'cryptodollar', value: 10000, isPaid: false },
        { token: 'btc', value: 200, isPaid: false },
      ],
      reward: 'Unlock Dash mine',
      image: true,
    },
    {
      index: 'work_for_lazarus_group',
      name: 'Work for the Lazarus group (APT38)',
      description: 'Join the glorious leaders and fight evil america.',
      costs: [
        { token: 'cryptodollar', value: 25000, isPaid: false },
      ],
      reward: 'Unlock Monero mine',
      image: true,
    },
    {
      index: 'hack_a_dao',
      name: 'Hack a DAO',
      description: 'All those coins are so unsecure, grab them all !',
      costs: [
        { token: 'cryptodollar', value: 35000, isPaid: false },
        { token: 'eth', value: 820, isPaid: false },
      ],
      reward: 'Unlock Ethereum staking',
      image: true,
    },
    {
      index: 'rejected_by_bitcoin_community',
      name: 'Be rejected by Bitcoin community',
      description: 'Your idea suck, go do it solo !',
      costs: [
        { token: 'cryptodollar', value: 35000, isPaid: false },
        { token: 'eth', value: 450, isPaid: false },
      ],
      reward: 'Unlock Etheremon',
      image: true,
    },
    {
      index: 'zero_knowledge_master',
      name: 'Zero-Knowledge Master',
      description: 'Hide your ass like you were doing illegal stuff !',
      costs: [
        { token: 'cryptodollar', value: 75000, isPaid: false },
      ],
      reward: 'Unlock Zcash mine',
      image: true,
    },
    {
      index: 'prove_size_matter',
      name: 'Prove that the size does matter',
      description: 'Yes it does !',
      costs: [
        { token: 'cryptodollar', value: 150000, isPaid: false },
      ],
      reward: 'Unlock Bitcoin Cash mine',
      image: true,
    },
    {
      index: 'participate_an_ico',
      name: 'Participate an ICO',
      description: 'Shut up and take my money !',
      costs: [
        { token: 'cryptodollar', value: 250000, isPaid: false },
      ],
      reward: 'Unlock EOS staking',
      image: true,
    },
    {
      index: 'read_ada_lovelace_wikipedia_page',
      name: 'Read Ada Lovelace wikipedia page',
      description: 'There is no girl on the internet',
      costs: [
        { token: 'cryptodollar', value: 550000, isPaid: false },
      ],
      reward: 'Unlock Cardano staking',
      image: false,
    },
    {
      index: 'have_lunch_with_warren_buffet',
      name: 'Have a lunch with Warren Buffet',
      description: 'Ask him for lottery numbers',
      costs: [
        { token: 'cryptodollar', value: 4600000, isPaid: false },
      ],
      reward: 'Unlock Tron staking',
      image: false,
    },
    {
      index: 'build_and_build',
      name: 'Build and Build',
      description: 'and build and build and build and build and build and build and build',
      costs: [
        { token: 'cryptodollar', value: 10000000, isPaid: false },
        { token: 'bnb', value: 100000, isPaid: false },
      ],
      reward: 'Unlock the Battlefield',
      image: false,
    },
    {
      index: 'buy_uwucrew_and_digidaigaku',
      name: 'Buy some uwucrew and DigiDaigaku',
      description: 'Kawai desu neeee',
      costs: [
        { token: 'cryptodollar', value: 10000000, isPaid: false },
      ],
      reward: 'Unlock the Kraken\'s Abyss',
      image: false,
    },
    {
      index: 'consult_the_oracles',
      name: 'Consult the oracles',
      description: 'Ask them for lottery numbers, might work this time',
      costs: [
        { token: 'cryptodollar', value: 50000000, isPaid: false },
        { token: 'link', value: 5000000, isPaid: false },
      ],
      reward: 'Unlock Chainlinkomon',
      image: false,
    },
    {
      index: 'harass_your_friends_about_nfts',
      name: 'Harass your friends about NFTs',
      description: 'I\'m sure they will find you SUPER cool !',
      costs: [
        { token: 'cryptodollar', value: 500000, isPaid: false },
        { token: 'xtz', value: 500000, isPaid: false },
      ],
      reward: 'Unlock Tezosomon',
      image: false,
    },
    {
      index: 'crowdsource_parachain',
      name: 'Crowdsource a Parachain',
      description: 'It looks like chinese but a quick google might helps.',
      costs: [
        { token: 'cryptodollar', value: 500000, isPaid: false },
        { token: 'dot', value: 500000, isPaid: false },
      ],
      reward: 'Unlock Polkadotmon',
      image: false,
    },
    {
      index: 'ok_boomer',
      name: 'OK boomer !',
      description: 'The future is now, old man',
      costs: [
        { token: 'cryptodollar', value: 500000, isPaid: false },
        { token: 'sol', value: 500000, isPaid: false },
      ],
      reward: 'Unlock Solana Staking',
      image: false,
    },
    {
      index: 'beat_visa_transaction_speed',
      name: 'Beat VISA transaction speed',
      description: 'VISA is so over-rated',
      costs: [
        { token: 'cryptodollar', value: 500000, isPaid: false },
        { token: 'sol', value: 500000, isPaid: false },
      ],
      reward: 'Unlock Solanamon',
      image: false,
    },
    {
      index: 'send_shitcoins_to_vitalik',
      name: 'Send your shitcoins to Vitalik',
      description: 'Better be in a rich man garbage than a poor guy wallet',
      costs: [
        { token: 'cryptodollar', value: 500000, isPaid: false },
        { token: 'shib', value: 500000, isPaid: false },
      ],
      reward: 'Unlock Shibainumon',
      image: false,
    },
    {
      index: 'fill_a_pool_with_cash_money',
      name: 'Fill a pool with cash money',
      description: 'Save water, swim in cash.',
      costs: [
        { token: 'cryptodollar', value: 500000, isPaid: false },
        { token: 'uni', value: 500000, isPaid: false },
      ],
      reward: 'Unlock the Uniswap Underground',
      image: false,
    },
    {
      index: 'swap_whatever_in_large_amounts',
      name: 'Swap whatever in large amounts',
      description: 'We don\'t care we\'re just here for the airdrop',
      costs: [
        { token: 'cryptodollar', value: 500000, isPaid: false },
        { token: 'uni', value: 500000, isPaid: false },
      ],
      reward: 'Unlock the Unimon',
      image: false,
    },
  
  
  
  
  // Stupid goals
    {
      index: 'buy_pizza_with_bitcoins',
      name: 'Buy a pizza with bitcoins',
      description: 'A nice pizza, without ananas and just for 10 000 BTC !',
      costs: [
        { token: 'btc', value: 10000, isPaid: false },
      ],
      reward: 'A pizza',
      image: false,
    },
    {
      index: 'save_harambe',
      name: 'Save Harambe',
      description: 'Save the world from collapse by saving Harembe.',
      costs: [
        { token: 'cryptodollar', value: 400000000, isPaid: false },
      ],
      reward: 'Ooooh ooohh AAAhh AH!',
      image: false,
    },
    
   /*    {
        index: 'fix_inflation',
        name: 'Fix Inflation',
        description: 'Fix inflation by printing more cryptodollars.',
        costs: [
          { token: 'btc', value: 1000, isPaid: false },
          { token: 'cryptodollar', value: 500, isPaid: false },
        ],
      },
      {
        index: 'buy_moon',
        name: 'Buy the Moon',
        description: 'Create a DAO to buy the moon.',
        costs: [
          { token: 'btc', value: 2000, isPaid: false },
          { token: 'cryptodollar', value: 1200, isPaid: false },
        ],
      },
      {
        index: 'replace_fiat',
        name: 'Replace Fiat with Cryptodollar',
        description: 'Replace the dollar with cryptodollar in global trade.',
        costs: [
          { token: 'btc', value: 1500, isPaid: false },
          { token: 'cryptodollar', value: 700, isPaid: false },
        ],
      },
      {
        index: 'space_travel_nft',
        name: 'Space Travel with NFTs',
        description: 'Fund space travel with NFTs of crypto memes.',
        costs: [
          { token: 'btc', value: 3000, isPaid: false },
          { token: 'cryptodollar', value: 2000, isPaid: false },
        ],
      },
      {
        index: 'doge_rocket',
        name: 'Doge-Powered Rocket',
        description: 'Launch a rocket to the moon powered by cryptodollars.',
        costs: [
          { token: 'btc', value: 2500, isPaid: false },
          { token: 'cryptodollar', value: 1500, isPaid: false },
        ],
      },
      {
        index: 'metaverse_harambe',
        name: 'Metaverse Harambe',
        description: 'Revive Harambe as a metaverse gorilla.',
        costs: [
          { token: 'btc', value: 1200, isPaid: false },
          { token: 'cryptodollar', value: 600, isPaid: false },
        ],
      },
      {
        index: 'fix_climate',
        name: 'Fix Climate with Crypto',
        description: 'Solve climate change by funding solutions with cryptodollar.',
        costs: [
          { token: 'btc', value: 1800, isPaid: false },
          { token: 'cryptodollar', value: 900, isPaid: false },
        ],
      },
      {
        index: 'mars_president',
        name: 'Elon for Mars President',
        description: 'Make Elon Musk president of Mars with crypto votes.',
        costs: [
          { token: 'btc', value: 2200, isPaid: false },
          { token: 'cryptodollar', value: 1100, isPaid: false },
        ],
      },
      {
        index: 'doge_statue_moon',
        name: 'Doge Statue on the Moon',
        description: 'Crowdfund a giant Doge statue on the moon.',
        costs: [
          { token: 'btc', value: 4000, isPaid: false },
          { token: 'cryptodollar', value: 2500, isPaid: false },
        ],
      },
      {
        index: 'monday_fix',
        name: 'Fix Mondays with Crypto',
        description: 'Create a cryptocurrency to fix Monday mornings.',
        costs: [
          { token: 'btc', value: 1300, isPaid: false },
          { token: 'cryptodollar', value: 700, isPaid: false },
        ],
      },
      {
        index: 'meme_war',
        name: 'Meme War for World Hunger',
        description: 'Start a meme war to end world hunger.',
        costs: [
          { token: 'btc', value: 3500, isPaid: false },
          { token: 'cryptodollar', value: 1800, isPaid: false },
        ],
      },
      {
        index: 'blockchain_zoo',
        name: 'Blockchain Zoo for Harambe',
        description: 'Build a blockchain zoo to honor Harambe.',
        costs: [
          { token: 'btc', value: 2700, isPaid: false },
          { token: 'cryptodollar', value: 1400, isPaid: false },
        ],
      },
      {
        index: 'crypto_netflix',
        name: 'Decentralized Netflix for Cats',
        description: 'Launch a decentralized Netflix platform for cat videos.',
        costs: [
          { token: 'btc', value: 1600, isPaid: false },
          { token: 'cryptodollar', value: 900, isPaid: false },
        ],
      }, */
];
    