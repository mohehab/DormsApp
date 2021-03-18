import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login";
import RegisterStudent from "../views/RegisterMainStructure.vue";
import AppliedStudents from "../components/Adminstration/MainInfo/AppliedStudents";
import CurrentStudents from "../components/Adminstration/MainInfo/CurrentStudents";
import TemporarilyStudents from "../components/Adminstration/MainInfo/TemporarilyStudents";
import WaitingList from "../components/Adminstration/MainInfo/WaitingList";
import AdmissionPhaseForm from "../views/AdmissionPhaseForm.vue";
import admissionPhase from "../components/Adminstration/AdmissionPhase/admissionPhase";
import Phases from "../components/Adminstration/AdmissionPhase/Phases";
import newAdmissionPhase from "../components/Adminstration/AdmissionPhase/newAdmissionPhase";
import AdmissionPhaseInterval from "../components/Adminstration/AdmissionPhase/createInterval";
import StudentPersonalPg from "../components/Adminstration/MainInfo/StudentPersonalPg";
import CurrentDorms from "../components/Dorms/CurrentDorms";
// import createDorm from "../components/Dorms/createDorm";
// import createGroup from "../components/Dorms/createGroup";
// import createBuilding from "../components/Dorms/createBuilding";
// import createFloor from "../components/Dorms/createFloor";
import createPartition from "../components/Dorms/createPartition";
import createInfraction from "../components/Infractions/createInfraction";
// import createRoomAssets from "../components/Dorms/createAssets";
import Infractions from "../components/Infractions/Infractions";
import studentInfractions from "../components/Infractions/studentInfractions";
import createStudentInfractions from "../components/Infractions/addStudentInfraction";
import createRequest from "../components/Feeding/Requests/createRequest";
import requestsList from "../components/Feeding/Requests/requestsList";
import AddMeal from "../components/Feeding/Meal/AddMeal";
import Meals from "../components/Feeding/Meal/Meals";
import Tools from "../components/Feeding/prepartions/Tools";
import CreateTimeTable from "../components/Feeding/timeTable/CreateTimeTable";
import TimeTable from "../components/Feeding/timeTable/TimeTable";
import NewReservation from "../components/Feeding/Reservation/NewReservation";
import GenerateAnOrder from "../components/Feeding/Reservation/GenerateAnOrder";
import Reservations from "../components/Feeding/Reservation/list";
import Ingredients from "../components/Feeding/prepartions/Ingredients";
import Reports from "../components/reports/Reports";
import addReport from "../components/reports/addreport";
import previewReport from '../components/reports/pdfContent'
import RequestsAndDeclarations from "../components/Requests/RequestsAndDeclarations";
import HousingRequests from "../components/Requests/HousingRequests";
import Residence from "../components/Housing/Residence";
import Conditions from "../components/Housing/Conditions";
import Distribution from "../components/Housing/Distribution";
import DormsMap from "../components/Housing/DormsMap";
import Buildings from "../components/Housing/Buildings";
import Partitions from "../components/Housing/Partitions";
import ServicesCategory from "../components/Services/ServicesCategory";
import services from "../components/Services/services";
import StudentsPayments from "../components/payments/StudentsPayments";
import PaymentsOverView from "../components/payments/PaymentsOverView";
import PaymentsReports from "../components/payments/PaymentsReports";
import Basic from "../components/payments/Basic";
import PaymentsService from "../components/payments/Services";
import Surcharging from "../components/payments/Surcharging";
import Regions from "../components/Regions/Regions";
import PenaltiesList from "../components/penalties/penaltiesList";
import attendence from "../components/Attendence/attendence";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      admin: false
    }
  },

  // Student's Registration Form Routing
  {
    path: "/register",
    name: "RegisterMainStructure",
    component: RegisterStudent,
    meta: {
      admin: false
    }
  },
  // start StudentPayments
  {
    path: "/StudentsPayments",
    name: "StudentsPayments",
    component: StudentsPayments
  },
  {
    path: "/PaymentsOverView",
    name: "PaymentsOverView",
    component: PaymentsOverView
  },
  {
    path: "/PaymentsReports",
    name: "PaymentsReports",
    component: PaymentsReports
  },
  {
    path: "/Paymentone",
    name: "firststeppayment",
    component: Basic
  },
  {
    path: "/Paymenttwo",
    name: "secondsteppayment",
    component: PaymentsService
  },
  {
    path: "/Paymentthree",
    name: "thirdsteppayment",
    component: Surcharging
  },
  // start regions
  {
    path: "/Regions",
    name: "Regions",
    component: Regions
  },
  // start services
  {
    path: "/ServicesCategory",
    name: "AddService",
    component: ServicesCategory
  },
  {
    path: "/editServiceCategory/:id",
    name: "editServiceCategory",
    component: ServicesCategory
  },
  {
    path: "/services",
    name: "services",
    component: services
  },
  // start housing
  {
    path: "/housing/residence",
    name: "Residence",
    component: Residence
  },
  {
    path: "/housing/Conditions",
    name: "Conditions",
    component: Conditions
  },
  {
    path: "/housing/Distribution",
    name: "Distribution",
    component: Distribution
  },
  {
    path: "/housing/DormsMap",
    name: "DormsMap",
    component: DormsMap
  },
  {
    path: "/housing/Buildings/:id",
    name: "Buildings",
    component: Buildings
  },
  {
    path: "/housing/Partitions/:id",
    name: "Partitions",
    component: Partitions
  },
  // start requests
  {
    path: "/requests/requestsAndDeclarations",
    name: "RequestsAndDeclarations",
    component: RequestsAndDeclarations
  },
  {
    path: "/requests/housingRequests",
    name: "HousingRequests",
    component: HousingRequests
  },
  // End Student's Registration Form Routing
  // Feeding Routing
  {
    path: "/feeding/Ingredients",
    name: "Ingredients",
    component: Ingredients
  },
  {
    path: "/feeding/Meals",
    name: "Meals",
    component: Meals
  },
  {
    path: "/feeding/Addmeal",
    name: "AddMeal",
    component: AddMeal
  },
  {
    path: "/feeding/tools",
    name: "Tools",
    component: Tools
  },
  {
    path: "/feeding/createTimeTable",
    name: "CreateTimeTable",
    component: CreateTimeTable
  },
  {
    path: "/feeding/timeTable",
    name: "TimeTable",
    component: TimeTable
  },
  {
    path: "/feeding/editTimeTable/:id",
    name: "editTimeTable",
    component: CreateTimeTable
  },
  {
    path: "/feeding/newReservation",
    name: "NewReservation",
    component: NewReservation
  },
  {
    path: "/feeding/generateAnOrder",
    name: "GenerateAnOrder",
    component: GenerateAnOrder
  },
  {
    path: "/feeding/requests",
    name: "requestsList",
    component: requestsList
  },
  {
    path: "/feeding/createRequest",
    name: "createRequest",
    component: createRequest
  },
  {
    path: "/feeding/editRequest/:id",
    name: "editRequest",
    component: createRequest
  },
  {
    path: "/feeding/reservations",
    name: "reservations",
    component: Reservations
  },
  // End Feeding Routing
  // start reports
  {
    path: "/reports",
    name: "Reports",
    component: Reports
  },
  {
    path: "/createReport",
    name: "addReport",
    component: addReport
  },
  {
    path: "/createReport/preview",
    name: "previewReport",
    component: previewReport
  },
  // end reports
  {
    path: "/student",
    name: "StudentPersonalPg",
    component: StudentPersonalPg
  },
  // Student Listing Routing
  {
    path: "/appliedStudents",
    name: "AppliedStudents",
    component: AppliedStudents
  },
  {
    path: "/current-students",
    name: "CurrentStudents",
    component: CurrentStudents
  },
  {
    path: "/temporarily-students",
    name: "TemporarilyStudents",
    component: TemporarilyStudents
  },
  {
    path: "/waitingList",
    name: "WaitingList",
    component: WaitingList
  },
  // End Student Listing Routing
  // Admission Phase Routing
  {
    path: "/AdmissionPhaseForm",
    name: "AdmissionPhaseForm",
    component: AdmissionPhaseForm
  },
  {
    path: "/newAdmissionPhase",
    name: "newAdmissionPhase",
    component: newAdmissionPhase
  },
  {
    path: "/admissionPhase",
    name: "admissionPhase",
    component: admissionPhase
  },
  {
    path: "/Phases",
    name: "Phases",
    component: Phases
  },
  {
    path: "/editPhases/:id",
    name: "editPhases",
    component: Phases
  },
  {
    path: "/editAdmissionPhaseTime/:id",
    name: "editAdmissionPhaseTime",
    component: AdmissionPhaseForm
  },
  {
    path: "/editAdmissionPhaseTitle/:id",
    name: "editAdmissionPhaseTitle",
    component: AdmissionPhaseForm
  },
  {
    path: "/editAdmissionPhaseGender/:id",
    name: "editAdmissionPhaseGender",
    component: AdmissionPhaseForm
  },
  {
    path: "/editAdmissionPhasePriorities/:id",
    name: "editAdmissionPhasePriorities",
    component: AdmissionPhaseForm
  },
  {
    path: "/addRegistrationInterval/:id",
    name: "addRegistrationInterval",
    component: AdmissionPhaseInterval
  },
  {
    path: "/editRegistrationIntervalTime/:id",
    name: "editRegistrationIntervalTime",
    component: AdmissionPhaseInterval
  },
  {
    path: "/editRegistrationIntervalSeniority/:id",
    name: "editRegistrationIntervalSeniority",
    component: AdmissionPhaseInterval
  },
  {
    path: "/editRegistrationIntervalConditions/:id",
    name: "editRegistrationIntervalConditions",
    component: AdmissionPhaseInterval
  },
  {
    path: "/editRegistrationIntervalTitle/:id",
    name: "editRegistrationIntervalTitle",
    component: AdmissionPhaseInterval
  },
  {
    path: "/editHousingRatio/:id",
    name: "editHousingRatio",
    component: AdmissionPhaseForm
  },
  // End Admission Phase Routing
  // Dorms' Creation Routing
  {
    path: "/dorms",
    component: CurrentDorms,
    name: "CurrentDorms"
  },
  // {
  //   path: "/dorms/createDorm",
  //   name: "createDorm",
  //   component: createDorm
  // },
  // {
  //   path: "/dorms/editDorm/:id",
  //   name: "editDorm",
  //   component: createDorm
  // },
  // {
  //   path: "/dorms/createGroup",
  //   name: "createGroup",
  //   component: createGroup
  // },
  // {
  //   path: "/dorms/createBuilding",
  //   name: "createBuilding",
  //   component: createBuilding
  // },
  // {
  //   path: "/dorms/createFloor",
  //   name: "createFloor",
  //   component: createFloor
  // },
  {
    path: "/dorms/createPartition",
    name: "createPartition",
    component: createPartition
  },
  // {
  //   path: "/dorms/createAssets",
  //   name: "createRoomAssets",
  //   component: createRoomAssets
  // },
  // End Dorms' Creation Routing
  // Infractions Routing
  {
    path: "/infractions",
    name: "infractions",
    component: Infractions
  },
  {
    path: "/infractions/Add",
    name: "createInfraction",
    component: createInfraction
  },
  {
    path: "/infractions/editInfraction/:id",
    name: "editInfraction",
    component: createInfraction
  },
  {
    path: "/infractions/studentlist",
    name: "studentInfractions",
    component: studentInfractions
  },
  {
    path: "/infractions/addStudentInfractions",
    name: "createStudentInfractions",
    component: createStudentInfractions
  },
  {
    path: "/infractions/editStudentInfraction/:id",
    name: "editStudentInfraction",
    component: createStudentInfractions
  },
  {
    path: "/penalties",
    name: "penalties",
    component: PenaltiesList
  },
  // End Infractions Routing
  {
    path: "/attendence",
    name: "attendence",
    component: attendence
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({ name: "Login" });
    } else {
      next();
    }
  }
  next();
});

export default router;
