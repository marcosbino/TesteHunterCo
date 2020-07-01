<template>
    <div class="carrousel-container">
        <span>quero pagar a cada:</span>
        <div class="swiper-selector">
            <button @click="toSlide(0)">To Slide 1</button>
            <button @click="toSlide(1)">To Slide 250</button>
            <button @click="toSlide(2)">To Slide 500</button>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
            </div>
        </div>
    </div>
</template>

 <script>
        import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
        import 'swiper/css/swiper.css'
        
        export default {
            name: 'swiper-example-virtual-slides',
            title: 'Virtual slides',
            components: {
                Swiper,
                SwiperSlide
            },
            data() {
                return {
                    swiperOption: {
                        slidesPerView: 3,
                        centeredSlides: true,
                        spaceBetween: 30,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'fraction'
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        },
                        virtual: {
                            slides: Array(600)
                            .fill('Slide')
                            .map((item, index) => `${item} ${index + 1}`)
                        }
                    }
                }
            },
            methods: {
                toSlide(index) {
                    this.$refs.mySwiper.$swiper.slideTo(index, 0)
                }
            }
        }
    </script>