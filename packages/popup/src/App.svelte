<script lang="ts">
  import titleLogo from "./assets/title_icon.svg";
  import githubLogo from "./assets/github-icon.svg";
  import Setting from "./lib/Setting.svelte";
</script>

<main>
  <body>
    <div class="app">
      <div class="title-logo">
        <img src={titleLogo} alt="Jira Plus" />
      </div>
      <div class="subtitle">Quality of life changes to JIRA</div>

      <div class="divider" />

      <!-- Settings -->
      <ul class="settings">
        <Setting
          key="jira_plus_epic_links"
          settingName="Epic links"
          settingDescription="Add link to the title of epics on kanban boards"
        />
        <li class="setting" id="jira_plus_colored_epics">
          <div class="info">
            <span class="setting-name">Colored epics</span>
            <span class="setting-description"
              >Colored epics by project type in the kanban board</span
            >

            <div class="project-key-list">
              <span
                class="project-key-label"
                style="background-color: #ff5630; color: #000 "
                >Maintenance</span
              >
              <span
                class="project-key-label"
                style="background-color: #6555c0; color: #fff ">Feature</span
              >
              <span
                class="project-key-label"
                style="background-color: #00c7e6; color: #000 ">Incident</span
              >
              <span
                class="project-key-label"
                style="background-color: #2684ff; color: #000 ">QA</span
              >
            </div>
          </div>
          <input type="checkbox" />
        </li>
        <li class="setting" id="jira_plus_styling">
          <div class="info">
            <span class="setting-name">Styling</span>
            <span class="setting-description"
              >Add some "nice-to-have" styling to JIRA</span
            >
          </div>
          <input type="checkbox" />
        </li>
        <li class="setting" id="jira_plus_branchnames">
          <div class="info">
            <span class="setting-name">Git branch creation</span>
            <span class="setting-description"
              >Add parent keys to git branch creation copied value</span
            >
          </div>
          <input type="checkbox" />
        </li>
      </ul>

      <div class="requires-reload" style="display: none;">
        <span> Page reload required </span>
        <button id="reload-button">
          <span class="text">Reload</span>
          <svg class="spinner" viewBox="0 0 50 50">
            <circle
              class="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="5"
            />
          </svg>
        </button>
      </div>

      <div class="divider" />

      <div class="footer">
        <a
          href="https://github.com/arcuo/jira-plus"
          target="_blank"
          rel="noreferrer"
        >
          <div class="github-link">
            <img src={githubLogo} alt="Github" />
          </div>
        </a>
        <span class="author">Created by Benjamin Zachariae</span>
      </div>
    </div>
  </body>
</main>

<style>
</style>
