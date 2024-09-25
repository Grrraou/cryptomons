import { EquipementSlotType } from "@/stores/useItems";

export type Item = {
  index: string;
  name: string;
  description: string;
  type: EquipementSlotType;
  power: number;
  img?: boolean;
  rarity?: number;
  xp?: number;
  damage?: number;
  mining?: number;
  token?: string;
  effect?: () => void | number;
}

export const itemsEnum: Item[] = [
  /** SPECIAL REWARDS */
  {
    index: 'mining_slot',
    name: 'Mining Slot',
    description: 'Increase the number of heroes that can work in a place.',
    type: 'Consumable',
    power: 1,
  },
  {
    index: 'battlefield_slot',
    name: 'Battlefield Slot',
    description: 'Increase the number of fight that can work in a place.',
    type: 'Consumable',
    power: 1,
  },
  {
    index: 'inventory_slot',
    name: 'Inventory Slot',
    description: 'Increase the number of items you can store in your chest.',
    type: 'Consumable',
    power: 1,
  },

  /** BINANCE */
  {
    index: 'binance-chestguard',
    name: 'Binance Chestguard',
    description: 'A sturdy chest armor infused with the power of Binance, offering strong protection.',
    type: 'Chest',
    power: 10,
  },
  {
    index: 'binance-fortress-plate',
    name: 'Binance Fortress Plate',
    description: 'An elite chestplate crafted with Binance\'s finest technology, providing superior defense.',
    type: 'Chest',
    power: 20,
  },
  {
    index: 'binance-helmet',
    name: 'Binance Helmet',
    description: '',
    type: 'Head',
    power: 10,
  },
  {
    index: 'binance-fortress-helmet',
    name: 'Binance Fortress Helmet',
    description: '',
    type: 'Head',
    power: 20,
  },
  {
    index: 'binance-sword',
    name: 'Binance Sword',
    description: '',
    type: 'Weapon',
    power: 10,
  },
  {
    index: 'binance-fortress-sword',
    name: 'Binance Fortress Sword',
    description: '',
    type: 'Weapon',
    power: 20,
  },
  {
    index: 'good_news',
    name: 'Some good news in crypto world',
    description: 'Increase token value.',
    type: 'Consumable',
    power: 3,
  },

  /** KRAKEN */
  {
    index: 'kraken-gloves',
    name: 'Kraken Gloves',
    description: '',
    type: 'Hands',
    power: 10,
  },
  {
    index: 'kraken-fortress-gloves',
    name: 'Kraken Fortress Gloves',
    description: '',
    type: 'Hands',
    power: 20,
  },
  {
    index: 'kraken-boots',
    name: 'Kraken Boots',
    description: '',
    type: 'Boots',
    power: 10,
  },
  {
    index: 'kraken-fortress-boots',
    name: 'Kraken Fortress Boots',
    description: '',
    type: 'Boots',
    power: 20,
  },
  {
    index: 'kraken-pants',
    name: 'Kraken Pants',
    description: '',
    type: 'Pants',
    power: 10,
  },
  {
    index: 'kraken-fortress-pants',
    name: 'Kraken Fortress pants',
    description: '',
    type: 'Pants',
    power: 20,
  },

  /** UNISWAP */
  {
    index: 'uniswap-chestguard',
    name: 'Uniswap Chestguard',
    description: 'A sturdy chest armor infused with the power of Uniswap, offering strong protection.',
    type: 'Chest',
    power: 30,
  },
  {
    index: 'uniswap-fortress-plate',
    name: 'Uniswap Fortress Plate',
    description: 'An elite chestplate crafted with Uniswap\'s finest technology, providing superior defense.',
    type: 'Chest',
    power: 60,
  },
  {
    index: 'uniswap-helmet',
    name: 'Uniswap Helmet',
    description: 'A durable helmet designed to protect against the toughest of challenges, powered by Uniswap.',
    type: 'Head',
    power: 30,
  },
  {
    index: 'uniswap-fortress-helmet',
    name: 'Uniswap Fortress Helmet',
    description: 'A helmet forged with Uniswap\'s advanced technology, offering unparalleled protection.',
    type: 'Head',
    power: 60,
  },
  {
    index: 'uniswap-sword',
    name: 'Uniswap Sword',
    description: 'A sharp and reliable sword that carries the strength of Uniswap.',
    type: 'Weapon',
    power: 30,
  },
  {
    index: 'uniswap-fortress-sword',
    name: 'Uniswap Fortress Sword',
    description: 'A powerful sword crafted with Uniswap\'s legendary prowess, providing unmatched offense.',
    type: 'Weapon',
    power: 60,
  },  

  /** PANCAKE */
  {
    index: 'pancake-gloves',
    name: 'Pancake Gloves',
    description: 'Light yet durable gloves powered by Pancake, offering excellent grip and protection.',
    type: 'Hands',
    power: 30,
  },
  {
    index: 'pancake-fortress-gloves',
    name: 'Pancake Fortress Gloves',
    description: 'Fortified gloves crafted with Pancake\'s finest materials, delivering superior defense.',
    type: 'Hands',
    power: 60,
  },
  {
    index: 'pancake-boots',
    name: 'Pancake Boots',
    description: 'Sturdy boots infused with Pancake\'s energy, perfect for any terrain.',
    type: 'Boots',
    power: 30,
  },
  {
    index: 'pancake-fortress-boots',
    name: 'Pancake Fortress Boots',
    description: 'Elite boots offering unmatched protection and performance, powered by Pancake.',
    type: 'Boots',
    power: 60,
  },
  {
    index: 'pancake-pants',
    name: 'Pancake Pants',
    description: 'Reliable pants crafted with Pancake technology, offering great mobility.',
    type: 'Pants',
    power: 30,
  },
  {
    index: 'pancake-fortress-pants',
    name: 'Pancake Fortress Pants',
    description: 'Advanced pants designed to provide exceptional durability and comfort, powered by Pancake.',
    type: 'Pants',
    power: 60,
  },  
];
  