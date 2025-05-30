import { h } from 'vue'
// views
import DoctorsPage from '@/pages/dashboard/doctors/DoctorsPage.vue'
import HomePage from '@/pages/dashboard/home/HomePage.vue'
import AppointmentsPage from '@/pages/dashboard/appointments/AppointmentsPage.vue'
import DiseasesPage from '@/pages/dashboard/appointments/DiseasesPage.vue'
import PrescriptionPage from '@/pages/dashboard/appointments/PrescriptionPage.vue'
import ProfilePage from '@/pages/dashboard/profile/ProfilePage.vue'
import SpecialitiesPage from '@/pages/dashboard/specialities/SpecialitiesPage.vue'
// icons
import IconDoctor from '@/components/icons/IconDoctor.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
// views components
import DoctorsListView from '@/pages/dashboard/doctors/components/DoctorsListView.vue'

const navigations = [
  {
    path: 'home',
    name: 'Home',
    component: HomePage,
    meta: {
      showMenu: true,
      icon: () => h(IconHome)
    }
  },

  {
    path: 'doctors',
    name: 'Doctors',
    component: DoctorsPage,
    redirect: { name: 'DoctorsList' },
    meta: {
      showMenu: true,
      icon: () => h(IconDoctor)
    },
    children: [
      {
        path: '',
        name: 'DoctorsList',
        component: DoctorsListView
      }
    ]
  },
  {
    path: 'appointments/:doctorId?',
    name: 'Appointments',
    component: AppointmentsPage,
    meta: {
      showMenu: true,
      icon: () => h(IconCalendar)
    },
  },
  {
    path: 'diseases/:appointmentId',
    name: 'DiseasesPage',
    component: DiseasesPage,
    meta: {
      showMenu: false
    }
  },
  {
    path: 'prescription/:appointmentId',
    name: 'PrescriptionPage',
    component: PrescriptionPage,
    meta: {
      showMenu: false
    }
  },
  {
    path: 'profile',
    name: 'Profile',
    component: ProfilePage,
    meta: {
      showMenu: true,
      icon: () => h(IconProfile)
    },
  },

  {
    path: 'specialities',
    name: 'Specialities',
    component: SpecialitiesPage,
    meta: {
      showMenu: false,
    }
  },

]
export default navigations
