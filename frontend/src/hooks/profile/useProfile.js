import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser } from '@/services/UserService';
import { getAdmin } from '@/services/AdminService';
import {
    loginUser as loginForUser,
    loginAdminFirstStep,
    loginAdmin as loginForAdmin,
} from '../../services/AuthService';
import config from '@/config';

const useProfile = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [adminId, setAdminId] = useState(localStorage.getItem('admin_id') || '');
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    console.log(admin);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await getUser(userId);
            setUser(res.user);
            setError('');
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdmin = async () => {
        setLoading(true);
        try {
            const res = await getAdmin(adminId);
            console.log(res);
            setAdmin(res.admin);
            setError('');
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId]);

    useEffect(() => {
        if (adminId) fetchAdmin();
    }, [adminId]);

    const loginUser = async (username, password) => {
        setLoading(true);
        try {
            const res = await loginForUser(username, password);
            if (res.success) {
                setUserId(res.data.user.id);
                setError('');
                localStorage.setItem('user_id', res.data.user.id);
                localStorage.setItem('user_token', res.data.token);
                const nextUrl = localStorage.getItem('next');
                navigate(nextUrl ?? config.routes.user.home);
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const loginAdmin = async (username, password) => {
        setLoading(true);
        try {
            const res = await loginForAdmin(username, password);
            if (res.success) {
                setAdminId(res.data.admin.id);
                setAdmin(res.data.admin);
                console.log(res);
                setError('');
                localStorage.setItem('admin_id', res.data.admin.id);
                localStorage.setItem('admin_token', res.data.token);
                const nextUrl = localStorage.getItem('next');
                if (nextUrl) {
                    navigate(nextUrl);
                } else {
                    navigate(
                        res.data.admin.role === 'admin' ? config.routes.admin.dashboard : config.routes.staff.dashboard,
                    );
                }
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_token');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('next');
        setUserId('');
        setAdminId('');
        setUser({});
        setAdmin({});
        setLoading(false);
        setError('');
    };

    return {
        user,
        setUser,
        admin,
        setAdmin,
        loading,
        setLoading,
        error,
        setError,
        fetchUser,
        fetchAdmin,
        loginUser,
        loginAdmin,
        logout,
    };
};

export default useProfile;
