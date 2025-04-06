import UserDefault from './user/Default/UserDefault';
import FullScreen from './other/FullScreen/FullScreen';

const layouts = {
    admin: {
        // default: AdminLayout,
    },

    user: {
        default: UserDefault,
    },

    other: {
        fullScreen: FullScreen,
    },
};

export default layouts;
