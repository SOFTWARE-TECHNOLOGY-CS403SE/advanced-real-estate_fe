export let appVariables = {
    stompClient: null,
    listPathHidenBanner: [
        '/sign-in',
        '/sign-up',
        '/room-chat',
        '/dau-gia',
        '/buildings',
        '/contact'
    ],
    listPathHidenFilter: [
        '/sign-in',
        '/sign-up',
        '/room-chat',
        '/dau-gia',
        '/contact',
        '/mua-nha',
        '/',
    ],
    listPathNoContentClass: [
        '/buildings',
        '/mua-nha',
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