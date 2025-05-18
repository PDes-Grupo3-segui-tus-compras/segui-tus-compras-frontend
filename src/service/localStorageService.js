export const isAdmin = () => {
    return localStorage.getItem('permission') === 'admin';
};

export const isCurrentUser = (userId) => {
    return localStorage.getItem('user') == userId;
};
