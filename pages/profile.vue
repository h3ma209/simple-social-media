<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<h1>hey</h1>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<style scoped>

</style>

<script>
import auth from '@/middleware/auth'

export default {

	beforeMount: async function () {
		try {
			const resp = await auth.CheckToken(JSON.parse(document.cookie).accessToken)
			console.log(resp)
		} catch (e) {
			console.log(e)
		}
	}

}
</script>
