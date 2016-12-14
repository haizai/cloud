<template>
  <div :id="id"></div>
</template>

<script>
  export default {
    props: ['data', 'title', 'id'],
    computed: {
      centerText() {
        return (Math.round((this.data[0].value / (this.data[0].value + this.data[1].value)).toFixed(2) * 100)) + "%"
      }
    },
    ready() {
      new iChart.Donut2D({
        render: this.id,
        data: this.data,
        title: this.title,
        subtitle: {
          text: '文本题',
          fontsize: 14,
          color: '#666'
        },
        sub_option: {
          label: {
            border: {
              width: 0
            }
          }
        },
        center: {
          text: this.centerText,
          fontsize: 30
        },
        background_color: window.getComputedStyle(document.getElementsByClassName('content')[0])["background-color"],
        showpercent: true,
        decimalsnum: 1,
        offset_angle: -180,
        width: 756,
        height: 300,
        border: null
      }).draw();
    }
  }
</script>