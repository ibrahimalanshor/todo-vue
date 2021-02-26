<template>
	<div class="modal">
		<div class="overlay"></div>
		<div class="body">
			<div class="head">
				{{ title }}
				<button @click="close">
					<svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="slot">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'close']
	}
</script>