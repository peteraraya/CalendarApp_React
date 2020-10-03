
import moment from 'moment';

export const prepareEvents = (events = []) =>{
    // regresar los eventos transformados de alguna manera
    // console.log(events);

    return events.map(
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(),
            start: moment ( e.start ).toDate()

        })
    );
}