<script>
  import { beforeUpdate } from 'svelte';
  import Fibonacci from './Fibonacci.svelte';
  import { isLight } from '../utils';
  import scriptsJson from '../scripts.json';

  export let color = '#212121';
  export let value = 0;
  export let opacity = 0;
  export let mode = 'standard';

  let background = '#fafafa';
  let scripts = [];

  beforeUpdate(() => {
    const [locale] = navigator.language.split('-');

    if (isLight(color)) {
      background = '#212121';
    }

    if (mode === 'script') {
      try {
        scripts = scriptsJson[locale][`${value}`];
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  });
</script>

<div class="verso" style={`background:${background};`}>
  <Fibonacci {color} style="top:-1px;right:-1px;transform:scaleX(-1);" />
  {#if scripts && scripts.length > 0}
    <span class="script" style={`color:${color};opacity:${opacity};`}>{scripts[0]}</span>
  {/if}
  <p style={`color:${color};`}>{value}</p>
  {#if scripts && scripts.length > 1}
    <span class="script" style={`color:${color};opacity:${opacity};`}>{scripts[1]}</span>
  {/if}
  <Fibonacci {color} style="bottom:-1px;left:-1px;transform:scaleY(-1);" />
</div>

<style>
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
  }

  div.verso {
    transform: rotateY(180deg);
  }

  div.verso .script {
    position: absolute;
    margin: 1rem;
    font-family: 'Bad Script', cursive;
    font-size: 1.5rem;
    transform: rotate(-22.5deg);
    transition: opacity 2s;
  }

  div.verso .script:first-of-type {
    top: 50px;
    left: 10px;
  }

  div.verso .script:last-of-type {
    bottom: 50px;
    right: 10px;
  }
</style>
