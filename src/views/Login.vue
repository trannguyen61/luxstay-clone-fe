<template>
  <div class="authentication-page">
      <welcome-banner></welcome-banner>
      <detail-banner>
        <login-form/>
      </detail-banner>
  </div>
</template>

<script>
import WelcomeBanner from '@/components/authentication/WelcomeBanner'
import DetailBanner from '@/components/authentication/DetailBanner'
import LoginForm from '@/components/authentication/LoginForm'

export default {
    components: { WelcomeBanner, DetailBanner, LoginForm }
}
</script>
