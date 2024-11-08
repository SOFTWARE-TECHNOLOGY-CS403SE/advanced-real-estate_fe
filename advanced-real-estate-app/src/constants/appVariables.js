import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        // console.log(startDateTime, endDateTime)
        if (now < startDateTime) {
            return appVariables.BEFORE;
        } else if (now >= startDateTime && now <= endDateTime) {
            return appVariables.NOW;
        } else {
            return appVariables.AFTER;
        }
    },
    calculateCountdownAuction : (start_time, end_time, dispatch, updatedAuctionRoom) => {
        if(start_time && end_time){
            console.log(start_time, end_time);
            const now = new Date();
            const startTimeParts = start_time.split(':');
            const endTimeParts = end_time.split(':');
            const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startTimeParts[0], startTimeParts[1]);
            const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTimeParts[0], endTimeParts[1]);

            if (startTime < now) {
                startTime.setDate(startTime.getDate() + 1);
            }
            const totalSeconds = Math.max(0, Math.floor((endTime - now) / 1000));
            if (totalSeconds <= 0) {
                dispatch(updatedAuctionRoom({
                    connected: false,
                }));
                appVariables.toast_notify_warning(
                    "Thời hạn đấu giá đã hết cảm ơn bạn đã tham gia phiên đấu giá!",
                    5000
                );
                return '00:00:00';
            }
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    },
    toast_notify_error : (text, time)=>{
        toast.error(text, {
            position: "top-center",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    },
    toast_notify_warning : (text, time)=>{
        toast.warning(text, {
            position: "top-center",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    },
    toast_notify_success : (text, time)=>{
        toast.success(text, {
            position: "top-center",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    },
    calculateDistance: function(currentLat, currentLon, buildingLat, buildingLon) {
        if(currentLat && currentLon && buildingLat && buildingLon){
            // Bán kính Trái Đất tính bằng km
            const R = 6371;
            const dLat = (buildingLat - currentLat) * (Math.PI / 180);
            const dLon = (buildingLon - currentLon) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(currentLat * (Math.PI / 180)) * Math.cos(buildingLat * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            // Khoảng cách tính bằng km
            return R * c;
        }
    },
    BEFORE: 'Before',
    NOW: 'Now',
    AFTER: 'After'
};