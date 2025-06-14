import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser } from '@/services/UserService';
import { getAdmin } from '@/services/AdminService';
import { loginUser as loginForUser, loginAdminFirstStep, loginAdmin as loginForAdmin } from '@/services/AuthService';
import config from '@/config';
import { useUserContext } from '@/contexts/UserContext';

const useProfile = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [adminId, setAdminId] = useState(localStorage.getItem('admin_id') || '');
    const { user, setUser, admin, setAdmin } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await getUser(userId);
            console.log(res);
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
                if (nextUrl) {
                    navigate(nextUrl);
                    localStorage.removeItem('next');
                } else {
                    navigate(config.routes.user.home);
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

    const loginAdmin = async (username, password) => {
        setLoading(true);
        try {
            const res = await loginForAdmin(username, password);
            if (res.success) {
                setAdminId(res.data.admin.id);
                setAdmin(res.data.admin);
                setError('');
                localStorage.setItem('admin_id', res.data.admin.id);
                localStorage.setItem('admin_token', res.data.token);
                localStorage.setItem('role', res.data.admin.role);
                const nextUrl = localStorage.getItem('next');
                if (nextUrl) {
                    navigate(nextUrl);
                    localStorage.removeItem('next');
                } else {
                    navigate(
                        res.data.admin.role === 'admin' ? config.routes.admin.hotel : config.routes.staff.bookings,
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
        localStorage.removeItem('role');
        localStorage.removeItem('pending_booking_id');
        localStorage.removeItem('booking_created_at');
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
