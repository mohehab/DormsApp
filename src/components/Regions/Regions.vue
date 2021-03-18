<template>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
        <div class="add-new-subject">
            <div class="add-container">
                <div>
                    <span @click="openPopUp" class="add-btn pointer">اضافة تصنيف</span>
                </div>
                <div class="editRegion_popau" v-if="this.openPopUpKey == true">
                    <div class="close pointer" @click.prevent="closePopUp"> <b-icon-x-circle></b-icon-x-circle>  </div>
                <AddRegions ref="AddNewRegion" :closePopUp="closePopUp" :countriesCategoryReload="countriesCategoryReload" />
                </div>
            </div>
        </div>
        <div class="boxContianer">
            <b-row>
                <!-- <div class="editRegion_popau" v-if="this.openPopUpKey == true">
                    <div class="close" @click.prevent="closePopUp"> <b-icon-x-circle></b-icon-x-circle>  </div>
                    <MEditRegion :countriesCategoryReload="countriesCategoryReload"  />
                </div> -->
                
                <b-col xl="3" class="mb-4" v-for="(region, index) in regions" :key="region.id">
                    <b-button
                    class="item-btn coll-ing-btn"
                    v-b-toggle="'collapse-inner-' + index"
                    > {{region.name_ar}}
                    <font-awesome-icon icon="sort-down" />
                    </b-button> 
                    <b-icon-trash class="pointer" v-b-modal="'deleteRegion' + region.id"></b-icon-trash>
                                
                    <AlertBox
                    :name="'deleteRegion' + region.id"
                    question="هل تريد حذف المنطقه"
                    api="/countryCategory/"
                    :ids="region.id"
                    :reload="countriesCategoryReload"
                    />
                    <b-icon-pencil-fill class="mr-4 pointer" @click="openPopUp" v-b-modal="'edit'" :data-regionId="region.id"></b-icon-pencil-fill>
                    <b-collapse :id="'collapse-inner-' + index" class="mt-2">
                    <ul>
                        <slot v-for="country in region.countries">
                        <li :key="country.id">{{country.name_ar}}</li>
                        </slot>
                    </ul>
                    </b-collapse>
                </b-col>
            </b-row>
        </div>
    </div>    
</template>
<script>
import axios from 'axios';
import AddRegions from '../Regions/AddRegions';
import store from '../../store';
import AlertBox from '../Global/Alert';
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
    name: "Regions",
    components: {
        AddRegions,
        AlertBox
    },
    data(){
        return {
            regions: [],
            countries: [],
            isHidden: false,
            regionId: '',
            region: '',
            regionAr: '',
            regionEn: '',
            popupId: null,
            openPopUpKey: false
        }
    },
    mounted(){
        this.countriesCategoryReload();
    },
    methods: {
        countriesCategoryReload(){
            axios
            .get(store.state.domain + '/countryCategory', config)
            .then(res => (this.regions = res.data.data));
        },
        openPopUp(event){
            this.openPopUpKey = true;
            // this.regionId = event.currentTarget.getAttribute('data-regionId');
            this.popupId = event.currentTarget.getAttribute('data-regionId');
        },
        closePopUp(){
            this.openPopUpKey = false
        }
    }
}
</script>
<style lang="scss" scoped>
.coll-ing-btn {
        overflow-anchor: none;
        background: unset;
        color: #03a9f3;
        font-weight: bold;
        border: none;
        box-shadow: unset;
    }
    
    .close{
        position: absolute;
        z-index: 4;
        top: 18%;
        margin-right: 10px;
    }
    .pointer{
        cursor: pointer;
    }
</style>