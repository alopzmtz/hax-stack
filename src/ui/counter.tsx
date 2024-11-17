export const Counter = () => (
  <div x-data="{ count: 0 }">
    <h2>Alpine Counter</h2>
    <button x-on:click="count++">
      Count: <span x-text="count">0</span>
    </button>
  </div>
) 