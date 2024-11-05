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
    },
    checkStatus : (startDate, startTime, endTime) => {
        const now = new Date();
        //VietNam time
        const startDateTime = new Date(`${startDate}T${startTime}+07:00`);
        const endDateTime = new Date(`${startDate}T${endTime}+07:00`);
        if (now < startDateTime) {
            return appVariables.BEFORE;
        } else if (now >= startDateTime && now <= endDateTime) {
            return appVariables.NOW;
        } else {
            return appVariables.AFTER;
        }
    },
    BEFORE: 'Before',
    NOW: 'Now',
    AFTER: 'After'
};