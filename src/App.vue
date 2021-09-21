<template>
  <div id="nav">
    <router-link to="/">{{ $t("shared.home") }}</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>
