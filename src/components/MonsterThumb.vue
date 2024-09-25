<template>
  <div class="monsterThumb" @click="attackManually($event)" id="DomId">
    <img v-if="battlefieldStore.currentMonster"
      :src="battlefieldStore.getMonsterImage()"
      :alt="battlefieldStore.currentMonster.name"
      draggable="false"
      class="monster-portrait" />
    <p v-if="battlefieldStore.currentMonster">
      {{ battlefieldStore.currentMonster.name }}
      <span class="monster-life">{{ battlefieldStore.currentMonster.health?.toFixed(2) }} HP</span>
    </p>
    <p v-else>No monster</p>
  </div>
</template>
  
<script lang="ts">
import BattlefieldManager from '@/managers/BattlefieldManager';
import { defineComponent } from 'vue';
import UXManager from '@/managers/UXManager';
import ItemManager from '@/managers/ItemManager';
  
export default defineComponent({
    props: {
        monster: {
            type: Object as () => { index: string; name: string },
            required: true,
        },
        battlefield: {
            type: Object as () => { index: string },
            required: true,
        },
    },
    setup(props) {
      const battlefieldStore = BattlefieldManager.getBattlefieldStore(props.battlefield.index);
      const DomId = `monster_${battlefieldStore.index}`;

      battlefieldStore.currentMonster;
      const monsterImage = `/monsters/${battlefieldStore.currentMonster.index}.png`;
      if (!battlefieldStore.currentMonster.health) {
        battlefieldStore.setMonster();
      }

      const attackManually = (event: MouseEvent) => {
        let damage = battlefieldStore.getDefaultDamage();
        damage *= 1 + (ItemManager.getItemStore().getEquipementStats().damage / 100);
        battlefieldStore.damageMonster(damage);
        battlefieldStore.clicks += 1;
        const x = event.clientX;
        const y = event.clientY;
        UXManager.showFlyingText('⚔️' + damage.toFixed(2).toString(), null, x, y);
      };

      return {
        DomId,
        battlefieldStore,
        monsterImage,
        attackManually,
      };
    },
  });
  </script>
  
  <style scoped>
  .monster-area p {
    color: #444;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
  }
  
  .monster-portrait {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 33%;
    margin-bottom: 10px;
    border: 3px solid #ffa500;
  }
  </style>
  