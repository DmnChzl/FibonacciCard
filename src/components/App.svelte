<script>
  import { onMount } from 'svelte';
  import Recto from './Recto.svelte';
  import Verso from './Verso.svelte';
  import { genFibonacci } from '../utils';
  import { COLORS } from '../constants';

  export let maxLength = 6;

  let sequence = [];
  let phi = 0;
  let color = '#212121';
  let reversed = true;
  let pulsed = false;
  let loading = true;
  let opacity = 0;
  let mode = 'standard';

  // prettier-ignore
  const setThemeColorMeta = content => document.querySelector("meta[name='theme-color']").setAttribute('content', content);
  const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    sequence = genFibonacci(maxLength);

    /**
     * Check 'limit' urlSearchParam,
     * and set Fibonacci sequence
     */
    if (urlParams.has('limit')) {
      const limit = urlParams.get('limit');
      sequence = sequence.filter(n => n <= limit);
    }

    // Check 'mode' urlSearchParam
    if (urlParams.has('mode')) {
      mode = urlParams.get('mode');
    }

    phi = sequence[sequence.length - 1];
    color = getRandom(COLORS);
    setThemeColorMeta(color);

    // Reverse card after 1 second
    setTimeout(() => {
      reversed = false;
    }, 1000);

    /**
     * Then, activate pulse animation,
     * and enable card after 2 seconds
     */
    setTimeout(() => {
      pulsed = true;
      loading = false;
    }, 2 * 1000);
  });

  const handleClick = () => {
    if (reversed) {
      reversed = false;

      /**
       * Activate pulse animation,
       * and reset opacity after 1 second
       */
      setTimeout(() => {
        pulsed = true;
        opacity = 0;
      }, 1000);
    } else {
      pulsed = false;

      /**
       * Set value with random Fibonacci number,
       * and reverse card after 0.5 second
       */
      setTimeout(() => {
        phi = getRandom(sequence);
        reversed = true;
      }, 0.5 * 1000);

      // Then, set opacity after 1.5 second
      setTimeout(() => {
        opacity = 1;
      }, 1.5 * 1000);
    }
  };
</script>

<div class="container" style={`background: ${color};`}>
  <button
    class="card no-user-select"
    class:reverse={reversed}
    class:pulse={pulsed}
    on:click={handleClick}
    disabled={loading}
  >
    <Recto {color} />
    <Verso {color} value={phi} {opacity} {mode} />
  </button>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    perspective: 800px;
  }

  .card {
    position: relative;
    width: 250px;
    height: 350px;
    border-radius: 0.5rem;
    transform-style: preserve-3d;
    transition: transform 0.75s ease-in-out;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .card:focus {
    outline: none;
  }

  .card.reverse {
    transform: rotateY(180deg);
  }

  .card.pulse {
    animation: pulse 2s infinite;
  }
</style>
