<script>
	import { beforeUpdate } from 'svelte';
	import Fibonacci from "./Fibonacci.svelte";
  import { isLight } from '../utils';

  export let color = '#212121';
  export let value = 0;
  let background = '#fafafa';

  beforeUpdate(() => {
    if (isLight(color)) {
      background = '#212121';
    }
  });
</script>

<div class="verso" style={`background:${background};`}>
  <Fibonacci color={color} style="top:-1px;right:-1px;transform:scaleX(-1);" />
  <p style={`color:${color};`}>{value}</p>
  <Fibonacci color={color} style="bottom:-1px;left:-1px;transform:scaleY(-1);" />
</div>

<style lang="scss">
div {
	position: absolute;
  width: 100%;
  height: 100%;
	border-radius: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  &.verso {
    transform: rotateY(180deg);
  }
}
</style>
