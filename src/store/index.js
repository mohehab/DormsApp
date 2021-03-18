import Vue from "vue";
import Vuex from "vuex";
import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //Change the domain if the APIs doesn't work with you
    domain: "http://172.30.121.234/api",
    // IF Dorms external http://maya-edu.cf:8080/api
    // If Dorms local http://172.30.121.234/api
    studentsDomain: "http://172.30.121.233/api",
    // IF Student Affairs external http://maya-edu.cf:8081/api
    // If Student Affairs local http://172.30.121.233/api

    // Registration Form steps counter
    RegisterStep: 1,
    sideMenuStatus: false,
    step: 1,
    localization: "ar",
    regionSelectedID: "",
    // Begin: Registration Form Student's Data store
    studentFormStore: {
      acceptDormsTerms: "",
      studentFirstName: "",
      studentMiddleName: "",
      studentLastName: "",
      studentGender: "",
      studentFaculty: "",
      studentEduYear: "",
      studentGpa: "",
      studentSchool: "",
      studentCertificate: "",
      studentPerc: "",
      studentBirth: "",
      studentID: 2,
      studentAddress: "",
      studentGovern: "",
      studentPhone: "",
      studentMobile: "",
      documentOne: "",
      documentTwo: ""
    },
    studentAgentform: {
      studentAgentName: "",
      studentAgentNationalID: "",
      studentAgentJob: "",
      studentAgentPhone: "",
      studentAgentMedical: ""
    },
    // End: Registration Form Student's Data store
    // Start: Dorms Creation States
    DormCreation: {
      dormId: null
    },
    // End: Dorms Creation store
    // Start: Admission Phase States
    admissionPhase: {
      phaseID: null
    },
    // End: Admission Phase
    // Start: Edit Dorm
    editDorm: {
      dormNameAr: "",
      dormNameEn: "",
      dormAddress: "",
      dormStatus: ""
    },
    // End: Edit Dorm
    modelShow: false
  },
  mutations: {
    setMenuStatus(state, value) {
      state.sideMenuStatus = value
    },
    setregionID(state, value) {
      state.regionSelectedID = value;
    },
    setPhaseID(state, value) {
      state.admissionPhase.phaseID = value;
    },
    setStudentDormsTermsCondition(state, value) {
      state.studentFormStore.acceptDormsTerms = value;
    },
    setStudentFirstName(state, value) {
      state.studentFormStore.studentFirstName = value;
    },
    setStudentMiddleName(state, value) {
      state.studentFormStore.studentMiddleName = value;
    },
    setStudentLastName(state, value) {
      state.studentFormStore.studentLastName = value;
    },
    setStudentGender(state, value) {
      state.studentFormStore.studentGender = value;
    },
    setStudentFaculty(state, value) {
      state.studentFormStore.studentFaculty = value;
    },
    setStudentEduYear(state, value) {
      state.studentFormStore.studentEduYear = value;
    },
    setStudentGpa(state, value) {
      state.studentFormStore.studentGpa = value;
    },
    setStudentSchool(state, value) {
      state.studentFormStore.studentSchool = value;
    },
    setStudentCertificate(state, value) {
      state.studentFormStore.studentCertificate = value;
    },
    setStudentPerc(state, value) {
      state.studentFormStore.studentPerc = value;
    },
    setStudentBirth(state, value) {
      state.studentFormStore.studentBirth = value;
    },
    setStudentID(state, value) {
      state.studentFormStore.studentID = value;
    },
    setStudentAddress(state, value) {
      state.studentFormStore.studentAddress = value;
    },
    setStudentGovern(state, value) {
      state.studentFormStore.studentGovern = value;
    },
    setStudentPhone(state, value) {
      state.studentFormStore.studentPhone = value;
    },
    setStudentMobile(state, value) {
      state.studentFormStore.studentMobile = value;
    },
    setStudentAgentName(state, value) {
      state.studentAgentform.studentAgentName = value;
    },
    setStudentAgentNationalID(state, value) {
      state.studentAgentform.studentAgentNationalID = value;
    },
    setStudentAgentJob(state, value) {
      state.studentAgentform.studentAgentJob = value;
    },
    setStudentAgentPhone(state, value) {
      state.studentAgentform.studentAgentPhone = value;
    },
    setStudentAgentMedical(state, value) {
      state.studentAgentform.studentAgentMedical = value;
    },
    setDocumentOne(state, payload) {
      state.studentFormStore.documentOne = payload;
    },
    setDocumentTwo(state, value) {
      state.studentFormStore.documentTwo = value;
    },
    updateField
  },
  actions: {
    updateDocumentTwo({ commit }, payload) {
      commit("setDocumentTwo", payload);
    },
    updateDocumentOne({ commit }, payload) {
      commit("setDocumentOne", payload);
    }
  },
  modules: {},
  getters: {
    getField
  }
});
