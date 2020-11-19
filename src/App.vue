<template>
	<router-view />
</template>

<script>
export default {
  name: 'App',

  mounted: function() {
    this.setupWowhead();
  },
  
  methods: {
		setupWowhead: function() {
			let script = document.createElement('script');
			script.setAttribute('src', '/wowhead.js');

			let externalScript = document.createElement('script');
			externalScript.setAttribute('src', 'https://wow.zamimg.com/widgets/power.js');

			document.head.appendChild(script);
			document.head.appendChild(externalScript);
		},
  }
}
</script>

<style>
:root {
  --primary-font: #fff;
	--primary-bg: #1D1D1D;
	--secondary-bg: #292929;
	--row-hover: #353535;
  --select-border: #bbb;
  --select-text: var(--primary-font);
  --select-bg-top: #101110;
  --select-bg-bottom: #181a18;
  --select-hover: #fff;
  --option-text: #101110;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
  background-color: var(--primary-bg);
}

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary-font);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}
</style>
