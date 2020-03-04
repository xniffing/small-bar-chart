<template>
  <section style="margin: 12px">
    <div :style="widgetSize" class="graph-card columns is-block">
      <div class="column graph-title h4 has-text-centered" :style="[isDark ? darkStyle: lightStyle]">{{title}}</div>
      <div class="graph-content has-text-centered">
        <div class="graph-underlay is-flex" :style="[isDark ? darkStyle: lightStyle]">
          <div v-for="item in widgetData" class="graph" :style="item.perc" :key="item.value.key">
            <div class="has-text-centered is-full"></div>
          </div>
        </div>
        <div class="graph-value" :style="[isDark ? darkColor: lightColor]">{{lastValue}}</div>
      </div>
    </div>
  </section>
</template>
<script>
    export default {
        name: "SoloBarGraph",
        props: {
            title: {
                type: String,
                required: true
            },
            dataObject: {
                type: Object,
                required: true
            },
            isMedium: {
                type: Boolean,
                default: false
            },
            isLarge: {
                type: Boolean,
                default: false
            },
            isExtraLarge: {
                type: Boolean,
                default: false
            },
            isDark: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                darkStyle: {
                    background: 'black',
                    color: 'white'
                },
                lightStyle: {
                    background: 'white',
                    color: 'black'
                },
                lightColor: {
                    color: 'black'
                },
                darkColor: {
                    color: 'white'
                }
            }
        },
        computed: {
            lastValue() {
                return this.dataObject.data[this.dataObject.data.length - 1]
            },
            maxValue() {
                return Math.max(...this.dataObject.data)
            },
            widgetData() {
                let formatted = []
                for (const value of this.dataObject.data) {
                    let calculation = ((value / this.maxValue) * 100).toFixed(0)
                    let colorRamp = ((value / this.maxValue) * 100).toFixed(0)
                    formatted.push({
                        perc: {
                            height: calculation + '%',
                            background: 'hsl(' + colorRamp + ', 100%, 50%)'
                        },
                        value: value
                    })
                }
                return formatted
            },
            widgetSize() {
                let spacer = 200
                if (this.isMedium === true) {
                    return {'--card-size': spacer + 50 + 'px'}
                }
                if (this.isExtraLarge === true) {
                    return {'--card-size': spacer + 200 + 'px'}
                }
                if (this.isLarge === true) {
                    return {'--card-size': spacer + 100 + 'px'}
                } else {
                    return {'--card-size': spacer + 'px'}
                }
            }
        }
    }
</script>

<style>

  .graph {
    background: #55acee;
    width: var(--card-size);
    align-self: flex-end;
    opacity: .7;
  }

  .graph-card {
    height: var(--card-size);
    width: var(--card-size);
    border-radius: 3px;
    border: 1px solid #d3d3d3;
  }

  .graph-underlay {
    position: absolute;
    height: calc(var(--card-size) - 42px);
    width: calc(var(--card-size) - 1px);
    z-index: -1;
    border-radius: 0 0 3px 3px;
  }

  .graph-value {
    font-weight: 200;
    font-size: calc(var(--card-size) / 2.2);
    text-shadow: 0 0 20px #fff;
  }

  .graph-title {
    font-weight: 700;
    max-height: 41px;
    border-radius: 3px 3px 0 0;
  }

</style>