import { Navigate } from 'react-router-dom';
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
    const storedRole = localStorage.getItem('role'); // role của admin hoặc staff
    const hasShownToast = useRef(false);

    const isValid = role === 'user' ? !!token : !!token && storedRole === configRole.expectedRole;

    useEffect(() => {
        if (!isValid && !hasShownToast.current) {
            toast.warning('Vui lòng đăng nhập để tiếp tục');
            hasShownToast.current = true;
        }
    }, [isValid]);

    return isValid ? children : <Navigate to={configRole.loginPath} />;
};

export default PrivateRoute;
