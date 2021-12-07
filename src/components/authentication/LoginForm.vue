<template>
  <div class="authen-form card">
    <h2 class="mb-3">{{ $t("pages.authen.login") }}</h2>
    <form>
      <div class="authen-form--input">
        <label for="email" class="required">{{
          $t("pages.authen.email")
        }}</label>
        <el-input
          name="email"
          v-model="email"
          placeholder=""
          @input="changeEmail"
        >
          <template #suffix>
            <font-awesome-icon icon="envelope" class="mr-1" />
          </template>
        </el-input>
        <small class="text-danger">{{
          notValidEmail ? $t("errors.not_valid_email") : ""
        }}</small>
      </div>

      <div class="authen-form--input">
        <label for="password" class="required">{{
          $t("pages.authen.password")
        }}</label>
        <el-input
          name="password"
          v-model="password"
          placeholder=""
          show-password
          @input="changePassword"
        ></el-input>
        <small class="text-danger">{{
          notValidPassword ? $t("errors.not_valid_password") : ""
        }}</small>
      </div>

      <el-button
        round
        :disabled="notValidForm"
        class="el-button--active block-btn mt-6"
        @click="login"
      >
        {{ $t("pages.authen.login_btn") }}
      </el-button>
    </form>

    <div class="mt-3 d-flex justify-content-center">
      {{ $t("pages.authen.not_have_acc") }}
      <router-link to="#" class="link link--highlight ml-1">{{
        $t("pages.authen.signup_btn")
      }}</router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

import useAuthenForm from "@/composables/useAuthenForm";

import authApi from '@/api/services/authApi.js'
import ApiHandler from '@/helpers/ApiHandler'
import ResponseHelper from '@/helpers/ResponseHelper'

export default {
  setup() {
    const store = useStore();
    let {
      email,
      password,
      notValidEmail,
      notValidPassword,
      changeEmail,
      changePassword,
    } = useAuthenForm();

    const router = useRouter();

    const login = async () => {
      const reqBody = {
        "email": email.value,
        "password": password.value
      }

      const handler = new ApiHandler()
                          .setData(reqBody)
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            
                            if (data.isSuccess()) {
                              store.commit('changeToken', data.data.token)
                              store.commit('changeUser', data.data.user)

                              ElNotification({
                                title: "Logged in successfully!",
                                message: "Welcome to Lxstay!",
                                type: "success",
                              });
                              
                              router.push({
                                name: "Home"
                              });
                            } else {
                              ElNotification({
                                title: "Can't sign in",
                                message: data.error,
                                type: "error",
                              });
                            }
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return authApi.postSignIn(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    };

    const notValidForm = computed(() => {
      return !email.value || !password.value;
    });

    return {
      email,
      password,
      login,
      notValidForm,
      notValidEmail,
      notValidPassword,
      changeEmail,
      changePassword,
    };
  },
};
</script>