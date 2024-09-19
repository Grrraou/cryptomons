import { EquipementSlotType } from "@/stores/useItems";

export type Item = {
  index: string;
  name: string;
  description: string;
  type: EquipementSlotType;
  power: number;
  img?: boolean;
  xp?: number;
  damage?: number;
  mining?: number;
  effect?: () => void | number;
}

export const itemsEnum: Item[] = [
  /* {
    index: 'good_new_btc',
    name: 'Good News: Bitcoin is secure !',
    description: 'Increase bitcoin value by 5.',
    value: 100,
    type: 'Consumable',
    effect: function () {
      alert('good_new_btc');
      const storageIndex = 'cryptodollar_value_btc';
      const currentValue = parseFloat(localStorage.getItem(storageIndex) || '0');
      const newValue = currentValue + 5;
      localStorage.setItem(storageIndex, newValue.toString());
      const toast = useToast();
      toast.success('🚀 Bitcoin going to the moon ! 🚀');
    },
  }, */
  {
    index: 'binance-chestguard',
    name: 'Binance Chestguard',
    description: 'A sturdy chest armor infused with the power of Binance, offering strong protection.',
    type: 'Chest',
    power: 1,
    img: true,
  },
  {
    index: 'binance-fortress-plate',
    name: 'Binance Fortress Plate',
    description: 'An elite chestplate crafted with Binance\'s finest technology, providing superior defense.',
    type: 'Chest',
    power: 2,
    img: true,
  },
  {
    index: 'binance-helmet',
    name: 'Binance Helmet',
    description: '',
    type: 'Head',
    power: 1,
    img: true,
  },
  {
    index: 'binance-fortress-helmet',
    name: 'Binance Fortress Helmet',
    description: '',
    type: 'Head',
    power: 2,
    img: true,
  },
  {
    index: 'binance-sword',
    name: 'Binance Sword',
    description: '',
    type: 'Weapon',
    power: 1,
    img: true,
  },
  {
    index: 'binance-fortress-sword',
    name: 'Binance Fortress Sword',
    description: '',
    type: 'Weapon',
    power: 2,
    img: true,
  },
  {
    index: 'kraken-gloves',
    name: 'Kraken Gloves',
    description: '',
    type: 'Hands',
    power: 1,
    img: true,
  },
  {
    index: 'kraken-fortress-gloves',
    name: 'Kraken Fortress Gloves',
    description: '',
    type: 'Hands',
    power: 2,
    img: true,
  },
  {
    index: 'kraken-boots',
    name: 'Kraken Boots',
    description: '',
    type: 'Boots',
    power: 1,
    img: true,
  },
  {
    index: 'kraken-fortress-boots',
    name: 'Kraken Fortress Boots',
    description: '',
    type: 'Boots',
    power: 2,
    img: true,
  },
  {
    index: 'kraken-pants',
    name: 'Kraken Pants',
    description: '',
    type: 'Pants',
    power: 1,
    img: true,
  },
  {
    index: 'kraken-fortress-pants',
    name: 'Kraken Fortress pants',
    description: '',
    type: 'Pants',
    power: 2,
    img: true,
  },
];
  