var swiper = new Swiper('.swiper-slide', {
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 3
})
new Vue({
    el: '#app',
    data () {
        return {
            data2: null,
            loading: true,
            errored: false,
            cycle: 36,
            info: {
                products: null
            }
        }
    },
    methods:{
        getCycles: function(data2){
            Object.keys(data2.products).map(function(objectKey, index) {
                if(data2.products[objectKey].cycle != undefined){
                    Object.keys(data2.products[objectKey].cycle).map(function(period, index){
                        if(data2.products[objectKey].cycle[period].months != undefined){
                            console.log(data2.products[objectKey].cycle)
                            let value = data2.products[objectKey].cycle[period].priceOrder;
                            let newValue = (value - (value * 40/100)).toFixed(2)
                            let perMonth = (newValue/data2.products[objectKey].cycle[period].months).toFixed(2)
                            
                            data2.products[objectKey].cycle[period].newPrice =newValue
                            data2.products[objectKey].cycle[period].perMonth =perMonth
                        }
                    })
                }
            });
            console.log(this.info)
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
    }
})