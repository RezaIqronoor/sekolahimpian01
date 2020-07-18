import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from './containers/Login'
import ChooseChild from './containers/ChooseChild'
import MainMenu from './containers/MainMenu'
import ViolationRecord from './containers/ViolationRecord'
import ContactPerson from './containers/ContactPerson'
import Album from './containers/Album'
import AlbumImage from './containers/AlbumImage'
import Absen from './containers/Absen'
import Tahfizh from './containers/Tahfizh'
import Disease from './containers/Disease'
import Rapor from './containers/Rapor'
import PDFViewer from './containers/PDFViewer'
import HomeScreen from './containers/HomeScreen'
import Pengaduan from './containers/Pengaduan'
import GuestWebview from './containers/GuestWebview'
import CCTVOption from './containers/CCTVOption'
import CCTV from './containers/CCTV'
import QBSProject from './containers/QBSProject'
import Donee from './containers/Donee'
import ParentBook from './containers/ParentBook'

const navigator = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    ChooseChild: {
        screen: ChooseChild,
        navigationOptions: {
            header: null
        }
    },
    MainMenu: {
        screen: MainMenu,
        navigationOptions: {
            title: 'Sekolah Impian',
            headerStyle: {
                elevation: 0,
                backgroundColor: '#4a8af4',
            },
            headerTintColor: 'white',
        }
    },
    QBSProject: {
        screen: QBSProject,
        navigationOptions: {
            title: ''
        }
    },
    Donee: {
        screen: Donee,
        navigationOptions: {
            title: ''
        }
    },
    CCTVOption: {
        screen: CCTVOption,
        navigationOptions: {
            title: ''
        }
    },
    CCTV: {
        screen: CCTV,
        navigationOptions: {
            title: ''
        }
    },
    Pengaduan: {
        screen: Pengaduan,
        navigationOptions: {
            title: ''
        }
    }, ViolationRecord: {
        screen: ViolationRecord,
        navigationOptions: {
            title: ''
        }
    },
    ContactPerson: {
        screen: ContactPerson,
        navigationOptions: {
            title: ''
        }
    },
    Album: {
        screen: Album,
        navigationOptions: {
            title: ''
        }
    },
    AlbumImage: {
        screen: AlbumImage,
        navigationOptions: {
            title: ''
        }
    },
    Disease: {
        screen: Disease,
        navigationOptions: {
            title: ''
        }
    },
    Absen: {
        screen: Absen,
        navigationOptions: {
            title: ''
        }
    },
    Tahfizh: {
        screen: Tahfizh,
        navigationOptions: {
            title: ''
        }
    },
    Rapor: {
        screen: Rapor,
        navigationOptions: {
            title: 'Rapor'
        }
    },
    PDFViewer: {
        screen: PDFViewer,
        navigationOptions: {
            title: ''
        }
    },
    GuestWebview: {
        screen: GuestWebview,
        navigationOptions: {
            title: ''
        }
    },
    ParentBook: {
        screen: ParentBook,
        navigationOptions: {
            title: ''
        }
    },
}, { headerLayoutPreset: 'center' })

const Routes = createAppContainer(navigator)


export default Routes
