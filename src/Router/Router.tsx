// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuyerDashboard from '../components/BuyerDashboard/BuyerDashboard';
import SupplierDashboard from '../components/SupplierDashboard/SupplierDashboard';

import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RequestList from "../components/RequestList/RequestList";
import ResponseList from "../components/ResponseList/ResponseList";

// Компонент PrivateRoute защищает маршруты, проверяя наличие токена и роли пользователя
const PrivateRoute: React.FC<{ children: React.ReactNode; requiredRole: string }> = ({ children, requiredRole }) => {
    // Получение токена и роли из localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log('Token:', token);
    console.log('Role:', role);

    // Если токен отсутствует, перенаправляем пользователя на страницу входа
    if (!token) {
        console.log('Пользователь не авторизован, перенаправление на /login');
        return <Navigate to="/login" replace />;
    }

    // Проверка роли пользователя и перенаправление при несоответствии
    if (role !== requiredRole) {
        console.log('Роль пользователя не соответствует, перенаправление...');
        return <Navigate to={role === 'buyer' ? '/buyer-dashboard' : '/supplier-dashboard'} replace />;
    }

    // Если все проверки пройдены, рендерим дочерние элементы (переданный компонент)
    console.log('Все проверки пройдены, рендеринг дочерних элементов');
    return <>{children}</>;
};
const DefaultRoute = () => {
    // Получение токена и роли из localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log('Token:', token);
    console.log('Role:', role);

    // Если токен отсутствует, перенаправляем пользователя на страницу входа
    if (!token) {
        console.log('Пользователь не авторизован, перенаправление на /login');
        return <Navigate to="/login" replace />;
    }
    else {
        return <Navigate to={role === 'buyer' ? '/buyer-dashboard' : '/supplier-dashboard'} replace />;
    }


}

// Основной компонент маршрутизации приложения
const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DefaultRoute />} />

                {/* Маршрут для страницы входа */}
                <Route path="/login" element={<LoginForm />} />

                {/* Маршрут для страницы регистрации */}
                <Route path="/register" element={<RegisterForm />} />

                {/* Защищенный маршрут для панели покупателя */}
                <Route
                    path="/buyer-dashboard"
                    element={
                        <PrivateRoute requiredRole="buyer">
                            <BuyerDashboard />
                        </PrivateRoute>
                    }
                />

                {/* Защищенный маршрут для панели поставщика */}
                <Route
                    path="/supplier-dashboard"
                    element={
                        <PrivateRoute requiredRole="supplier">
                            <SupplierDashboard />
                        </PrivateRoute>
                    }
                />

                {/* Открытый маршрут для списка заявок */}
                <Route path="/requests" element={<RequestList />} />

                {/* Открытый маршрут для списка откликов на определенную заявку */}
                {/* requestId передается в компонент в качестве примера */}
                <Route path="/responses/:requestId" element={<ResponseList requestId={1} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;