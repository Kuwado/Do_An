import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import config from '@/config';

const roleConfig = {
    user: {
        tokenKey: 'user_token',
        loginPath: config.routes.user.login,
    },
    admin: {
        tokenKey: 'admin_token',
        loginPath: config.routes.admin.login,
        expectedRole: 'admin',
    },
    staff: {
        tokenKey: 'admin_token',
        loginPath: config.routes.admin.login,
        expectedRole: 'staff',
    },
};

const PrivateRoute = ({ children, role = 'user' }) => {
    const configRole = roleConfig[role] || roleConfig.user;
    const token = localStorage.getItem(configRole.tokenKey);
    const storedRole = localStorage.getItem('role');
    const location = useLocation();
    const hasShownToast = useRef(false);

    console.log(location.pathname);

    const isValid = role === 'user' ? !!token : !!token && storedRole === configRole.expectedRole;

    useEffect(() => {
        if (!isValid && !hasShownToast.current) {
            toast.warning('Vui lòng đăng nhập để tiếp tục');
            localStorage.setItem('next', location.pathname);
            hasShownToast.current = true;
        }
    }, [isValid]);

    return isValid ? children : <Navigate to={configRole.loginPath} />;
};

export default PrivateRoute;
