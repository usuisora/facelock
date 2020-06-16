import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
export const CURRENT_TIMESTAMP = () => moment().format('MM ddd, YYYY hh:mm:ss a');

export const getUuid = () => uuidv4();
