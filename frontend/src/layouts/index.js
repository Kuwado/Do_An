import UserDefault from './user/Default/UserDefault';
import UserHome from './user/Home/UserHome';
import AdminDefault from './admin/Default/AdminDefault';
import FullScreen from './other/FullScreen/FullScreen';

const layouts = {
    admin: {
        default: AdminDefault,
    },

    user: {
        default: UserDefault,
        home: UserHome,
    },

    other: {
        fullScreen: FullScreen,
    },
};

export default layouts;
