<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="8">
						<v-card light>
							<v-row>
								<v-col cols="12" md="8">
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
											/>
										</v-form>
										<h3 class="text-center mt-4">
											Forgot your password ?
										</h3>
									</v-card-text>
									<div class="text-center mb-3">
										<v-btn
											rounded
											color="light-blue "
											dark
											:disabled="!valid"
											@click="validate">
											Login
										</v-btn>
									</div>
								</v-col>
							</v-row>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import auth from '@/middleware/auth'
  export default {

      data: () => ({
          valid: true,
          email: '',
          emailRules: [
              v => !!v || 'Email is required',
              v => (v && v.length >= 4) || 'Email must be longer',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
          ],
          password: '',
          passRules: [
              v => !!v || 'Password is required',
              v => (v && v.length > 6) || 'Password must be longer than 6'

          ]

      }),

      methods: {
          validate () {
              this.$refs.form.validate()
          },
          async sendInfo () {
              try {
                  const resp = await auth.Login({
                      email: this.email,
                      password: this.password
                  })
                  console.log(resp.data)
              } catch (error) {
                  console.log(error)
              }
          }
      }
  }
</script>

<style scoped>
.login-page{
    background: pink;
    height: 100vh !important;
    display: grid;
    place-items: center;
    grid-template-rows: 1fr 9fr;
}
</style>
