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
      <tbody>
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
      </tbody>
    </table>
  </div>

  <MainContainer />
</template>

<script setup>
import MainContainer from "./MainContainer.vue";
</script>