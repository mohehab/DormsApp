<template>
        <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
            <h3 class="text-center">شروط التسكين</h3>
            <div class="housing-conditions">
                <div class="boxContianer">
                    <div class="condition mt-2" v-for="condition in conditions" :key="condition.id">
                        <input type="checkbox" :value="condition.id" v-model="conditionsID">
                        <p>{{condition.description_ar}}</p>
                    </div>
                     <div class="save-btn">
                    <button type="submit" class="blueBg" @click.prevent="OnSubmit">
                        حفظ
                    </button>
                    <span class="redBg">إلغاء</span>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
import store from '../../store'
const config = {
          headers: {
            localization: store.state.localization
        }
};
export default {
    name: "Conditions",
    data(){
        return {
            conditions: "",
            conditionsID: []
        }
    },
    mounted(){
        axios
        .get(store.state.domain + '/housingMechanism', config)
        .then(res => {
            this.conditions = res.data.data
            const lengthArray = Object.keys(res.data.data).length;
            const applyLoop = res.data.data;
            for(let i=0; i < lengthArray; i++) {
                if(applyLoop[i].apply == 1){
                    this.conditionsID.push(applyLoop[i].id)
                }
            }
        })
        
            
        
        
        
    },
    methods: {
        OnSubmit(){
            axios({
                method: "POST",
                url: store.state.domain + '/housingMechanism/update',
                headers: {
                    localization: store.state.localization
                },
                data : {
                    housing_mechanism_id: this.conditionsID
                }

            })
            


        }
    }
}
</script>
<style lang="scss" scoped>
.housing-conditions{
    .condition{
        display: flex;
        align-items: center;
        p{
            font-size: 16px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.76);
            margin-right: 10px;
        }
    }
}
</style>