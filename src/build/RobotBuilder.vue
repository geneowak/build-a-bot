<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <div class="top-row">
      <div class="top part">
        <div class="robot-name">
          {{selectedRobot.head.title}}
          <span v-if="selectedRobot.head.onSale" class="sale">On sale</span>
        </div>
        <img :src="selectedRobot.head.src" title="head" />
        <button @click="selectPrevious('head')" class="prev-selector">&#9668;</button>
        <button @click="selectNext('head')" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" title="left arm" />
        <button @click="selectPrevious('leftArm')" class="prev-selector">&#9650;</button>
        <button @click="selectNext('leftArm')" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="torso" />
        <button @click="selectPrevious('torso')" class="prev-selector">&#9668;</button>
        <button @click="selectNext('torso')" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" title="right arm" />
        <button @click="selectPrevious('rightArm')" class="prev-selector">&#9650;</button>
        <button @click="selectNext('rightArm')" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="base" />
        <button @click="selectPrevious('base')" class="prev-selector">&#9668;</button>
        <button @click="selectNext('base')" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(robot, index) in cart">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import avalaibleParts from '../data/parts';

const getPreviousValidIndex = (index, length) => {
  const decrementedIndex = index - 1;
  return decrementedIndex < 0 ? length - 1 : decrementedIndex;
};
const getNextValidIndex = (index, length) => {
  const incrementedIndex = index + 1;
  return incrementedIndex >= length ? 0 : incrementedIndex;
};
export default {
  name: 'RobotBuilder',
  data() {
    return {
      avalaibleParts,
      cart: [],
      selectedHeadIndex: 0,
      selectedTorsoIndex: 0,
      selectedLeftArmIndex: 0,
      selectedRightArmIndex: 0,
      selectedBaseIndex: 0,
    };
  },
  computed: {
    selectedRobot() {
      return {
        leftArm: avalaibleParts.arms[this.selectedLeftArmIndex],
        rightArm: avalaibleParts.arms[this.selectedRightArmIndex],
        torso: avalaibleParts.torsos[this.selectedTorsoIndex],
        base: avalaibleParts.bases[this.selectedBaseIndex],
        head: avalaibleParts.heads[this.selectedHeadIndex],
      };
    },
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.rightArm.cost
        + robot.torso.cost
        + robot.base.cost;
      this.cart.push(Object.assign({}, robot, { cost }));
    },
    selectNext(itemName) {
      switch (itemName) {
        case 'head':
          this.selectedHeadIndex = getNextValidIndex(
            this.selectedHeadIndex,
            avalaibleParts.heads.length,
          );
          break;
        case 'torso':
          this.selectedTorsoIndex = getNextValidIndex(
            this.selectedTorsoIndex,
            avalaibleParts.torsos.length,
          );
          break;
        case 'leftArm':
          this.selectedLeftArmIndex = getNextValidIndex(
            this.selectedLeftArmIndex,
            avalaibleParts.arms.length,
          );
          break;
        case 'rightArm':
          this.selectedRightArmIndex = getNextValidIndex(
            this.selectedRightArmIndex,
            avalaibleParts.arms.length,
          );
          break;
        case 'base':
          this.selectedBaseIndex = getNextValidIndex(
            this.selectedBaseIndex,
            avalaibleParts.bases.length,
          );
          break;

        default:
          break;
      }
    },
    selectPrevious(itemName) {
      switch (itemName) {
        case 'head':
          this.selectedHeadIndex = getPreviousValidIndex(
            this.selectedHeadIndex,
            avalaibleParts.heads.length,
          );
          break;
        case 'torso':
          this.selectedTorsoIndex = getPreviousValidIndex(
            this.selectedTorsoIndex,
            avalaibleParts.torsos.length,
          );
          break;
        case 'leftArm':
          this.selectedLeftArmIndex = getPreviousValidIndex(
            this.selectedLeftArmIndex,
            avalaibleParts.arms.length,
          );
          break;
        case 'rightArm':
          this.selectedRightArmIndex = getPreviousValidIndex(
            this.selectedRightArmIndex,
            avalaibleParts.arms.length,
          );
          break;
        case 'base':
          this.selectedBaseIndex = getPreviousValidIndex(
            this.selectedBaseIndex,
            avalaibleParts.bases.length,
          );
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.part img {
  width: 165px;
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  right: 30px;
  width: 220px;
  padding: 3px;
  font-size: 16px;
}
td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
</style>
