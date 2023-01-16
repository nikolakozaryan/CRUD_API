import { REQUIRED_KEYS } from '../constants/constants';
import { IUser } from '../modules/Storage/interface';

export const isDataValid = (data: IUser) => {
  const keys = Object.keys(data);
  const hasAllKeys = keys.length === 3 && keys.every((key) => REQUIRED_KEYS.includes(key));
  let hasValidKeys = true;

  if (hasAllKeys) {
    for (let key of REQUIRED_KEYS) {
      switch (key) {
        case 'username':
          hasValidKeys = typeof data[key] === 'string';
          break;
        case 'age':
          hasValidKeys = typeof data[key] === 'number';
          break;
        case 'hobbies':
          const hobbies = data[key];
          if (!Array.isArray(hobbies)) {
            hasValidKeys = false;
          } else {
            const hasInvalidValues = hobbies.some((item) => typeof item !== 'string');
            if (hobbies.length && hasInvalidValues) {
              hasValidKeys = false;
            }
          }
          break;
        default:
          console.log('Something strange is happenig...');
      }
      if (!hasValidKeys) break;
    }
  }

  return hasAllKeys && hasValidKeys;
};
