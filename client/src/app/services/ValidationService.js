export const valid = {
    Price : (data) => {
        if(!data || !data.length)
            return false;
        if(!isNaN(data) && data % 1 === 0)
            return true;
        if(!isNaN(data) && data % 1 !== 0)
            return true;
        return false;
    }
};

export default {
    valid
};
