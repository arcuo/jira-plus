<script lang="ts">
  export let key: string;
  export let settingName: string;
  export let settingDescription: string;
</script>

<li class="setting" id={key}>
  <div class="info">
    <span class="setting-name">{settingName}</span>
    <span class="setting-description">{settingDescription}</span>
  </div>
  <input type="checkbox" />
</li>
