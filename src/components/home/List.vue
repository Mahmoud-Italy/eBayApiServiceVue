<template>
    <div class="">

    <div id="app">
        <div class="main-container-wrapper">
            
            <div class="header" id="header">
                <div class="header-top">
                    <div class="left-content">

                        <ul class="logo-container">
                        </ul>

                        <ul class="search-container">
                          <li class="search-group">

                              <form @submit.prevent="fetchRow(true)">

                                    <input type="search" 
                                        v-model="keywords" 
                                        class="search-field" 
                                        style="width: 30%" 
                                        placeholder="Search Keywords example: Phone ..etc">

                                    <input type="number"
                                        min="0"
                                        step="0.5" 
                                        v-model="minPrice"
                                        placeholder="Min Price"
                                        class="search-field"
                                        style="width: 15%">

                                    <input type="number"
                                        min="0"
                                        step="0.5"
                                        v-model="maxPrice"
                                        placeholder="Max Price"
                                        class="search-field"
                                        style="width: 15%">

                                    <select class="search-field" 
                                        v-model="sort"
                                        style="width: 20%">
                                        <option value="BestMatch">Sort by Best Match</option>
                                        <option value="PricePlusShippingHighest">Sort by Highest Price</option>
                                        <option value="PricePlusShippingLowest">Sort by Lowest Price</option>
                                    </select>

                                    <button class="btn btn-primary">
                                          Search
                                    </button>

                              </form>
                          </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="content-container">
                <div class="main mb-30">

                    <!-- Search result -->
                    <div class="search-result-status mb-20" 
                        v-if="!pgLoading">
                        <span><b>{{ total }}</b> Search Results Found</span>
                    </div>
                    <!-- ENd Search result -->
                        
                    <!-- Loading -->
                    <div v-if="pgLoading">
                        <div class="loader">
                            <span class="loader-lg"></span>
                        </div>
                    </div>
                    <!-- End Loading -->

                    <!-- Product Card -->
                    <div v-if="!pgLoading" class="product-grid-4">
                        <div class="product-card"
                            v-for="(row, index) in rows"
                            :key="index">

                            <div class="product-image">
                                <a  :href="row.viewItemURL" 
                                    target="_blank" 
                                    :title="row.title">
                                    <img :src="(row.galleryURL) ? row.galleryURL : default_img" 
                                        :alt="row.title" />
                                </a>
                            </div>

                            <div class="product-information">
                                <div class="product-name">
                                    <a :href="row.viewItemURL" 
                                        target="_blank" 
                                        :title="row.title">
                                        <span>{{ row.title }}</span>
                                    </a>
                                    <p class="sticker3">
                                        {{ (row.primaryCategory) ? row.primaryCategory.categoryName : '' }}
                                    </p>
                                    <p class="sticker2">{{ row.globalId }}</p>
                                </div>
                                <div class="product-price">
                                    <span>$ {{ (row.sellingStatus) ? row.sellingStatus.currentPrice : '' }}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- End Product Card -->

                    <!-- Load More -->
                    <div v-if="!pgLoading && loadMore && total > 0" class="loadMore">
                        <button class="btn btn-primary"
                                :disabled="btnLoading"
                                @click="btnLoadMore()">
                            <span v-if="btnLoading">
                                <div class="loader loader-md"></div>
                            </span>
                            <span v-if="!btnLoading">Load More</span>
                        </button>
                    </div>       
                    <!-- End Load More -->             
                
                </div>
            </div>

        </div>
    </div>

    </div>
</template>

<script>
    export default {
        name: 'Home',
        components: {},
        data(){
            return {
                //
                default_img: 'https://thumbs1.sandbox.ebaystatic.com/pict/1105286766764040_0.jpg',

                pgLoading: false,
                btnLoading: false,
                loadMore: false,
                loadMoreClicked: false,
                item: '',
                rows: [],
                pagination: {},
                total: 0,

                keywords: '',
                maxPrice: '',
                minPrice: '',
                sort: 'BestMatch',
                page: 1,
                paginate: 12,
            }
        },
        mounted() {},
        created() {
            //
        },
        methods: {
            //

            btnLoadMore() {
                this.loadMoreClicked = true;
                this.btnLoading = true;
                this.page++;
                this.fetchRow();
            },

            fetchRow(loading=false){
                if(loading) { 
                    this.pgLoading = true; 
                    this.page = 1;
                }
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                };
                const options = {
                    url: window.baseURL+'/products',
                    method: 'GET',
                    data: {},
                    params: {
                        keywords: this.keywords,
                        maxPrice: this.maxPrice,
                        minPrice: this.minPrice,
                        sort: this.sort,
                        page: this.page,
                        paginate: this.paginate
                    }
                }
                let vm = this;
                this.$axios(options)
                .then(res => {
                    this.pgLoading = false;
                    this.btnLoading = false;

                    if(res.data.items.ack == 'Success') {
                        this.item = res.data.items;
                        if(this.loadMoreClicked) {
                            this.rows = vm.rows.concat(res.data.items.searchResult.item);
                        } else {
                            this.rows = res.data.items.searchResult.item;
                        }
                        this.total = res.data.items.paginationOutput.totalEntries;
                        if(res.data.items.paginationOutput > res.data.items.paginationOutput.pageNumber) {
                            this.loadMore = true;
                        } else {
                            this.loadMore = false;
                        }
                        this.loadMoreClicked = false;
                    }
                })
                .catch(() => {})
                .finally(() => {
                    this.pgLoading = false;
                    this.btnLoading = false;
                });
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .product-card {
        width: 100%
    }
    .product-image img {
        width: 100%;
        height: 300px
    }
    .sticker2 {
        border-radius: 100px;
        padding: 4px 13px;
        font-size: 14px;
        color:  #fff;
        box-shadow: 1px 1px 1px #ccc;
        width: 35%;
        background: #d02e68 !important
    }
    .sticker3 {
        border-radius: 0px;
        padding: 4px 13px;
        font-size: 14px;
        color:  #fff;
        box-shadow: 1px 1px 1px #ccc;
        background: #2e7ad0 !important
    }
    .loader {
        right: 50%;
        margin-top: 100px;
        position: absolute;
        transform: translate(-50%, -50%);
        border: 3px solid #f3f3f3;
        border-top: 3px solid #686767;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 0.7s linear infinite;
        display: inline;
      }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .loader-lg {
      width: 40px;
      height: 40px
    }
    .loader-md {
      width: 30px;
      height: 30px;
      display: block !important;
      margin-top: -14px;
      margin-right: -12px
    }
    .loadMore { margin-top:100px; width: 100%; text-align: center }
    .left-content, .search-container, .search-group, form { width: 100% }
    button { height: 40px; width: 150px }
    input, select { margin-right: 20px; border-right: 1px solid #c7c7c7 !important }
</style>
