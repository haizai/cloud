<template>
  <div :id="id"></div>
</template>

<script>
  export default {
    props: ['data', 'title', 'id'],
    ready() {
      new iChart.Pie2D({
        render: this.id,
        data: this.data,
        title: this.title,
        subtitle: {
          text: '单选',
          fontsize: 14,
          color: '#666'
        },
        sub_option: {
          label: {
            border: {
              width: 0
            }
          },
           border: {
            width: 1,
            color: '#fff'
          }
        },
        background_color: window.getComputedStyle(document.getElementsByClassName('content')[0])["background-color"],
        showpercent: true,
        decimalsnum: 1,
        offset_angle: -180,
        width: 756,
        height: 300,
        border: null
      }).draw()

    }
  }
</script>
