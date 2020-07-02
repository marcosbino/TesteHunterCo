new Vue({
    el: '#app',
    data () {
        return {
            info: null,
            loading: true,
            errored: false,
            cycle: 36,
            info: {
                products: null
            }
        }
    },
    methods:{
        getCycles: function(info){
            Object.keys(info.products).map(function(objectKey, index) {
                if(info.products[objectKey].cycle != undefined){
                    Object.keys(info.products[objectKey].cycle).map(function(period, index){
                        if(info.products[objectKey].cycle[period].months != undefined){
                            let value = info.products[objectKey].cycle[period].priceOrder;
                            let newValue = (value - (value * 40/100)).toFixed(2)
                            let perMonth = (newValue/info.products[objectKey].cycle[period].months).toFixed(2)
                            let savePrice = (info.products[objectKey].cycle[period].priceOrder - newValue).toFixed(2)
                            
                            info.products[objectKey].cycle[period].newPrice =newValue
                            info.products[objectKey].cycle[period].perMonth =perMonth
                            info.products[objectKey].cycle[period].savePrice =savePrice
                        }
                    })
                }else{
                    delete info.products[objectKey]
                }
            });
        }
    },
    mounted () {
        //https://6dd1804f-a914-4c99-a1ed-58adca2bca74.mock.pstmn.io/prices
        axios
        .get('https://6dd1804f-a914-4c99-a1ed-58adca2bca74.mock.pstmn.io/prices')
        .then(
            (response) => {
                this.info = response.data.shared;
                this.getCycles(response.data.shared)
            }
        )
        .catch(error => {
                console.log(error)
                this.errored = true
        })
        .finally(() => this.loading = false);
    },
    components: {
      },
})
var swiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 3,
    centeredSlides: true
});