export function checkmissing(obj) {
    if (obj.firstName ===undefined ||
        obj.lastName === undefined ||
        obj.age === undefined ||
        obj.phoneNumber === undefined ||
        obj.email === undefined ||
        obj.city === undefined ||
        obj.nbLanguage === undefined ||
        obj.couple === undefined ||
        obj.schoolName === undefined ||
        obj.year === undefined ||
        obj.sn_ts === undefined ||
        obj.chimie === undefined ||
        obj.physique === undefined ||
        obj.favoriteGame === undefined ||
        obj.numHours === undefined
        ) {
            return true;
        }

    return false;
}