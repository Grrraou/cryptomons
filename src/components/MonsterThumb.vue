<template>
  <div class="monsterThumb" @click="attackManually($event)" id="DomId">
    <img v-if="battlefieldStore.currentMonster"
      :src="battlefieldStore.getMonsterImage()"
      :alt="battlefieldStore.currentMonster.name"
      draggable="false"
      class="monster-portrait" />
    <p v-if="battlefieldStore.currentMonster">{{ battlefieldStore.currentMonster.name }} (HP: {{ battlefieldStore.currentMonster.health }})</p>
    <p v-else>No monster</p>
  </div>
</template>
  
<script lang="ts">
import BattlefieldManager from '@/managers/BattlefieldManager';
import { defineComponent } from 'vue';
import UXManager from '@/managers/UXManager';
  
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
      console.log(battlefieldStore.index);

      battlefieldStore.currentMonster;
      const monsterImage = `/monsters/${battlefieldStore.currentMonster.index}.png`;
      if (!battlefieldStore.currentMonster.health) {
        battlefieldStore.setMonster();
      }

      const attackManually = (event: MouseEvent) => {
        const damage = battlefieldStore.getDefaultDamage();
        console.log(battlefieldStore.currentMonster.index)
        battlefieldStore.damageMonster(damage);
        const x = event.clientX;
        const y = event.clientY;
        UXManager.showFlyingText('⚔️' + damage.toString(), null, x, y);
        console.log(battlefieldStore.currentMonster.health)
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
  