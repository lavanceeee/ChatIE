<template>
  <div class="top-container">
    <div class="title-container">
      <div class="title">ChatIE</div>

      <div class="title_mark">
        frok from
        <a href="https://github.com/cocacola-lab/ChatIE">cocacola-lab</a>
      </div>
    </div>

    <div class="note-container">
      <details>
        <summary>NOTICE</summary>

        <p>
          It's a rebuilt version of
          <a href="https://github.com/cocacola-lab/ChatIE">ChatIE</a> and I
          carry out the engineering transformation of this project.
        </p>

        <p>
          This project uses doubao API for IE extration and I will provide a
          default AIP key, if it doesn't work, you can send
          <a href="https://github.com/lavanceeee/ChatIE/issues">issue</a> to
          tell me.
        </p>

        <p>
          You can
          <a href="https://www.volcengine.com/product/doubao">register</a> your
          own API key for free trail.
        </p>
      </details>

      <div style="margin-top: 1rem">
        <a href="https://github.com/lavanceeee/ChatIE">Github</a>
      </div>
    </div>

    <table>
      <tr>
        <td>RE</td>
        <td>entity-relation joint extraction</td>
      </tr>

      <tr>
        <td>NER</td>
        <td>named entity recoginzation</td>
      </tr>

      <tr>
        <td>EE</td>
        <td>event extraction</td>
      </tr>
    </table>
  </div>

  <MainContainer />
</template>

<script setup>
import MainContainer from "./MainContainer.vue";
</script>

<style scoped>
.top-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 10px;
}

.top-container .title-container {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 1rem;
}

.top-container .title {
  font-size: 3rem;
  font-weight: 600;
}

table {
  width: 35rem;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
  border-top: 2px solid #6969699a;
  border-bottom: 2px solid #6969699a;
}
td {
  padding: 20px 50px;
  text-align: center;
  border-top: 1px solid #6666668c;
  border-bottom: 1px solid #6666668c;
}

.note-container {
  width: 35rem;
  height: auto;
  padding: 0 10px;
}
</style>