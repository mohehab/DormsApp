<template>
    <div>
    <div class="editPopUp"  id="addRegion" title="اضافة فئه"  >
        <div class="add-category" >
            <div class="add-region">
                <div class="mid-header">
                    <h2 class="text-center" v-if="!this.$parent.popupId">توزيع الدول</h2>
                    <h2 class="text-center" v-if="this.$parent.popupId">تعديل توزيع الدول</h2>
                    <b-row>
                        <b-col xl="12" class="mb-3">
                            <label><span class="required">*</span>اسم المنطقه باللغة العربية : </label>
                            <b-form-input type="text" v-model="regionAr" :state="cityArState" :class="status = null ? 'is-valid' : ''" >
                                
                            </b-form-input>
                        </b-col>
                        <b-col xl="12" class="mb-3">
                            <label><span class="required">*</span>اسم المنطقه باللغة الانجليزية : </label>
                            <b-form-input type="text" v-model="regionEn" :class="status = null ? 'is-valid' : ''" :state="cityEnState">
                                
                            </b-form-input>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col lg="12" class="data-item">
                            <label><span class="required">*</span>اختار الدوله :</label>
                            <div class="countries-name-container">
                                <b-dropdown  text="اختار الدوله" ref="dropdown" >
                                    <div class="countries-name">
                                        <b-form-checkbox
                                        
                                        v-model="selectedCountry"
                                        :value="country.id" 
                                        v-for="country in countries"
                                        :key="country.id"
                                        >{{country.name_ar}}</b-form-checkbox
                                        >
                                    </div>
                                </b-dropdown>
                            </div>
                        </b-col>
                    </b-row>

                    <b-row v-if="err.length != 0">
                        <ol class="form--error">
                            <p>البيانات غير مكتملة أو غير صحيحة</p>
                            <ol>
                            <slot v-for="loopError in err">
                                <li v-for="(error, index) in loopError" :key="index">
                                {{ error }}
                                </li>
                            </slot>
                            </ol>
                        </ol>
                    </b-row>

                    <div class="save-btn">
                        <button
                        v-if="!this.$parent.popupId"
                        type="submit"
                        class="blueBg"
                        @click.prevent="OnSubmit"
                         >
                        حفظ
                        </button>
                        <button
                        v-if="this.$parent.popupId"
                        type="submit"
                        class="blueBg"
                        @click.prevent="updateRegions"
                         >
                        تعديل
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>    
</template>
<script>
import axios from 'axios';
import store from '../../store';
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
    name: "AddRegions",
    props: ['countriesCategoryReload', "closePopUp"],
    data(){
        return {
            status: '',
            regionAr: "",
            regionEn: "",
            countries: [],
            selectedCountry: [],
            err: []
        }
    },
     mounted(){
        axios
        .get(store.state.domain + '/countries', config)
        .then(res => (this.countries = res.data.data));

        if(this.$parent.popupId){
            axios
            .get(store.state.domain + '/countryCategory/' + this.$parent.popupId, config)
            .then( res => {
                (this.regionAr = res.data.data.name_ar),
                (this.regionEn = res.data.data.name_en)
                
                const countriesLength = Object.keys(res.data.data.countries).length;
                const countriesData = res.data.data.countries
                for(let i = 0; i < countriesLength; i++){
                    this.selectedCountry.push(countriesData[i].id)
                }
            }).catch(error => {
                this.err = error.response.data.errors;
            });
        }
        
    },
    methods: {
        OnSubmit: function(){
            axios({
                method: "POST",
                url: store.state.domain + '/countryCategory',
                headers: {
                    localization: store.state.localization
                },
                data : {
                    name_ar: this.regionAr,
                    name_en:this.regionEn,
                    countries:this.selectedCountry
                }
            })
            .then(res => {
                if (res.status == 200 || res.status == 201){
                    this.countriesCategoryReload();
                    this.selectedCountry = [];
                    this.regionAr = "";
                    this.regionEn = "";
                    this.closePopUp();
                }
            })
            .catch(error => {
                this.err = error.response.data.errors;
            })
            
        },
        updateRegions(){
            axios({
                method: "PUT",
                url: store.state.domain + '/countryCategory/' + this.$parent.popupId,
                headers: {
                    localization : store.state.localization
                },
                data: {
                    name_ar: this.regionAr,
                    name_en: this.regionEn,
                    countries: this.selectedCountry
                }
            })
            .then(res => {
                if(res.status == 200 || res.status == 201) {
                    console.log(this.regionAr, this.regionEn, this.selectedCountry)
                    this.countriesCategoryReload();
                    this.closePopUp();
                }
            })
        }
    },
    computed: {
        cityArState(){
            if(this.regionAr.length == 0){
                return null;
            } else if (
                this.regionAr.match(/[\u0600-\u06FF\u0750-\u077F]/) &&
                this.regionAr.length > 0 &&
                !this.regionAr.match(/^[a-zA-Z0-9,.!? ]*$/)
            ){
                return true
            } else {
                return false
            }
        },
        cityEnState(){
            if(this.regionEn == 0){
                return null
            } else if (
                this.regionEn.length > 0 &&
                this.regionEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
                !this.regionEn.match(/[\u0600-\u06FF\u0750-\u077F]/)
            ){
                return true
            } else {
                return false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
        .countries-menu{
            overflow-y: scroll;
            height: 393px;
            top: 335px;
        }
        .editPopUp{
            width: 55%;
            position: absolute;
            top: 17%;
            z-index: 3;
            border-radius: 0.3rem;
            background-color: #FFF;
            padding: 60px;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
        .countries-name-container{
            position: relative;
            .countries-name{
                height: 200px;
                overflow-y: scroll;
            }
        }
        
</style>