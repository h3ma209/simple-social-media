<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row class="fill-height" fluid>
					<v-col style="background:pink">
						<v-card class="pa-5" align="center" justify="center">
							<v-img
								lazy-src="https://images.pexels.com/photos/4646246/pexels-photo-4646246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
								max-height="200"
								max-width="200"
								src="https://images.pexels.com/photos/4646246/pexels-photo-4646246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
								style="border-radius:100%"

								height="150"
								width="150"
							/>
							<v-divider width="50%" class="mt-5 mb-5" />
							<h1>John Doe</h1>
						</v-card>
					</v-col>
					<v-col style="background:grey">
						<v-card class="pa-2" outlined tile>
							One of three columns
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,500&display=swap');
*{
	font-family: 'Montserrat', sans-serif;
}
</style>

<script>

import auth from '@/middleware/auth'

export default {
  data () {
    return { msg: '' }
  },
  beforeMount: async function () {
    try {
      const resp = await auth.CheckToken(
        JSON.parse(document.cookie).accessToken
      )
      this.msg = resp.data
      console.log(resp)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
