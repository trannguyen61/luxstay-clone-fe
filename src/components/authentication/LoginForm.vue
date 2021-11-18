<template>
  <div class="authen-form card">
      <h2 class="mb-3">{{ $t("pages.authen.login") }}</h2>
      <form>
          <div class="authen-form--input">
              <label for="email" class="required">{{ $t("pages.authen.email") }}</label>
              <el-input name="email" v-model="email" placeholder="">
                    <template #suffix>
                        <font-awesome-icon icon="envelope" class="mr-1" />
                    </template>
                </el-input>
          </div>

          <div class="authen-form--input">
              <label for="password" class="required">{{ $t("pages.authen.password") }}</label>
              <el-input name="password" v-model="password" placeholder="" show-password></el-input>
          </div>

          <el-button round :disabled="notValidForm" class="el-button--active block-btn mt-6" @click="login">
            {{ $t("pages.authen.login_btn") }}
            </el-button>
      </form>

      <div class="mt-3 d-flex justify-content-center">
          {{ $t("pages.authen.not_have_acc") }}
        <router-link to="#" class="link link--highlight ml-1" >{{ $t("pages.authen.signup_btn") }}</router-link>
      </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    // const store = useStore();

    let email = ref("");
    let password = ref("");

    const login = () => {}

    const notValidForm = computed(() => {
        return !email.value || !password.value
    })

    return {
      email,
      password,
      login,
      notValidForm,
    };
  }
}
</script>