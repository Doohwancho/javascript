export const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
};

export const formatMonth = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return year + '-' + month;
};

export const getToday = () => {
    const today = new Date();
    const transformToday = formatDate(today);
    return transformToday;
};

export const getMonth = () => {
    const today = new Date();
    const transformMonth = formatMonth(today);
    return transformMonth;
};

export const getMonthPeriod = (stDate, edDate) => {
    const stArr = stDate.split("-");
    const edArr = edDate.split("-");
    
    const startYear = stArr[0];
    const startMonth = stArr[1];
    const endYear = edArr[0];
    const endMonth = edArr[1];
    
    return (endYear - startYear) * 12 + (endMonth - startMonth);
}
