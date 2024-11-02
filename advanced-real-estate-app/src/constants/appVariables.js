export let appVariables = {
    stompClient: null,
    listPathHidenBanner: [
        '/sign-in',
        '/sign-up',
        '/room-chat',
        '/dau-gia',
        '/buildings',
        '/contact',
        '/user/hop-dong',
        '/user/info',
        '/buildings/:id',
    ],
    listPathHidenFilter: [
        '/sign-in',
        '/sign-up',
        '/room-chat',
        '/dau-gia',
        '/contact',
        '/user/hop-dong',
        '/user/info',
        '/buildings/:id',
        '/',
    ],
    listPathNoContentClass: [
        '/buildings',
        '/',
    ],
    listPathNoFilterClick: [
        '/buildings',
    ],
    listRoleRequireForManagerPage: [
        'ADMIN',
        'STAFF',
    ],
    formatMoney: (value)=>{
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0
        }).format(value);
    }
};