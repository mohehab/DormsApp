<template>
  <div class="RegisterDormStep">
    <StepsTabs tab="DocumentsNeeded" />
    <div
      class="uploadRequiredFormsDorms boxedFormAllSteps"
      v-for="(file, index) in filesName"
      :key="index"
    >
      <h4>{{ file.document.name_ar }}</h4>
      <div class="informForUpload text-center">
        <div class="RegisterDownloadbtn">
          <p>
            <a :href="file.file">{{ download }} {{ file.document.name_ar }}</a>
          </p>
          <b-icon-download></b-icon-download>
        </div>
        <div class="RegisterUploadbtn">
          <input
            type="file"
            ref="fileInput"
            style="display:none"
            v-on="{ change: [onFileSelected, updateState] }"
          />
          <button @click.prevent="$refs.fileInput[index].click()">
            رفع {{ file.document.name_ar }}
          </button>
          <span>
            <b-icon-upload></b-icon-upload>
          </span>
        </div>
        <div v-if="selectedFile != null">
          <p>{{ selectedFile.name }}</p>
          <p v-if="!validImageTypes.includes(selectedFile.type)">
            صيغة الملف غير مقروءة. من فضلك ارفع الاستمارة (jpeg/png/pdf)
          </p>
        </div>
      </div>
    </div>
    <MedicalApproval />
    <PaymentMethods />
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";
import StepsTabs from "./Registration-Sections/StepsTabs";
import MedicalApproval from "./Registration-Sections/MedicalApproval";
import PaymentMethods from "./Registration-Sections/PaymentMethods";
import { mapActions } from "vuex";
const config = {
          headers: {
            localization: store.state.localization
        }
};
export default {
  name: "StepFour",
  data() {
    return {
      download: "تحميل",
      selectedFile: null,
      validImageTypes: ["image/jpeg", "image/png", "application/pdf"]
    };
  },
  props: {
    tab: String,
    filesName: Array
  },
  methods: {
    ...mapActions(["updateDocumentOne"]),
    updateState() {
      this.updateDocumentOne(this.selectedFile);
    },
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      console.log(e);
    },
    next() {
      store.state.RegisterStep++;
    },
    prev() {
      store.state.RegisterStep--;
    },
    onUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      const fileType = this.selectedFile.type;
      const validImageTypes = ["image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        axios.post(store.state.domain + "/upload/image", fd, config).then(res => {
          this.imageUrl = res.data.data.temp_path;
        });
      } else {
        console.log("File Type is invalid");
      }
    }
  },
  components: {
    StepsTabs,
    PaymentMethods,
    MedicalApproval
  }
};
</script>
<style lang="scss">
.RegisterDormStep {
  h4 {
    font-size: 19px;
  }
  h3 {
    color: #03a9f3;
    margin-bottom: 15px;
    font-size: 16px;
  }
  .uploadRequiredFormsDorms {
    margin-top: 25px;
    .informForUpload {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .RegisterDownloadbtn {
        border: 2px solid #626f80;
        border-radius: 6px;
        font-size: 15px;
        margin: 20px auto;
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        svg {
          margin: 0 10px;
        }
        p {
          background: #626f80;
          color: #fff;
          padding: 10px;
          border-radius: 3px;
          white-space: nowrap;
          width: 213px;
          a {
            color: #fff;
          }
        }
        .b-icon.bi {
          font-size: 13px;
        }
      }
      .RegisterUploadbtn {
        border: 2px solid #626f80;
        border-radius: 6px;
        display: flex;
        margin: 20px auto;
        justify-content: flex-start;
        align-items: baseline;
        width: 250px;
        span {
          padding: 9px 0;
          background: #626f80;
          border-bottom-left-radius: 3px;
          border-top-left-radius: 3px;
          width: 31px;
        }
        button {
          background: transparent;
          border: 0;
          padding: 0 18px;
          font-size: 15px;
          width: 216px;
        }
        input {
          width: 213px;
          padding: 6px;
        }
        .bi-upload {
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
  .slideRegisterSteps {
    display: flex;
    justify-content: space-between;
  }
  .nextLinkRegisterFrom {
    font-size: 18px;
    color: #008eb9;
    font-weight: 600;
  }
  .prevLinkRegisterFrom {
    font-size: 18px;
    color: #008eb9;
    font-weight: 600;
  }
}
</style>
