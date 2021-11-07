<template>
  <div class="authentication-page">
      <welcome-banner></welcome-banner>
      <detail-banner></detail-banner>
  </div>
</template>

<script>
import WelcomeBanner from '@/components/authentication/WelcomeBanner'
import DetailBanner from '@/components/authentication/DetailBanner'

export default {
    components: { WelcomeBanner, DetailBanner }
}
</script>
