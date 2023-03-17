export const baseUrl = (val: string) => {
    const url = 'http://127.0.0.1:8000/api';
    // const url = 'https://fruityvice.com/api';
    return `${url}/${val}`;
}

export const urls = {
    baseUrl: baseUrl(''),
    fruit: {
        get: baseUrl('fruits'),
        update: baseUrl('fruits'),
        create: baseUrl('fruits'),
        all: baseUrl('fruits'),
        favorites: baseUrl('favorites')
    }
}