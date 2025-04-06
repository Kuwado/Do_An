import UserDefault from './user/Default/UserDefault';
import AdminDefault from './admin/Default/AdminDefault';
import FullScreen from './other/FullScreen/FullScreen';

const layouts = {
    admin: {
        default: AdminDefault,
    },

    user: {
        default: UserDefault,
    },

    other: {
        fullScreen: FullScreen,
    },
};

export default layouts;
