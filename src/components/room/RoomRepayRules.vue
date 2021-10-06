<template>
  <h3>{{ $t("pages.room.repay_rules") }}</h3>
  <h4>{{ $t("pages.room.cancel_rules") }}</h4>
  <p class="mb-3">{{ $t("pages.room.repay_rules_description") }}</p>

  <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>

    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" :label="$t('pages.room.price_date')" />
        <el-table-column prop="time" :label="$t('pages.room.time')" />
    </el-table>
</template>

<script>
import { computed } from 'vue';

import { i18n } from "@/plugins/i18n/i18n";

export default {
    props: {
        time: {
            type: Object,
            default: () => {}
        }
    },

    setup(props) {
        const activities = computed(() => [
        {
          content: i18n.global.t('pages.room.rules.book_success'),
          color: '#0bbd87',
          icon: 'el-icon-check',
          timestamp: i18n.global.t('pages.room.rules.repay_100'),
        },
        {
          content: i18n.global.t('pages.room.rules.after_48'),
          timestamp: i18n.global.t('pages.room.rules.repay_100_no_service'),
          color: 'rgb(255, 181, 0)',
          hollow: true,
        },
        {
          content: i18n.global.t('pages.room.rules.5_day_to_checkin'),
          timestamp: i18n.global.t('pages.room.rules.repay_50'),
          color: '#f65e39',
          hollow: true,
        },
        {
          content: i18n.global.t('pages.room.rules.checkin'),
          timestamp: '',
          color: '#f65e39',
          icon: 'el-icon-house',
        },
      ])

      const tableData = computed(() => [
          {
              date: 'Check-in',
              time: props.time.checkin_time
          },
          {
              date: 'Check-out',
              time: props.time.checkout_time
          }
      ])

      return {
          activities,
          tableData
      }
    }
}
</script>