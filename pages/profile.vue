<template>
	<v-container class="fill-height pa-4 ma-0 " fluid full-width>
		<v-btn
			v-show="fab"
			v-scroll="onScroll"
			fab
			dark
			fixed
			bottom
			right
			color="primary"
			@click="toTop"

		>
			<v-icon>mdi-menu-up</v-icon>
		</v-btn>
		<v-row
			class="fill-height"
			wrap
			fluid
			align="center"
			justify="space-between"

		>
			<v-col

				cols="12"
				xs="8"
				md="4"
				sm="8"

				class="fill-height"

			>
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

					<h1 class="ma-6">
						John Doe
					</h1>
					<v-list>
						<v-divider class="mt-5 mb-5" />
						<v-list-item-group v-model="model" class="text-left">
							<v-list-item
								v-for="(item, i) in items"
								:key="i"
							>
								<v-list-item-icon>
									<v-icon v-text="item.icon" />
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title v-text="item.text" />
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-col>

			<v-col

				class="fill-height"
				cols="12"
				xs="8"
				md="7"
				sm="8"
				fluid
			>
				<v-card
					v-for="(item, i) in posts"
					:key="i"
					class="mx-auto ma-7"
					max-width="400"
				>
					<v-card-subtitle fluid class="pl-3 pr-3 ">
						<v-list-item class="text-left m0-0 pa-0" fluid>
							<v-list-item-avatar color="grey darken-3">
								<v-img
									lazy-src="https://images.pexels.com/photos/4646246/pexels-photo-4646246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
									max-height="200"
									max-width="200"
									src="https://images.pexels.com/photos/4646246/pexels-photo-4646246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
									style="border-radius:100%"

									height="50"
									width="50"
								/>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title>John Doe</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-card-subtitle>

					<v-card-text class="text--primary">
						<div>Whitehaven Beach</div>

						<div>Whitsunday Island, Whitsunday Islands</div>
					</v-card-text>
					<v-img
						class="white--text align-end"
						height="200px"
						src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
					/>

					<v-card-actions>
						<v-btn
							color="blue"
							text
						>
							<v-icon class="mr-1">
								mdi-heart
							</v-icon>
						</v-btn>

						<v-btn
							color="blue"
							text
						>
							<v-icon class="mr-1">
								mdi-share-variant
							</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		</v-app>
	</v-container>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,500&display=swap");
* {
  font-family: "Montserrat", sans-serif;
}
</style>

<script>
import auth from '@/middleware/auth'

export default {
  data () {
    return {
      fab: false,

      msg: '',
      items: [
        {
          icon: 'mdi-inbox',
          text: 'johndoe@mail.com'
        },
        {
          icon: 'mdi-map-marker-outline',
          text: 'Iraq'
        },
        {
          icon: 'mdi-send',
          text: 'Send'
        },
        {
          icon: 'mdi-email-open',
          text: 'Drafts'
        }
      ],
      model: 1,
      posts: [
        {
          image: '',
          text: ''
        },
        {
          image: '',
          text: ''
        },
        {
          image: '',
          text: ''
        }
      ]
    }
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
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') { return }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
