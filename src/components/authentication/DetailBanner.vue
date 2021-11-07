<template>
    <div class="detail-banner">
        <div class="container container--sm">
            <div class="row">
                <div class="col-xs-12 col-md-8">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <div class="detail">
                                <img :src="require('@/assets/images/coins@2x.png')" width="65" height="70">
                                <h3 class="detail__title">{{ $t("pages.authen.detail_01") }}</h3>
                                <p class="detail__content m-0">{{ $t("pages.authen.detail_desc_01") }}</p>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <div class="detail">
                                <img :src="require('@/assets/images/top-sales@2x.png')" width="55" height="70">
                                <h3 class="detail__title">{{ $t("pages.authen.detail_02") }}</h3>
                                <p class="detail__content m-0">{{ $t("pages.authen.detail_desc_02") }}</p>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <div class="detail">
                                <img :src="require('@/assets/images/wallet@2x.png')" width="60" height="70">
                                <h3 class="detail__title">{{ $t("pages.authen.detail_03") }}</h3>
                                <p class="detail__content m-0">{{ $t("pages.authen.detail_desc_03") }}</p>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                            <div class="detail">
                                <img :src="require('@/assets/images/backpack@2x.png')" width="55" height="70">
                                <h3 class="detail__title">{{ $t("pages.authen.detail_04") }}</h3>
                                <p class="detail__content m-0">{{ $t("pages.authen.detail_desc_04") }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>