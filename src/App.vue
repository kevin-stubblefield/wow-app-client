<template>
	<router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
	--main-bg-color: #101110;
	--offset-row-bg-color: #181a18;
	--row-hover-bg-color: #3b3f3b;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
  background-color: var(--main-bg-color);
}

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ddd;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
