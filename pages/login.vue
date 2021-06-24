<template>
	<v-row align="center" justify="center">
		<v-col cols="12" sm="8" md="5">
			<v-card light>
				<v-row>
					<v-col>
						<v-card-text class="mt-5 mb-5 pa-7">
							<h1

								class="mb-6 text-center display-2 light-blue--text text--light-blue "
							>
								Login
							</h1>

							<v-form
								ref="form"
								v-model="valid"
								lazy-validation>
								<v-text-field
									v-model="email"
									label="Email"
									name="Email"
									prepend-icon="email"
									type="text"
									color="light-blue "
									:rules="emailRules"
									value="w@w.com"
								/>

								<v-text-field
									id="password"
									v-model="password"
									label="Password"
									name="password"
									prepend-icon="lock"
									type="password"
									color="light-blue "
									:rules="passRules"
									value="w"
								/>
							</v-form>
							<h3 class="text-center mt-3">
								Forgot your password ?
							</h3>
							<div class="text-center mt-5">
								<v-btn
									rounded
									color="light-blue "
									dark
									:disabled="!valid"
									@click="validate">
									Login
								</v-btn>
							</div>
						</v-card-text>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import auth from '@/middleware/auth'
  export default {

      data: () => ({
          valid: true,
          email: 's@s.mail.com',
          emailRules: [
              v => !!v || 'Email is required',
              v => (v && v.length >= 4) || 'Email must be longer',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
          ],
          password: 'shko1234',
          passRules: [
              v => !!v || 'Password is required',
              v => (v && v.length >= 1) || 'Password must be longer than 1'

          ]

      }),

      methods: {
          validate () {
            this.$refs.form.validate()
			this.sendInfo()
          },
          async sendInfo () {
              try {
                  const resp = await auth.Login({
                    email: this.email,
                    password: this.password
                  })

				document.cookie = JSON.stringify({
					accessToken: resp.data.access_token
				})
                console.log(resp)
              } catch (error) {
                console.log(error)
              }
          }
      }
  }
</script>

<style scoped>

</style>
