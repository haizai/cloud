<template>
  <div :id="id"></div>
</template>

<script>
  export default {
    props: ['data', 'title', 'id','maxvalue'],
    ready() {
      new iChart.Bar2D({
        render : this.id,
        data: this.data,
        title: this.title,
        subtitle: {
          text: '多选',
          fontsize: 14,
          color: '#666'
        },
        background_color: window.getComputedStyle(document.getElementsByClassName('content')[0])["background-color"],
        width : 756,
        height : 300,
        border: null,
        sub_option: {
          label:{
            color: '#333'
          }
        },
        coordinate:{
          axis: {
            color: '#aaa',
            width: [0, 0, 1, 1]
          },
          scale:[{
            position: 'bottom', 
            start_scale: 0,
            end_scale: this.maxvalue,
            scale_space: this.maxvalue / 5,
            listeners: {
              parseText: t => {
                return {text: (t / this.maxvalue * 100) + '%'}
              }
            }
          }]
        }
      }).draw();
    }
  }
</script>