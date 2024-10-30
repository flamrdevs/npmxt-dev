export const jsonBadRequest = (message = 'Bad Request') => json({ message }, { status: 400 });

export const jsonNotImplemented = (message = 'Not Implemented') => json({ message }, { status: 501 });
